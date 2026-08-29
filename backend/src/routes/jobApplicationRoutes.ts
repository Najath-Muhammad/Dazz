import express from 'express';
import multer from 'multer';
import { protect } from '../middlewares/authMiddleware';
import { JobApplicationRepository } from '../repositories/implementations/JobApplicationRepository';
import { JobApplicationService } from '../services/implementations/JobApplicationService';
import { JobApplicationController } from '../controllers/implementations/JobApplicationController';
import { MediaController } from '../controllers/implementations/MediaController';
import { MediaService } from '../services/implementations/MediaService';

const router = express.Router();
const upload = multer();

const repository = new JobApplicationRepository();
const service = new JobApplicationService(repository);
const controller = new JobApplicationController(service);

const mediaService = new MediaService();
const mediaController = new MediaController(mediaService);

// Public routes
router.post('/apply', controller.createApplication);
router.post('/upload-resume', upload.single('file'), mediaController.uploadMedia);

// Protected routes for admin
router.get('/', protect, controller.getApplications);
router.get('/:id', protect, controller.getApplicationById);
router.get('/job/:jobId', protect, controller.getApplicationsByJobId);

router.put('/:id/status', protect, controller.updateApplicationStatus);
router.delete('/:id', protect, controller.deleteApplication);

export default router;
