import { IJobRepository } from '../interfaces/IJobRepository';
import Job from '../../models/Job';

export class JobRepository implements IJobRepository {
  async findAll(): Promise<any[]> {
    return await Job.find();
  }
  async findPaginated(query: object, page: number, limit: number): Promise<{ items: any[], total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Job.countDocuments(query)
    ]);
    return { items, total };
  }
  async findById(id: string): Promise<any | null> {
    return await Job.findById(id);
  }
  async findBySlug(slug: string): Promise<any | null> {
    return await Job.findOne({ slug });
  }

  async create(data: any): Promise<any> {
    const newItem = new Job(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await Job.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await Job.findByIdAndDelete(id);
  }
}
