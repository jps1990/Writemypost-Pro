import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Share2, Loader2, Copy, DollarSign, Users, TrendingUp, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MarketingAnalysis, CurrencyCode } from '@/lib/types';

interface MarketingContentGeneratorProps {
  content?: MarketingAnalysis;
  isLoading?: boolean;
}

export function MarketingContentGenerator({ content, isLoading }: MarketingContentGeneratorProps) {
  if (!content && !isLoading) {
    return null;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const formatCurrency = (amount: number, currency: CurrencyCode) => {
    return new Intl.NumberFormat('fr-CA', { 
      style: 'currency', 
      currency 
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-4 w-4" />
          Marketing Analysis
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content ? (
          <div className="space-y-6">
            <Tabs defaultValue="market">
              <TabsList>
                <TabsTrigger value="market">Market Analysis</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="content">Marketing Content</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="email">Email Marketing</TabsTrigger>
              </TabsList>

              <TabsContent value="market" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Market Size</h4>
                    <p className="text-sm text-muted-foreground">{content.marketAnalysis.marketSize}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Target Audience</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.marketAnalysis.targetAudience.map((audience, i) => (
                        <Badge key={i} variant="secondary">
                          <Users className="mr-1 h-3 w-3" />
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Competitors</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h5 className="text-xs font-medium mb-1">Direct</h5>
                        <div className="flex flex-wrap gap-2">
                          {content.marketAnalysis.competitors.direct.map((comp, i) => (
                            <Badge key={i}>{comp}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium mb-1">Indirect</h5>
                        <div className="flex flex-wrap gap-2">
                          {content.marketAnalysis.competitors.indirect.map((comp, i) => (
                            <Badge key={i} variant="outline">{comp}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Trends</h4>
                      <ul className="space-y-1">
                        {content.marketAnalysis.trends.map((trend, i) => (
                          <li key={i} className="text-sm flex items-center">
                            <TrendingUp className="mr-2 h-3 w-3 text-green-500" />
                            {trend}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Opportunities</h4>
                      <ul className="space-y-1">
                        {content.marketAnalysis.opportunities.map((opp, i) => (
                          <li key={i} className="text-sm">{opp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Suggested Price Range</h4>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-lg font-semibold">
                        {formatCurrency(content.pricing.suggestedRange.min, content.pricing.currency)} - {formatCurrency(content.pricing.suggestedRange.max, content.pricing.currency)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Competitive Pricing</h4>
                    <div className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Low End</span>
                        <span className="font-medium">{formatCurrency(content.pricing.competitivePricing.low, content.pricing.currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average</span>
                        <span className="font-medium">{formatCurrency(content.pricing.competitivePricing.average, content.pricing.currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High End</span>
                        <span className="font-medium">{formatCurrency(content.pricing.competitivePricing.high, content.pricing.currency)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Pricing Strategies</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.pricing.strategies.map((strategy, i) => (
                        <Badge key={i} variant="outline">{strategy}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Unique Selling Points</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.marketingContent.uniqueSellingPoints.map((usp, i) => (
                        <Badge key={i} variant="default">{usp}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Benefits</h4>
                    <ul className="space-y-1">
                      {content.marketingContent.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm">{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Features</h4>
                    <ul className="space-y-1">
                      {content.marketingContent.features.map((feature, i) => (
                        <li key={i} className="text-sm">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">SEO Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.marketingContent.seoKeywords.map((keyword, i) => (
                        <Badge key={i} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Short Description</h4>
                      <p className="text-sm text-muted-foreground">{content.marketingContent.productDescription.short}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(content.marketingContent.productDescription.short)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Long Description</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content.marketingContent.productDescription.long}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(content.marketingContent.productDescription.long)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Common Content</h4>
                    <div className="rounded-md border p-4 space-y-2">
                      <p className="text-sm font-medium">{content.social.common.title}</p>
                      <p className="text-sm text-muted-foreground">{content.social.common.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(`${content.social.common.title}\n\n${content.social.common.description}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Platform-Specific Content</h4>
                    <Tabs defaultValue="instagram" className="mt-2">
                      <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                        <TabsTrigger value="instagram">Instagram</TabsTrigger>
                        <TabsTrigger value="facebook">Facebook</TabsTrigger>
                        <TabsTrigger value="twitter">Twitter</TabsTrigger>
                        <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                        <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                        <TabsTrigger value="pinterest">Pinterest</TabsTrigger>
                      </TabsList>

                      {/* Instagram Content */}
                      <TabsContent value="instagram" className="space-y-4">
                        {content.social.instagram && (
                          <div className="space-y-4">
                            {content.social.instagram.feed && (
                              <div>
                                <h5 className="text-sm font-medium mb-2">Feed Post</h5>
                                <div className="rounded-md border p-4">
                                  <p className="text-sm whitespace-pre-wrap">{content.social.instagram.feed.caption}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {content.social.instagram.feed.hashtags.map((tag, i) => (
                                      <Badge key={i} variant="secondary">
                                        {tag.startsWith('#') ? tag : `#${tag}`}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {content.social.instagram.story && (
                              <div>
                                <h5 className="text-sm font-medium mb-2">Story</h5>
                                <div className="rounded-md border p-4">
                                  <p className="text-sm whitespace-pre-wrap">{content.social.instagram.story.text}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {content.social.instagram.story.stickers.map((sticker, i) => (
                                      <Badge key={i} variant="outline">{sticker}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {content.social.instagram.reels && (
                              <div>
                                <h5 className="text-sm font-medium mb-2">Reels</h5>
                                <div className="rounded-md border p-4">
                                  <p className="text-sm whitespace-pre-wrap">{content.social.instagram.reels.caption}</p>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    <span className="font-medium">Sound Suggestion:</span> {content.social.instagram.reels.soundSuggestion}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {content.social.instagram.reels.hashtags.map((tag, i) => (
                                      <Badge key={i} variant="secondary">
                                        {tag.startsWith('#') ? tag : `#${tag}`}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      {/* Autres plateformes... */}
                    </Tabs>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Email Campaigns</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Welcome Email</h5>
                        <div className="rounded-md border p-4">
                          <p className="text-sm font-medium">{content.emailMarketing.campaigns.welcome.subject}</p>
                          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                            {content.emailMarketing.campaigns.welcome.content}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => copyToClipboard(`Subject: ${content.emailMarketing.campaigns.welcome.subject}\n\n${content.emailMarketing.campaigns.welcome.content}`)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-1">Promotional Email</h5>
                        <div className="rounded-md border p-4">
                          <p className="text-sm font-medium">{content.emailMarketing.campaigns.promotional.subject}</p>
                          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                            {content.emailMarketing.campaigns.promotional.content}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => copyToClipboard(`Subject: ${content.emailMarketing.campaigns.promotional.subject}\n\n${content.emailMarketing.campaigns.promotional.content}`)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-1">Abandoned Cart Email</h5>
                        <div className="rounded-md border p-4">
                          <p className="text-sm font-medium">{content.emailMarketing.campaigns.abandoned.subject}</p>
                          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                            {content.emailMarketing.campaigns.abandoned.content}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => copyToClipboard(`Subject: ${content.emailMarketing.campaigns.abandoned.subject}\n\n${content.emailMarketing.campaigns.abandoned.content}`)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Target Segments</h4>
                    <div className="flex flex-wrap gap-2">
                      {content.emailMarketing.segments.map((segment, i) => (
                        <Badge key={i} variant="secondary">
                          <Users className="mr-1 h-3 w-3" />
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Nurturing Sequence</h4>
                    <div className="space-y-4">
                      {content.emailMarketing.nurturingSequence.map((email, i) => (
                        <div key={i} className="rounded-md border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{email.stage}</span>
                            <Badge variant="outline">Stage {i + 1}</Badge>
                          </div>
                          <p className="text-sm font-medium">{email.subject}</p>
                          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">
                            {email.content}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => copyToClipboard(`Stage: ${email.stage}\nSubject: ${email.subject}\n\n${email.content}`)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
} 