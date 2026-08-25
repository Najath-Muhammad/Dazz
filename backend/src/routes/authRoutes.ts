import { Router } from 'express';
import { login, getMe, logout } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout);

export default router;
