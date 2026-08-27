import { ISiteSettingsService } from '../interfaces/ISiteSettingsService';
import { ISiteSettingsRepository } from '../../repositories/interfaces/ISiteSettingsRepository';

export class SiteSettingsService implements ISiteSettingsService {
  private _repository: ISiteSettingsRepository;

  constructor(repository: ISiteSettingsRepository) {
    this._repository = repository;
  }
  async getAllSiteSettingss() {
    try {
      const items = await this._repository.findAll();
      return { success: true, message: 'SiteSettingss retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getAllSiteSettingss:', error);
      return { success: false, message: 'Failed to retrieve SiteSettingss' };
    }
  }
  async getSiteSettingsById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'SiteSettings not found' };
      return { success: true, message: 'SiteSettings retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getSiteSettingsById:', error);
      return { success: false, message: 'Failed to retrieve SiteSettings' };
    }
  }
  async createSiteSettings(data: any) {
    try {
      // Check edge cases here if needed, like manually checking if slug exists, though mongo throws 11000
      const newItem = await this._repository.create(data);
      return { success: true, message: 'SiteSettings created successfully', data: newItem };
    } catch (error: any) {
      console.error('Error in createSiteSettings:', error);
      if (error?.code === 11000) return { success: false, message: 'A SiteSettings with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create SiteSettings' };
    }
  }
  async updateSiteSettings(id: string, data: any) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'SiteSettings not found' };
      
      const updatedItem = await this._repository.update(id, data);
      return { success: true, message: 'SiteSettings updated successfully', data: updatedItem };
    } catch (error: any) {
      console.error('Error in updateSiteSettings:', error);
      if (error?.code === 11000) return { success: false, message: 'A SiteSettings with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update SiteSettings' };
    }
  }
  async deleteSiteSettings(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'SiteSettings not found' };

      await this._repository.delete(id);
      return { success: true, message: 'SiteSettings deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteSiteSettings:', error);
      return { success: false, message: 'Failed to delete SiteSettings' };
    }
  }
}
