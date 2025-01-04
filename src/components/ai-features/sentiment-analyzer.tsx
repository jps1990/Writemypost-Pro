import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SmilePlus, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SentimentAnalyzerProps {
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
    tone?: string;
    emotion?: string;
    keywords?: string[];
  };
  isLoading?: boolean;
  showEmpty?: boolean;
}

export function SentimentAnalyzer({ sentiment, isLoading, showEmpty = false }: SentimentAnalyzerProps) {
  if (!sentiment && !isLoading && !showEmpty) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <SmilePlus className="mr-2 h-4 w-4" />
          Sentiment Analysis
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sentiment ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Positive</span>
                <span>{sentiment.positive}%</span>
              </div>
              <Progress value={sentiment.positive} className="bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Neutral</span>
                <span>{sentiment.neutral}%</span>
              </div>
              <Progress value={sentiment.neutral} className="bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Negative</span>
                <span>{sentiment.negative}%</span>
              </div>
              <Progress value={sentiment.negative} className="bg-muted" />
            </div>

            {/* Afficher le ton et l'émotion */}
            {(sentiment.tone || sentiment.emotion) && (
              <div className="pt-2 space-y-2">
                {sentiment.tone && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Ton:</span>
                    <Badge variant="secondary">{sentiment.tone}</Badge>
                  </div>
                )}
                {sentiment.emotion && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Émotion:</span>
                    <Badge variant="secondary">{sentiment.emotion}</Badge>
                  </div>
                )}
              </div>
            )}

            {/* Afficher les mots-clés */}
            {sentiment.keywords && sentiment.keywords.length > 0 && (
              <div className="pt-2">
                <span className="text-sm font-medium">Mots-clés:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sentiment.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline">{keyword}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Analyzing sentiment...' : 'Upload an image to analyze sentiment'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}