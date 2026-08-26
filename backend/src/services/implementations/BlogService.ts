import { IBlogService } from '../interfaces/IBlogService';
import { IBlogRepository } from '../../repositories/interfaces/IBlogRepository';

export class BlogService implements IBlogService {
  private repository: IBlogRepository;

  constructor(repository: IBlogRepository) {
    this.repository = repository;
  }

  async getAllBlogs(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async getBlogById(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }
  async getBlogBySlug(slug: string): Promise<any | null> {
    return await this.repository.findBySlug(slug);
  }
  async createBlog(data: any): Promise<any> {
    return await this.repository.create(data);
  }
  async updateBlog(id: string, data: any): Promise<any | null> {
    return await this.repository.update(id, data);
  }
  async deleteBlog(id: string): Promise<any | null> {
    return await this.repository.delete(id);
  }
}
