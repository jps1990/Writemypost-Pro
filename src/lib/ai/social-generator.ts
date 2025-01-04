import { OpenAI } from 'openai';
import type { ImageAnalysis, GenerationOptions, SimpleSocialContent } from '../types';
import { SOCIAL_MEDIA_PROMPT, SYSTEM_PROMPT } from '../prompts';

export class SocialGenerator {
  private getClient() {
    return new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async generate(
    analysis: ImageAnalysis,
    options: GenerationOptions
  ): Promise<SimpleSocialContent> {
    try {
      const openai = this.getClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n\nRÈGLE IMPORTANTE: Toutes les réponses doivent être en ${options.language}.\n\n${SOCIAL_MEDIA_PROMPT}`
          },
          {
            role: "user",
            content: `Generate social media content in ${options.language} ONLY for these specific platforms: ${options.platforms?.join(', ') || 'all platforms'}. DO NOT generate content for other platforms.
            
Analysis: ${JSON.stringify(analysis, null, 2)}

Additional context: ${options.additionalDescription || 'None provided'}
Tone: ${options.tone || 'Professional'}
Industry: ${options.industry || 'General'}

IMPORTANT: Make sure to generate complete content for each selected platform, including all required fields (caption/post, hashtags, etc.).`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });

      const result = response.choices[0]?.message?.content;
      if (!result) {
        throw new Error('No content generated');
      }

      // Nettoyer et valider le JSON
      const cleanedResult = this.cleanJsonString(result);
      
      try {
        // Parse and validate the result
        const parsedContent = JSON.parse(cleanedResult);
        
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
            }
          }
        };

        // Add platform-specific content only if it exists and was selected
        if (options.platforms?.includes('instagram') && parsedContent.content?.instagram) {
          validatedContent.content.instagram = {
            caption: parsedContent.content.instagram.feed?.caption || "",
            hashtags: parsedContent.content.instagram.feed?.hashtags || [],
            story: parsedContent.content.instagram.story,
            reels: parsedContent.content.instagram.reels
          };
        }

        if (options.platforms?.includes('facebook') && parsedContent.content?.facebook) {
          validatedContent.content.facebook = {
            post: parsedContent.content.facebook.post,
            story: parsedContent.content.facebook.story,
            hashtags: parsedContent.content.facebook.hashtags
          };
        }

        if (options.platforms?.includes('twitter') && parsedContent.content?.twitter) {
          validatedContent.content.twitter = {
            tweet: parsedContent.content.twitter.tweet,
            thread: parsedContent.content.twitter.thread,
            hashtags: parsedContent.content.twitter.hashtags
          };
        }

        if (options.platforms?.includes('linkedin') && parsedContent.content?.linkedin) {
          validatedContent.content.linkedin = {
            post: parsedContent.content.linkedin.post,
            article: parsedContent.content.linkedin.article,
            hashtags: parsedContent.content.linkedin.hashtags
          };
        }

        if (options.platforms?.includes('tiktok') && parsedContent.content?.tiktok) {
          validatedContent.content.tiktok = {
            caption: parsedContent.content.tiktok.caption,
            hashtags: parsedContent.content.tiktok.hashtags,
            soundSuggestion: parsedContent.content.tiktok.soundSuggestion,
            effectSuggestions: parsedContent.content.tiktok.effectSuggestions
          };
        }

        if (options.platforms?.includes('pinterest') && parsedContent.content?.pinterest) {
          validatedContent.content.pinterest = {
            title: parsedContent.content.pinterest.title,
            description: parsedContent.content.pinterest.description,
            boardSuggestions: parsedContent.content.pinterest.boardSuggestions,
            hashtags: parsedContent.content.pinterest.hashtags
          };
        }

        if (options.platforms?.includes('youtube') && parsedContent.content?.youtube) {
          validatedContent.content.youtube = {
            title: parsedContent.content.youtube.title,
            description: parsedContent.content.youtube.description,
            tags: parsedContent.content.youtube.tags,
            chapters: parsedContent.content.youtube.chapters
          };
        }

        if (options.platforms?.includes('threads') && parsedContent.content?.threads) {
          validatedContent.content.threads = {
            post: parsedContent.content.threads.post,
            discussion: parsedContent.content.threads.discussion,
            hashtags: parsedContent.content.threads.hashtags
          };
        }

        if (options.platforms?.includes('snapchat') && parsedContent.content?.snapchat) {
          validatedContent.content.snapchat = {
            caption: parsedContent.content.snapchat.caption,
            filters: parsedContent.content.snapchat.filters
          };
        }

        if (options.platforms?.includes('email') && parsedContent.content?.email) {
          validatedContent.content.email = {
            subject: parsedContent.content.email.subject,
            long: parsedContent.content.email.long,
            medium: parsedContent.content.email.medium,
            short: parsedContent.content.email.short
          };
        }

        return validatedContent;

      } catch (error) {
        console.error('JSON parsing error:', error);
        console.error('Raw content:', result);
        console.error('Cleaned content:', cleanedResult);
        throw error;
      }

    } catch (error) {
      console.error('Error generating social content:', error);
      throw error instanceof Error ? error : new Error('Failed to generate social content');
    }
  }

  private cleanJsonString(jsonString: string): string {
    // Enlever tout texte avant le premier {
    const startIndex = jsonString.indexOf('{');
    const endIndex = jsonString.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) {
      throw new Error('Invalid JSON structure');
    }
    
    let cleaned = jsonString.slice(startIndex, endIndex + 1);
    
    // Nettoyer les caractères d'échappement mal formés
    cleaned = cleaned.replace(/\\\\/g, '\\')
                    .replace(/\\"/g, '"')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/\t/g, '\\t')
                    .replace(/\\'/g, "'");
    
    // Gérer les guillemets non échappés dans les chaînes
    cleaned = cleaned.replace(/(?<!\\)"/g, '\\"');
    
    try {
      // Valider que c'est du JSON valide
      JSON.parse(cleaned);
      return cleaned;
    } catch (error) {
      console.error('JSON cleaning failed:', error);
      throw error;
    }
  }
} 