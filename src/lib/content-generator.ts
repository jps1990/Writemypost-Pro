import { ImageAnalyzer, SocialGenerator, MarketplaceGenerator } from './ai';
import { GeneratedContent, UploadedImage, GenerationOptions } from './types';

export class ContentGenerator {
  private imageAnalyzer = new ImageAnalyzer();
  private socialGenerator = new SocialGenerator();
  private marketplaceGenerator = new MarketplaceGenerator();

  async generate(
    image: UploadedImage,
    options: GenerationOptions
  ): Promise<GeneratedContent> {
    try {
      // 1. Analyse initiale de l'image
      const analysis = await this.imageAnalyzer.analyze(image, options);

      // 2. Générer le contenu selon le mode
      if (options.mode === 'social') {
        const socialContent = await this.socialGenerator.generate(analysis, options);
        return {
          imageAnalysis: analysis,
          social: socialContent
        };
      } else if (options.mode === 'marketplace') {
        const marketplaceContent = await this.marketplaceGenerator.generate(analysis, options);
        return {
          imageAnalysis: analysis,
          marketplace: marketplaceContent
        };
      }

      return { imageAnalysis: analysis };

    } catch (error) {
      console.error('Content generation error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const contentGenerator = new ContentGenerator();