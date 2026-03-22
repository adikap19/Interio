export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface FurnitureProduct {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  imageUrl: string;
  storeUrl: string;
  storeName: string;
  colors?: string[];
}

export interface SavedProduct {
  id: string;
  productId: string;
  categoryId: string;
  name: string;
  price: number;
  imageUrl: string;
  storeUrl: string;
  storeName: string;
  createdAt: string;
}
