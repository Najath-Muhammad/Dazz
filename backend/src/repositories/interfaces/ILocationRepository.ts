import { ILocation } from '../../models/Location';

export interface ILocationRepository {
  findAll(query?: SafeAny): Promise<ILocation[]>;
  findById(id: string): Promise<ILocation | null>;
  create(data: Partial<ILocation>): Promise<ILocation>;
  update(id: string, data: Partial<ILocation>): Promise<ILocation | null>;
  delete(id: string): Promise<ILocation | null>;
}
