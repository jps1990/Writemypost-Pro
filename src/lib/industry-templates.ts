export interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  tones: string[];
  contentTypes: string[];
  hashtagGroups: string[];
}

export const industryTemplates: IndustryTemplate[] = [
  {
    id: 'tech',
    name: 'Technology & Software',
    description: 'For tech companies, startups, and software products',
    tones: ['professional', 'educational', 'trendy'],
    contentTypes: ['post', 'story', 'reel'],
    hashtagGroups: [
      '#TechNews #Innovation #Software',
      '#Programming #Coding #Developer',
      '#TechTrends #DigitalTransformation',
    ],
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'For online stores and retail businesses',
    tones: ['promotional', 'casual', 'enthusiastic'],
    contentTypes: ['post', 'story', 'reel'],
    hashtagGroups: [
      '#ShopLocal #Retail #Shopping',
      '#NewArrivals #Sale #Deal',
      '#Fashion #Style #Trends',
    ],
  },
  {
    id: 'food',
    name: 'Food & Restaurant',
    description: 'For restaurants, cafes, and food services',
    tones: ['casual', 'quirky', 'storytelling'],
    contentTypes: ['post', 'story', 'reel'],
    hashtagGroups: [
      '#FoodPorn #Foodie #Yummy',
      '#Restaurant #Chef #Cooking',
      '#LocalFood #FoodPhotography',
    ],
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    description: 'For fitness centers, wellness coaches, and health products',
    tones: ['inspirational', 'empathetic', 'educational'],
    contentTypes: ['post', 'story', 'reel'],
    hashtagGroups: [
      '#Wellness #Health #Fitness',
      '#HealthyLifestyle #Mindfulness',
      '#SelfCare #WellnessJourney',
    ],
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    description: 'For artists, designers, and creative professionals',
    tones: ['quirky', 'minimalist', 'storytelling'],
    contentTypes: ['post', 'story', 'reel'],
    hashtagGroups: [
      '#Design #Art #Creative',
      '#ArtistsOfInstagram #Studio',
      '#CreativeProcess #Inspiration',
    ],
  },
];