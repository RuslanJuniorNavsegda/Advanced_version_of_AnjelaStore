export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "girls" | "boys" | "baby";
  ageGroup:
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
  stock: number;
  featured?: boolean;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  colors?: string[];
  material?: string;
  careInstructions?: string[];
  createdAt: string;
  updatedAt: string;
}
