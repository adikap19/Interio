import api from './api';
import { FurnitureProduct, SavedProduct } from '../types';

export const getProducts = (categoryId: string) =>
  api.get<FurnitureProduct[]>(`/furniture/${categoryId}`).then((r) => r.data);

export const getSavedProducts = () =>
  api.get<SavedProduct[]>('/furniture/saved').then((r) => r.data);

export const saveProduct = (product: FurnitureProduct) =>
  api.post<SavedProduct>('/furniture/save', product).then((r) => r.data);

export const unsaveProduct = (productId: string) =>
  api.delete(`/furniture/save/${productId}`).then((r) => r.data);
