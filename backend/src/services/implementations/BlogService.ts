import { IBlogService } from '../interfaces/IBlogService';
import { IBlogRepository } from '../../repositories/interfaces/IBlogRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';

const BLOG_FIELDS = TRANSLATABLE_FIELDS.Blog;

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
      const newItem = await this._repository.create(data);
      // Fire-and-forget background translation
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Blog created. Arabic translation in progress.', data: newItem };
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
      // Fire-and-forget background translation
      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Blog updated. Arabic translation in progress.', data: updatedItem };
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

  /** Background: translate and silently update the document */
  private async _translateAndUpdate(id: string, docData: any, existingMeta: Record<string, string>) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(docData, BLOG_FIELDS, existingMeta);
      await this._repository.update(id, {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      });
      console.log(`[BlogService] Translation ${status} for blog ${id}`);
    } catch (err) {
      console.error(`[BlogService] Background translation failed for blog ${id}:`, err);
      await this._repository.update(id, { translationStatus: { ar: 'failed' } });
    }
  }
}
