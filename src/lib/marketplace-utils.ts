import { marketplaceCategories, type MarketplaceCategory, type MarketplacePlatform } from './marketplace-categories';

export function getPlatformsForCategory(categoryId: string): MarketplacePlatform[] {
  const category = marketplaceCategories.find(c => c.id === categoryId);
  return category?.platforms || [];
}

export function getTemplateForCategory(categoryId: string) {
  const category = marketplaceCategories.find(c => c.id === categoryId);
  return category?.templates[0]; // Get first template as default
}

export function generateListingStructure(categoryId: string, customPlatform?: string) {
  const template = getTemplateForCategory(categoryId);
  if (!template) return null;

  return {
    template,
    structure: {
      ...template.structure,
      platform: customPlatform || 'general'
    }
  };
}