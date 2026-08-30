import { ISiteSettingsService } from '../interfaces/ISiteSettingsService';
import { ISiteSettingsRepository } from '../../repositories/interfaces/ISiteSettingsRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

const SETTINGS_FIELDS = TRANSLATABLE_FIELDS.SiteSettings;

export class SiteSettingsService implements ISiteSettingsService {
  private _repository: ISiteSettingsRepository;

  constructor(repository: ISiteSettingsRepository) {
    this._repository = repository;
  }

  async getAllSiteSettingss() {
    try {
      const items = await this._repository.findAll();
      if (!items || items.length === 0) {
        return { success: true, message: 'No site settings found', data: [] };
      }
      return { success: true, message: 'Site settings retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: any) {
      console.error('Error in getAllSiteSettingss:', error);
      return { success: false, message: 'Failed to retrieve site settings' };
    }
  }

  async getSiteSettingsById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid site settings ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Site settings not found' };
      return { success: true, message: 'Site settings retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: any) {
      console.error('Error in getSiteSettingsById:', error);
      return { success: false, message: 'Failed to retrieve site settings' };
    }
  }

  async createSiteSettings(data: any) {
    try {
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to create site settings' };
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Site settings created. Arabic translation in progress.', data: BaseMapper.toDTO(newItem) };
    } catch (error: any) {
      console.error('Error in createSiteSettings:', error);
      if (error?.code === 11000) return { success: false, message: 'Site settings with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create site settings' };
    }
  }

  async updateSiteSettings(id: string, data: any) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid site settings ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Site settings not found' };

      const updatedItem = await this._repository.update(id, data);
      if (!updatedItem) return { success: false, message: 'Failed to update site settings' };

      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Site settings updated. Arabic translation in progress.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: any) {
      console.error('Error in updateSiteSettings:', error);
      if (error?.code === 11000) return { success: false, message: 'Site settings with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update site settings' };
    }
  }

  async deleteSiteSettings(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid site settings ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Site settings not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Site settings deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteSiteSettings:', error);
      return { success: false, message: 'Failed to delete site settings' };
    }
  }

  private async _translateAndUpdate(id: string, docData: any, existingMeta: Record<string, string>) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(docData, SETTINGS_FIELDS, existingMeta);
      await this._repository.update(id, {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      });
      console.log(`[SiteSettingsService] Translation ${status} for settings ${id}`);
    } catch (err) {
      console.error(`[SiteSettingsService] Background translation failed for settings ${id}:`, err);
      await this._repository.update(id, { translationStatus: { ar: 'failed' } });
    }
  }
}
