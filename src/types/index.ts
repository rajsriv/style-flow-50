export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem extends Product {}

export type UserRole = 'admin' | 'buyer' | 'seller' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}
