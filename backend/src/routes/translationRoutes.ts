import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { TranslationController } from '../controllers/implementations/TranslationController';
import { TranslationService } from '../services/implementations/TranslationService';

const router = express.Router();
const service = new TranslationService();
const controller = new TranslationController(service);

router.post('/', protect, controller.translateText);
router.post('/batch', protect, controller.translateBatch);

export default router;
