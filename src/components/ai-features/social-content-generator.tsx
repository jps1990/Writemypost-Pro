import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Share2, Loader2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SocialContentGeneratorProps {
  content?: {
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
  isLoading?: boolean;
}

export function SocialContentGenerator({ content, isLoading }: SocialContentGeneratorProps) {
  if (!content && !isLoading) {
    return null;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const formatHashtags = (hashtags: string[]) => {
    return hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ');
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
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Common Content</h4>
              <div className="rounded-md border p-4 space-y-2">
                <p className="text-sm font-medium">{content.common.title}</p>
                <p className="text-sm text-muted-foreground">{content.common.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-2"
                  onClick={() => copyToClipboard(`${content.common.title}\n\n${content.common.description}`)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>

            <Tabs defaultValue="instagram">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
                <TabsTrigger value="facebook">Facebook</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                <TabsTrigger value="pinterest">Pinterest</TabsTrigger>
                <TabsTrigger value="youtube">YouTube</TabsTrigger>
                <TabsTrigger value="threads">Threads</TabsTrigger>
                <TabsTrigger value="snapchat">Snapchat</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
              </TabsList>

              <TabsContent value="instagram" className="space-y-4">
                {content.instagram && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.instagram.caption}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.instagram?.caption}\n\n${formatHashtags(content.instagram?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.instagram.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="facebook" className="space-y-4">
                {content.facebook && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.facebook.post}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.facebook?.post}\n\n${formatHashtags(content.facebook?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.facebook.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="twitter" className="space-y-4">
                {content.twitter && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.twitter.tweet}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.twitter?.tweet}\n\n${formatHashtags(content.twitter?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.twitter.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="linkedin" className="space-y-4">
                {content.linkedin && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.linkedin.post}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.linkedin?.post}\n\n${formatHashtags(content.linkedin?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.linkedin.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tiktok" className="space-y-4">
                {content.tiktok && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.tiktok.caption}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.tiktok?.caption}\n\n${formatHashtags(content.tiktok?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.tiktok.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pinterest" className="space-y-4">
                {content.pinterest && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.pinterest.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.pinterest?.description}\n\n${formatHashtags(content.pinterest?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.pinterest.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="youtube" className="space-y-4">
                {content.youtube && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm font-medium">{content.youtube.title}</p>
                      <p className="text-sm whitespace-pre-wrap mt-2">{content.youtube.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.youtube?.title}\n\n${content.youtube?.description}\n\n${formatHashtags(content.youtube?.tags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Tags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.youtube.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="threads" className="space-y-4">
                {content.threads && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.threads.post}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.threads?.post}\n\n${formatHashtags(content.threads?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.threads.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="snapchat" className="space-y-4">
                {content.snapchat && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm whitespace-pre-wrap">{content.snapchat.caption}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.snapchat?.caption}\n\n${formatHashtags(content.snapchat?.hashtags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Hashtags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.snapchat.hashtags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="medium" className="space-y-4">
                {content.medium && (
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <p className="text-sm font-medium">{content.medium.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{content.medium.subtitle}</p>
                      <p className="text-sm whitespace-pre-wrap mt-2">{content.medium.content}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(`${content.medium?.title}\n\n${content.medium?.subtitle}\n\n${content.medium?.content}\n\n${formatHashtags(content.medium?.tags || [])}`)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy with Tags
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.medium.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Generating social media content...' : 'Upload an image to generate social media content'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 