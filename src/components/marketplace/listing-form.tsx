import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ListingFormProps {
  categoryId: string;
  onGenerate: (data: any) => void;
}

export function ListingForm({ categoryId, onGenerate }: ListingFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: [] as string[],
    keywords: [] as string[],
    platform: ''
  });

  const [newFeature, setNewFeature] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateKeyword = (keyword: string) => {
    if (keyword.length > 20) {
      return 'Keywords must be 20 characters or less';
    }
    if (formData.keywords.length >= 13) {
      return 'Maximum 13 keywords allowed';
    }
    return null;
  };

  const handleAddKeyword = () => {
    const trimmedKeyword = newKeyword.trim();
    if (!trimmedKeyword) return;

    const error = validateKeyword(trimmedKeyword);
    if (error) {
      setError(error);
      return;
    }

    setFormData(prev => ({
      ...prev,
      keywords: [...prev.keywords, trimmedKeyword]
    }));
    setNewKeyword('');
    setError(null);
  };

  const handleAddFeature = () => {
    const trimmedFeature = newFeature.trim();
    if (!trimmedFeature) return;

    setFormData(prev => ({
      ...prev,
      features: [...prev.features, trimmedFeature]
    }));
    setNewFeature('');
  };

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (formData.features.length === 0) {
      setError('At least one feature is required');
      return;
    }
    if (formData.keywords.length === 0) {
      setError('At least one keyword is required');
      return;
    }
    if (!formData.platform.trim()) {
      setError('Platform is required');
      return;
    }

    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Input
          id="platform"
          value={formData.platform}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          placeholder="Enter marketplace platform name..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Product Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter your product title..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Product Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter your product description or let AI generate it..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Key Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a key feature..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddFeature();
              }
            }}
          />
          <Button 
            type="button"
            onClick={handleAddFeature}
            disabled={!newFeature.trim()}
          >
            Add
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
              <span className="flex-1">{feature}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Keywords ({formData.keywords.length}/13)</Label>
        <div className="flex gap-2">
          <Input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="Add a keyword..."
            maxLength={20}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddKeyword();
              }
            }}
          />
          <Button 
            type="button"
            onClick={handleAddKeyword}
            disabled={!newKeyword.trim() || formData.keywords.length >= 13}
          >
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.keywords.map((keyword, index) => (
            <div key={index} className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
              <span>{keyword}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeKeyword(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={
          !formData.title.trim() ||
          !formData.description.trim() ||
          formData.features.length === 0 ||
          formData.keywords.length === 0 ||
          !formData.platform.trim()
        }
      >
        Generate Listing
      </Button>
    </form>
  );
}