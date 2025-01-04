import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { FileDropzone } from '@/components/ui/dropzone';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Image as ImageIcon, Crop, Layout, Palette, Move, Maximize2, GradientIcon, X } from 'lucide-react';
import type { UploadedImage } from '@/lib/types';
import { gradientPresets } from '@/lib/gradient-presets';
import { SEO } from '@/components/seo';

const ASPECT_RATIOS = {
  'instagram-square': { width: 1080, height: 1080, label: 'Instagram Square (1:1)' },
  'instagram-portrait': { width: 1080, height: 1350, label: 'Instagram Portrait (4:5)' },
  'instagram-landscape': { width: 1080, height: 608, label: 'Instagram Landscape (1.91:1)' },
  'instagram-story': { width: 1080, height: 1920, label: 'Instagram Story (9:16)' },
  'facebook-landscape': { width: 1200, height: 630, label: 'Facebook Landscape (1.91:1)' },
  'facebook-square': { width: 1200, height: 1200, label: 'Facebook Square (1:1)' },
  'twitter-landscape': { width: 1600, height: 900, label: 'Twitter Landscape (16:9)' },
  'twitter-square': { width: 1200, height: 1200, label: 'Twitter Square (1:1)' },
  'linkedin-landscape': { width: 1200, height: 627, label: 'LinkedIn Landscape (1.91:1)' },
  'linkedin-square': { width: 1200, height: 1200, label: 'LinkedIn Square (1:1)' },
  'pinterest-pin': { width: 1000, height: 1500, label: 'Pinterest Pin (2:3)' },
  'youtube-thumbnail': { width: 1280, height: 720, label: 'YouTube Thumbnail (16:9)' },
  'tiktok-video': { width: 1080, height: 1920, label: 'TikTok Video (9:16)' }
};

type ResizeMode = 'crop' | 'contain' | 'blur-bg';

interface ResizeOptions {
  mode: ResizeMode;
  aspectRatio: keyof typeof ASPECT_RATIOS;
  background: {
    type: 'color' | 'gradient';
    colors: string[];
    direction?: string;
  };
  blurAmount: number;
  quality: number;
  position: {
    x: number;
    y: number;
    scale: number;
  };
}

export function ImageResizer() {
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    // Check for pending image from Content Creator
    const pendingImage = localStorage.getItem('pendingImage');
    if (pendingImage) {
      try {
        const imageData = JSON.parse(pendingImage);
        
        // Convertir le base64 en blob puis en File
        fetch(imageData.preview)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], imageData.file.name, {
              type: imageData.file.type,
              lastModified: imageData.file.lastModified
            });
            
            setImage({
              file,
              preview: imageData.preview
            });
            
            // Générer le preview initial
            generatePreview({
              file,
              preview: imageData.preview
            }, defaultOptions);
          });
          
        localStorage.removeItem('pendingImage');
      } catch (error) {
        console.error('Error loading pending image:', error);
        toast.error('Failed to load image from Content Creator');
      }
    }
  }, []);

  const defaultOptions: ResizeOptions = {
    mode: 'crop',
    aspectRatio: 'instagram-square',
    background: {
      type: 'color',
      colors: ['#ffffff'],
      direction: '45deg'
    },
    blurAmount: 10,
    quality: 90,
    position: {
      x: 50,
      y: 50,
      scale: 100
    }
  };

  const [options, setOptions] = useState<ResizeOptions>(defaultOptions);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = useCallback((uploadedImage: UploadedImage) => {
    setImage(uploadedImage);
    generatePreview(uploadedImage, options);
  }, [options]);

  const generatePreview = async (img: UploadedImage, opts: ResizeOptions) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const originalImage = new Image();
    originalImage.src = img.preview;

    await new Promise(resolve => {
      originalImage.onload = resolve;
    });

    const targetRatio = ASPECT_RATIOS[opts.aspectRatio];
    canvas.width = targetRatio.width;
    canvas.height = targetRatio.height;

    if (opts.mode === 'crop') {
      // Calculate scale based on user input
      const scale = Math.max(
        targetRatio.width / originalImage.width,
        targetRatio.height / originalImage.height
      ) * (opts.position.scale / 100);

      const scaledWidth = originalImage.width * scale;
      const scaledHeight = originalImage.height * scale;
      
      // Calculate position based on user input (percentage)
      const x = (targetRatio.width - scaledWidth) * (opts.position.x / 100);
      const y = (targetRatio.height - scaledHeight) * (opts.position.y / 100);

      ctx.drawImage(
        originalImage,
        x, y, scaledWidth, scaledHeight
      );
    } else if (opts.mode === 'contain') {
      // Draw background
      if (opts.background.type === 'gradient') {
        let gradient;
        if (opts.background.direction === 'radial') {
          gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
          );
        } else {
          const angle = parseInt(opts.background.direction || '45');
          const rad = (angle * Math.PI) / 180;
          const x2 = canvas.width * Math.cos(rad);
          const y2 = canvas.height * Math.sin(rad);
          gradient = ctx.createLinearGradient(0, 0, x2, y2);
        }
        const colors = opts.background.colors;
        colors.forEach((color, index) => {
          gradient.addColorStop(index / (colors.length - 1), color);
        });
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = opts.background.colors[0];
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        targetRatio.width / originalImage.width,
        targetRatio.height / originalImage.height
      ) * (opts.position.scale / 100);
      
      const scaledWidth = originalImage.width * scale;
      const scaledHeight = originalImage.height * scale;
      const x = (targetRatio.width - scaledWidth) * (opts.position.x / 100);
      const y = (targetRatio.height - scaledHeight) * (opts.position.y / 100);

      ctx.drawImage(
        originalImage,
        x, y, scaledWidth, scaledHeight
      );
    } else if (opts.mode === 'blur-bg') {
      // Blurred background
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Draw and blur background
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const scale = Math.max(
        targetRatio.width / originalImage.width,
        targetRatio.height / originalImage.height
      );
      const scaledWidth = originalImage.width * scale;
      const scaledHeight = originalImage.height * scale;
      const x = (targetRatio.width - scaledWidth) / 2;
      const y = (targetRatio.height - scaledHeight) / 2;

      tempCtx.filter = `blur(${opts.blurAmount}px)`;
      tempCtx.drawImage(
        originalImage,
        x, y, scaledWidth, scaledHeight
      );

      // Draw main image contained
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.filter = 'none';

      const containScale = Math.min(
        targetRatio.width / originalImage.width,
        targetRatio.height / originalImage.height
      );
      const containWidth = originalImage.width * containScale;
      const containHeight = originalImage.height * containScale;
      const containX = (targetRatio.width - containWidth) / 2;
      const containY = (targetRatio.height - containHeight) / 2;

      ctx.drawImage(
        originalImage,
        containX, containY, containWidth, containHeight
      );
    }

    setPreviewUrl(canvas.toDataURL('image/jpeg', opts.quality / 100));
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    
    saveToHistory();
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `resized-${options.aspectRatio}.jpg`;
    link.click();
  };

  const saveToHistory = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save to history');
      return;
    }

    try {
      // Upload resized image
      const resizedBlob = await fetch(previewUrl!).then(r => r.blob());
      const resizedFile = new File([resizedBlob], `resized-${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`resized/${resizedFile.name}`, resizedFile);

      if (uploadError) throw uploadError;

      // Save record
      const { error: dbError } = await supabase
        .from('resized_images')
        .insert({
          original_image: image?.file.name,
          resized_image: uploadData.path,
          options: options,
          user_id: (await supabase.auth.getSession()).data.session?.user.id
        });

      if (dbError) throw dbError;

      toast.success('Image saved to history');
    } catch (error) {
      console.error('Error saving to history:', error);
      toast.error('Failed to save to history');
    }
  };

  const sendToContentCreator = () => {
    if (!previewUrl) return;
    
    // Convert data URL to File
    fetch(previewUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `resized-${Date.now()}.jpg`, { type: 'image/jpeg' });
        localStorage.setItem('pendingImage', JSON.stringify({
          file: file,
          preview: previewUrl
        }));
        navigate('/create');
      });
  };

  return (
    <div className="space-y-8">
      <SEO 
        title="Image Resizer | Social Media Image Tool"
        description="Resize and optimize your images for different social media platforms. Crop, contain, or add creative backgrounds."
      />

      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Image Resizer</h1>
        <p className="text-muted-foreground">
          Optimize your images for different social media platforms
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <FileDropzone
              onDrop={(files) => {
                const file = files[0];
                if (file) {
                  handleImageUpload({
                    file,
                    preview: URL.createObjectURL(file)
                  });
                }
              }}
              value={image}
              onRemove={() => {
                setImage(null);
                setPreviewUrl(null);
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resize Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setOptions(defaultOptions);
                  if (image) generatePreview(image, defaultOptions);
                }}
              >
                Reset Settings
              </Button>
            </div>
            <Tabs defaultValue="mode" className="space-y-4">
              <TabsList>
                <TabsTrigger value="mode">
                  <Layout className="w-4 h-4 mr-2" />
                  Mode
                </TabsTrigger>
                <TabsTrigger value="size">
                  <Crop className="w-4 h-4 mr-2" />
                  Size
                </TabsTrigger>
                <TabsTrigger value="style">
                  <Palette className="w-4 h-4 mr-2" />
                  Style
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mode" className="space-y-4">
                <div className="space-y-2">
                  <Label>Resize Mode</Label>
                  <Select
                    value={options.mode}
                    onValueChange={(value: ResizeMode) => {
                      const newOptions = { ...options, mode: value };
                      setOptions(newOptions);
                      if (image) generatePreview(image, newOptions);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crop">Crop (Fill)</SelectItem>
                      <SelectItem value="contain">Contain with Background</SelectItem>
                      <SelectItem value="blur-bg">Blurred Background</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="size" className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Size</Label>
                  <Select
                    value={options.aspectRatio}
                    onValueChange={(value: keyof typeof ASPECT_RATIOS) => {
                      const newOptions = { ...options, aspectRatio: value };
                      setOptions(newOptions);
                      if (image) generatePreview(image, newOptions);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ASPECT_RATIOS).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                {/* Position controls for all modes */}
                <div className="space-y-2">
                  <Label>Image Position</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Horizontal</Label>
                      <Slider
                        value={[options.position.x]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={([value]) => {
                          const newOptions = {
                            ...options,
                            position: {
                              ...options.position,
                              x: value
                            }
                          };
                          setOptions(newOptions);
                          if (image) generatePreview(image, newOptions);
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Vertical</Label>
                      <Slider
                        value={[options.position.y]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={([value]) => {
                          const newOptions = {
                            ...options,
                            position: {
                              ...options.position,
                              y: value
                            }
                          };
                          setOptions(newOptions);
                          if (image) generatePreview(image, newOptions);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Image Scale</Label>
                  <Slider
                    value={[options.position.scale]}
                    min={50}
                    max={200}
                    step={1}
                    onValueChange={([value]) => {
                      const newOptions = {
                        ...options,
                        position: {
                          ...options.position,
                          scale: value
                        }
                      };
                      setOptions(newOptions);
                      if (image) generatePreview(image, newOptions);
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    {options.position.scale}%
                  </p>
                </div>

                {options.mode === 'contain' && (
                  <>
                    <div className="space-y-2">
                      <Label>Background Type</Label>
                      <RadioGroup
                        value={options.background.type}
                        onValueChange={(value: 'color' | 'gradient') => {
                          const newOptions = {
                            ...options,
                            background: {
                              ...options.background,
                              type: value,
                              colors: value === 'color' ? ['#ffffff'] : gradientPresets[0].colors
                            }
                          };
                          setOptions(newOptions);
                          if (image) generatePreview(image, newOptions);
                        }}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="color" id="color" />
                          <Label htmlFor="color">Solid Color</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gradient" id="gradient" />
                          <Label htmlFor="gradient">Gradient</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {options.background.type === 'color' ? (
                      <div className="space-y-2">
                        <Label>Background Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={options.background.colors[0]}
                            onChange={(e) => {
                              const newOptions = {
                                ...options,
                                background: {
                                  ...options.background,
                                  colors: [e.target.value]
                                }
                              };
                              setOptions(newOptions);
                              if (image) generatePreview(image, newOptions);
                            }}
                            className="w-12 h-12 p-1"
                          />
                          <Input
                            type="text"
                            value={options.background.colors[0]}
                            onChange={(e) => {
                              const newOptions = {
                                ...options,
                                background: {
                                  ...options.background,
                                  colors: [e.target.value]
                                }
                              };
                              setOptions(newOptions);
                              if (image) generatePreview(image, newOptions);
                            }}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Gradient Colors</Label>
                          <div className="space-y-2">
                            {options.background.colors.map((color, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  type="color"
                                  value={color}
                                  onChange={(e) => {
                                    const newColors = [...options.background.colors];
                                    newColors[index] = e.target.value;
                                    const newOptions = {
                                      ...options,
                                      background: {
                                        ...options.background,
                                        colors: newColors
                                      }
                                    };
                                    setOptions(newOptions);
                                    if (image) generatePreview(image, newOptions);
                                  }}
                                  className="w-12 h-12 p-1"
                                />
                                <Input
                                  type="text"
                                  value={color}
                                  onChange={(e) => {
                                    const newColors = [...options.background.colors];
                                    newColors[index] = e.target.value;
                                    const newOptions = {
                                      ...options,
                                      background: {
                                        ...options.background,
                                        colors: newColors
                                      }
                                    };
                                    setOptions(newOptions);
                                    if (image) generatePreview(image, newOptions);
                                  }}
                                  className="flex-1"
                                />
                                {options.background.colors.length > 2 && (
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                      const newColors = options.background.colors.filter((_, i) => i !== index);
                                      const newOptions = {
                                        ...options,
                                        background: {
                                          ...options.background,
                                          colors: newColors
                                        }
                                      };
                                      setOptions(newOptions);
                                      if (image) generatePreview(image, newOptions);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                          {options.background.colors.length < 5 && (
                            <Button
                              variant="outline"
                              className="w-full mt-2"
                              onClick={() => {
                                const newColors = [...options.background.colors, '#ffffff'];
                                const newOptions = {
                                  ...options,
                                  background: {
                                    ...options.background,
                                    colors: newColors
                                  }
                                };
                                setOptions(newOptions);
                                if (image) generatePreview(image, newOptions);
                              }}
                            >
                              Add Color Stop
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Presets</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {gradientPresets.map((preset) => (
                              <Button
                                key={preset.id}
                                variant={JSON.stringify(options.background.colors) === JSON.stringify(preset.colors) ? 'default' : 'outline'}
                                className={`h-20 ${preset.preview}`}
                                onClick={() => {
                                  const newOptions = {
                                    ...options,
                                    background: {
                                      ...options.background,
                                      colors: [...preset.colors]
                                    }
                                  };
                                  setOptions(newOptions);
                                  if (image) generatePreview(image, newOptions);
                                }}
                              >
                                {preset.name}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Gradient Direction</Label>
                          <Select
                            value={options.background.direction}
                            onValueChange={(value) => {
                              const newOptions = {
                                ...options,
                                background: {
                                  ...options.background,
                                  direction: value
                                }
                              };
                              setOptions(newOptions);
                              if (image) generatePreview(image, newOptions);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select direction" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0deg">Horizontal →</SelectItem>
                              <SelectItem value="90deg">Vertical ↓</SelectItem>
                              <SelectItem value="45deg">Diagonal ↘</SelectItem>
                              <SelectItem value="135deg">Diagonal ↙</SelectItem>
                              <SelectItem value="radial">Radial ○</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {options.mode === 'blur-bg' && (
                  <div className="space-y-2">
                    <Label>Blur Amount</Label>
                    <Slider
                      value={[options.blurAmount]}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={([value]) => {
                        const newOptions = { ...options, blurAmount: value };
                        setOptions(newOptions);
                        if (image) generatePreview(image, newOptions);
                      }}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Quality</Label>
                  <Slider
                    value={[options.quality]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={([value]) => {
                      const newOptions = { ...options, quality: value };
                      setOptions(newOptions);
                      if (image) generatePreview(image, newOptions);
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    {options.quality}%
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {previewUrl && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="relative max-w-full overflow-hidden rounded-lg border">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-[600px] w-auto"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button onClick={handleDownload}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={sendToContentCreator}>
                      Send to Content Creator
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}