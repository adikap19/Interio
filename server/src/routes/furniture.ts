import { Router } from 'express';
import { getFurnitureProducts, getSavedProducts, saveProduct, unsaveProduct } from '../controllers/furnitureController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/saved', authenticate, getSavedProducts);
router.get('/:categoryId', getFurnitureProducts);
router.post('/save', authenticate, saveProduct);
router.delete('/save/:productId', authenticate, unsaveProduct);

export default router;
