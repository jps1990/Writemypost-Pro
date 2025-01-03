// Exemples de réponses JSON pour l'analyse d'images et la génération de contenu

export const SOCIAL_MEDIA_EXAMPLE = {
  "analysis": {
    "visual": {
      "style": "modern",
      "colors": ["navy blue", "white", "gold"],
      "patterns": ["geometric", "minimal"],
      "quality": "premium",
      "uniqueFeatures": [
        "ergonomic design",
        "premium materials",
        "innovative features"
      ]
    },
    "technical": {
      "materials": ["aluminum", "glass", "stainless steel"],
      "dimensions": "15.2 x 7.3 x 0.8 cm",
      "weight": "189g",
      "specifications": {
        "screen": "6.7-inch OLED",
        "processor": "Latest gen",
        "camera": "Triple lens system"
      }
    },
    "market": {
      "targetAudience": [
        "tech enthusiasts",
        "professionals",
        "content creators"
      ],
      "pricePoint": "premium",
      "competitors": [
        "Similar flagship devices",
        "Premium alternatives"
      ],
      "advantages": [
        "Superior build quality",
        "Advanced features",
        "Brand reputation"
      ]
    }
  },
  "content": {
    "common": {
      "title": "Experience Next-Gen Innovation",
      "description": "Discover the perfect blend of style and performance with our latest flagship device. Engineered for those who demand excellence.",
      "keywords": [
        "innovation",
        "technology",
        "premium",
        "flagship",
        "performance"
      ],
      "hooks": [
        "Transform your daily experience",
        "Elevate your productivity",
        "Capture life's moments in stunning detail"
      ]
    },
    "platforms": {
      "instagram": {
        "caption": "🚀 Elevate your tech game with our latest innovation! Featuring a stunning 6.7\" OLED display and pro-grade camera system, it's designed for those who demand the extraordinary. \n\nSwipe to discover the magic ✨\n\n#TechInnovation #Premium #Innovation",
        "hashtags": [
          "#Innovation",
          "#TechLife",
          "#PremiumTech",
          "#Design",
          "#Lifestyle"
        ],
        "strategy": {
          "postType": "carousel",
          "bestTime": "12:00-15:00",
          "engagement": "Show features in action"
        }
      },
      "facebook": {
        "post": "Introducing our most advanced device yet! Experience the perfect combination of power and elegance with features that redefine what's possible.",
        "hashtags": [
          "#Innovation",
          "#Technology",
          "#Premium"
        ],
        "strategy": {
          "postType": "video showcase",
          "targeting": "tech enthusiasts",
          "cta": "Learn More"
        }
      },
      "linkedin": {
        "post": "Proud to announce our latest innovation in mobile technology. Engineered with professionals in mind, it sets new standards in performance and productivity.",
        "hashtags": [
          "#Innovation",
          "#BusinessTech",
          "#Professional"
        ],
        "strategy": {
          "focus": "professional features",
          "audience": "business leaders",
          "cta": "Discover More"
        }
      },
      "tiktok": {
        "caption": "Watch this! 🤯 Our new device does things you won't believe! #TechTok",
        "hashtags": [
          "#TechTok",
          "#Innovation",
          "#Gadgets"
        ],
        "strategy": {
          "trend": "tech reveals",
          "sound": "viral tech sound",
          "duration": "30s"
        }
      }
    }
  }
};

export const MARKETPLACE_EXAMPLE = {
  "analysis": {
    "visual": {
      "style": "luxury",
      "colors": ["black", "gold", "silver"],
      "patterns": ["premium finish", "metallic"],
      "quality": "high-end",
      "uniqueFeatures": [
        "premium build",
        "exclusive design",
        "limited edition"
      ]
    },
    "technical": {
      "materials": ["premium leather", "surgical steel", "sapphire crystal"],
      "dimensions": "42mm x 12mm",
      "weight": "125g",
      "specifications": {
        "movement": "Swiss automatic",
        "waterResistance": "100m",
        "powerReserve": "72 hours"
      }
    },
    "market": {
      "targetAudience": [
        "luxury consumers",
        "watch enthusiasts",
        "collectors"
      ],
      "pricePoint": "luxury",
      "competitors": [
        "Premium watch brands",
        "Luxury timepieces"
      ],
      "advantages": [
        "Limited production",
        "Handcrafted",
        "Exclusive materials"
      ]
    }
  },
  "listing": {
    "title": "Limited Edition Luxury Timepiece - Swiss Made Automatic Watch",
    "description": "Experience unparalleled craftsmanship with this exclusive timepiece. Handcrafted in Switzerland using only the finest materials, this limited edition masterpiece combines traditional watchmaking with modern innovation.",
    "features": [
      "Swiss automatic movement",
      "72-hour power reserve",
      "Sapphire crystal",
      "100m water resistance",
      "Premium leather strap"
    ],
    "specifications": {
      "case": "42mm surgical steel",
      "movement": "Swiss automatic",
      "crystal": "Sapphire",
      "strap": "Premium leather",
      "waterResistance": "100m"
    },
    "pricing": {
      "regular": 12500,
      "sale": null,
      "msrp": 15000,
      "currency": "USD"
    },
    "seo": {
      "title": "Limited Edition Swiss Automatic Watch | Luxury Timepiece",
      "description": "Discover this exclusive Swiss-made automatic watch. Features premium materials, 72-hour power reserve, and limited production. Order now.",
      "keywords": [
        "luxury watch",
        "swiss automatic",
        "limited edition",
        "premium timepiece"
      ]
    },
    "platforms": {
      "amazon": {
        "title": "Limited Edition Swiss Automatic Watch - Premium Luxury Timepiece",
        "bulletPoints": [
          "Swiss-made automatic movement with 72-hour power reserve",
          "Premium surgical steel case with sapphire crystal",
          "Handcrafted leather strap with deployment buckle",
          "Limited production of 500 pieces worldwide",
          "Includes luxury presentation box and certificates"
        ],
        "searchTerms": [
          "luxury watch",
          "swiss automatic watch",
          "premium timepiece",
          "limited edition watch"
        ]
      },
      "ebay": {
        "title": "Swiss Automatic Watch Limited Edition Luxury Timepiece",
        "condition": "New with tags",
        "format": "Buy It Now",
        "category": "Wristwatches",
        "specifics": {
          "Brand": "Luxury Brand",
          "Model": "Limited Edition",
          "Movement": "Automatic",
          "Case Material": "Surgical Steel",
          "Band Material": "Leather"
        }
      }
    },
    "media": {
      "mainImage": "primary-view.jpg",
      "gallery": [
        "angle-view.jpg",
        "movement-view.jpg",
        "strap-detail.jpg",
        "box-contents.jpg"
      ],
      "video": "product-showcase.mp4"
    }
  }
};

// Types pour la validation
export interface ContentAnalysis {
  analysis: {
    visual: {
      style: string;
      colors: string[];
      patterns: string[];
      quality: string;
      uniqueFeatures: string[];
    };
    technical: {
      materials: string[];
      dimensions: string;
      weight: string;
      specifications: Record<string, string>;
    };
    market: {
      targetAudience: string[];
      pricePoint: string;
      competitors: string[];
      advantages: string[];
    };
  };
  content?: {
    common: {
      title: string;
      description: string;
      keywords: string[];
      hooks: string[];
    };
    platforms: Record<string, {
      caption?: string;
      post?: string;
      hashtags: string[];
      strategy: Record<string, string | string[]>;
    }>;
  };
  listing?: {
    title: string;
    description: string;
    features: string[];
    specifications: Record<string, string>;
    pricing: {
      regular: number;
      sale: number | null;
      msrp: number;
      currency: string;
    };
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
    platforms: Record<string, Record<string, any>>;
    media: {
      mainImage: string;
      gallery: string[];
      video?: string;
    };
  };
}