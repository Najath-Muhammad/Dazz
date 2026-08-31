import { IServiceService } from '../interfaces/IServiceService';
import { IServiceRepository } from '../../repositories/interfaces/IServiceRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

const SERVICE_FIELDS = TRANSLATABLE_FIELDS.Service;

export class ServiceService implements IServiceService {
  private _repository: IServiceRepository;

  constructor(repository: IServiceRepository) {
    this._repository = repository;
  }

  async getAllServices(isAdmin: boolean) {
    try {
      const items = isAdmin ? await this._repository.findAll() : await this._repository.findPublished();
      if (!items || items.length === 0) {
        return { success: true, message: 'No services found', data: [] };
      }
      return { success: true, message: 'Services retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: SafeAny) {
      console.error('Error in getAllServices:', error);
      return { success: false, message: 'Failed to retrieve services' };
    }
  }

  async getServicesPaginated({ search, status, category, page, limit }: { search?: string; status?: string; category?: string; page: number; limit: number }) {
    try {
      const query: SafeAny = {};
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { 'name.en': { $regex: regex } },
          { 'name.ar': { $regex: regex } },
          { slug: { $regex: regex } }
        ];
      }
      if (status && status !== 'ALL' && status !== 'all') {
        query.status = status.toLowerCase();
      }
      if (category && category !== 'ALL' && category !== 'all') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      const { items, total } = await this._repository.findPaginated(query, page, limit);
      const totalPages = Math.ceil(total / limit);

      if (!items || items.length === 0) {
        return {
          success: true,
          message: total === 0 ? 'No services found' : 'No results for this page',
          data: [],
          pagination: { total, page, limit, totalPages, hasNext: false, hasPrev: page > 1 }
        };
      }

      return {
        success: true,
        message: 'Services retrieved successfully',
        data: BaseMapper.toDTOList(items),
        pagination: {
          total, page, limit, totalPages,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error: SafeAny) {
      console.error('Error in getServicesPaginated:', error);
      return { success: false, message: 'Failed to retrieve services' };
    }
  }

  async getServiceBySlug(slug: string) {
    try {
      if (!slug || slug.trim() === '') {
        return { success: false, message: 'Service slug is required' };
      }
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Service not found' };
      return { success: true, message: 'Service retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getServiceBySlug:', error);
      return { success: false, message: 'Failed to retrieve service' };
    }
  }

  async getServiceById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid service ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Service not found' };
      return { success: true, message: 'Service retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getServiceById:', error);
      return { success: false, message: 'Failed to retrieve service' };
    }
  }

  async createService(data: SafeAny) {
    try {
      if (data && data.name?.en) {
        if (!data.hero) data.hero = {};
        if (!data.hero.title?.en?.trim()) {
          data.hero.title = { en: data.name.en, ar: data.name.ar || '' };
        }
      }

      const { updatedData, translationMeta, status } = await autoTranslate(data, SERVICE_FIELDS, {});
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const newItem = await this._repository.create(toSave);
      if (!newItem) return { success: false, message: 'Failed to create service' };

      return { success: true, message: 'Service created and translated successfully.', data: BaseMapper.toDTO(newItem) };
    } catch (error: SafeAny) {
      console.error('Error in createService:', error);
      if (error?.code === 11000) return { success: false, message: 'A service with this slug already exists.' };
      return { success: false, message: 'Failed to create service' };
    }
  }

  async updateService(id: string, data: SafeAny) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid service ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Service not found' };

      const existingMeta = (existing as SafeAny).translationMeta || {};
      const existingDoc = (existing as SafeAny).toObject ? (existing as SafeAny).toObject() : existing;

      const { updatedData, translationMeta, status } = await autoTranslate(data, SERVICE_FIELDS, existingMeta, existingDoc);
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const updatedItem = await this._repository.update(id, toSave);
      if (!updatedItem) return { success: false, message: 'Failed to update service' };

      return { success: true, message: 'Service updated and translated successfully.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: SafeAny) {
      console.error('Error in updateService:', error);
      if (error?.code === 11000) return { success: false, message: 'A service with this slug already exists.' };
      return { success: false, message: 'Failed to update service' };
    }
  }

  async deleteService(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid service ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Service not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Service deleted successfully' };
    } catch (error: SafeAny) {
      console.error('Error in deleteService:', error);
      return { success: false, message: 'Failed to delete service' };
    }
  }

  async duplicateService(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid service ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Service not found' };

      const copy = await this._repository.duplicate(id);
      if (!copy) return { success: false, message: 'Failed to duplicate service' };
      return { success: true, message: 'Service duplicated successfully', data: BaseMapper.toDTO(copy) };
    } catch (error: SafeAny) {
      console.error('Error in duplicateService:', error);
      if (error?.code === 11000) return { success: false, message: 'A service with this slug already exists.' };
      return { success: false, message: 'Failed to duplicate service' };
    }
  }

  private async _translateAndUpdate(id: string, docData: SafeAny, existingMeta: Record<string, string>) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(docData, SERVICE_FIELDS, existingMeta);
      await this._repository.update(id, {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      });
      console.log(`[ServiceService] Translation ${status} for service ${id}`);
    } catch (err) {
      console.error(`[ServiceService] Background translation failed for service ${id}:`, err);
      await this._repository.update(id, { translationStatus: { ar: 'failed' } });
    }
  }
}
