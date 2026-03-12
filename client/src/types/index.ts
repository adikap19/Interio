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
