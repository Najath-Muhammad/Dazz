import { Router } from 'express';
import { getBlogs, getBlogById, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';

const router = Router();

router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
