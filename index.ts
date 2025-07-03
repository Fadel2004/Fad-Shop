export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  brand?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
  icon?: string;
}