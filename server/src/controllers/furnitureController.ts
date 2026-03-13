import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { getProductsByCategory } from '../data/furnitureProducts';

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
