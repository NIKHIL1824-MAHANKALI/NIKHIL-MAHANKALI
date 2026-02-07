
export type FoodCategory = 'Burger' | 'Pizza' | 'Drink' | 'Fries' | 'Dessert' | 'Steak' | 'Pasta' | 'Sushi' | 'Ramen' | 'Taco';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  description: string;
  calories: number;
  prepTime: string;
  rating: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AppState {
  cart: CartItem[];
  user: User | null;
  loading: boolean;
}
