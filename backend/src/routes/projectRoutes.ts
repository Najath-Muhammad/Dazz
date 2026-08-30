import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { ProjectRepository } from '../repositories/implementations/ProjectRepository';
import { ProjectService } from '../services/implementations/ProjectService';
import { ProjectController } from '../controllers/implementations/ProjectController';

const router = express.Router();

const repository = new ProjectRepository();
const service = new ProjectService(repository);
const controller = new ProjectController(service);

router.get('/', controller.getProjects);
router.get('/:id', controller.getProjectById);
router.get('/slug/:slug', controller.getProjectBySlug);
router.post('/', protect, controller.createProject);
router.put('/:id', protect, controller.updateProject);
router.delete('/:id', protect, controller.deleteProject);

export default router;
