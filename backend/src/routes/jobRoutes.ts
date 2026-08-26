import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { JobRepository } from '../repositories/implementations/JobRepository';
import { JobService } from '../services/implementations/JobService';
import { JobController } from '../controllers/implementations/JobController';

const router = express.Router();

const repository = new JobRepository();
const service = new JobService(repository);
const controller = new JobController(service);

router.get('/', controller.getJobs);
router.get('/:id', controller.getJobById);

router.post('/', protect, controller.createJob);
router.put('/:id', protect, controller.updateJob);
router.delete('/:id', protect, controller.deleteJob);

export default router;
