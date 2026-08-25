import { Router } from 'express';
import { getSiteSettingss, getSiteSettingsById, createSiteSettings, updateSiteSettings, deleteSiteSettings } from '../controllers/siteSettingsController';

const router = Router();

router.get('/', getSiteSettingss);
router.get('/:id', getSiteSettingsById);
router.post('/', createSiteSettings);
router.put('/:id', updateSiteSettings);
router.delete('/:id', deleteSiteSettings);

export default router;
