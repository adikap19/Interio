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

// Style Your Space — recommend products based on room, color palette and budget
export const recommendProducts = (req: AuthRequest, res: Response): void => {
  const { budget, roomType, colorPalette } = req.body as {
    budget: number;
    roomType: string;
    colorPalette: string;
  };

  // Category relevance map per room type
  const roomCategories: Record<string, string[]> = {
    bedroom: ['beds', 'wardrobes', 'nightstands', 'lighting', 'armchairs', 'rugs'],
    living:  ['sofas', 'armchairs', 'coffee-tables', 'tv-units', 'lighting', 'rugs', 'bookshelves'],
    dining:  ['dining-tables', 'lighting', 'rugs', 'armchairs'],
    office:  ['desks', 'bookshelves', 'lighting', 'armchairs'],
    all:     [], // whole home = all categories
  };

  const relevantCategories = roomCategories[roomType] ?? [];

  // Filter by budget (individual product price ≤ budget)
  const pool = FURNITURE_PRODUCTS.filter(p => p.price <= budget);

  // Filter by room categories (whole home = no filter)
  const inRoom = relevantCategories.length > 0
    ? pool.filter(p => relevantCategories.includes(p.categoryId))
    : pool;

  // Strict color filter: only products tagged with the chosen palette
  const colorMatched = colorPalette
    ? inRoom.filter(p => p.colors.includes(colorPalette))
    : inRoom;

  // Fall back to all in-room products if color filter yields too few results
  const candidates = colorMatched.length >= 4 ? colorMatched : inRoom;

  // Sort by price ascending for best value
  const scored = candidates.sort((a, b) => a.price - b.price);

  // Return up to 15, one per category for variety
  const seen = new Set<string>();
  const results = scored.filter(p => {
    if (seen.has(p.categoryId)) return false;
    seen.add(p.categoryId);
    return true;
  }).slice(0, 15);

  // If not enough, fill with more from same pool (allow multiple per category)
  if (results.length < 6) {
    const extras = scored
      .filter(p => !results.find(r => r.id === p.id))
      .slice(0, 10 - results.length);
    results.push(...extras);
  }

  res.json(results);
};
