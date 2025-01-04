import { OpenAI } from 'openai';
import type { UploadedImage, GenerationOptions, ImageAnalysis } from '../types';
import { IMAGE_ANALYSIS_PROMPT, SYSTEM_PROMPT } from '../prompts';

export class ImageAnalyzer {
  private getClient() {
    return new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  private async convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async analyze(
    image: UploadedImage,
    options: GenerationOptions
  ): Promise<ImageAnalysis> {
    try {
      const base64Image = await this.convertToBase64(image.file);
      const openai = this.getClient();
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n\nRÈGLE IMPORTANTE: Toutes les réponses doivent être en ${options.language || 'English'}.\n\n${IMAGE_ANALYSIS_PROMPT}`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this image in ${options.language || 'English'}. Consider the following aspects:\n- Visual elements and composition\n- Technical details and specifications\n- Market positioning and target audience`
              },
              {
                type: "image_url",
                image_url: {
                  url: base64Image,
                  detail: "high"
                }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const result = response.choices[0]?.message?.content;
      if (!result) {
        throw new Error('No analysis generated');
      }

      return JSON.parse(result) as ImageAnalysis;

    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error instanceof Error ? error : new Error('Failed to analyze image');
    }
  }
} 