import { IBlogService } from '../interfaces/IBlogService';
import { IBlogRepository } from '../../repositories/interfaces/IBlogRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

const BLOG_FIELDS = TRANSLATABLE_FIELDS.Blog;

export class BlogService implements IBlogService {
  private _repository: IBlogRepository;

  constructor(repository: IBlogRepository) {
    this._repository = repository;
  }

  async getAllBlogs() {
    try {
      const items = await this._repository.findAll();
      if (!items || items.length === 0) {
        return { success: true, message: 'No blogs found', data: [] };
      }
      return { success: true, message: 'Blogs retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: SafeAny) {
      console.error('Error in getAllBlogs:', error);
      return { success: false, message: 'Failed to retrieve blogs' };
    }
  }

  async getBlogsPaginated({ search, status, category, page, limit }: { search?: string; status?: string; category?: string; page: number; limit: number }) {
    try {
      const query: SafeAny = {};
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { 'title.en': { $regex: regex } },
          { 'title.ar': { $regex: regex } },
          { 'category.en': { $regex: regex } },
          { 'category.ar': { $regex: regex } },
          { slug: { $regex: regex } }
        ];
      }
      if (status) {
        const s = status.toUpperCase();
        if (s === 'PUBLISHED') query.isPublished = true;
        else if (s === 'DRAFT') query.isPublished = false;
        else if (s === 'FEATURED') query.featured = true;
      }
      if (category && category !== 'ALL' && category !== 'all') {
        query.$or = [
          { 'category.en': { $regex: new RegExp(`^${category}$`, 'i') } },
          { 'category.ar': { $regex: new RegExp(`^${category}$`, 'i') } }
        ];
      }

      const { items, total } = await this._repository.findPaginated(query, page, limit);
      const totalPages = Math.ceil(total / limit);

      if (!items || items.length === 0) {
        return {
          success: true,
          message: total === 0 ? 'No blogs found' : 'No results for this page',
          data: [],
          pagination: { total, page, limit, totalPages, hasNext: false, hasPrev: page > 1 }
        };
      }

      return {
        success: true,
        message: 'Blogs retrieved successfully',
        data: BaseMapper.toDTOList(items),
        pagination: {
          total, page, limit, totalPages,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error: SafeAny) {
      console.error('Error in getBlogsPaginated:', error);
      return { success: false, message: 'Failed to retrieve blogs' };
    }
  }

  async getBlogById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid blog ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Blog not found' };
      return { success: true, message: 'Blog retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getBlogById:', error);
      return { success: false, message: 'Failed to retrieve blog' };
    }
  }

  async getBlogBySlug(slug: string) {
    try {
      if (!slug || slug.trim() === '') {
        return { success: false, message: 'Blog slug is required' };
      }
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Blog not found' };
      return { success: true, message: 'Blog retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getBlogBySlug:', error);
      return { success: false, message: 'Failed to retrieve blog' };
    }
  }

  async createBlog(data: SafeAny) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(data, BLOG_FIELDS, {});
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const newItem = await this._repository.create(toSave);
      if (!newItem) return { success: false, message: 'Failed to create blog' };

      return { success: true, message: 'Blog created and translated successfully.', data: BaseMapper.toDTO(newItem) };
    } catch (error: SafeAny) {
      console.error('Error in createBlog:', error);
      if (error?.code === 11000) return { success: false, message: 'A blog with this slug already exists.' };
      return { success: false, message: 'Failed to create blog' };
    }
  }

  async updateBlog(id: string, data: SafeAny) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid blog ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Blog not found' };

      const existingMeta = (existing as SafeAny).translationMeta || {};
      const existingDoc = (existing as SafeAny).toObject ? (existing as SafeAny).toObject() : existing;

      const { updatedData, translationMeta, status } = await autoTranslate(data, BLOG_FIELDS, existingMeta, existingDoc);
      const toSave = {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      };

      const updatedItem = await this._repository.update(id, toSave);
      if (!updatedItem) return { success: false, message: 'Failed to update blog' };

      return { success: true, message: 'Blog updated and translated successfully.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: SafeAny) {
      console.error('Error in updateBlog:', error);
      if (error?.code === 11000) return { success: false, message: 'A blog with this slug already exists.' };
      return { success: false, message: 'Failed to update blog' };
    }
  }

  async deleteBlog(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid blog ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Blog not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Blog deleted successfully' };
    } catch (error: SafeAny) {
      console.error('Error in deleteBlog:', error);
      return { success: false, message: 'Failed to delete blog' };
    }
  }

  /** Background: translate and silently update the document */
  private async _translateAndUpdate(id: string, docData: SafeAny, existingMeta: Record<string, string>) {
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
