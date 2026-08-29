import Location, { ILocation } from '../../models/Location';
import { ILocationRepository } from '../interfaces/ILocationRepository';

export class LocationRepository implements ILocationRepository {
  async findAll(query: any = {}): Promise<ILocation[]> {
    return await Location.find(query).sort({ order: 1, createdAt: -1 });
  }
  async findById(id: string): Promise<ILocation | null> {
    return await Location.findById(id);
  }
  async create(data: Partial<ILocation>): Promise<ILocation> {
    const newItem = new Location(data);
    return await newItem.save();
  }
  async update(id: string, data: Partial<ILocation>): Promise<ILocation | null> {
    return await Location.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  }
  async delete(id: string): Promise<ILocation | null> {
    return await Location.findByIdAndDelete(id);
  }
}
