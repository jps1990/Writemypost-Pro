import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Box, Target, Tag, Mail, Share2 } from 'lucide-react';
import type { MarketplaceContent } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MarketplaceContentProps {
  content?: MarketplaceContent;
  isLoading?: boolean;
}

export function MarketplaceContent({ content, isLoading }: MarketplaceContentProps) {
  if (!content && !isLoading) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Tag className="mr-2 h-4 w-4" />
          Marketplace Content
          {isLoading && (
            <div className="ml-2 flex items-center text-muted-foreground text-sm">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "space-y-4 overflow-x-auto",
          !content && "flex items-center justify-center min-h-[200px]"
        )}>
          {content ? (
            <>
              {/* Basic Info */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Box className="mr-2 h-4 w-4" />
                  Basic Information
                </h4>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{content.title}</p>
                  <p className="text-sm text-muted-foreground">{content.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.features?.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Box className="mr-2 h-4 w-4" />
                  Technical Details
                </h4>
                <div className="space-y-2">
                  {content.technicalDetails?.dimensions && (
                    <p className="text-sm">
                      <span className="font-medium">Dimensions:</span> {content.technicalDetails.dimensions}
                    </p>
                  )}
                  {content.technicalDetails?.weight && (
                    <p className="text-sm">
                      <span className="font-medium">Weight:</span> {content.technicalDetails.weight}
                    </p>
                  )}
                  {content.technicalDetails?.materials?.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Materials:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {content.technicalDetails.materials.map((material) => (
                          <Badge key={material} variant="outline">{material}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {Object.entries(content.technicalDetails?.specifications || {}).map(([key, value]) => (
                    <p key={key} className="text-sm">
                      <span className="font-medium">{key}:</span> {typeof value === 'object' ? JSON.stringify(value) : value}
                    </p>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Box className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
              <p className="text-sm text-muted-foreground">
                {isLoading ? (
                  'Generating marketplace content...'
                ) : (
                  'No marketplace content generated yet'
                )}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
                           <div key={key} className="flex justify-between text-sm">
                             <span className="font-medium">{key}:</span>
                            <span>
                              {typeof value === 'object' 
                                ? JSON.stringify(value, null, 2)
                                : String(value)
                              }
                            </span>
                           </div>
                         ))}
                       </div>