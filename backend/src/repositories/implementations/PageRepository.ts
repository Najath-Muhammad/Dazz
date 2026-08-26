import { IPageRepository } from '../interfaces/IPageRepository';
import Page from '../../models/Page';

export class PageRepository implements IPageRepository {
  async findAll(): Promise<any[]> {
    return await Page.find();
  }
  async findById(id: string): Promise<any | null> {
    return await Page.findById(id);
  }

  async create(data: any): Promise<any> {
    const newItem = new Page(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await Page.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await Page.findByIdAndDelete(id);
  }
}
