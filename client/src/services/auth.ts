import api from './api';
import { AuthResponse, User } from '../types';

export const loginWithPassword = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const loginWithGoogle = async (googleToken: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/google', { token: googleToken });
  localStorage.setItem('token', data.token);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
