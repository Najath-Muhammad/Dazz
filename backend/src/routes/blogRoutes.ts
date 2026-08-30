import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { BlogRepository } from '../repositories/implementations/BlogRepository';
import { BlogService } from '../services/implementations/BlogService';
import { BlogController } from '../controllers/implementations/BlogController';

const router = express.Router();

const repository = new BlogRepository();
const service = new BlogService(repository);
const controller = new BlogController(service);

router.get('/', controller.getBlogs);
router.get('/slug/:slug', controller.getBlogBySlug);
router.get('/:id', controller.getBlogById);
router.post('/', protect, controller.createBlog);
router.put('/:id', protect, controller.updateBlog);
router.delete('/:id', protect, controller.deleteBlog);

export default router;
