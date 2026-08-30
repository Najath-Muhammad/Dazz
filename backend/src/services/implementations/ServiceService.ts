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
    } catch (error: any) {
      console.error('Error in getAllServices:', error);
      return { success: false, message: 'Failed to retrieve services' };
    }
  }

  async getServicesPaginated({ search, status, category, page, limit }: { search?: string; status?: string; category?: string; page: number; limit: number }) {
    try {
      const query: any = {};
      if (search) {
        query['name.en'] = { $regex: search, $options: 'i' };
      }
      if (status && status !== 'ALL') {
        query.status = status;
      }
      if (category && category !== 'ALL') {
        query.category = category;
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      console.error('Error in getServiceById:', error);
      return { success: false, message: 'Failed to retrieve service' };
    }
  }

  async createService(data: any) {
    try {
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to create service' };
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Service created. Arabic translation in progress.', data: BaseMapper.toDTO(newItem) };
    } catch (error: any) {
      console.error('Error in createService:', error);
      if (error?.code === 11000) return { success: false, message: 'A service with this slug already exists.' };
      return { success: false, message: 'Failed to create service' };
    }
  }

  async updateService(id: string, data: any) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid service ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Service not found' };

      const updatedItem = await this._repository.update(id, data);
      if (!updatedItem) return { success: false, message: 'Failed to update service' };

      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Service updated. Arabic translation in progress.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      console.error('Error in duplicateService:', error);
      if (error?.code === 11000) return { success: false, message: 'A service with this slug already exists.' };
      return { success: false, message: 'Failed to duplicate service' };
    }
  }

  private async _translateAndUpdate(id: string, docData: any, existingMeta: Record<string, string>) {
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
