import { OpenAI } from 'openai';
import type { ImageAnalysis, GenerationOptions, MarketplaceContent } from '../types';
import { MARKETPLACE_PROMPT, SYSTEM_PROMPT } from '../prompts';

export class MarketplaceGenerator {
  private getClient() {
    return new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async generate(
    analysis: ImageAnalysis,
    options: GenerationOptions
  ): Promise<MarketplaceContent> {
    try {
      const openai = this.getClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n\nRÈGLE IMPORTANTE: Toutes les réponses doivent être en ${options.language}.\n\n${MARKETPLACE_PROMPT}`
          },
          {
            role: "user",
            content: `Generate marketplace listing content in ${options.language} for platform: ${options.platform}.
            
Analysis: ${JSON.stringify(analysis, null, 2)}

Category: ${options.category}
Additional context: ${options.additionalDescription || 'None provided'}
Tone: ${options.tone || 'Professional'}
Industry: ${options.industry || 'General'}
Currency: ${options.currency}
Price Range: ${options.priceRange ? JSON.stringify(options.priceRange) : 'Not specified'}

IMPORTANT: Make sure to generate complete content with all required fields (title, description, features, specifications, etc.).`
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
      
      // Validate and structure the content
      const validatedContent: MarketplaceContent = {
        title: parsedContent.title,
        description: parsedContent.description,
        features: parsedContent.features,
        specifications: parsedContent.specifications,
        pricing: parsedContent.pricing && {
          regular: parsedContent.pricing.regular,
          sale: parsedContent.pricing.sale,
          msrp: parsedContent.pricing.msrp,
          currency: parsedContent.pricing.currency
        },
        seo: parsedContent.seo && {
          title: parsedContent.seo.title,
          description: parsedContent.seo.description,
          keywords: parsedContent.seo.keywords
        }
      };

      // Add platform-specific content if it exists
      if (parsedContent.platforms?.[options.platform]) {
        validatedContent.platforms = {
          [options.platform]: parsedContent.platforms[options.platform]
        };
      }

      // Add media info if it exists
      if (parsedContent.media) {
        validatedContent.media = parsedContent.media;
      }

      return validatedContent;

    } catch (error) {
      console.error('Error generating marketplace content:', error);
      throw error instanceof Error ? error : new Error('Failed to generate marketplace content');
    }
  }
} 