import { ISiteSettingsRepository } from '../interfaces/ISiteSettingsRepository';
import SiteSettings from '../../models/SiteSettings';

export class SiteSettingsRepository implements ISiteSettingsRepository {
  async findAll(): Promise<any[]> {
    return await SiteSettings.find();
  }
  async findById(id: string): Promise<any | null> {
    return await SiteSettings.findById(id);
  }

  async create(data: any): Promise<any> {
    const newItem = new SiteSettings(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await SiteSettings.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await SiteSettings.findByIdAndDelete(id);
  }
}
