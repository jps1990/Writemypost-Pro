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

      // Parse and validate the result
      const parsedContent = JSON.parse(result);
      
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
      if (options.platforms?.includes('instagram') && parsedContent.content?.instagram?.caption) {
        validatedContent.content.instagram = {
          caption: parsedContent.content.instagram.caption,
          hashtags: parsedContent.content.instagram.hashtags
        };
      }

      if (options.platforms?.includes('facebook') && parsedContent.content?.facebook?.post) {
        validatedContent.content.facebook = {
          post: parsedContent.content.facebook.post,
          hashtags: parsedContent.content.facebook.hashtags
        };
      }

      if (options.platforms?.includes('twitter') && parsedContent.content?.twitter?.tweet) {
        validatedContent.content.twitter = {
          tweet: parsedContent.content.twitter.tweet,
          hashtags: parsedContent.content.twitter.hashtags
        };
      }

      if (options.platforms?.includes('linkedin') && parsedContent.content?.linkedin?.post) {
        validatedContent.content.linkedin = {
          post: parsedContent.content.linkedin.post,
          hashtags: parsedContent.content.linkedin.hashtags
        };
      }

      if (options.platforms?.includes('tiktok') && parsedContent.content?.tiktok?.caption) {
        validatedContent.content.tiktok = {
          caption: parsedContent.content.tiktok.caption,
          hashtags: parsedContent.content.tiktok.hashtags
        };
      }

      if (options.platforms?.includes('pinterest') && parsedContent.content?.pinterest?.description) {
        validatedContent.content.pinterest = {
          description: parsedContent.content.pinterest.description,
          hashtags: parsedContent.content.pinterest.hashtags
        };
      }

      if (options.platforms?.includes('youtube') && parsedContent.content?.youtube?.title) {
        validatedContent.content.youtube = {
          title: parsedContent.content.youtube.title,
          description: parsedContent.content.youtube.description,
          tags: parsedContent.content.youtube.tags
        };
      }

      if (options.platforms?.includes('threads') && parsedContent.content?.threads?.post) {
        validatedContent.content.threads = {
          post: parsedContent.content.threads.post,
          hashtags: parsedContent.content.threads.hashtags
        };
      }

      if (options.platforms?.includes('snapchat') && parsedContent.content?.snapchat?.caption) {
        validatedContent.content.snapchat = {
          caption: parsedContent.content.snapchat.caption,
          hashtags: parsedContent.content.snapchat.hashtags
        };
      }

      if (options.platforms?.includes('medium') && parsedContent.content?.medium?.title) {
        validatedContent.content.medium = {
          title: parsedContent.content.medium.title,
          subtitle: parsedContent.content.medium.subtitle,
          content: parsedContent.content.medium.content,
          tags: parsedContent.content.medium.tags
        };
      }

      if (options.platforms?.includes('email') && parsedContent.content?.email?.subject) {
        validatedContent.content.email = {
          subject: parsedContent.content.email.subject,
          long: parsedContent.content.email.long,
          medium: parsedContent.content.email.medium,
          short: parsedContent.content.email.short
        };
      }

      return validatedContent;

    } catch (error) {
      console.error('Error generating social content:', error);
      throw error instanceof Error ? error : new Error('Failed to generate social content');
    }
  }
} 