import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { ServiceController } from '../controllers/implementations/ServiceController';
import { ServiceService } from '../services/implementations/ServiceService';
import { ServiceRepository } from '../repositories/implementations/ServiceRepository';

const repo = new ServiceRepository();
const service = new ServiceService(repo);
const controller = new ServiceController(service);

const router = express.Router();

// Public
router.get('/', controller.getServices);
router.get('/slug/:slug', controller.getServiceBySlug);

// Admin protected
router.get('/:id', protect, controller.getServiceById);
router.post('/', protect, controller.createService);
router.put('/:id', protect, controller.updateService);
router.delete('/:id', protect, controller.deleteService);
router.post('/:id/duplicate', protect, controller.duplicateService);

export default router;
