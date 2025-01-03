import { GeneratedContent, UploadedImage } from './types';
import { SYSTEM_PROMPT, ANALYSIS_PROMPT, MARKET_PROMPT, SOCIAL_PROMPT } from './prompts';

async function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

interface GPT4oResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function analyzeImageWithGPT4o(image: UploadedImage): Promise<GeneratedContent> {
  try {
    const base64Image = await imageToBase64(image.file);
    const targetLanguage = localStorage.getItem('targetLanguage') || 'English';
    const selectedTone = localStorage.getItem('selectedTone') || 'professional';
    const selectedPlatforms = JSON.parse(localStorage.getItem('selectedPlatforms') || '[]');
    
    // Analyse visuelle et technique
    const analysisResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: ANALYSIS_PROMPT },
          { 
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this product image in ${targetLanguage}.`
              },
              {
                type: 'image_url',
                image_url: { url: base64Image, detail: 'high' }
              }
            ]
          }
        ]
      })
    });

    // Analyse du marché
    const marketResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: MARKET_PROMPT },
          { 
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Based on the image, provide market analysis in ${targetLanguage}.`
              },
              {
                type: 'image_url',
                image_url: { url: base64Image, detail: 'high' }
              }
            ]
          }
        ]
      })
    });

    // Génération du contenu social
    const socialResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: SOCIAL_PROMPT },
          { 
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Generate social media content in ${targetLanguage} with a ${selectedTone} tone for: ${selectedPlatforms.join(', ')}`
              },
              {
                type: 'image_url',
                image_url: { url: base64Image, detail: 'high' }
              }
            ]
          }
        ]
      })
    });

    if (!analysisResponse.ok || !marketResponse.ok || !socialResponse.ok) {
      throw new Error('Failed to analyze image with GPT-4o');
    }

    const [analysisData, marketData, socialData] = await Promise.all([
      analysisResponse.json(),
      marketResponse.json(),
      socialResponse.json()
    ]);

    // Clean and parse responses
    const analysis = JSON.parse(analysisData.choices[0].message.content.replace(/```json\n?|```/g, '').trim());
    const market = JSON.parse(marketData.choices[0].message.content.replace(/```json\n?|```/g, '').trim());
    const social = JSON.parse(socialData.choices[0].message.content.replace(/```json\n?|```/g, '').trim());
    
    return {
      imageAnalysis: {
        categories: analysis.categories,
        tags: analysis.tags,
        description: analysis.description,
        technicalDetails: analysis.technicalDetails,
        marketAnalysis: market
      },
      social: {
        common: social.common,
        sentiment: market.sentiment,
        instagram: social.instagram,
        facebook: social.facebook,
        twitter: social.twitter,
        linkedin: social.linkedin,
        tiktok: social.tiktok,
        pinterest: social.pinterest
      }
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image');
  }
}