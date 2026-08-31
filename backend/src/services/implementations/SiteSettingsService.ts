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
    } catch (error: SafeAny) {
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
    } catch (error: SafeAny) {
      console.error('Error in getSiteSettingsById:', error);
      return { success: false, message: 'Failed to retrieve site settings' };
    }
  }

  async createSiteSettings(data: SafeAny) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(data, SETTINGS_FIELDS, {});
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const newItem = await this._repository.create(toSave);
      if (!newItem) return { success: false, message: 'Failed to create site settings' };

      return { success: true, message: 'Site settings created and translated successfully.', data: BaseMapper.toDTO(newItem) };
    } catch (error: SafeAny) {
      console.error('Error in createSiteSettings:', error);
      if (error?.code === 11000) return { success: false, message: 'Site settings with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create site settings' };
    }
  }

  async updateSiteSettings(id: string, data: SafeAny) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid site settings ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Site settings not found' };

      const existingMeta = (existing as SafeAny).translationMeta || {};
      const existingDoc = (existing as SafeAny).toObject ? (existing as SafeAny).toObject() : existing;

      const { updatedData, translationMeta, status } = await autoTranslate(data, SETTINGS_FIELDS, existingMeta, existingDoc);
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const updatedItem = await this._repository.update(id, toSave);
      if (!updatedItem) return { success: false, message: 'Failed to update site settings' };

      return { success: true, message: 'Site settings updated and translated successfully.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: SafeAny) {
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
    } catch (error: SafeAny) {
      console.error('Error in deleteSiteSettings:', error);
      return { success: false, message: 'Failed to delete site settings' };
    }
  }

  private async _translateAndUpdate(id: string, docData: SafeAny, existingMeta: Record<string, string>) {
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
