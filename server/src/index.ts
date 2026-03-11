import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`Server running on port ${PORT}`);
  console.log('Database connected');
});
