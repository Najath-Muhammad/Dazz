import { ISiteSettingsService } from '../interfaces/ISiteSettingsService';
import { ISiteSettingsRepository } from '../../repositories/interfaces/ISiteSettingsRepository';

export class SiteSettingsService implements ISiteSettingsService {
  private repository: ISiteSettingsRepository;

  constructor(repository: ISiteSettingsRepository) {
    this.repository = repository;
  }

  async getAllSiteSettingss(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async getSiteSettingsById(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }

  async createSiteSettings(data: any): Promise<any> {
    return await this.repository.create(data);
  }
  async updateSiteSettings(id: string, data: any): Promise<any | null> {
    return await this.repository.update(id, data);
  }
  async deleteSiteSettings(id: string): Promise<any | null> {
    return await this.repository.delete(id);
  }
}
