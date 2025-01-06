import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Share2, Loader2, Copy, Instagram, Facebook, Twitter, Linkedin, Music, Image, Youtube, Mail, FileText, AtSign, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SimpleSocialContent } from '@/lib/types';

interface SocialContentGeneratorProps {
  content?: SimpleSocialContent['content'];
  isLoading?: boolean;
}

export function SocialContentGenerator({ content, isLoading }: SocialContentGeneratorProps) {
  if (!content && !isLoading) {
    return null;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Content copied to clipboard!', {
      description: 'Ready to paste in your favorite social media platform'
    });
  };

  const formatHashtags = (hashtags: string[] = []) => {
    return hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ');
  };

  const formatContent = (content: any, type: string) => {
    switch(type) {
      case 'email':
        return content ? `Subject: ${content.subject || ''}\n\n${content.content || ''}` : '';
      case 'social':
        return content ? `${content.caption || content.post || ''}\n\n${formatHashtags(content.hashtags || [])}` : '';
      default:
        return content;
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Share2 className="mr-2 h-4 w-4" />
          Social Media Content
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content ? (
          <div className="space-y-6">
            {/* Common Content Section */}
            {content.common && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Common Content</h4>
                <div className="rounded-md border p-4 space-y-2">
                  <p className="text-sm font-medium">{content.common.title}</p>
                  <p className="text-sm text-muted-foreground">{content.common.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-2"
                    onClick={() => content.common && copyToClipboard(
                      `${content.common.title}\n\n${content.common.description}`
                    )}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>
            )}

            {/* Instagram Section */}
            {content.instagram && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  {/* Feed */}
                  {content.instagram?.feed && (
                    <div>
                      <p className="text-sm font-medium mb-1">Feed Caption</p>
                      <p className="text-sm whitespace-pre-wrap">{content.instagram.feed.caption}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Feed Hashtags</p>
                        <div className="flex flex-wrap gap-2">
                          {content.instagram.feed.hashtags?.map(tag => (
                            <Badge key={tag} variant="secondary">
                              {tag.startsWith('#') ? tag : `#${tag}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => content.instagram?.feed && copyToClipboard(
                          `${content.instagram.feed.caption}\n\n${formatHashtags(content.instagram.feed.hashtags || [])}`
                        )}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Feed with Hashtags
                      </Button>
                    </div>
                  )}
                  
                  {/* Story */}
                  {content.instagram?.story && (
                    <div>
                      <p className="text-sm font-medium mb-1">Story Text</p>
                      <p className="text-sm whitespace-pre-wrap">{content.instagram.story.text}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Story Stickers</p>
                        <div className="flex flex-wrap gap-2">
                          {content.instagram.story.stickers?.map(sticker => (
                            <Badge key={sticker} variant="secondary">{sticker}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => content.instagram?.story && copyToClipboard(
                          `${content.instagram.story.text}\n\nStickers: ${content.instagram.story.stickers.join(', ')}`
                        )}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Story with Stickers
                      </Button>
                    </div>
                  )}

                  {/* Reels */}
                  {content.instagram?.reels && (
                    <div>
                      <p className="text-sm font-medium mb-1">Reels Caption</p>
                      <p className="text-sm whitespace-pre-wrap">{content.instagram.reels.caption}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Reels Hashtags</p>
                        <div className="flex flex-wrap gap-2">
                          {content.instagram.reels.hashtags?.map(tag => (
                            <Badge key={tag} variant="secondary">
                              {tag.startsWith('#') ? tag : `#${tag}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-2">Sound Suggestion</p>
                      <p className="text-sm">{content.instagram.reels.soundSuggestion}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => content.instagram?.reels && copyToClipboard(
                          `${content.instagram.reels.caption}\n\n${formatHashtags(content.instagram.reels.hashtags || [])}\n\nSound: ${content.instagram.reels.soundSuggestion}`
                        )}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Reels with Hashtags
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Facebook */}
            {content.facebook && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Post</p>
                    <p className="text-sm whitespace-pre-wrap">{content.facebook.post}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.facebook.hashtags?.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(`${content.facebook?.post}\n\n${formatHashtags(content.facebook?.hashtags || [])}`)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Hashtags
                  </Button>
                </div>
              </div>
            )}

            {/* Twitter */}
            {content.twitter && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Tweet</p>
                    <p className="text-sm whitespace-pre-wrap">{content.twitter.tweet}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.twitter.hashtags?.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(`${content.twitter?.tweet}\n\n${formatHashtags(content.twitter?.hashtags || [])}`)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Hashtags
                  </Button>
                </div>
              </div>
            )}

            {/* LinkedIn */}
            {content.linkedin && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Post</p>
                    <p className="text-sm whitespace-pre-wrap">{content.linkedin.post}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.linkedin.hashtags?.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(`${content.linkedin?.post}\n\n${formatHashtags(content.linkedin?.hashtags || [])}`)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Hashtags
                  </Button>
                </div>
              </div>
            )}

            {/* TikTok */}
            {content.tiktok && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  TikTok
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Caption</p>
                    <p className="text-sm whitespace-pre-wrap">{content.tiktok.caption}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.tiktok.hashtags?.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(`${content.tiktok?.caption}\n\n${formatHashtags(content.tiktok?.hashtags || [])}`)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Hashtags
                  </Button>
                </div>
              </div>
            )}

            {/* Pinterest */}
            {content.pinterest && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Pinterest
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Description</p>
                    <p className="text-sm whitespace-pre-wrap">{content.pinterest.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.pinterest.hashtags?.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(`${content.pinterest?.description}\n\n${formatHashtags(content.pinterest?.hashtags || [])}`)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Hashtags
                  </Button>
                </div>
              </div>
            )}

            {/* YouTube */}
            {content.youtube && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Title</p>
                    <p className="text-sm whitespace-pre-wrap">{content.youtube.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Description</p>
                    <p className="text-sm whitespace-pre-wrap">{content.youtube.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.youtube.tags?.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(`${content.youtube?.title}\n\n${content.youtube?.description}\n\n${formatHashtags(content.youtube?.tags || [])}`)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Tags
                  </Button>
                </div>
              </div>
            )}

            {/* Email Marketing */}
            {content.email && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Marketing
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Subject</p>
                    <p className="text-sm font-medium text-primary">{content.email.subject}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Version longue</p>
                    <div className="rounded-md bg-muted p-4 mt-2">
                      <p className="text-sm whitespace-pre-wrap">{content.email.long}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2"
                      onClick={() => copyToClipboard(formatContent({
                        subject: content.email.subject,
                        content: content.email.long
                      }, 'email'))}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Email (Long Version)
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Version moyenne</p>
                    <p className="text-sm whitespace-pre-wrap">{content.email.medium}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2"
                      onClick={() => copyToClipboard(content.email?.medium || '')}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Email (Medium Version)
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Version courte</p>
                    <p className="text-sm whitespace-pre-wrap">{content.email.short}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2"
                      onClick={() => copyToClipboard(content.email?.short || '')}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Email (Short Version)
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Medium */}
            {content.medium && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Medium
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Title</p>
                    <p className="text-sm">{content.medium.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Subtitle</p>
                    <p className="text-sm">{content.medium.subtitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Content</p>
                    <p className="text-sm whitespace-pre-wrap">{content.medium.content}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.medium.tags?.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(
                      `${content.medium?.title}\n\n${content.medium?.subtitle}\n\n${content.medium?.content}\n\nTags: ${content.medium?.tags?.join(', ')}`
                    )}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Article
                  </Button>
                </div>
              </div>
            )}

            {/* Threads */}
            {content.threads && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <AtSign className="h-4 w-4" />
                  Threads
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Post</p>
                    <p className="text-sm whitespace-pre-wrap">{content.threads.post}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Discussion</p>
                    <p className="text-sm whitespace-pre-wrap">{content.threads.discussion}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {content.threads.hashtags?.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(
                      `${content.threads?.post}\n\n${content.threads?.discussion}\n\n${formatHashtags(content.threads?.hashtags || [])}`
                    )}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Hashtags
                  </Button>
                </div>
              </div>
            )}

            {/* Snapchat */}
            {content.snapchat && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Ghost className="h-4 w-4" />
                  Snapchat
                </h4>
                <div className="rounded-md border p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Caption</p>
                    <p className="text-sm whitespace-pre-wrap">{content.snapchat.caption}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Filters</p>
                    <div className="flex flex-wrap gap-2">
                      {content.snapchat.filters?.map(filter => (
                        <Badge key={filter} variant="secondary">{filter}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(
                      `${content.snapchat?.caption}\n\nFilters: ${content.snapchat?.filters?.join(', ')}`
                    )}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy with Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Generating content...' : 'Upload an image and generate content to see results'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 