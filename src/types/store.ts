export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  ageGroup: string;
  featured: boolean;
  inStock: boolean;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreState {
  products: Product[];
  cartItems: CartItem[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  selectedAgeGroup: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedAgeGroup: (ageGroup: string | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}
