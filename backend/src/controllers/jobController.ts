import { Request, Response } from 'express';
import Job from '../models/Job';

export const getJobs = async (req: Request, res: Response) => {
  try {
    const items = await Job.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const item = await Job.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not Found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    const newItem = new Job(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const updatedItem = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Not Found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const deletedItem = await Job.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Not Found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
