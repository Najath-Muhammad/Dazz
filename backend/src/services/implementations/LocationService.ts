import { ILocationService } from '../interfaces/ILocationService';
import { ILocationRepository } from '../../repositories/interfaces/ILocationRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';

const LOCATION_FIELDS = TRANSLATABLE_FIELDS.Location;

export class LocationService implements ILocationService {
  private _repository: ILocationRepository;

  constructor(repository: ILocationRepository) {
    this._repository = repository;
  }
  async getAllLocations(onlyActive: boolean = false) {
    try {
      const query = onlyActive ? { isActive: true } : {};
      const items = await this._repository.findAll(query);
      return { success: true, message: 'Locations retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getAllLocations:', error);
      return { success: false, message: 'Failed to retrieve Locations' };
    }
  }
  async getLocationById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Location not found' };
      return { success: true, message: 'Location retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getLocationById:', error);
      return { success: false, message: 'Failed to retrieve Location' };
    }
  }
  async createLocation(data: any) {
    try {
      const newItem = await this._repository.create(data);
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Location created. Arabic translation in progress.', data: newItem };
    } catch (error: any) {
      console.error('Error in createLocation:', error);
      return { success: false, message: 'Failed to create Location' };
    }
  }
  async updateLocation(id: string, data: any) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Location not found' };

      const updatedItem = await this._repository.update(id, data);
      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Location updated. Arabic translation in progress.', data: updatedItem };
    } catch (error: any) {
      console.error('Error in updateLocation:', error);
      return { success: false, message: 'Failed to update Location' };
    }
  }
  async deleteLocation(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Location not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Location deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteLocation:', error);
      return { success: false, message: 'Failed to delete Location' };
    }
  }

  private async _translateAndUpdate(id: string, docData: any, existingMeta: Record<string, string>) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(docData, LOCATION_FIELDS, existingMeta);
      await this._repository.update(id, {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      });
      console.log(`[LocationService] Translation ${status} for location ${id}`);
    } catch (err) {
      console.error(`[LocationService] Background translation failed for location ${id}:`, err);
      await this._repository.update(id, { translationStatus: { ar: 'failed' } });
    }
  }
}
