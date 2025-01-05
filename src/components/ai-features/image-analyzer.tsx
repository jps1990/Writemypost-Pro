import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Palette, Box, Target, Upload, Image } from 'lucide-react';
import type { GeneratedContent } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ImageAnalyzerProps {
  imageUrl?: string;
  analysis?: GeneratedContent['imageAnalysis'];
  isLoading?: boolean;
  showEmpty?: boolean;
}

export function ImageAnalyzer({ imageUrl, analysis, isLoading, showEmpty = false }: ImageAnalyzerProps) {
  if (!analysis && !isLoading && !imageUrl && !showEmpty) {
    return null;
  }

  const hasAnalysis = analysis || isLoading;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-4 w-4" />
          Image Analysis
          {isLoading && (
            <div className="ml-2 flex items-center text-muted-foreground text-sm">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "space-y-4 overflow-x-auto",
          !hasAnalysis && "flex items-center justify-center min-h-[200px]"
        )}>
          {analysis ? (
            <>
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Palette className="mr-2 h-4 w-4" />
                  Categories & Tags
                </h4>
                <div className="flex flex-wrap gap-2 min-w-[200px]">
                  {analysis.categories?.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Image className="mr-2 h-4 w-4" />
                  Visual Impact
                </h4>
                <div className="space-y-4 min-w-[200px]">
                  <div>
                    <span className="text-sm font-medium">Composition:</span>
                    <p className="text-sm text-muted-foreground mt-1">{analysis.visualImpact?.composition}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Style:</span>
                    <p className="text-sm text-muted-foreground mt-1">{analysis.visualImpact?.style}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Colors:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {analysis.visualImpact?.colors?.map((color) => (
                        <Badge key={color} variant="outline">{color}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Box className="mr-2 h-4 w-4" />
                  Technical Details
                </h4>
                <div className="space-y-2 min-w-[200px]">
                  {analysis.technicalDetails?.materials?.map((material) => (
                    <p key={material} className="text-sm flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2" />
                      {material}
                    </p>
                  ))}
                  {analysis.technicalDetails?.dimensions && (
                    <p className="text-sm flex items-center break-words">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2" />
                      Dimensions: {analysis.technicalDetails.dimensions}
                    </p>
                  )}
                  {Object.entries(analysis.technicalDetails?.specifications || {}).map(([key, value]) => (
                    <p key={key} className="text-sm flex items-center break-words">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2" />
                      {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Market Analysis
                </h4>
                <div className="space-y-2 min-w-[200px]">
                  <div className="mb-2">
                    <span className="text-sm font-medium">Price Point:</span>
                    <Badge variant="outline" className="ml-2">
                      {analysis.marketAnalysis?.pricePoint}
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium">Target Audience:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {analysis.marketAnalysis?.targetAudience?.map((audience) => (
                        <Badge key={audience} variant="secondary">
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium">Unique Selling Points:</span>
                    <div className="mt-2 space-y-2">
                      {analysis.marketAnalysis?.uniqueSellingPoints?.map((point) => (
                        <p key={point} className="text-sm flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2" />
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {analysis.description && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">{analysis.description}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  'Analyzing image with AI...'
                ) : (
                  <>
                    Upload an image to get AI-powered analysis
                    <br />
                    <span className="text-xs text-muted-foreground/60 mt-1">
                      We'll analyze the content and provide detailed insights
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}