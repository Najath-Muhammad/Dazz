import { IProjectService } from '../interfaces/IProjectService';
import { IProjectRepository } from '../../repositories/interfaces/IProjectRepository';

export class ProjectService implements IProjectService {
  private _repository: IProjectRepository;

  constructor(repository: IProjectRepository) {
    this._repository = repository;
  }
  async getAllProjects() {
    try {
      const items = await this._repository.findAll();
      return { success: true, message: 'Projects retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getAllProjects:', error);
      return { success: false, message: 'Failed to retrieve Projects' };
    }
  }
  async getProjectById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Project not found' };
      return { success: true, message: 'Project retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getProjectById:', error);
      return { success: false, message: 'Failed to retrieve Project' };
    }
  }
  async getProjectBySlug(slug: string) {
    try {
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Project not found' };
      return { success: true, message: 'Project retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getProjectBySlug:', error);
      return { success: false, message: 'Failed to retrieve Project' };
    }
  }
  async createProject(data: any) {
    try {
      // Check edge cases here if needed, like manually checking if slug exists, though mongo throws 11000
      const newItem = await this._repository.create(data);
      return { success: true, message: 'Project created successfully', data: newItem };
    } catch (error: any) {
      console.error('Error in createProject:', error);
      if (error?.code === 11000) return { success: false, message: 'A Project with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create Project' };
    }
  }
  async updateProject(id: string, data: any) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Project not found' };
      
      const updatedItem = await this._repository.update(id, data);
      return { success: true, message: 'Project updated successfully', data: updatedItem };
    } catch (error: any) {
      console.error('Error in updateProject:', error);
      if (error?.code === 11000) return { success: false, message: 'A Project with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update Project' };
    }
  }
  async deleteProject(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Project not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Project deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteProject:', error);
      return { success: false, message: 'Failed to delete Project' };
    }
  }
}
