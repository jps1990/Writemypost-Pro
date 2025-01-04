import React from 'react';

export interface GeneratedContent {
  imageAnalysis: {
    categories: string[];
    tags: string[];
    description: string;
    technicalDetails: {
      materials: string[];
      dimensions: string;
      specifications: Record<string, string>;
    };
    marketAnalysis: {
      targetAudience: string[];
      uniqueSellingPoints: string[];
      pricing: {
        suggested: number;
        range: {
          min: number;
          max: number;
        };
        currency: CurrencyCode;
        competitivePricing: {
          low: number;
          average: number;
          premium: number;
        };
      };
    };
  };
  social?: SimpleSocialContent;
  marketplace?: MarketplaceContent;
  marketing?: MarketingAnalysis;
}

export interface UploadedImage {
  file: File;
  preview: string;
  base64: string;
}

export interface FileDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onDrop: (files: File[]) => void;
  value: UploadedImage | null;
  onRemove: () => void;
  disabled?: boolean;
}

export interface ListingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryId: string;
  platform: string;
  onGenerate: () => Promise<void>;
}

export interface ToastOptions {
  duration?: number;
  position?: 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right';
  variant?: 'default' | 'destructive' | 'success' | 'warning';
}

// Principales devises mondiales
export type CurrencyCode = 
  | 'USD' | 'EUR' | 'CAD' | 'GBP' | 'AUD' | 'JPY' | 'CHF' | 'CNY' | 'HKD' | 'NZD'
  | 'SEK' | 'KRW' | 'SGD' | 'NOK' | 'MXN' | 'INR' | 'RUB' | 'ZAR' | 'TRY' | 'BRL'
  | 'TWD' | 'DKK' | 'PLN' | 'THB' | 'IDR';

export interface PriceRange {
  min: number;
  max: number;
  currency: CurrencyCode;
}

export interface GenerationOptions {
  tone?: string;
  language?: string;
  platforms?: string[];
  mode?: 'social' | 'marketplace';
  analysisMode?: 'product' | 'general';
  category?: string;
  platform?: string;
  imageAnalysis?: GeneratedContent['imageAnalysis'];
  userId?: string;
  imageId?: string;
  additionalDescription?: string;
  industry?: string;
  imageFile?: File;
  currency?: CurrencyCode;
  priceRange?: PriceRange;
}

export interface SocialPlatformConfig {
  [key: string]: {
    caption?: { maxLength: number; format: string };
    post?: { maxLength: number; format: string };
    tweet?: { maxLength: number; format: string };
    description?: { maxLength: number; format: string };
    title?: { maxLength: number; format: string };
    subtitle?: { maxLength: number; format: string };
    content?: { minLength: number; format: string };
    tags?: { recommended: number; max: number };
    hashtags: { recommended: number; max: number };
  };
}

export interface UserPreferences {
  language: string;
  currency: CurrencyCode;
  tone?: string;
  defaultPlatforms?: string[];
  industry?: string;
}

export interface MarketAnalysis {
  marketSize: string;
  targetAudience: string[];
  competitors: {
    direct: string[];
    indirect: string[];
  };
  trends: string[];
  opportunities: string[];
  threats: string[];
}

export interface PricingInfo {
  currency: CurrencyCode;
  suggestedRange: {
    min: number;
    max: number;
  };
  competitivePricing: {
    low: number;
    average: number;
    high: number;
  };
  strategies: string[];
}

export interface MarketingContent {
  uniqueSellingPoints: string[];
  benefits: string[];
  features: string[];
  seoKeywords: string[];
  productDescription: {
    short: string;
    long: string;
  };
}

export interface SocialMediaContent {
  instagram?: {
    feed?: {
      caption: string;
      hashtags: string[];
    };
    story?: {
      text: string;
      stickers: string[];
    };
    reels?: {
      caption: string;
      hashtags: string[];
      soundSuggestion: string;
    };
  };
  facebook?: {
    post: string;
    story?: string;
    hashtags: string[];
  };
  twitter?: {
    tweet: string;
    thread?: string[];
    hashtags: string[];
  };
  linkedin?: {
    post: string;
    article?: string;
    hashtags: string[];
  };
  tiktok?: {
    caption: string;
    hashtags: string[];
    soundSuggestion?: string;
    effectSuggestions?: string[];
  };
  pinterest?: {
    title: string;
    description: string;
    boardSuggestions?: string[];
    hashtags: string[];
  };
  youtube?: {
    title: string;
    description: string;
    tags: string[];
    chapters?: {
      title: string;
      timestamp: string;
      description: string;
    }[];
  };
}

export interface SimpleSocialContent {
  sentiment: {
    tone: string;
    emotion: string;
    keywords: string[];
  };
  hashtags: {
    primary: string[];
    secondary: string[];
    niche: string[];
  };
  content: {
    common: {
      title: string;
      description: string;
    };
    instagram?: {
      feed: {
        caption: string;
        hashtags: string[];
      };
      story: {
        text: string;
        stickers: string[];
      };
      reels: {
        caption: string;
        hashtags: string[];
        soundSuggestion: string;
      };
    };
    facebook?: {
      post: string;
      story: string;
      hashtags: string[];
    };
    twitter?: {
      tweet: string;
      thread: string[];
      hashtags: string[];
    };
    linkedin?: {
      post: string;
      article: string;
      hashtags: string[];
    };
    tiktok?: {
      caption: string;
      hashtags: string[];
      soundSuggestion: string;
      effectSuggestions: string[];
    };
    pinterest?: {
      title: string;
      description: string;
      boardSuggestions: string[];
      hashtags: string[];
    };
    youtube?: {
      title: string;
      description: string;
      tags: string[];
      chapters: {
        title: string;
        timestamp: string;
        description: string;
      }[];
    };
    threads?: {
      post: string;
      discussion: string;
      hashtags: string[];
    };
    snapchat?: {
      caption: string;
      filters: string[];
    };
    email?: {
      subject: string;
      long: string;
      medium: string;
      short: string;
    };
  };
}

export interface ExtendedSocialContent extends SimpleSocialContent {
  content: {
    common: {
      title: string;
      description: string;
    };
    instagram?: {
      caption: string;
      hashtags: string[];
      story?: {
        text: string;
        stickers: string[];
      };
      reels?: {
        caption: string;
        hashtags: string[];
        soundSuggestion: string;
      };
    };
    facebook?: {
      post: string;
      hashtags: string[];
      story?: string;
    };
    twitter?: {
      tweet: string;
      hashtags: string[];
      thread?: string[];
    };
    linkedin?: {
      post: string;
      hashtags: string[];
      article?: string;
    };
    tiktok?: {
      caption: string;
      hashtags: string[];
      soundSuggestion?: string;
      effectSuggestions?: string[];
    };
    pinterest?: {
      description: string;
      hashtags: string[];
      boardSuggestions?: string[];
    };
    youtube?: {
      title: string;
      description: string;
      tags: string[];
      chapters?: {
        title: string;
        timestamp: string;
        description: string;
      }[];
    };
  };
}

export type AnalysisMode = 'product' | 'general';

export interface ImageAnalysis {
  categories: string[];
  tags: string[];
  description: string;
  visualImpact: {
    composition: string;
    colors: string[];
    style: string;
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    tone: string;
    emotion: string;
    keywords: string[];
  };
  technicalDetails?: {
    materials: string[];
    specifications: Record<string, string>;
  };
  marketAnalysis: {
    targetAudience: string[];
    pricePoint?: string;
    uniqueSellingPoints: string[];
  };
}

export interface MarketplaceContent {
  title: string;
  description: string;
  features: string[];
  technicalDetails: {
    dimensions: string;
    weight: string;
    materials: string[];
    specifications: Record<string, string>;
  };
  seoKeywords: string[];
  pricing: {
    suggested: number;
    range: {
      min: number;
      max: number;
    };
    currency: CurrencyCode;
    competitivePricing: {
      low: number;
      average: number;
      premium: number;
    };
  };
  marketingPoints: {
    targetAudience: string[];
    uniqueSellingPoints: string[];
    benefits: string[];
  };
  platformSpecific: {
    amazon?: {
      bulletPoints: string[];
      searchTerms: string[];
      aplus: {
        title: string;
        content: string;
      };
    };
    etsy?: {
      tags: string[];
      story: string;
      materials: string[];
    };
    ebay?: {
      itemSpecifics: {
        brand: string;
        model: string;
        condition: string;
      };
    };
    shopify?: {
      metaTitle: string;
      metaDescription: string;
      collections: string[];
    };
  };
  shippingInfo: {
    weight: string;
    dimensions: string;
    restrictions: string[];
  };
  marketingAssets: {
    emailTemplates: {
      welcome: {
        subject: string;
        content: string;
      };
      promotional: {
        subject: string;
        content: string;
      };
      abandoned: {
        subject: string;
        content: string;
      };
      followUp: {
        subject: string;
        content: string;
      };
    };
    nurturingSequence: Array<{
      stage: string;
      subject: string;
      content: string;
    }>;
    socialMedia: {
      instagram?: {
        feed: {
          caption: string;
          hashtags: string[];
        };
        story: {
          text: string;
          stickers: string[];
        };
        reels: {
          caption: string;
          hashtags: string[];
          soundSuggestion: string;
        };
      };
      facebook?: {
        post: string;
        story: string;
        hashtags: string[];
      };
      twitter?: {
        tweet: string;
        thread: string[];
        hashtags: string[];
      };
      tiktok?: {
        caption: string;
        hashtags: string[];
        soundSuggestion: string;
        effectSuggestions: string[];
      };
      linkedin?: {
        post: string;
        article: string;
        hashtags: string[];
      };
      pinterest?: {
        title: string;
        description: string;
        boardSuggestions: string[];
        hashtags: string[];
      };
      youtube?: {
        title: string;
        description: string;
        tags: string[];
        chapters: Array<{
          title: string;
          timestamp: string;
          description: string;
        }>;
      };
      threads?: {
        post: string;
        discussion: string;
        hashtags: string[];
      };
      snapchat?: {
        caption: string;
        filters: string[];
      };
    };
  };
  marketAnalysis: {
    marketSize: string;
    competitors: {
      direct: string[];
      indirect: string[];
    };
    trends: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface EmailMarketing {
  campaigns: {
    welcome: {
      subject: string;
      content: string;
    };
    promotional: {
      subject: string;
      content: string;
    };
    abandoned: {
      subject: string;
      content: string;
    };
  };
  segments: string[];
  nurturingSequence: {
    stage: string;
    subject: string;
    content: string;
  }[];
}

export interface MarketingAnalysis {
  marketAnalysis: {
    marketSize: string;
    targetAudience: string[];
    competitors: {
      direct: string[];
      indirect: string[];
    };
    trends: string[];
    opportunities: string[];
    threats: string[];
  };
  pricing: {
    currency: CurrencyCode;
    suggestedRange: {
      min: number;
      max: number;
    };
    competitivePricing: {
      low: number;
      average: number;
      high: number;
    };
    strategies: string[];
  };
  marketingContent: {
    uniqueSellingPoints: string[];
    benefits: string[];
    features: string[];
    seoKeywords: string[];
    productDescription: {
      short: string;
      long: string;
    };
  };
  social: {
    common: {
      title: string;
      description: string;
    };
    instagram?: {
      caption: string;
      hashtags: string[];
    };
    facebook?: {
      post: string;
      hashtags: string[];
    };
    twitter?: {
      tweet: string;
      hashtags: string[];
    };
    linkedin?: {
      post: string;
      hashtags: string[];
    };
    tiktok?: {
      caption: string;
      hashtags: string[];
    };
    pinterest?: {
      description: string;
      hashtags: string[];
    };
    youtube?: {
      title: string;
      description: string;
      tags: string[];
    };
  };
  emailMarketing: {
    campaigns: {
      welcome: {
        subject: string;
        content: string;
      };
      promotional: {
        subject: string;
        content: string;
      };
      abandoned: {
        subject: string;
        content: string;
      };
    };
    segments: string[];
    nurturingSequence: {
      stage: string;
      subject: string;
      content: string;
    }[];
  };
}