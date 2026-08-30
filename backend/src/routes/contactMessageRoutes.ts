import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { ContactMessageRepository } from '../repositories/implementations/ContactMessageRepository';
import { ContactMessageService } from '../services/implementations/ContactMessageService';
import { ContactMessageController } from '../controllers/implementations/ContactMessageController';

const router = express.Router();

const repository = new ContactMessageRepository();
const service = new ContactMessageService(repository);
const controller = new ContactMessageController(service);

router.get('/', protect, controller.getContactMessages);
router.get('/:id', protect, controller.getContactMessageById);

router.post('/', controller.createContactMessage);
router.put('/:id', protect, controller.updateContactMessage);
router.put('/:id/status', protect, controller.updateContactMessageStatus);
router.delete('/:id', protect, controller.deleteContactMessage);

export default router;
