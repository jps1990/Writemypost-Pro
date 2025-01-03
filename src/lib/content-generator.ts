import { Configuration, OpenAIApi } from 'openai';
import { IMAGE_ANALYSIS_PROMPT, SOCIAL_MEDIA_PROMPT, MARKETPLACE_PROMPT, SYSTEM_PROMPT } from './prompts';
import { GeneratedContent, GenerationOptions } from './types';
import { supabase } from './supabase-client';
import { env } from './env';
import { storage } from './storage';

export interface GenerationOptions {
  userId: string;
  mode?: 'social' | 'marketplace';
  platforms?: string[];
  tone?: string;
  language?: string;
  industry?: string;
}

class ContentGenerator {
  async generate(
    image: UploadedImage,
    options: GenerationOptions
  ): Promise<GeneratedContent> {
    // Validate basic inputs
    if (!image?.file) {
      throw new Error('Please upload an image first');
    }
    if (!options.userId) {
      throw new Error('User ID is required');
    }

    try {
      // 1. Upload image and create record
      const imageRecord = await this.uploadImage(image, options.userId);

      // 2. Analyze image with GPT-4 Vision
      const analysis = await this.analyzeImage(image, imageRecord.id);

      // 3. Generate social content if requested
      let socialContent = null;
      if (options.mode === 'social') {
        socialContent = await this.generateSocialContent(analysis.imageAnalysis, options);
      }

      // Return complete content
      return {
        imageAnalysis: analysis.imageAnalysis,
        social: socialContent
      };

    } catch (error) {
      console.error('Content generation error:', error);
      if (env.APP_ENV === 'development' || env.ENABLE_MOCK_API) {
        console.log('Using mock data');
        return this.getMockContent();
      }
      throw error instanceof Error ? error : new Error('Failed to generate content');
    }
  }

  private async uploadImage(image: UploadedImage, userId: string) {
    // Valider le type de fichier
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!ALLOWED_TYPES.includes(image.file.type)) {
      throw new Error(`Type de fichier non supporté. Types acceptés: ${ALLOWED_TYPES.map(t => t.split('/')[1]).join(', ')}`);
    }

    // Valider la taille du fichier (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB en bytes
    if (image.file.size > MAX_FILE_SIZE) {
      throw new Error(`Le fichier est trop gros. La taille maximum est de 10MB. Taille actuelle: ${(image.file.size / 1024 / 1024).toFixed(2)}MB`);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const cleanFileName = this.sanitizeFileName(image.file.name);
    const fileName = `${timestamp}-${cleanFileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, image.file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: imageRecord, error: imageError } = await supabase
      .from('images')
      .insert({
        user_id: userId,
        file_path: uploadData.path,
        file_type: image.file.type
      })
      .select()
      .single();

    if (imageError) {
      throw new Error(`Database error: ${imageError.message}`);
    }

    return imageRecord;
  }

  private sanitizeFileName(fileName: string): string {
    // Enlève les caractères spéciaux et les espaces
    return fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Enlève les accents
      .replace(/[^a-zA-Z0-9.-]/g, '-') // Remplace les caractères spéciaux par des tirets
      .replace(/--+/g, '-') // Remplace les tirets multiples par un seul
      .replace(/^-+|-+$/g, '') // Enlève les tirets au début et à la fin
      .toLowerCase(); // Convertit en minuscules
  }

  private async analyzeImage(image: UploadedImage, imageId: string) {
    try {
      // Validate API key
      if (!env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key is required for image analysis');
      }

      // Get user's language preference
      const userPrefs = storage.getPreferences();
      if (!userPrefs.language) {
        throw new Error('Please enter your target language before uploading an image');
      }

      const base64Image = await this.imageToBase64(image.file);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
          ...(env.OPENAI_ORG_ID && { 'OpenAI-Organization': env.OPENAI_ORG_ID })
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: IMAGE_ANALYSIS_PROMPT
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this image and provide the response in ${userPrefs.language}. Follow the format exactly.`
                },
                {
                  type: 'image_url',
                  image_url: { 
                    url: base64Image,
                    detail: 'high'
                  }
                }
              ]
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erreur API:', error);
        throw new Error(error.error?.message || 'Failed to analyze image');
      }

      const data = await response.json();
      
      // Parse response content
      let content = data.choices[0].message.content;
      console.log('Réponse brute:', content);

      // Nettoyer la réponse si nécessaire
      content = content.replace(/```json\n?|\n?```/g, '').trim();
      
      try {
        const analysis = JSON.parse(content);
        console.log('Analyse parsée:', analysis);
        
        // Valider et corriger la structure
        const validatedAnalysis = this.validateAnalysisResponse(analysis);
        console.log('Analyse validée:', validatedAnalysis);

        return validatedAnalysis;
      } catch (parseError) {
        console.error('Erreur de parsing:', parseError);
        console.error('Contenu qui a causé l\'erreur:', content);
        throw new Error('Failed to parse analysis response');
      }

    } catch (error) {
      console.error('Error in analyzeImage:', error);
      if (env.APP_ENV === 'development' || env.ENABLE_MOCK_API) {
        console.log('Using mock analysis data');
        return this.getMockAnalysis();
      }
      throw error;
    }
  }

  private validateAnalysisResponse(analysis: any) {
    // Valider la structure de base
    if (!analysis) {
      throw new Error('La réponse est vide');
    }

    // Si l'analyse est directement dans la racine (pas dans imageAnalysis)
    if (analysis.categories && analysis.tags) {
      // Convertir au format attendu
      analysis = {
        imageAnalysis: {
          categories: analysis.categories,
          tags: analysis.tags,
          description: analysis.description,
          technicalDetails: analysis.technicalDetails,
          marketAnalysis: analysis.marketAnalysis
        }
      };
    }

    // Valider la structure complète
    if (!analysis.imageAnalysis) {
      throw new Error('Invalid analysis response: missing imageAnalysis');
    }
    
    const { imageAnalysis } = analysis;
    const required = {
      categories: imageAnalysis.categories,
      tags: imageAnalysis.tags,
      description: imageAnalysis.description,
      'technicalDetails.materials': imageAnalysis.technicalDetails?.materials,
      'technicalDetails.specifications': imageAnalysis.technicalDetails?.specifications,
      'marketAnalysis.targetAudience': imageAnalysis.marketAnalysis?.targetAudience,
      'marketAnalysis.pricePoint': imageAnalysis.marketAnalysis?.pricePoint,
      'marketAnalysis.uniqueSellingPoints': imageAnalysis.marketAnalysis?.uniqueSellingPoints
    };

    // Valider tous les champs requis
    for (const [field, value] of Object.entries(required)) {
      if (!value || (Array.isArray(value) && !value.length)) {
        console.error('Champ manquant:', field, 'Valeur:', value);
        console.error('Réponse complète:', JSON.stringify(analysis, null, 2));
        throw new Error(`Champ requis manquant: ${field}`);
      }
    }

    // Valider le price point
    const validPricePoints = ['budget', 'mid-range', 'premium', 'luxury'];
    if (!validPricePoints.includes(imageAnalysis.marketAnalysis.pricePoint)) {
      console.warn(`Prix invalide: ${imageAnalysis.marketAnalysis.pricePoint}. Utilisation de 'mid-range' par défaut`);
      imageAnalysis.marketAnalysis.pricePoint = 'mid-range';
    }

    // Valider les longueurs minimales
    if (imageAnalysis.categories.length < 2) {
      console.warn('Moins de 2 catégories trouvées, ajout de catégories génériques');
      imageAnalysis.categories.push('General', 'Product');
    }
    if (imageAnalysis.tags.length < 5) {
      console.warn('Moins de 5 tags trouvés, ajout de tags génériques');
      imageAnalysis.tags.push('product', 'item', 'new', 'quality', 'value');
    }

    return analysis;
  }

  private getMockAnalysis() {
    return {
      analysis: {
        categories: ['Product', 'Lifestyle'],
        tags: ['modern', 'premium', 'professional'],
        description: 'High-quality product image with professional lighting',
        technicalDetails: {
          materials: ['Premium materials'],
          specifications: {
            quality: 'High-end',
            style: 'Modern'
          }
        },
        marketAnalysis: {
          targetAudience: ['Professionals', 'Quality-conscious consumers'],
          pricePoint: 'Premium',
          uniqueSellingPoints: ['Superior design', 'Premium quality']
        }
      }
    };
  }

  private async generateSocialContent(imageAnalysis: any, options: GenerationOptions) {
    try {
      const userPrefs = storage.getPreferences();
      
      // Valider les options requises
      if (!options.platforms?.length) {
        throw new Error('Au moins une plateforme doit être sélectionnée');
      }
      if (!options.tone) {
        throw new Error('Le ton doit être spécifié');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
          ...(env.OPENAI_ORG_ID && { 'OpenAI-Organization': env.OPENAI_ORG_ID })
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: SOCIAL_MEDIA_PROMPT + "\nIMPORTANT: Tu DOIS répondre UNIQUEMENT en format JSON valide, pas de texte avant ou après."
            },
            {
              role: 'user',
              content: JSON.stringify({
                imageAnalysis,
                options: {
                  platforms: options.platforms.map(p => ({
                    id: p,
                    requirements: this.getPlatformRequirements(p)
                  })),
                  tone: options.tone,
                  language: options.language || userPrefs.language
                }
              })
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erreur API:', error);
        throw new Error(error.error?.message || 'Failed to generate social content');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        // Nettoyer et parser la réponse
        const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
        console.log('Contenu nettoyé:', cleaned);
        
        const socialContent = JSON.parse(cleaned);
        console.log('Contenu parsé:', socialContent);
        
        return this.validateSocialContent(socialContent);
      } catch (parseError) {
        console.error('Erreur de parsing:', parseError);
        console.error('Contenu qui a causé l\'erreur:', content);
        throw new Error('Failed to parse social content');
      }
    } catch (error) {
      console.error('Error generating social content:', error);
      throw error;
    }
  }

  private validateSocialContent(content: any) {
    if (!content.sentiment || !content.hashtags || !content.content) {
      throw new Error('Invalid social content structure');
    }

    // Valider sentiment
    const sentiment = content.sentiment;
    if (!sentiment.positive || !sentiment.neutral || !sentiment.negative) {
      throw new Error('Invalid sentiment structure');
    }

    // Valider hashtags
    const hashtags = content.hashtags;
    if (!Array.isArray(hashtags.recommended) || !Array.isArray(hashtags.niche) || !Array.isArray(hashtags.trending)) {
      throw new Error('Invalid hashtags structure');
    }

    // Valider content
    const socialContent = content.content;
    if (!socialContent.common?.title || !socialContent.common?.description) {
      throw new Error('Invalid common content structure');
    }

    return content;
  }

  private getMockContent(): GeneratedContent {
    return {
      imageAnalysis: {
        categories: ['Product', 'Lifestyle'],
        tags: ['modern', 'premium', 'professional'],
        description: 'High-quality product image with professional lighting',
        technicalDetails: {
          materials: ['Premium materials'],
          specifications: {
            quality: 'High-end',
            style: 'Modern'
          }
        },
        marketAnalysis: {
          targetAudience: ['Professionals', 'Quality-conscious consumers'],
          pricePoint: 'premium',
          uniqueSellingPoints: ['Superior design', 'Premium quality']
        }
      },
      social: {
        sentiment: {
          positive: 80,
          neutral: 15,
          negative: 5
        },
        hashtags: {
          recommended: ['#premium', '#quality', '#design'],
          niche: ['#professionalgrade', '#luxurylifestyle'],
          trending: ['#musthave', '#trending']
        },
        content: {
          common: {
            title: 'Discover Premium Quality',
            description: 'Experience the perfect blend of style and functionality'
          },
          instagram: {
            caption: 'Elevate your lifestyle with our premium collection ✨',
            hashtags: ['#premium', '#quality', '#lifestyle']
          },
          facebook: {
            post: 'Introducing our latest premium product line...',
            hashtags: ['#newlaunch', '#premium']
          },
          twitter: {
            tweet: 'Quality meets style in our newest release! 🌟',
            hashtags: ['#premium', '#musthave']
          }
        }
      }
    };
  }

  private async generateMarketplaceListing(
    analysis: any,
    options: GenerationOptions
  ) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: MARKETPLACE_PROMPT
          },
          {
            role: 'user',
            content: JSON.stringify({
              analysis,
              options: {
                industry: options.industry,
                language: options.language || storage.getPreferences().language
              }
            })
          }
        ],
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate marketplace listing');
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    return {
      imageAnalysis: {
        categories: analysis.visual.highlights || [],
        technicalDetails: {
          materials: analysis.technical.materials || [],
          specifications: analysis.technical.specifications || {}
        },
        marketAnalysis: {
          targetAudience: analysis.market.targetAudience || [],
          uniqueSellingPoints: analysis.market.uniquePoints || []
        }
      },
      marketplace: content
    };
  }

  private async saveGeneration(data: {
    userId: string;
    imageId: string;
    content: GeneratedContent;
    options: GenerationOptions;
  }) {
    const { error } = await supabase
      .from('content_generations')
      .insert({
        user_id: data.userId,
        image_id: data.imageId,
        content_type: data.options.mode || 'social',
        generated_content: data.content,
        metadata: {
          tone: data.options.tone,
          language: data.options.language,
          platforms: data.options.platforms,
          industry: data.options.industry
        }
      });

    if (error) throw error;
  }

  private async imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  private getPlatformRequirements(platform: string) {
    const requirements = {
      instagram: {
        caption: { maxLength: 2200, format: 'text with emojis and hashtags' },
        hashtags: { recommended: 20, max: 30 }
      },
      facebook: {
        post: { maxLength: 63206, format: 'text with links and hashtags' },
        hashtags: { recommended: 2, max: 5 }
      },
      twitter: {
        tweet: { maxLength: 280, format: 'text with emojis and hashtags' },
        hashtags: { recommended: 2, max: 3 }
      },
      linkedin: {
        post: { maxLength: 3000, format: 'professional text with hashtags' },
        hashtags: { recommended: 3, max: 5 }
      },
      tiktok: {
        caption: { maxLength: 2200, format: 'casual text with emojis and hashtags' },
        hashtags: { recommended: 4, max: 8 }
      },
      pinterest: {
        description: { maxLength: 500, format: 'descriptive text with hashtags' },
        hashtags: { recommended: 3, max: 6 }
      },
      youtube: {
        title: { maxLength: 100, format: 'SEO optimized title' },
        description: { maxLength: 5000, format: 'detailed description with timestamps' },
        tags: { recommended: 15, max: 30 }
      },
      threads: {
        post: { maxLength: 500, format: 'casual text with emojis and hashtags' },
        hashtags: { recommended: 3, max: 5 }
      },
      snapchat: {
        caption: { maxLength: 250, format: 'short text with emojis' },
        hashtags: { recommended: 1, max: 3 }
      },
      medium: {
        title: { maxLength: 100, format: 'engaging title' },
        subtitle: { maxLength: 200, format: 'descriptive subtitle' },
        content: { minLength: 1000, format: 'detailed article' },
        tags: { recommended: 5, max: 10 }
      }
    };

    return requirements[platform] || {};
  }
}

// Export singleton instance
export const contentGenerator = new ContentGenerator();