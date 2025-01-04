import type { ImageAnalysis, GenerationOptions, SimpleSocialContent } from '../types';
import { SOCIAL_PROMPT, SYSTEM_PROMPT } from '../prompts';
import { BaseGenerator } from './base-generator';

export class SocialGenerator extends BaseGenerator {
  async generate(
    analysis: ImageAnalysis,
    options: GenerationOptions
  ): Promise<SimpleSocialContent> {
    try {
      const result = await this.retryWithExponentialBackoff(
        async () => {
          const openai = this.getClient();
          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `${SYSTEM_PROMPT}\n\nRÈGLE IMPORTANTE: Toutes les réponses doivent être en ${options.language}.\n\n${SOCIAL_PROMPT}`
              },
              {
                role: "user",
                content: `Generate social media content in ${options.language} ONLY for these specific platforms: ${options.platforms?.join(', ') || 'all platforms'}. DO NOT generate content for other platforms.
                
Analysis: ${JSON.stringify(analysis, null, 2)}

Mode d'analyse: ${options.analysisMode === 'product' ? 'Product Focus' : 'General Content'}
Type de contenu: ${options.analysisMode === 'product' 
  ? 'Contenu orienté produit - Focus sur les caractéristiques, bénéfices et valeur du produit' 
  : 'Contenu général - Focus sur le lifestyle, l\'ambiance et le storytelling'}

Additional context: ${options.additionalDescription || 'None provided'}
Tone: ${options.tone || 'Professional'}
Industry: ${options.industry || 'General'}

IMPORTANT: 
- Generate content adapted to ${options.analysisMode === 'product' ? 'product marketing' : 'lifestyle/branding'}
- Make sure to generate complete content for each selected platform
- Include all required fields (caption/post, hashtags, etc.)
- Always include email templates as bonus content`
              }
            ],
            temperature: 0.7,
            max_tokens: 4000
          });

          const content = response.choices[0]?.message?.content;
          if (!content) {
            throw new Error('No content generated');
          }

          return content;
        },
        'social-generator'
      );

      // Nettoyer et valider le JSON
      const parsedContent = await this.cleanAndValidateJson(result, 'social-generator');
      
      // Ensure we have all required fields
      const validatedContent: SimpleSocialContent = {
        sentiment: parsedContent.sentiment && {
          tone: parsedContent.sentiment.tone,
          emotion: parsedContent.sentiment.emotion,
          keywords: parsedContent.sentiment.keywords
        },
        hashtags: parsedContent.hashtags && {
          primary: parsedContent.hashtags.primary,
          secondary: parsedContent.hashtags.secondary,
          niche: parsedContent.hashtags.niche
        },
        content: {
          common: parsedContent.content?.common && {
            title: parsedContent.content.common.title,
            description: parsedContent.content.common.description
          },
          // Toujours inclure les emails s'ils existent
          email: parsedContent.content?.email && {
            welcome: parsedContent.content.email.welcome && {
              subject: parsedContent.content.email.welcome.subject,
              content: parsedContent.content.email.welcome.content
            },
            promotional: parsedContent.content.email.promotional && {
              subject: parsedContent.content.email.promotional.subject,
              content: parsedContent.content.email.promotional.content
            },
            followUp: parsedContent.content.email.followUp && {
              subject: parsedContent.content.email.followUp.subject,
              content: parsedContent.content.email.followUp.content
            },
            reactivation: parsedContent.content.email.reactivation && {
              subject: parsedContent.content.email.reactivation.subject,
              content: parsedContent.content.email.reactivation.content
            }
          }
        }
      };

      // Add platform-specific content for selected platforms
      const platforms = [
        'instagram', 'facebook', 'twitter', 'linkedin', 'tiktok', 
        'pinterest', 'youtube', 'threads', 'snapchat', 'medium'
      ] as const;

      type Platform = typeof platforms[number];

      // Si une plateforme est dans la réponse ET qu'elle a été sélectionnée, on l'ajoute
      platforms.forEach(platform => {
        if (options.platforms?.includes(platform) && parsedContent.content?.[platform]) {
          const platformContent = parsedContent.content[platform];
          (validatedContent.content as any)[platform] = {
            ...platformContent, // Garde tous les champs originaux
            caption: platformContent.caption || platformContent.post, // Support des deux formats sans placeholder
            hashtags: platformContent.hashtags,
            tags: platformContent.tags, // YouTube
            filters: platformContent.filters, // Snapchat
            description: platformContent.description // Pinterest/YouTube
          };
        }
      });

      return validatedContent;

    } catch (error) {
      console.error('Error generating social content:', error);
      throw error instanceof Error ? error : new Error('Failed to generate social content');
    }
  }
} 