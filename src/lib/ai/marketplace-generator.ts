import type { ImageAnalysis, GenerationOptions, MarketplaceContent, CurrencyCode } from '../types';
import { MARKETPLACE_PROMPT, SYSTEM_PROMPT } from '../prompts';
import { BaseGenerator } from './base-generator';

export class MarketplaceGenerator extends BaseGenerator {
  async generate(
    analysis: ImageAnalysis,
    options: GenerationOptions
  ): Promise<MarketplaceContent> {
    try {
      const result = await this.retryWithExponentialBackoff(
        async () => {
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

Mode d'analyse: ${options.analysisMode === 'product' ? 'Product Focus' : 'General Content'}
Type de contenu: ${options.analysisMode === 'product' 
  ? 'Listing de produit - Focus sur les spécifications techniques, prix et caractéristiques' 
  : 'Listing de service/contenu - Focus sur l\'expérience, la valeur et les bénéfices'}

Category: ${options.category}
Additional context: ${options.additionalDescription || 'None provided'}
Tone: ${options.tone || 'Professional'}
Industry: ${options.industry || 'General'}
Currency: ${options.currency}
Price Range: ${options.priceRange ? JSON.stringify(options.priceRange) : 'Not specified'}

IMPORTANT:
- Adapt content to ${options.analysisMode === 'product' ? 'physical product listing' : 'service/content listing'}
- Include all required fields (title, description, features, specifications, etc.)
- Generate complete marketing assets (emails, social media content)
- Focus on ${options.analysisMode === 'product' ? 'product specifications and features' : 'value proposition and benefits'}`
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
        'marketplace-generator'
      );

      // Nettoyer et valider le JSON
      const parsedContent = await this.cleanAndValidateJson(result, 'marketplace-generator');
      
      // Validate required fields
      if (!parsedContent.title || !parsedContent.description) {
        throw new Error('Missing required fields: title and description are mandatory');
      }

      // Validate and structure the content
      const validatedContent: MarketplaceContent = {
        title: parsedContent.title,
        description: parsedContent.description,
        features: parsedContent.features || [],
        technicalDetails: {
          dimensions: parsedContent.technicalDetails?.dimensions || "",
          weight: parsedContent.technicalDetails?.weight || "",
          materials: parsedContent.technicalDetails?.materials || [],
          specifications: parsedContent.technicalDetails?.specifications || {}
        },
        seoKeywords: parsedContent.seoKeywords || [],
        pricing: {
          suggested: Number(parsedContent.pricing?.suggested) || 0,
          range: {
            min: Number(parsedContent.pricing?.range?.min) || 0,
            max: Number(parsedContent.pricing?.range?.max) || 0
          },
          currency: (parsedContent.pricing?.currency as CurrencyCode) || 'USD',
          competitivePricing: {
            low: Number(parsedContent.pricing?.competitivePricing?.low) || 0,
            average: Number(parsedContent.pricing?.competitivePricing?.average) || 0,
            premium: Number(parsedContent.pricing?.competitivePricing?.premium) || 0
          }
        },
        marketingPoints: {
          targetAudience: parsedContent.marketingPoints?.targetAudience || [],
          uniqueSellingPoints: parsedContent.marketingPoints?.uniqueSellingPoints || [],
          benefits: parsedContent.marketingPoints?.benefits || []
        },
        platformSpecific: {
          amazon: parsedContent.platformSpecific?.amazon || undefined,
          etsy: parsedContent.platformSpecific?.etsy || undefined,
          ebay: parsedContent.platformSpecific?.ebay || undefined,
          shopify: parsedContent.platformSpecific?.shopify || undefined
        },
        shippingInfo: {
          weight: parsedContent.shippingInfo?.weight || "",
          dimensions: parsedContent.shippingInfo?.dimensions || "",
          restrictions: parsedContent.shippingInfo?.restrictions || []
        },
        marketingAssets: {
          emailTemplates: parsedContent.marketingAssets?.emailTemplates || {
            welcome: { subject: "", content: "" },
            promotional: { subject: "", content: "" },
            abandoned: { subject: "", content: "" },
            followUp: { subject: "", content: "" }
          },
          nurturingSequence: parsedContent.marketingAssets?.nurturingSequence || [],
          socialMedia: parsedContent.marketingAssets?.socialMedia || {}
        },
        marketAnalysis: {
          marketSize: parsedContent.marketAnalysis?.marketSize || "",
          competitors: parsedContent.marketAnalysis?.competitors || { direct: [], indirect: [] },
          trends: parsedContent.marketAnalysis?.trends || [],
          opportunities: parsedContent.marketAnalysis?.opportunities || [],
          threats: parsedContent.marketAnalysis?.threats || []
        }
      };

      return validatedContent;

    } catch (error) {
      console.error('Error generating marketplace content:', error);
      throw error instanceof Error ? error : new Error('Failed to generate marketplace content');
    }
  }
} 