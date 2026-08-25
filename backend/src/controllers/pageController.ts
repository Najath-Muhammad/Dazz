import { Request, Response } from 'express';
import Page from '../models/Page';

export const getPages = async (req: Request, res: Response) => {
  try {
    const items = await Page.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getPageById = async (req: Request, res: Response) => {
  try {
    const item = await Page.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not Found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createPage = async (req: Request, res: Response) => {
  try {
    const newItem = new Page(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const updatedItem = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Not Found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const deletedItem = await Page.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Not Found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
