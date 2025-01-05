import { supabase } from './supabase-client';
import type { UploadedImage, GeneratedContent, GenerationOptions } from './types';
import { contentGenerator } from './content-generator';

export async function analyzeImage(
  image: UploadedImage,
  options: GenerationOptions = {}
): Promise<GeneratedContent['imageAnalysis']> {
  try {
    // Valider le fichier
    if (!image.file || !(image.file instanceof File)) {
      throw new Error('Invalid file provided');
    }

    validateImage(image.file);

    // Convertir l'image en base64
    const base64Image = await convertFileToBase64(image.file);
    
    // Analyser l'image
    const analysis = await contentGenerator.analyze({
      ...image,
      base64: base64Image
    }, options);

    return analysis;

  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error instanceof Error ? error : new Error('Failed to analyze image');
  }
}

export async function generateContent(
  analysis: GeneratedContent['imageAnalysis'],
  options: GenerationOptions = {}
): Promise<GeneratedContent> {
  try {
    return await contentGenerator.generateContent(analysis, options);
  } catch (error) {
    console.error('Error generating content:', error);
    throw error instanceof Error ? error : new Error('Failed to generate content');
  }
}

function validateImage(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Please upload an image.');
  }
  
  if (file.size > 20 * 1024 * 1024) { // 20MB limit
    throw new Error('File size too large. Maximum size is 20MB.');
  }
}

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
