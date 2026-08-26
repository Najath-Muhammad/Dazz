import { IProjectService } from '../interfaces/IProjectService';
import { IProjectRepository } from '../../repositories/interfaces/IProjectRepository';

export class ProjectService implements IProjectService {
  private repository: IProjectRepository;

  constructor(repository: IProjectRepository) {
    this.repository = repository;
  }

  async getAllProjects(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async getProjectById(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }
  async getProjectBySlug(slug: string): Promise<any | null> {
    return await this.repository.findBySlug(slug);
  }
  async createProject(data: any): Promise<any> {
    return await this.repository.create(data);
  }
  async updateProject(id: string, data: any): Promise<any | null> {
    return await this.repository.update(id, data);
  }
  async deleteProject(id: string): Promise<any | null> {
    return await this.repository.delete(id);
  }
}
