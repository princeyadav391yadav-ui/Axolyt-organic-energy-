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
  userId?: string;
  customerName?: string;
  customerEmail?: string;
  date: string;
  items: string;
  total: number;
  status: 'Confirmed' | 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  currentStepIndex: number;
  steps: OrderTrackingStep[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  memberTier: string;
  role?: 'admin' | 'member';
  orders: UserOrder[];
}

export interface InventoryItem {
  id: string;
  name: string;
  stockCases: number;
  stockSingles: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  reorderThreshold: number;
  updatedAt: string;
}

export interface FeedbackItem {
  id: string;
  authorName: string;
  authorEmail?: string;
  rating: number;
  flavor: string;
  comment: string;
  createdAt: string;
}

export interface AdminCustomerRecord {
  uid: string;
  name: string;
  email: string;
  memberTier: string;
  role: 'admin' | 'member';
  createdAt?: string;
  ordersCount?: number;
}

export interface AppConfig {
  storeStatus: 'open' | 'sale' | 'maintenance';
  announcementBanner: string;
  promoCode: string;
  discountPercent: number;
  updatedAt?: string;
}


