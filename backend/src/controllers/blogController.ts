import { Request, Response } from 'express';
import Blog from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const items = await Blog.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const item = await Blog.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not Found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const newItem = new Blog(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedItem = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Not Found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedItem = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Not Found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
