import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { ContactMessageRepository } from '../repositories/implementations/ContactMessageRepository';
import { ContactMessageService } from '../services/implementations/ContactMessageService';
import { ContactMessageController } from '../controllers/implementations/ContactMessageController';

const router = express.Router();

const repository = new ContactMessageRepository();
const service = new ContactMessageService(repository);
const controller = new ContactMessageController(service);

router.get('/', controller.getContactMessages);
router.get('/:id', controller.getContactMessageById);

router.post('/', protect, controller.createContactMessage);
router.put('/:id', protect, controller.updateContactMessage);
router.delete('/:id', protect, controller.deleteContactMessage);

export default router;
