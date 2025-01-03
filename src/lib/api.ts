import { supabase } from './supabase-client';
import type { UploadedImage, GeneratedContent } from './types';
import { contentGenerator } from './content-generator';

async function ensureAuthenticated() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    throw new Error('Authentication required');
  }
  return session;
}

export async function uploadAndAnalyzeImage(
  image: UploadedImage,
  options: {
    tone?: string;
    language?: string;
    platforms?: string[];
    mode?: 'social' | 'marketplace';
  }
): Promise<GeneratedContent> {
  try {
    const session = await ensureAuthenticated();
    
    validateImage(image.file);

    // Generate content using the content generator
    const content = await contentGenerator.generate(image, {
      userId: session.user.id,
      ...options
    });

    return content;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in uploadAndAnalyzeImage:', message);
    throw new Error(message);
  }

function validateImage(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Please upload an image.');
  }
  
  if (file.size > 20 * 1024 * 1024) { // 20MB limit
    throw new Error('File size too large. Maximum size is 20MB.');
  }
}
}