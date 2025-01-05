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

              {/* Pricing */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Pricing
                </h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Suggested:</span> {content.pricing.currency} {content.pricing.suggested}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Range:</span> {content.pricing.currency} {content.pricing.range.min} - {content.pricing.range.max}
                  </p>
                  <div>
                    <span className="text-sm font-medium">Competitive Pricing:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline">Low: {content.pricing.currency} {content.pricing.competitivePricing.low}</Badge>
                      <Badge variant="outline">Average: {content.pricing.currency} {content.pricing.competitivePricing.average}</Badge>
                      <Badge variant="outline">Premium: {content.pricing.currency} {content.pricing.competitivePricing.premium}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing Points */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Marketing Points
                </h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium">Target Audience:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {content.marketingPoints.targetAudience.map((audience) => (
                        <Badge key={audience} variant="secondary">{audience}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Unique Selling Points:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {content.marketingPoints.uniqueSellingPoints.map((point) => (
                        <Badge key={point} variant="outline">{point}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Benefits:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {content.marketingPoints.benefits.map((benefit) => (
                        <Badge key={benefit} variant="outline">{benefit}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Specific */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  Platform Specific
                </h4>
                <div className="space-y-4">
                  {/* Amazon */}
                  {content.platformSpecific.amazon && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Amazon</h5>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Bullet Points:</span>
                          <ul className="list-disc list-inside mt-1">
                            {content.platformSpecific.amazon.bulletPoints.map((point, i) => (
                              <li key={i} className="text-sm text-muted-foreground">{point}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Search Terms:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {content.platformSpecific.amazon.searchTerms.map((term) => (
                              <Badge key={term} variant="outline">{term}</Badge>
                            ))}
                          </div>
                        </div>
                        {content.platformSpecific.amazon.aplus && (
                          <div>
                            <span className="text-sm font-medium">A+ Content:</span>
                            <p className="text-sm font-medium mt-1">{content.platformSpecific.amazon.aplus.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{content.platformSpecific.amazon.aplus.content}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Etsy */}
                  {content.platformSpecific.etsy && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Etsy</h5>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Tags:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {content.platformSpecific.etsy.tags.map((tag) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Story:</span>
                          <p className="text-sm text-muted-foreground mt-1">{content.platformSpecific.etsy.story}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Materials:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {content.platformSpecific.etsy.materials.map((material) => (
                              <Badge key={material} variant="outline">{material}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* eBay */}
                  {content.platformSpecific.ebay && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">eBay</h5>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Brand:</span> {content.platformSpecific.ebay.itemSpecifics.brand}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Model:</span> {content.platformSpecific.ebay.itemSpecifics.model}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Condition:</span> {content.platformSpecific.ebay.itemSpecifics.condition}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Shopify */}
                  {content.platformSpecific.shopify && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Shopify</h5>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Meta Title:</span> {content.platformSpecific.shopify.metaTitle}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Meta Description:</span> {content.platformSpecific.shopify.metaDescription}
                        </p>
                        <div>
                          <span className="text-sm font-medium">Collections:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {content.platformSpecific.shopify.collections.map((collection) => (
                              <Badge key={collection} variant="outline">{collection}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Marketing Assets */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Marketing Assets
                </h4>
                <div className="space-y-4">
                  {/* Email Templates */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Email Templates</h5>
                    <div className="space-y-4">
                      {Object.entries(content.marketingAssets.emailTemplates).map(([type, template]) => (
                        <div key={type} className="space-y-2">
                          <h6 className="text-sm font-medium capitalize">{type}</h6>
                          <p className="text-sm">
                            <span className="font-medium">Subject:</span> {template.subject}
                          </p>
                          <p className="text-sm text-muted-foreground">{template.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nurturing Sequence */}
                  {content.marketingAssets.nurturingSequence.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Nurturing Sequence</h5>
                      <div className="space-y-4">
                        {content.marketingAssets.nurturingSequence.map((sequence, i) => (
                          <div key={i} className="space-y-2">
                            <h6 className="text-sm font-medium">{sequence.stage}</h6>
                            <p className="text-sm">
                              <span className="font-medium">Subject:</span> {sequence.subject}
                            </p>
                            <p className="text-sm text-muted-foreground">{sequence.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Media */}
                  {Object.keys(content.marketingAssets.socialMedia || {}).length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Social Media</h5>
                      <div className="space-y-4">
                        {/* Instagram */}
                        {content.marketingAssets.socialMedia.instagram && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">Instagram</h6>
                            <div className="space-y-2">
                              {content.marketingAssets.socialMedia.instagram.feed && (
                                <div>
                                  <span className="text-sm font-medium">Feed:</span>
                                  <p className="text-sm text-muted-foreground mt-1">{content.marketingAssets.socialMedia.instagram.feed.caption}</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {content.marketingAssets.socialMedia.instagram.feed.hashtags.map((tag) => (
                                      <Badge key={tag} variant="outline">{tag}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {content.marketingAssets.socialMedia.instagram.story && (
                                <div>
                                  <span className="text-sm font-medium">Story:</span>
                                  <p className="text-sm text-muted-foreground mt-1">{content.marketingAssets.socialMedia.instagram.story.text}</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {content.marketingAssets.socialMedia.instagram.story.stickers.map((sticker) => (
                                      <Badge key={sticker} variant="outline">{sticker}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {content.marketingAssets.socialMedia.instagram.reels && (
                                <div>
                                  <span className="text-sm font-medium">Reels:</span>
                                  <p className="text-sm text-muted-foreground mt-1">{content.marketingAssets.socialMedia.instagram.reels.caption}</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {content.marketingAssets.socialMedia.instagram.reels.hashtags.map((tag) => (
                                      <Badge key={tag} variant="outline">{tag}</Badge>
                                    ))}
                                  </div>
                                  <p className="text-sm mt-1">
                                    <span className="font-medium">Sound:</span> {content.marketingAssets.socialMedia.instagram.reels.soundSuggestion}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Facebook */}
                        {content.marketingAssets.socialMedia.facebook && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">Facebook</h6>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.facebook.post}</p>
                              {content.marketingAssets.socialMedia.facebook.story && (
                                <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.facebook.story}</p>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.facebook.hashtags.map((tag) => (
                                  <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Twitter */}
                        {content.marketingAssets.socialMedia.twitter && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">Twitter</h6>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.twitter.tweet}</p>
                              {content.marketingAssets.socialMedia.twitter.thread && (
                                <div className="space-y-1">
                                  {content.marketingAssets.socialMedia.twitter.thread.map((tweet, i) => (
                                    <p key={i} className="text-sm text-muted-foreground">{tweet}</p>
                                  ))}
                                </div>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.twitter.hashtags.map((tag) => (
                                  <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* LinkedIn */}
                        {content.marketingAssets.socialMedia.linkedin && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">LinkedIn</h6>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.linkedin.post}</p>
                              {content.marketingAssets.socialMedia.linkedin.article && (
                                <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.linkedin.article}</p>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.linkedin.hashtags.map((tag) => (
                                  <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TikTok */}
                        {content.marketingAssets.socialMedia.tiktok && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">TikTok</h6>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.tiktok.caption}</p>
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.tiktok.hashtags.map((tag) => (
                                  <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                              {content.marketingAssets.socialMedia.tiktok.soundSuggestion && (
                                <p className="text-sm">
                                  <span className="font-medium">Sound:</span> {content.marketingAssets.socialMedia.tiktok.soundSuggestion}
                                </p>
                              )}
                              {content.marketingAssets.socialMedia.tiktok.effectSuggestions && (
                                <div>
                                  <span className="text-sm font-medium">Effects:</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {content.marketingAssets.socialMedia.tiktok.effectSuggestions.map((effect) => (
                                      <Badge key={effect} variant="outline">{effect}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Pinterest */}
                        {content.marketingAssets.socialMedia.pinterest && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">Pinterest</h6>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">{content.marketingAssets.socialMedia.pinterest.title}</p>
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.pinterest.description}</p>
                              {content.marketingAssets.socialMedia.pinterest.boardSuggestions && (
                                <div>
                                  <span className="text-sm font-medium">Board Suggestions:</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {content.marketingAssets.socialMedia.pinterest.boardSuggestions.map((board) => (
                                      <Badge key={board} variant="outline">{board}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.pinterest.hashtags.map((tag) => (
                                  <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* YouTube */}
                        {content.marketingAssets.socialMedia.youtube && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">YouTube</h6>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">{content.marketingAssets.socialMedia.youtube.title}</p>
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.youtube.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.youtube.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                              {content.marketingAssets.socialMedia.youtube.chapters && (
                                <div className="space-y-2">
                                  <span className="text-sm font-medium">Chapters:</span>
                                  {content.marketingAssets.socialMedia.youtube.chapters.map((chapter, i) => (
                                    <div key={i} className="space-y-1">
                                      <p className="text-sm font-medium">{chapter.timestamp} - {chapter.title}</p>
                                      <p className="text-sm text-muted-foreground">{chapter.description}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Threads */}
                        {content.marketingAssets.socialMedia.threads && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">Threads</h6>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.threads.post}</p>
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.threads.discussion}</p>
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.threads.hashtags.map((tag) => (
                                  <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Snapchat */}
                        {content.marketingAssets.socialMedia.snapchat && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">Snapchat</h6>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{content.marketingAssets.socialMedia.snapchat.caption}</p>
                              <div className="flex flex-wrap gap-2">
                                {content.marketingAssets.socialMedia.snapchat.filters.map((filter) => (
                                  <Badge key={filter} variant="outline">{filter}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Market Analysis */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Market Analysis
                </h4>
                <div className="space-y-4">
                  <p className="text-sm">
                    <span className="font-medium">Market Size:</span> {content.marketAnalysis.marketSize}
                  </p>
                  <div>
                    <span className="text-sm font-medium">Competitors:</span>
                    <div className="space-y-2 mt-1">
                      <div>
                        <span className="text-sm">Direct:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {content.marketAnalysis.competitors.direct.map((competitor) => (
                            <Badge key={competitor} variant="outline">{competitor}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm">Indirect:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {content.marketAnalysis.competitors.indirect.map((competitor) => (
                            <Badge key={competitor} variant="outline">{competitor}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Trends:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {content.marketAnalysis.trends.map((trend) => (
                        <Badge key={trend} variant="secondary">{trend}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Opportunities:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {content.marketAnalysis.opportunities.map((opportunity) => (
                        <Badge key={opportunity} variant="secondary">{opportunity}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Threats:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {content.marketAnalysis.threats.map((threat) => (
                        <Badge key={threat} variant="secondary">{threat}</Badge>
                      ))}
                    </div>
                  </div>
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