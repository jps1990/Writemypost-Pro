import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase-client';
import { Lock, X, AlertCircle, Check, AtSign, Ghost, FileText, Youtube, Image, Music, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageAnalyzer } from './ai-features/image-analyzer';
import { SentimentAnalyzer } from './ai-features/sentiment-analyzer';
import { HashtagGenerator } from './ai-features/hashtag-generator';
import { SocialContentGenerator } from './ai-features/social-content-generator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GeneratedContent, UploadedImage, GenerationOptions, ToastOptions } from '@/lib/types';
import { FileDropzone } from '@/components/ui/dropzone';
import { uploadAndAnalyzeImage } from '@/lib/api';
import { toast } from 'sonner';
import { SEO } from '@/components/seo';
import { storage } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

export function ContentCreator() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState<'social' | 'marketplace'>('social');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [customPlatform, setCustomPlatform] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>(() => 
    localStorage.getItem('selectedIndustry') || ''
  );
  const [selectedTone, setSelectedTone] = useState<string>(() => 
    storage.getPreferences().tone || ''
  );
  const [targetLanguage, setTargetLanguage] = useState<string>(() => 
    storage.getPreferences().language || ''
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [focusMode, setFocusMode] = useState<'product' | 'general'>('product');
  const [isLanguageValid, setIsLanguageValid] = useState(false);
  const languageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    // Check for pending image from Image Resizer
    const pendingImage = localStorage.getItem('pendingImage');
    if (pendingImage) {
      try {
        const imageData = JSON.parse(pendingImage);
        setUploadedImage({
          file: new File([imageData.file], imageData.file.name, { type: imageData.file.type }),
          preview: imageData.preview
        });
        localStorage.removeItem('pendingImage');
      } catch (error) {
        console.error('Error loading pending image:', error);
      }
    }
  }, []);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('selectedIndustry', selectedIndustry);
    if (selectedTone) {
      storage.updatePreference('tone', selectedTone);
    }
  }, [selectedIndustry, selectedTone]);

  const sendToImageResizer = useCallback(() => {
    if (!uploadedImage) return;
    
    localStorage.setItem('pendingImage', JSON.stringify(uploadedImage));
    navigate('/tools/image-resizer');
  }, [uploadedImage, navigate]);

  // Update language validation state when language changes
  useEffect(() => {
    setIsLanguageValid(!!targetLanguage.trim());
  }, [targetLanguage]);

  // Save language preference when it changes
  useEffect(() => {
    if (targetLanguage.trim()) {
      storage.updatePreference('language', targetLanguage);
    }
  }, [targetLanguage]);

  const handleImageUpload = useCallback(async (image: UploadedImage) => {
    setUploadedImage(image);
    setIsGenerating(true);
    
    try {
      const content = await uploadAndAnalyzeImage(image, {
        userId: (await supabase.auth.getSession()).data.session?.user.id || ''
      });
      
      setGeneratedContent(content);
      
      // Update tone if suggested by analysis
      if (content.imageAnalysis?.marketAnalysis?.targetAudience) {
        const audience = content.imageAnalysis.marketAnalysis.targetAudience;
        const audienceString = audience.join(' ').toLowerCase();
        
        let suggestedTone = '';
        if (audienceString.includes('luxury') || content.imageAnalysis.marketAnalysis.pricePoint === 'luxury') {
          suggestedTone = 'luxury';
        } else if (audienceString.includes('professional')) {
          suggestedTone = 'professional';
        } else if (audienceString.includes('young') || audienceString.includes('trendy')) {
          suggestedTone = 'casual';
        } else if (audienceString.includes('technical')) {
          suggestedTone = 'technical';
        }

        if (suggestedTone) {
          setSelectedTone(suggestedTone);
          storage.updatePreference('tone', suggestedTone);
          toast.success(`Tone automatically set to: ${suggestedTone}`);
        }
      }
      
      toast.success('Image analyzed successfully');
    } catch (error) {
      console.error('Error analyzing image:', error);
      const message = error instanceof Error ? error.message : 'Failed to analyze image';
      toast.error(message);
      setGeneratedContent(null);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleImageRemove = useCallback(() => {
    setUploadedImage(null);
    setGeneratedContent(null);
  }, []);

  const handleGenerateContent = useCallback(async () => {
    setIsGenerating(true);
    try {
      if (!uploadedImage) {
        throw new Error('Please upload an image first');
      }
      
      if (!selectedPlatforms.length) {
        throw new Error('Please select at least one platform');
      }
      
      if (!selectedTone) {
        throw new Error('Please select a content tone');
      }
      
      const content = await uploadAndAnalyzeImage(uploadedImage, {
        tone: selectedTone,
        language: targetLanguage,
        platforms: selectedPlatforms,
        mode: 'social'
      });
      
      setGeneratedContent(content);
      toast.success('Content generated successfully', {
        duration: 4000,
        position: 'top-center',
        variant: 'success'
      } as ToastOptions);
    } catch (error) {
      console.error('Error generating content:', error);
      const message = error instanceof Error ? error.message : 'Failed to generate content';
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  }, [uploadedImage, selectedPlatforms, selectedTone, targetLanguage]);
  
  const handleGenerateListing = useCallback(async () => {
    setIsGenerating(true);
    try {
      if (!uploadedImage) {
        throw new Error('Please upload an image first');
      }

      if (!selectedCategory) {
        throw new Error('Please select a category');
      }

      if (!selectedPlatform) {
        throw new Error('Please select a platform');
      }

      const content = await uploadAndAnalyzeImage(uploadedImage, {
        tone: selectedTone,
        language: targetLanguage,
        category: selectedCategory,
        platform: selectedPlatform,
        mode: 'marketplace'
      });

      setGeneratedContent(content);
      toast.success('Listing generated successfully', {
        duration: 4000,
        position: 'top-center',
        variant: 'success'
      } as ToastOptions);
    } catch (error) {
      console.error('Error generating listing:', error);
      const message = error instanceof Error ? error.message : 'Failed to generate listing';
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  }, [uploadedImage, selectedCategory, selectedPlatform, selectedTone, targetLanguage]);

  const handlePlatformSelect = useCallback((platform: string) => {
    setSelectedPlatform(platform);
  }, []);

  // Ajout des effets pour pré-remplir les formulaires
  useEffect(() => {
    if (generatedContent?.imageAnalysis) {
      const analysis = generatedContent.imageAnalysis;
      let suggestedTone = '';

      if (analysis.marketAnalysis.pricePoint === 'luxury') {
        suggestedTone = 'luxury';
      } else if (analysis.marketAnalysis.targetAudience.some(a => a.toLowerCase().includes('professional'))) {
        suggestedTone = 'professional';
      } else if (analysis.marketAnalysis.targetAudience.some(a => a.toLowerCase().includes('technical'))) {
        suggestedTone = 'technical';
      }

      if (suggestedTone && !selectedTone) {
        setSelectedTone(suggestedTone);
        storage.updatePreference('tone', suggestedTone);
        toast.success(`Tone automatically set to: ${suggestedTone}`);
      }
    }
  }, [generatedContent?.imageAnalysis, selectedTone]);

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
            Please sign in to access the content creator tool.
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
      <SEO 
        title="Content Creator | AI-Powered Social Media Content Generation"
        description="Create engaging social media content with our AI-powered tools. Generate optimized posts for multiple platforms."
        keywords={['content creation', 'social media', 'AI content', 'content generator']}
      />
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Content Creator</h1>
        <p className="text-muted-foreground">
          Create engaging content for your social media or marketplace listings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Product Image</CardTitle>
          <div className="flex flex-col space-y-4">
            <Alert variant={isLanguageValid ? "success" : "warning"}>
              {isLanguageValid ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {targetLanguage.trim() 
                  ? <span className="text-green-500">Target language set to: <strong>{targetLanguage}</strong></span>
                  : 'Please enter your target language'}
              </AlertDescription>
            </Alert>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-[300px]">
                <Input
                  ref={languageInputRef}
                  className={cn(
                    "pr-20",
                    !isLanguageValid && "border-yellow-500 focus-visible:ring-yellow-500"
                  )}
                  placeholder="Enter target language (e.g. English, Français, Español...)"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && targetLanguage.trim()) {
                      toast.success(`Language set to: ${targetLanguage}`);
                      languageInputRef.current?.blur();
                    }
                  }}
                />
                {isLanguageValid && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "min-w-[100px]",
                  isLanguageValid && "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                )}
                onClick={() => {
                  if (!targetLanguage.trim()) {
                    toast.error('Please enter a target language');
                    languageInputRef.current?.focus();
                    return;
                  }
                  toast.success(`Language set to: ${targetLanguage}`);
                  languageInputRef.current?.blur();
                }}
              >
                {isLanguageValid ? 'Change' : 'Set Language'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full min-h-[400px] mb-6 overflow-hidden rounded-lg">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button
                size="sm"
                variant={focusMode === 'product' ? 'default' : 'outline'}
                onClick={() => setFocusMode('product')}
              >
                Product Focus
              </Button>
              <Button
                size="sm"
                variant={focusMode === 'general' ? 'default' : 'outline'}
                onClick={() => setFocusMode('general')}
              >
                General Content
              </Button>
            </div>
            {uploadedImage ? (
              <div className="relative w-full h-full flex items-center justify-center bg-muted">
                <img
                  src={uploadedImage.preview}
                  alt="Uploaded content"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-background/60" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleImageRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <FileDropzone
                disabled={!targetLanguage.trim()}
                onDrop={(files) => {
                  if (!targetLanguage.trim()) {
                    toast.error('Please set your target language first', {
                      duration: 4000,
                      position: 'top-center',
                      variant: 'destructive'
                    } as ToastOptions);
                    return;
                  }
                  const file = files[0];
                  if (file) {
                    const image = {
                      file,
                      preview: URL.createObjectURL(file)
                    };
                    handleImageUpload(image);
                  }
                }}
                value={uploadedImage}
                onRemove={handleImageRemove}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {uploadedImage && (
        <Alert className="mb-6 border-primary">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            Please verify and complete the industry and platform selections below before generating content
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Image Analysis</h2>
        <ImageAnalyzer 
          imageUrl={uploadedImage?.preview}
          analysis={generatedContent?.imageAnalysis}
          isLoading={isGenerating}
          showEmpty={true}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Content Details</h2>
        <Tabs value={contentType} onValueChange={(value) => setContentType(value as 'social' | 'marketplace')}>
          <TabsList>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'instagram', icon: Instagram, label: 'Instagram' },
                        { id: 'facebook', icon: Facebook, label: 'Facebook' },
                        { id: 'twitter', icon: Twitter, label: 'Twitter' },
                        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                        { id: 'tiktok', icon: Music, label: 'TikTok' },
                        { id: 'pinterest', icon: Image, label: 'Pinterest' },
                        { id: 'youtube', icon: Youtube, label: 'YouTube' },
                        { id: 'threads', icon: AtSign, label: 'Threads' },
                        { id: 'snapchat', icon: Ghost, label: 'Snapchat' },
                        { id: 'medium', icon: FileText, label: 'Medium' }
                      ].map(platform => (
                        <Button
                          key={platform.id}
                          variant={selectedPlatforms.includes(platform.id) ? 'default' : 'outline'}
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => {
                            setSelectedPlatforms(prev => 
                              prev.includes(platform.id)
                                ? prev.filter(p => p !== platform.id)
                                : [...prev, platform.id]
                            );
                          }}
                        >
                          <platform.icon className="h-4 w-4" />
                          {platform.label}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Select multiple platforms to generate content for all at once
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tone</label>
                    <Select
                      value={selectedTone}
                      onValueChange={setSelectedTone}
                      defaultValue={storage.getPreferences().tone}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional & Corporate</SelectItem>
                        <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                        <SelectItem value="casual">Casual & Relaxed</SelectItem>
                        <SelectItem value="luxury">Luxury & Premium</SelectItem>
                        <SelectItem value="technical">Technical & Detailed</SelectItem>
                        <SelectItem value="educational">Educational & Informative</SelectItem>
                        <SelectItem value="persuasive">Persuasive & Sales-Focused</SelectItem>
                        <SelectItem value="humorous">Humorous & Fun</SelectItem>
                        <SelectItem value="inspirational">Inspirational & Motivational</SelectItem>
                        <SelectItem value="storytelling">Storytelling & Narrative</SelectItem>
                        <SelectItem value="minimalist">Minimalist & Clean</SelectItem>
                        <SelectItem value="trendy">Trendy & Modern</SelectItem>
                        <SelectItem value="authentic">Authentic & Personal</SelectItem>
                        <SelectItem value="authoritative">Authoritative & Expert</SelectItem>
                        <SelectItem value="empathetic">Empathetic & Understanding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Description</label>
                    <Textarea 
                      placeholder="Add any additional details or specific requirements for the content..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!uploadedImage || isGenerating || !selectedPlatforms.length}
                    onClick={handleGenerateContent}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Content'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Résultats de la génération sociale */}
            {generatedContent?.social && (
              <div className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <SentimentAnalyzer 
                    sentiment={generatedContent.social.sentiment}
                    isLoading={isGenerating}
                  />
                  <HashtagGenerator 
                    hashtags={generatedContent.social.hashtags}
                    isLoading={isGenerating}
                  />
                </div>
                <SocialContentGenerator 
                  content={generatedContent.social}
                  isLoading={isGenerating}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="marketplace">
            <Card>
              <CardHeader>
                <CardTitle>Marketplace Listing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select onValueChange={(value) => setSelectedCategory(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="sports">Sports & Outdoors</SelectItem>
                        <SelectItem value="toys">Toys & Games</SelectItem>
                        <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="books">Books & Media</SelectItem>
                        <SelectItem value="food">Food & Beverages</SelectItem>
                        <SelectItem value="art">Art & Collectibles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <Input 
                      placeholder="Enter marketplace platform (e.g. Amazon, Etsy, eBay...)"
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Description</label>
                    <Textarea 
                      placeholder="Add any additional details or specific requirements for the listing..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!uploadedImage || isGenerating || !selectedCategory || !selectedPlatform}
                    onClick={handleGenerateListing}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Listing'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Résultats de la génération marketplace */}
            {generatedContent?.marketplace && (
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Listing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{generatedContent.marketplace.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{generatedContent.marketplace.description}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.marketplace.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">{feature}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Technical Details</h4>
                        <div className="grid gap-2">
                          {Object.entries(generatedContent.marketplace.technicalDetails).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="font-medium">{key}:</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Price Point</h4>
                        <Badge variant="outline">{generatedContent.marketplace.pricePoint}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}