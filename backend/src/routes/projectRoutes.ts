import { Router } from 'express';
import { getProjects, getProjectById, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/projectController';

const router = Router();

router.get('/', getProjects);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
