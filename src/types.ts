export interface Product {
  id: string;
  name: string;
  size: string;
  category: 'dispenser' | 'packs' | 'bottles';
  price: number;
  originalPrice?: number;
  description: string;
  bestFor: string;
  features: string[];
  image: string;
  tag?: string;
  popular?: boolean;
  minOrder?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isRefill?: boolean;
}

export interface OrderFormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  cityArea: string;
  deliveryTime: 'morning' | 'afternoon' | 'anytime';
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
  notes: string;
}

export interface MineralSpec {
  name: string;
  amount: string;
}

export interface DeliveryZone {
  area: string;
  leadTime: string;
  minOrderFree: string;
  days: string;
}
