import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hash, Loader2 } from 'lucide-react';

interface HashtagGeneratorProps {
  hashtags?: {
    recommended: string[];
    niche: string[];
    trending: string[];
    youth: string[];
  };
  isLoading?: boolean;
  showEmpty?: boolean;
}

export function HashtagGenerator({ hashtags, isLoading, showEmpty = false }: HashtagGeneratorProps) {
  if (!hashtags && !isLoading && !showEmpty) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Hash className="mr-2 h-4 w-4" />
          Suggested Hashtags
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hashtags ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recommended</h4>
              <div className="flex flex-wrap gap-2">
                {hashtags.recommended.map((hashtag) => (
                  <Badge 
                    key={hashtag} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Niche</h4>
              <div className="flex flex-wrap gap-2">
                {hashtags.niche.map((hashtag) => (
                  <Badge 
                    key={hashtag} 
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Youth & Viral</h4>
              <div className="flex flex-wrap gap-2">
                {hashtags.youth?.map((hashtag, index) => (
                  <Badge 
                    key={`${hashtag}-${index}`}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
                  >
                    {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Trending</h4>
              <div className="flex flex-wrap gap-2">
                {hashtags.trending.map((hashtag) => (
                  <Badge 
                    key={hashtag} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  >
                    {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Generating hashtags...' : 'Analyzing image for hashtag suggestions...'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}