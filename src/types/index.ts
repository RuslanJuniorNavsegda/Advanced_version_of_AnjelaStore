export interface Product {
  id: number;
  name: string;
  price: number;
  age: string;
  category: string;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: Order[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
