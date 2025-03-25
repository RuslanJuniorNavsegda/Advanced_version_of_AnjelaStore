import dotenv from "dotenv";

dotenv.config();

export const env = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
} as const;

export type Env = typeof env;
