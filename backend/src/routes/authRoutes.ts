import express from 'express';
import { AuthRepository } from '../repositories/implementations/AuthRepository';
import { AuthService } from '../services/implementations/AuthService';
import { AuthController } from '../controllers/implementations/AuthController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

router.post('/login', controller.login);
router.get('/me', protect, controller.getMe);
router.post('/logout', controller.logout);

export default router;
