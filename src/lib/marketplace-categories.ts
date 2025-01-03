export interface MarketplaceCategory {
  id: string;
  name: string;
  description: string;
  platforms: MarketplacePlatform[];
  templates: ListingTemplate[];
}

export interface MarketplacePlatform {
  id: string;
  name: string;
  type: 'general' | 'niche' | 'custom';
  icon: string;
}

export interface ListingTemplate {
  id: string;
  name: string;
  structure: {
    title: string;
    description: string;
    features: string[];
    specifications?: string[];
    keywords: string[];
  };
}

export const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: 'general',
    name: 'General E-commerce',
    description: 'For any type of product or custom marketplace',
    platforms: [
      { id: 'custom', name: 'Custom Store', type: 'custom', icon: 'store' },
      { id: 'other', name: 'Other Marketplace', type: 'custom', icon: 'shopping-bag' }
    ],
    templates: [
      {
        id: 'basic',
        name: 'Basic Product Listing',
        structure: {
          title: 'Product Name - Key Feature',
          description: 'Clear and concise product description with benefits',
          features: [
            'Main Feature 1',
            'Main Feature 2',
            'Main Feature 3'
          ],
          keywords: ['product', 'category', 'feature']
        }
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics & Tech',
    description: 'For electronics, gadgets, and tech products',
    platforms: [
      { id: 'amazon', name: 'Amazon', type: 'general', icon: 'shopping-cart' },
      { id: 'newegg', name: 'Newegg', type: 'niche', icon: 'cpu' },
      { id: 'bestbuy', name: 'Best Buy', type: 'niche', icon: 'tv' }
    ],
    templates: [
      {
        id: 'tech-detailed',
        name: 'Detailed Tech Specs',
        structure: {
          title: '[Brand] [Product] with [Key Feature] - [Model]',
          description: 'Technical description with specs and compatibility',
          features: [
            'Technical Specifications',
            'Compatibility',
            'What\'s Included'
          ],
          specifications: [
            'Dimensions',
            'Weight',
            'Power Requirements',
            'Warranty'
          ],
          keywords: ['electronics', 'tech', 'gadget']
        }
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'For clothing, accessories, and fashion items',
    platforms: [
      { id: 'amazon', name: 'Amazon', type: 'general', icon: 'shopping-cart' },
      { id: 'etsy', name: 'Etsy', type: 'niche', icon: 'scissors' },
      { id: 'poshmark', name: 'Poshmark', type: 'niche', icon: 'shopping-bag' }
    ],
    templates: [
      {
        id: 'fashion-basic',
        name: 'Fashion Basic',
        structure: {
          title: '[Brand] [Product Type] - [Style/Color]',
          description: 'Style-focused description with fit and material details',
          features: [
            'Material & Care',
            'Fit & Sizing',
            'Style Details'
          ],
          specifications: [
            'Size Guide',
            'Material Composition',
            'Care Instructions'
          ],
          keywords: ['fashion', 'clothing', 'style']
        }
      }
    ]
  }
];