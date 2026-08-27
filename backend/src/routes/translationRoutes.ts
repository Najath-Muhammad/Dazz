import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { translateSingle, translateBatch } from '../controllers/translationController';

const router = express.Router();

// All translation endpoints require admin authentication
router.post('/', protect, translateSingle);
router.post('/batch', protect, translateBatch);

export default router;
