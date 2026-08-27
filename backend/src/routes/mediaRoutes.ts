import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import multer from 'multer';
import { MediaController } from '../controllers/implementations/MediaController';
import { MediaService } from '../services/implementations/MediaService';

const upload = multer();
const router = express.Router();

const service = new MediaService();
const controller = new MediaController(service);

router.post('/upload', protect, upload.single('file'), controller.uploadMedia);
router.post('/validate-url', protect, controller.validateUrl);

export default router;
