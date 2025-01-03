import type { GeneratedContent } from '@/lib/types';
import { ImageAnalyzer } from './image-analyzer';
import { SentimentAnalyzer } from './sentiment-analyzer';
import { HashtagGenerator } from './hashtag-generator';
import { SocialContentGenerator } from './social-content-generator';

interface ImageAnalysisSectionProps {
  imageUrl?: string;
  analysis?: GeneratedContent['imageAnalysis'];
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  hashtags?: {
    recommended: string[];
    niche: string[];
    trending: string[];
  };
  socialContent?: GeneratedContent['social'];
  isLoading?: boolean;
}

export function ImageAnalysisSection({
  imageUrl,
  analysis,
  sentiment,
  hashtags,
  socialContent,
  isLoading
}: ImageAnalysisSectionProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ImageAnalyzer 
          imageUrl={imageUrl}
          analysis={analysis}
          isLoading={isLoading}
          showEmpty={true}
        />
        <SentimentAnalyzer 
          sentiment={sentiment}
          isLoading={isLoading}
          showEmpty={true}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <HashtagGenerator 
          hashtags={hashtags}
          isLoading={isLoading}
          showEmpty={true}
        />
        <SocialContentGenerator 
          content={socialContent}
          isLoading={isLoading}
          showEmpty={true}
        />
      </div>
    </div>
  );
} 