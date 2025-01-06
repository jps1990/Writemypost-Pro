import { ImageAnalyzer, SocialGenerator, MarketplaceGenerator } from './ai';
import { GeneratedContent, UploadedImage, GenerationOptions } from './types';

export class ContentGenerator {
  private imageAnalyzer = new ImageAnalyzer();
  private socialGenerator = new SocialGenerator();
  private marketplaceGenerator = new MarketplaceGenerator();

  async analyze(
    image: UploadedImage,
    options: GenerationOptions
  ): Promise<GeneratedContent['imageAnalysis']> {
    try {
      return await this.imageAnalyzer.analyze(image, options);
    } catch (error) {
      console.error('Image analysis error:', error);
      throw error;
    }
  }

  async generateContent(
    analysis: GeneratedContent['imageAnalysis'],
    options: GenerationOptions
  ): Promise<GeneratedContent> {
    try {
      console.log('Generating content with options:', options);

      // Générer le contenu selon le mode
      if (options.mode === 'social') {
        const socialContent = await this.socialGenerator.generate(analysis, options);
        console.log('Generated social content:', socialContent);
        return {
          imageAnalysis: analysis,
          social: socialContent
        };
      } else if (options.mode === 'marketplace') {
        const marketplaceContent = await this.marketplaceGenerator.generate(analysis, options);
        console.log('Generated marketplace content:', marketplaceContent);
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