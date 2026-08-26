import { Router } from 'express';
import multer from 'multer';
import { uploadMedia, validateUrl } from '../controllers/mediaController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Validate file type (allow images and videos)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/jpg',
    'video/mp4', 'video/webm', 'video/quicktime' // quicktime is mov
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WebP, MP4, WebM, and MOV are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size (can be adjusted)
  },
});

// Protect all media routes
router.use(protect);

router.post('/upload', upload.single('file'), uploadMedia);
router.post('/validate-url', validateUrl);

export default router;
