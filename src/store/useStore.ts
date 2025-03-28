import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Category = "girls" | "boys" | "baby";
type AgeGroup =
  | "0-12m"
  | "1-2y"
  | "2-3y"
  | "3-4y"
  | "4-5y"
  | "5-6y"
  | "6-7y"
  | "7-8y"
  | "8-9y"
  | "9-10y"
  | "10-12y";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
  rating?: number;
  reviews?: number;
  description: string;
  ageGroup: AgeGroup;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  sizes?: string[];
  colors?: string[];
  material?: string;
}

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

        addToCart: (product, quantity) =>
          set((state) => {
            const existingItem = state.cart.find(
              (item) => item.id === product.id
            );
            if (existingItem) {
              const newQuantity = Math.min(
                10,
                existingItem.quantity + quantity
              );
              return {
                cart: state.cart.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: newQuantity }
                    : item
                ),
              };
            }
            return {
              cart: [
                ...state.cart,
                { ...product, quantity: Math.min(10, quantity) },
              ],
            };
          }),

        removeFromCart: (productId) =>
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId),
          })),

        updateQuantity: (productId, quantity) =>
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: Math.min(10, Math.max(0, quantity)) }
                : item
            ),
          })),

        clearCart: () => set({ cart: [] }),

        fetchProducts: async () => {
          set({ isLoading: true, error: null });
          try {
            // Implement API call to fetch products
            const response = await fetch("/api/products");
            const products = await response.json();
            set({ products });
          } catch (error) {
            console.error("Error fetching products:", error);
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
