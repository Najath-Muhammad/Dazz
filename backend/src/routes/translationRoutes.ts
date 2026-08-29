import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { TranslationController } from '../controllers/implementations/TranslationController';
import { BulkTranslationController } from '../controllers/implementations/BulkTranslationController';
import { TranslationService } from '../services/implementations/TranslationService';

const router = express.Router();
const service = new TranslationService();
const controller = new TranslationController(service);
const bulkController = new BulkTranslationController();

// Existing: manual translation endpoints (used by frontend BilingualField "Regenerate" button)
router.post('/', protect, controller.translateText);
router.post('/batch', protect, controller.translateBatch);

// New: bulk migration & status endpoints
router.get('/status', protect, bulkController.getStatus);
router.post('/bulk-migrate', protect, bulkController.bulkMigrate);
router.post('/regenerate', protect, bulkController.regenerate);

export default router;
