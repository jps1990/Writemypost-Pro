import { supabase } from './supabase-client';
import type { UploadedImage, GeneratedContent, GenerationOptions } from './types';
import { contentGenerator } from './content-generator';
import { toast } from 'sonner';

export async function analyzeImage(
  image: UploadedImage,
  options: GenerationOptions = {}
): Promise<GeneratedContent['imageAnalysis']> {
  try {
    // Validate required options
    if (!options.language?.trim()) {
      toast.error('Please set your target language first');
      throw new Error('Target language must be set before analysis');
    }

    if (!options.analysisMode) {
      toast.error('Please select an analysis mode (Product Focus or General Content)');
      throw new Error('Analysis mode must be selected before analysis');
    }

    // Validate image
    if (!image.file || !(image.file instanceof File)) {
      toast.error('Invalid file format. Please upload a valid image.');
      throw new Error('Invalid file format');
    }

    validateImage(image.file);

    const base64Image = await convertFileToBase64(image.file);
    
    // Analyze image using content generator
    const analysis = await contentGenerator.analyze({
      ...image,
      base64: base64Image
    }, options);

    return analysis;

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to analyze image';
    console.error('Image analysis error:', message, error);
    throw new Error(message);
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
    toast.error('Invalid file type. Please upload an image file (JPG, PNG, etc).');
    throw new Error('Invalid file type');
  }
  
  if (file.size > 20 * 1024 * 1024) { // 20MB limit
    toast.error('Image file is too large. Maximum size is 20MB.');
    throw new Error('File size exceeds limit');
  }
  return true;
}

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}