import { ILocationService } from '../interfaces/ILocationService';
import { ILocationRepository } from '../../repositories/interfaces/ILocationRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

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
      if (!items || items.length === 0) {
        return { success: true, message: 'No locations found', data: [] };
      }
      return { success: true, message: 'Locations retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: SafeAny) {
      console.error('Error in getAllLocations:', error);
      return { success: false, message: 'Failed to retrieve locations' };
    }
  }

  async getLocationById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid location ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Location not found' };
      return { success: true, message: 'Location retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getLocationById:', error);
      return { success: false, message: 'Failed to retrieve location' };
    }
  }

  async createLocation(data: SafeAny) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(data, LOCATION_FIELDS, {});
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const newItem = await this._repository.create(toSave);
      if (!newItem) return { success: false, message: 'Failed to create location' };

      return { success: true, message: 'Location created and translated successfully.', data: BaseMapper.toDTO(newItem) };
    } catch (error: SafeAny) {
      console.error('Error in createLocation:', error);
      return { success: false, message: 'Failed to create location' };
    }
  }

  async updateLocation(id: string, data: SafeAny) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid location ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Location not found' };

      const existingMeta = (existing as SafeAny).translationMeta || {};
      const existingDoc = (existing as SafeAny).toObject ? (existing as SafeAny).toObject() : existing;

      const { updatedData, translationMeta, status } = await autoTranslate(data, LOCATION_FIELDS, existingMeta, existingDoc);
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const updatedItem = await this._repository.update(id, toSave);
      if (!updatedItem) return { success: false, message: 'Failed to update location' };

      return { success: true, message: 'Location updated and translated successfully.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: SafeAny) {
      console.error('Error in updateLocation:', error);
      return { success: false, message: 'Failed to update location' };
    }
  }

  async deleteLocation(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid location ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Location not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Location deleted successfully' };
    } catch (error: SafeAny) {
      console.error('Error in deleteLocation:', error);
      return { success: false, message: 'Failed to delete location' };
    }
  }

  private async _translateAndUpdate(id: string, docData: SafeAny, existingMeta: Record<string, string>) {
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
