import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "../types/product";

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Летнее платье с цветочным принтом",
    price: 2999,
    description:
      "Красивое платье с цветочным принтом, идеально подходящее для летних дней",
    image: "https://example.com/dress.jpg",
    category: "girls",
    ageGroup: "4-5y",
    stock: 15,
    featured: true,
    rating: 4.5,
    reviews: 12,
    sizes: ["4", "5", "6"],
    colors: ["Розовый", "Голубой"],
    material: "100% Хлопок",
    careInstructions: [
      "Стирка при 30°C",
      "Сушить в сушилке при низкой температуре",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Джинсы для мальчиков",
    price: 2499,
    description: "Удобные и прочные джинсы из качественного денима",
    image: "https://example.com/jeans.jpg",
    category: "boys",
    ageGroup: "7-8y",
    stock: 20,
    featured: false,
    rating: 4.8,
    reviews: 8,
    sizes: ["7", "8", "9"],
    colors: ["Синий", "Черный"],
    material: "Деним",
    careInstructions: [
      "Стирка при 30°C",
      "Сушить в сушилке при средней температуре",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Комплект боди для малышей",
    price: 1999,
    description: "Мягкий комплект боди из органического хлопка для малышей",
    image: "https://example.com/onesie.jpg",
    category: "baby",
    ageGroup: "0-12m",
    stock: 25,
    featured: true,
    rating: 5.0,
    reviews: 15,
    sizes: ["0-3m", "3-6m", "6-12m"],
    colors: ["Белый", "Желтый", "Зеленый"],
    material: "Органический хлопок",
    careInstructions: [
      "Стирка при 40°C",
      "Сушить в сушилке при низкой температуре",
    ],
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
                  ? {
                      ...item,
                      quantity: Math.min(10, item.quantity + quantity),
                    }
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
