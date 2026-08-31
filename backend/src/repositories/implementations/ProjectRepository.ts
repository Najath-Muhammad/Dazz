import { IProjectRepository } from '../interfaces/IProjectRepository';
import Project from '../../models/Project';

export class ProjectRepository implements IProjectRepository {
  async findAll(): Promise<SafeAny[]> {
    return await Project.find();
  }
  async findPaginated(query: object, page: number, limit: number): Promise<{ items: SafeAny[], total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(query)
    ]);
    return { items, total };
  }
  async findById(id: string): Promise<any | null> {
    return await Project.findById(id);
  }
  async findBySlug(slug: string): Promise<any | null> {
    return await Project.findOne({ slug });
  }
  async create(data: SafeAny): Promise<SafeAny> {
    const newItem = new Project(data);
    return await newItem.save();
  }
  async update(id: string, data: SafeAny): Promise<any | null> {
    return await Project.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  }
  async delete(id: string): Promise<any | null> {
    return await Project.findByIdAndDelete(id);
  }
}
