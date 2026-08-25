import { Router } from 'express';
import { getContactMessages, getContactMessageById, createContactMessage, updateContactMessage, deleteContactMessage } from '../controllers/contactMessageController';

const router = Router();

router.get('/', getContactMessages);
router.get('/:id', getContactMessageById);
router.post('/', createContactMessage);
router.put('/:id', updateContactMessage);
router.delete('/:id', deleteContactMessage);

export default router;
