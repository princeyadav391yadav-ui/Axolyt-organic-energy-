export interface Product {
  id: string;
  name: string;
  tagline: string;
  colorScheme: 'emerald' | 'purple' | 'amber' | 'cyan' | 'ruby' | 'gold' | string;
  accentColor: string;
  gradientBg: string;
  badge: string;
  priceSingle: number;
  pricePack12: number;
  image: string;
  description: string;
  longDescription: string;
  caffeineMg: number;
  calories: number;
  sugarG: number;
  volumeMl: number;
  flavorNotes: string[];
  keyBotanicals: string[];
  nutritionFacts: {
    servingSize: string;
    calories: number;
    totalCarbs: string;
    totalSugars: string;
    vitaminB6: string;
    vitaminB12: string;
    vitaminC: string;
    potassium: string;
    magnesium: string;
    lTheanine: string;
  };
  reviewsCount: number;
  rating: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  packType: 'single' | 'pack12';
  price: number;
  quantity: number;
  image: string;
  flavorName: string;
}

export interface IngredientDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedPoints: string[];
  scientificBacking: string;
  origin: string;
  iconName: string;
  highlightTag: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string;
  author: string;
}

export interface OrderTrackingStep {
  label: string;
  detail: string;
  time: string;
  location: string;
  isComplete: boolean;
  isCurrent: boolean;
}

export interface UserOrder {
  id: string;
  date: string;
  items: string;
  total: number;
  status: 'Confirmed' | 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  currentStepIndex: number;
  steps: OrderTrackingStep[];
}

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  memberTier: string;
  orders: UserOrder[];
}

