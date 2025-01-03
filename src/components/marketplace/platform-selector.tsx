import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { getPlatformsForCategory } from '@/lib/marketplace-utils';
import type { MarketplacePlatform } from '@/lib/marketplace-categories';

interface PlatformSelectorProps {
  categoryId: string;
  onPlatformChange: (platform: string) => void;
  onCustomPlatformChange: (platform: string) => void;
}

export function PlatformSelector({
  categoryId,
  onPlatformChange,
  onCustomPlatformChange,
}: PlatformSelectorProps) {
  const [platforms, setPlatforms] = useState<MarketplacePlatform[]>([]);
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    setPlatforms(getPlatformsForCategory(categoryId));
  }, [categoryId]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Platform</label>
        <Select
          onValueChange={(value) => {
            setShowCustomInput(value === 'custom');
            onPlatformChange(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id}>
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showCustomInput && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Custom Platform Name</label>
          <Input
            placeholder="Enter your marketplace name..."
            onChange={(e) => onCustomPlatformChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Our AI will optimize the content for your specific platform
          </p>
        </div>
      )}
    </div>
  );
}