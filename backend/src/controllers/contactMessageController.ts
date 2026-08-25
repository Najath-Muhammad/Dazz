import { Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const items = await ContactMessage.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getContactMessageById = async (req: Request, res: Response) => {
  try {
    const item = await ContactMessage.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not Found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const newItem = new ContactMessage(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateContactMessage = async (req: Request, res: Response) => {
  try {
    const updatedItem = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Not Found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const deletedItem = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Not Found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
