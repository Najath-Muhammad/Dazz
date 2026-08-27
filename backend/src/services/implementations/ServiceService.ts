

import { IServiceService } from '../interfaces/IServiceService';
import { IServiceRepository } from '../../repositories/interfaces/IServiceRepository';

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
      // Check edge cases here if needed, like manually checking if slug exists, though mongo throws 11000
      const newItem = await this._repository.create(data);
      return { success: true, message: 'Service created successfully', data: newItem };
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
      return { success: true, message: 'Service updated successfully', data: updatedItem };
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
}
