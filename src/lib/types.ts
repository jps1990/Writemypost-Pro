import React from 'react';

export interface GeneratedContent {
  social?: {
    sentiment: {
      positive: number;
      neutral: number;
      negative: number;
    };
    hashtags: {
      recommended: string[];
      niche: string[];
      trending: string[];
    };
    content: {
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
      threads?: {
        post: string;
        hashtags: string[];
      };
      snapchat?: {
        caption: string;
        hashtags: string[];
      };
      medium?: {
        title: string;
        subtitle: string;
        content: string;
        tags: string[];
      };
    };
  };
  imageAnalysis?: {
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
      pricePoint: string;
      uniqueSellingPoints: string[];
    };
  };
  marketplace?: {
    title: string;
    description: string;
    features: string[];
    technicalDetails: {
      Matériau: string;
      Dimensions: string;
      Poids: string;
      Couleur: string;
      État: string;
      Marque: string;
      Modèle: string;
      Garantie: string;
      [key: string]: string;
    };
    pricePoint: string;
    seoKeywords: string[];
    shippingInfo: {
      weight: string;
      dimensions: string;
      restrictions: string[];
    };
    customFields: Record<string, string>;
    emailMarketing: {
      subject: string;
      preheader: string;
      versions: {
        long: {
          title: string;
          content: string;
          callToAction: string;
        };
        medium: {
          title: string;
          content: string;
          callToAction: string;
        };
        short: {
          title: string;
          content: string;
          callToAction: string;
        };
      };
    };
    advertising: {
      versions: {
        long: {
          title: string;
          description: string;
          callToAction: string;
          targetAudience: string[];
          keywords: string[];
        };
        medium: {
          title: string;
          description: string;
          callToAction: string;
          targetAudience: string[];
          keywords: string[];
        };
        short: {
          title: string;
          description: string;
          callToAction: string;
          targetAudience: string[];
          keywords: string[];
        };
      };
      displayAds: {
        headlines: string[];
        descriptions: string[];
        callToActions: string[];
        keywords: string[];
      };
    };
    promotions: {
      discounts?: {
        type: string;
        value: string;
        conditions: string[];
      };
      bundles?: {
        title: string;
        description: string;
        items: string[];
        savings: string;
      };
      seasonal?: {
        event: string;
        startDate: string;
        endDate: string;
        offer: string;
      };
    };
  };
}

export interface UploadedImage {
  file: File;
  preview: string;
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

export interface GenerationOptions {
  tone?: string;
  language?: string;
  platforms?: string[];
  mode?: 'social' | 'marketplace';
  category?: string;
  platform?: string;
  imageAnalysis?: GeneratedContent['imageAnalysis'];
  userId?: string;
  additionalDescription?: string;
}