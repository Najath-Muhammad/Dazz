import { Router } from 'express';
import { LocationController } from '../controllers/implementations/LocationController';
import { LocationService } from '../services/implementations/LocationService';
import { LocationRepository } from '../repositories/implementations/LocationRepository';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

const repository = new LocationRepository();
const service = new LocationService(repository);
const controller = new LocationController(service);

// Public route: returns only active locations
router.get('/', controller.getActiveLocations);

// Admin routes
router.get('/all', protect, controller.getAllLocations);
router.get('/:id', protect, controller.getLocationById);
router.post('/', protect, controller.createLocation);
router.put('/:id', protect, controller.updateLocation);
router.delete('/:id', protect, controller.deleteLocation);

export default router;
