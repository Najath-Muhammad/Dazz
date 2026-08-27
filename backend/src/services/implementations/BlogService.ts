import { IBlogService } from '../interfaces/IBlogService';
import { IBlogRepository } from '../../repositories/interfaces/IBlogRepository';

export class BlogService implements IBlogService {
  private _repository: IBlogRepository;

  constructor(repository: IBlogRepository) {
    this._repository = repository;
  }
  async getAllBlogs() {
    try {
      const items = await this._repository.findAll();
      return { success: true, message: 'Blogs retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getAllBlogs:', error);
      return { success: false, message: 'Failed to retrieve Blogs' };
    }
  }
  async getBlogById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Blog not found' };
      return { success: true, message: 'Blog retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getBlogById:', error);
      return { success: false, message: 'Failed to retrieve Blog' };
    }
  }
  async getBlogBySlug(slug: string) {
    try {
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Blog not found' };
      return { success: true, message: 'Blog retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getBlogBySlug:', error);
      return { success: false, message: 'Failed to retrieve Blog' };
    }
  }
  async createBlog(data: any) {
    try {
      // Check edge cases here if needed, like manually checking if slug exists, though mongo throws 11000
      const newItem = await this._repository.create(data);
      return { success: true, message: 'Blog created successfully', data: newItem };
    } catch (error: any) {
      console.error('Error in createBlog:', error);
      if (error?.code === 11000) return { success: false, message: 'A Blog with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create Blog' };
    }
  }
  async updateBlog(id: string, data: any) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Blog not found' };
      
      const updatedItem = await this._repository.update(id, data);
      return { success: true, message: 'Blog updated successfully', data: updatedItem };
    } catch (error: any) {
      console.error('Error in updateBlog:', error);
      if (error?.code === 11000) return { success: false, message: 'A Blog with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update Blog' };
    }
  }
  async deleteBlog(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Blog not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Blog deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteBlog:', error);
      return { success: false, message: 'Failed to delete Blog' };
    }
  }
}
