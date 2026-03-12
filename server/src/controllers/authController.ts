import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { signToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

const USER_SELECT = { id: true, email: true, name: true, avatarUrl: true, createdAt: true } as const;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: 'Email already in use' });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name },
    select: USER_SELECT,
  });
  res.status(201).json({ token: signToken(user.id), user });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  res.json({ token: signToken(user.id), user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl, createdAt: user.createdAt } });
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: req.userId }, select: USER_SELECT });
  if (!user) { res.status(404).json({ error: 'User not found' }); return; }
  res.json(user);
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, email, avatarUrl } = req.body;
  if (!name && !email && avatarUrl === undefined) {
    res.status(400).json({ error: 'Nothing to update' });
    return;
  }

  if (email) {
    const existing = await prisma.user.findFirst({ where: { email, NOT: { id: req.userId } } });
    if (existing) { res.status(409).json({ error: 'Email already in use' }); return; }
  }

  const user = await prisma.user.update({
    where: { id: req.userId },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(avatarUrl !== undefined && { avatarUrl }),
    },
    select: USER_SELECT,
  });
  res.json(user);
};

export const updatePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Both current and new password are required' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    res.status(401).json({ error: 'Current password is incorrect' });
    return;
  }

  await prisma.user.update({
    where: { id: req.userId },
    data: { password: await bcrypt.hash(newPassword, 10) },
  });
  res.json({ message: 'Password updated successfully' });
};
