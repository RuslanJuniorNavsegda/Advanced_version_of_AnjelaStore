import axios from "axios";
import type { AxiosResponse } from "axios/dist/axios";
import { Product, Order, User, ApiResponse, ApiError } from "@/types";
import { env } from "@/config/env";

// Declare module augmentation for Vite env
declare module "@env" {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
  }
}

const api = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error: unknown) => {
    const apiError: ApiError = {
      status: (error as any)?.response?.status || 500,
      message: (error as any)?.response?.data?.message || "An error occurred",
      errors: (error as any)?.response?.data?.errors,
    };
    return Promise.reject(apiError);
  }
);

export const productService = {
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>("/products");
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  getByAge: async (age: string): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>(
      `/products/age/${age}`
    );
    return response.data;
  },

  getByCategory: async (category: string): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>(
      `/products/category/${category}`
    );
    return response.data;
  },

  search: async (query: string): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>(
      `/products/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

export const orderService = {
  create: async (
    order: Omit<Order, "id" | "status" | "createdAt">
  ): Promise<ApiResponse<Order>> => {
    const response = await api.post<ApiResponse<Order>>("/orders", order);
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data;
  },

  getAll: async (): Promise<ApiResponse<Order[]>> => {
    const response = await api.get<ApiResponse<Order[]>>("/orders");
    return response.data;
  },

  updateStatus: async (
    id: string,
    status: Order["status"]
  ): Promise<ApiResponse<Order>> => {
    const response = await api.patch<ApiResponse<Order>>(
      `/orders/${id}/status`,
      { status }
    );
    return response.data;
  },
};

export const userService = {
  register: async (
    user: Omit<User, "id" | "orders">
  ): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>("/users/register", user);
    return response.data;
  },

  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>(
      "/users/login",
      { email, password }
    );
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>("/users/profile");
    return response.data;
  },

  updateProfile: async (user: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.patch<ApiResponse<User>>("/users/profile", user);
    return response.data;
  },
};

export default api;
