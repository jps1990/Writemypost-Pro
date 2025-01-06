import { OpenAI } from 'openai';
import type { ImageAnalysis, AnalysisMode, UploadedImage, GenerationOptions } from '../types';
import { IMAGE_ANALYSIS_PROMPT, SYSTEM_PROMPT } from '../prompts';

export class ImageAnalyzer {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async analyze(
    image: UploadedImage,
    options: GenerationOptions
  ): Promise<ImageAnalysis> {
    if (!image?.base64) {
      throw new Error('No image data provided');
    }

    if (!options.language?.trim()) {
      throw new Error('Target language is required');
    }

    if (!options.analysisMode) {
      throw new Error('Analysis mode is required');
    }

    try {
      console.log('🔍 Démarrage de l\'analyse d\'image...', { mode: options.mode, language: options.language });
      
      const response = await this.client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n\nRÈGLE IMPORTANTE: Toutes les réponses doivent être en ${options.language}.\n\n${IMAGE_ANALYSIS_PROMPT}`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this image in ${options.language}. 
                
Mode d'analyse: ${options.analysisMode === 'product' ? 'Product Focus' : 'General Content'}

${options.analysisMode === 'product' 
? 'Focus sur les détails du produit, spécifications techniques, prix et positionnement marché.' 
: 'Focus sur le contexte général, le style de vie, l\'ambiance et le storytelling.'}

${options.mode === 'marketplace' 
? 'Analyse approfondie pour la vente sur les marketplaces (prix, specs, etc.)' 
: 'Analyse pour les réseaux sociaux et le contenu marketing'}`
              },
              {
                type: "image_url",
                image_url: {
                  url: image.base64,
                  detail: "high"
                }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content generated');
      }

      console.log('📝 Raw LLM response:', content);

      try {
        // Trouver le début et la fin du JSON
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}') + 1;
        
        if (jsonStart === -1 || jsonEnd <= jsonStart) {
          throw new Error('Invalid JSON response format');
        }
        
        const jsonStr = content.slice(jsonStart, jsonEnd);
        
        console.log('🧹 Cleaned JSON:', jsonStr);
        
        const analysis = JSON.parse(jsonStr) as ImageAnalysis;
        console.log('✅ Parsed analysis:', analysis);

        // Validation des champs requis
        if (!analysis.categories || !analysis.description || !analysis.sentiment) {
          throw new Error('Missing required fields in analysis');
        }
        
        return {
          ...analysis,
          visualImpact: analysis.visualImpact || {
            composition: "",
            colors: [],
            style: ""
          },
          sentiment: analysis.sentiment ? {
            ...analysis.sentiment,
            positive: analysis.sentiment.positive || 0,
            neutral: analysis.sentiment.neutral || 0,
            negative: analysis.sentiment.negative || 0
          } : undefined,
          technicalDetails: {
            materials: analysis.technicalDetails?.materials || [],
            dimensions: analysis.technicalDetails?.dimensions || "",
            specifications: analysis.technicalDetails?.specifications || {}
          },
          marketAnalysis: {
            targetAudience: analysis.marketAnalysis?.targetAudience || [],
            uniqueSellingPoints: analysis.marketAnalysis?.uniqueSellingPoints || [],
            pricing: analysis.marketAnalysis?.pricing || {
              suggested: 0,
              range: {
                min: 0,
                max: 0
              },
              currency: options.currency || 'USD',
              competitivePricing: {
                low: 0,
                average: 0,
                premium: 0
              }
            }
          }
        };
      } catch (parseError) {
        console.error('❌ Erreur de parsing JSON:', parseError);
        console.error('Contenu problématique:', content);
        throw new Error('Failed to parse analysis response');
      }
    } catch (error) {
      console.error('❌ Erreur d\'analyse:', error);
      throw error;
    }
  }
} 