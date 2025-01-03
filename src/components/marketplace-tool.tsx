import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase-client';
import { Lock, History, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function History() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [generations, setGenerations] = useState<any[]>([]);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);

      if (session) {
        loadGenerations();
      }
    }
    checkAuth();
  }, []);

  async function loadGenerations() {
    const { data, error } = await supabase
      .from('content_generations')
      .select(`
        *,
        images (
          file_path
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading generations:', error);
      return;
    }

    setGenerations(data || []);
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[200px]">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-center">Authentication Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Please sign in to view your content generation history.
          </p>
          <Button className="w-full" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Content Generation History</h1>
        <p className="text-muted-foreground max-w-2xl">
          View and manage your generated content across different platforms.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <ScrollArea className="h-[600px]">
            {generations.map((generation) => (
              <Card key={generation.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {generation.images?.file_path && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={`${supabase.storage.from('images').getPublicUrl(generation.images.file_path).data.publicUrl}`}
                          alt="Generated content"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant={generation.content_type === 'social' ? 'default' : 'secondary'}>
                          {generation.content_type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(generation.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">
                        {generation.generated_content?.social?.content || 
                         generation.generated_content?.marketplace?.description ||
                         'No content preview available'}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Share</Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <History className="w-4 h-4 mr-2" />
                          View History
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <ScrollArea className="h-[600px]">
            {generations
              .filter(g => g.content_type === 'social')
              .map((generation) => (
                <Card key={generation.id} className="mb-4">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {generation.images?.file_path && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={`${supabase.storage.from('images').getPublicUrl(generation.images.file_path).data.publicUrl}`}
                            alt="Generated content"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="default">
                            {generation.content_type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(generation.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">
                          {generation.generated_content?.social?.content ||
                           'No content preview available'}
                        </p>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Share</Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <History className="w-4 h-4 mr-2" />
                            View History
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <ScrollArea className="h-[600px]">
            {generations
              .filter(g => g.content_type === 'marketplace')
              .map((generation) => (
                <Card key={generation.id} className="mb-4">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {generation.images?.file_path && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={`${supabase.storage.from('images').getPublicUrl(generation.images.file_path).data.publicUrl}`}
                            alt="Generated content"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">
                            {generation.content_type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(generation.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">
                          {generation.generated_content?.marketplace?.description ||
                           'No content preview available'}
                        </p>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Share</Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <History className="w-4 h-4 mr-2" />
                            View History
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}