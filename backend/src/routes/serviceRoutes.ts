import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  getServices, getServiceBySlug, getServiceById,
  createService, updateService, deleteService, duplicateService
} from '../controllers/serviceController';

const router = express.Router();

// Public
router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);

// Admin protected
router.get('/:id', protect, getServiceById);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);
router.post('/:id/duplicate', protect, duplicateService);

export default router;
