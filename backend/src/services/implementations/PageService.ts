import { IPageService } from '../interfaces/IPageService';
import { IPageRepository } from '../../repositories/interfaces/IPageRepository';

export class PageService implements IPageService {
  private repository: IPageRepository;

  constructor(repository: IPageRepository) {
    this.repository = repository;
  }

  async getAllPages(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async getPageById(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }

  async createPage(data: any): Promise<any> {
    return await this.repository.create(data);
  }
  async updatePage(id: string, data: any): Promise<any | null> {
    return await this.repository.update(id, data);
  }
  async deletePage(id: string): Promise<any | null> {
    return await this.repository.delete(id);
  }
}
