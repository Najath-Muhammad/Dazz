import Service from '../../models/Service';
import { IServiceRepository } from '../interfaces/IServiceRepository';

export class ServiceRepository implements IServiceRepository {
  async findAll(filter: object = {}): Promise<any[]> {
    return await Service.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  }
  async findPaginated(query: object, page: number, limit: number): Promise<{ items: any[], total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Service.find(query).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(limit),
      Service.countDocuments(query)
    ]);
    return { items, total };
  }
  async findPublished(): Promise<any[]> {
    return await Service.find({ status: 'published' }).sort({ displayOrder: 1 });
  }
  async findBySlug(slug: string): Promise<any | null> {
    return await Service.findOne({ slug });
  }
  async findById(id: string): Promise<any | null> {
    return await Service.findById(id);
  }
  async create(data: any): Promise<any> {
    return await Service.create(data);
  }
  async update(id: string, data: any): Promise<any | null> {
    return await Service.findByIdAndUpdate(id, data, { new: true, runValidators: false });
  }
  async delete(id: string): Promise<any | null> {
    return await Service.findByIdAndDelete(id);
  }
  async duplicate(id: string): Promise<any | null> {
    const original = await Service.findById(id).lean();
    if (!original) return null;
    const { _id, createdAt, updatedAt, slug, ...rest } = original as any;
    const newSlug = `${slug}-copy-${Date.now()}`;
    return await Service.create({ ...rest, slug: newSlug, status: 'draft', name: { ...rest.name, en: `${rest.name?.en || ''} Copy` } });
  }
}
