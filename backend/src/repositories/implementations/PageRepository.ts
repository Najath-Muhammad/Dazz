import { IPageRepository } from '../interfaces/IPageRepository';
import Page from '../../models/Page';

import mongoose from 'mongoose';

export class PageRepository implements IPageRepository {
  async findAll(): Promise<SafeAny[]> {
    return await Page.find();
  }
  async findById(id: string): Promise<any | null> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Page.findById(id);
    }
    return await Page.findOne({ slug: id });
  }

  async create(data: SafeAny): Promise<SafeAny> {
    const newItem = new Page(data);
    return await newItem.save();
  }
  async update(id: string, data: SafeAny): Promise<any | null> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Page.findByIdAndUpdate(id, data, { new: true });
    }
    return await Page.findOneAndUpdate({ slug: id }, data, { new: true, upsert: true });
  }
  async delete(id: string): Promise<any | null> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Page.findByIdAndDelete(id);
    }
    return await Page.findOneAndDelete({ slug: id });
  }
}
