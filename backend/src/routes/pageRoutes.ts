import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { PageRepository } from '../repositories/implementations/PageRepository';
import { PageService } from '../services/implementations/PageService';
import { PageController } from '../controllers/implementations/PageController';

const router = express.Router();

const repository = new PageRepository();
const service = new PageService(repository);
const controller = new PageController(service);

router.get('/', controller.getPages);
router.get('/:id', controller.getPageById);

router.post('/', protect, controller.createPage);
router.put('/:id', protect, controller.updatePage);
router.delete('/:id', protect, controller.deletePage);

export default router;
