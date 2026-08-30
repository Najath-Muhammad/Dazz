import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { SiteSettingsRepository } from '../repositories/implementations/SiteSettingsRepository';
import { SiteSettingsService } from '../services/implementations/SiteSettingsService';
import { SiteSettingsController } from '../controllers/implementations/SiteSettingsController';

const router = express.Router();

const repository = new SiteSettingsRepository();
const service = new SiteSettingsService(repository);
const controller = new SiteSettingsController(service);

router.get('/', controller.getSiteSettingss);
router.get('/:id', controller.getSiteSettingsById);

router.post('/', protect, controller.createSiteSettings);
router.put('/:id', protect, controller.updateSiteSettings);
router.delete('/:id', protect, controller.deleteSiteSettings);

export default router;
