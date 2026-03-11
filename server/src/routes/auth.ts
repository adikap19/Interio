import { Router } from 'express';
import { register, login, getMe, updateProfile, updatePassword } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.patch('/profile', authenticate, updateProfile);
router.patch('/password', authenticate, updatePassword);

export default router;
