import { IServiceService } from '../interfaces/IServiceService';
import { IServiceRepository } from '../../repositories/interfaces/IServiceRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';

const SERVICE_FIELDS = TRANSLATABLE_FIELDS.Service;

export class ServiceService implements IServiceService {
  private _repository: IServiceRepository;

  constructor(repository: IServiceRepository) {
    this._repository = repository;
  }
  async getAllServices(isAdmin: boolean) {
    try {
      const items = isAdmin ? await this._repository.findAll() : await this._repository.findPublished();
      return { success: true, message: 'Services retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getAllServices:', error);
      return { success: false, message: 'Failed to retrieve Services' };
    }
  }

  async getServicesPaginated({ search, status, category, page, limit }: { search?: string; status?: string; category?: string; page: number; limit: number }) {
    try {
      const query: any = {};
      if (search) {
        query['name.en'] = { $regex: search, $options: 'i' };
      }
      if (status && status !== 'ALL') {
        query.status = status; // e.g. 'published' or 'draft'
      }
      if (category && category !== 'ALL') {
        query.category = category;
      }

      const { items, total } = await this._repository.findPaginated(query, page, limit);
      
      return { 
        success: true, 
        message: 'Services retrieved successfully', 
        data: items,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error: any) {
      console.error('Error in getServicesPaginated:', error);
      return { success: false, message: 'Failed to retrieve Services' };
    }
  }
  async getServiceBySlug(slug: string) {
    try {
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Service not found' };
      return { success: true, message: 'Service retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getServiceBySlug:', error);
      return { success: false, message: 'Failed to retrieve Service' };
    }
  }
  async getServiceById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Service not found' };
      return { success: true, message: 'Service retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getServiceById:', error);
      return { success: false, message: 'Failed to retrieve Service' };
    }
  }
  async createService(data: any) {
    try {
      const newItem = await this._repository.create(data);
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Service created. Arabic translation in progress.', data: newItem };
    } catch (error: any) {
      console.error('Error in createService:', error);
      if (error?.code === 11000) return { success: false, message: 'A Service with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create Service' };
    }
  }
  async updateService(id: string, data: any) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Service not found' };

      const updatedItem = await this._repository.update(id, data);
      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Service updated. Arabic translation in progress.', data: updatedItem };
    } catch (error: any) {
      console.error('Error in updateService:', error);
      if (error?.code === 11000) return { success: false, message: 'A Service with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update Service' };
    }
  }
  async deleteService(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Service not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Service deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteService:', error);
      return { success: false, message: 'Failed to delete Service' };
    }
  }
  async duplicateService(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Service not found' };

      const copy = await this._repository.duplicate(id);
      return { success: true, message: 'Service duplicated successfully', data: copy };
    } catch (error: any) {
      console.error('Error in duplicateService:', error);
      if (error?.code === 11000) return { success: false, message: 'A Service with this unique identifier already exists.' };
      return { success: false, message: 'Failed to duplicate Service' };
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
