import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { getProductsByCategory, FURNITURE_PRODUCTS } from '../data/furnitureProducts';

const prisma = new PrismaClient();

export const getFurnitureProducts = (req: AuthRequest, res: Response): void => {
  const { categoryId } = req.params;
  const products = getProductsByCategory(categoryId);
  res.json(products);
};

export const getSavedProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  const saved = await prisma.savedProduct.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: 'desc' },
  });
  res.json(saved);
};

export const saveProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  const { productId, name, price, imageUrl, storeUrl, storeName, categoryId } = req.body;
  if (!productId || !name || price == null || !imageUrl || !storeUrl || !storeName || !categoryId) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  try {
    const saved = await prisma.savedProduct.create({
      data: { userId: req.userId!, productId, name, price, imageUrl, storeUrl, storeName, categoryId },
    });
    res.status(201).json(saved);
  } catch (e: any) {
    if (e?.code === 'P2002') {
      res.status(409).json({ error: 'Product already saved' });
    } else {
      throw e;
    }
  }
};

export const unsaveProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  const { productId } = req.params;
  await prisma.savedProduct.deleteMany({
    where: { userId: req.userId!, productId },
  });
  res.json({ message: 'Removed' });
};

// Style Your Space — recommend products based on room preferences
export const recommendProducts = (req: AuthRequest, res: Response): void => {
  const { budget, style, roomType, colorPalette } = req.body as {
    budget: number;
    style: string;
    roomType: string;
    colorPalette: string;
  };

  // Category relevance map per room type
  const roomCategories: Record<string, string[]> = {
    bedroom:    ['beds', 'wardrobes', 'lighting', 'armchairs', 'rugs', 'storage'],
    living:     ['sofas', 'armchairs', 'coffee-tables', 'tv-units', 'lighting', 'rugs', 'shelving'],
    dining:     ['dining-tables', 'dining-chairs', 'lighting', 'storage'],
    office:     ['desks', 'office-chairs', 'shelving', 'lighting', 'storage'],
    all:        [],
  };

  // Style → color/keyword hints
  const styleKeywords: Record<string, string[]> = {
    scandinavian: ['white', 'beige', 'birch', 'pine', 'light', 'oak'],
    minimalist:   ['white', 'grey', 'black', 'clean', 'slim'],
    bohemian:     ['rattan', 'bamboo', 'brown', 'warm', 'wicker'],
    industrial:   ['black', 'metal', 'dark', 'grey', 'steel'],
    japandi:      ['oak', 'beige', 'ash', 'bamboo', 'natural', 'white'],
    cottagecore:  ['white', 'pine', 'cream', 'natural', 'rattan'],
  };

  const relevantCategories = roomType === 'all' ? [] : (roomCategories[roomType] ?? []);
  const keywords = styleKeywords[style] ?? [];

  let pool = FURNITURE_PRODUCTS.filter(p => p.price <= budget);

  // Boost products matching room categories
  const inRoom = relevantCategories.length > 0
    ? pool.filter(p => relevantCategories.includes(p.categoryId))
    : pool;

  // Score by style keywords in product name
  const scored = inRoom.map(p => {
    const nameLower = p.name.toLowerCase();
    const score = keywords.filter(k => nameLower.includes(k)).length;
    return { ...p, score };
  }).sort((a, b) => b.score - a.score || a.price - b.price);

  // Return up to 12, one per category max for variety
  const seen = new Set<string>();
  const results = scored.filter(p => {
    if (seen.has(p.categoryId)) return false;
    seen.add(p.categoryId);
    return true;
  }).slice(0, 12);

  // If not enough, fill with remaining
  if (results.length < 6) {
    const extras = scored.filter(p => !results.find(r => r.id === p.id)).slice(0, 8 - results.length);
    results.push(...extras);
  }

  res.json(results);
};
