import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "../types/product";

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Floral Summer Dress",
    price: 29.99,
    description: "Beautiful floral dress perfect for summer days",
    image: "https://example.com/dress.jpg",
    category: "girls",
    ageGroup: "4-5y",
    stock: 15,
    featured: true,
    rating: 4.5,
    reviews: 12,
    sizes: ["4", "5", "6"],
    colors: ["Pink", "Blue"],
    material: "100% Cotton",
    careInstructions: ["Machine wash cold", "Tumble dry low"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Boys Denim Jeans",
    price: 24.99,
    description: "Comfortable and durable denim jeans",
    image: "https://example.com/jeans.jpg",
    category: "boys",
    ageGroup: "7-8y",
    stock: 20,
    featured: false,
    rating: 4.8,
    reviews: 8,
    sizes: ["7", "8", "9"],
    colors: ["Blue", "Black"],
    material: "Denim",
    careInstructions: ["Machine wash cold", "Tumble dry medium"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Baby Onesie Set",
    price: 19.99,
    description: "Soft cotton onesie set for babies",
    image: "https://example.com/onesie.jpg",
    category: "baby",
    ageGroup: "0-12m",
    stock: 25,
    featured: true,
    rating: 5.0,
    reviews: 15,
    sizes: ["0-3m", "3-6m", "6-12m"],
    colors: ["White", "Yellow", "Green"],
    material: "Organic Cotton",
    careInstructions: ["Machine wash warm", "Tumble dry low"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  selectedAgeGroup: string | null;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedAgeGroup: (ageGroup: string | null) => void;
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        cart: [],
        isLoading: false,
        error: null,
        searchQuery: "",
        selectedCategory: null,
        selectedAgeGroup: null,

        setSearchQuery: (query) =>
          set({ searchQuery: query }, false, "setSearchQuery"),

        setSelectedCategory: (category) =>
          set({ selectedCategory: category }, false, "setSelectedCategory"),

        setSelectedAgeGroup: (ageGroup) =>
          set({ selectedAgeGroup: ageGroup }, false, "setSelectedAgeGroup"),

        addToCart: (product: Product, quantity: number) => {
          const { cart } = get();
          const existingItem = cart.find((item) => item.id === product.id);

          if (existingItem) {
            set({
              cart: cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            });
          } else {
            set({ cart: [...cart, { ...product, quantity }] });
          }
        },

        removeFromCart: (productId: string) => {
          const { cart } = get();
          set({ cart: cart.filter((item) => item.id !== productId) });
        },

        updateQuantity: (productId: string, quantity: number) => {
          const { cart } = get();
          set({
            cart: cart.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          });
        },

        clearCart: () => {
          set({ cart: [] });
        },

        fetchProducts: async () => {
          set({ isLoading: true, error: null });
          try {
            // For now, use sample products instead of API call
            set({ products: sampleProducts, isLoading: false });
          } catch (error) {
            set({
              error:
                error instanceof Error ? error.message : "An error occurred",
              isLoading: false,
            });
          }
        },
      }),
      {
        name: "anjela-store",
      }
    )
  )
);

export default useStore;
