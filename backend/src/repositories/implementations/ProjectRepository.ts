import { IProjectRepository } from '../interfaces/IProjectRepository';
import Project from '../../models/Project';

export class ProjectRepository implements IProjectRepository {
  async findAll(): Promise<any[]> {
    return await Project.find();
  }
  async findById(id: string): Promise<any | null> {
    return await Project.findById(id);
  }
  async findBySlug(slug: string): Promise<any | null> {
    return await Project.findOne({ slug });
  }
  async create(data: any): Promise<any> {
    const newItem = new Project(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await Project.findByIdAndDelete(id);
  }
}
