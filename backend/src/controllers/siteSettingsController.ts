import { Request, Response } from 'express';
import SiteSettings from '../models/SiteSettings';

export const getSiteSettingss = async (req: Request, res: Response) => {
  try {
    const items = await SiteSettings.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getSiteSettingsById = async (req: Request, res: Response) => {
  try {
    const item = await SiteSettings.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not Found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createSiteSettings = async (req: Request, res: Response) => {
  try {
    const newItem = new SiteSettings(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateSiteSettings = async (req: Request, res: Response) => {
  try {
    const updatedItem = await SiteSettings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Not Found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteSiteSettings = async (req: Request, res: Response) => {
  try {
    const deletedItem = await SiteSettings.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Not Found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
