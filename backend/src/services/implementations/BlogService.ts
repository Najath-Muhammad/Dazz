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
      if (search) {
        query['title.en'] = { $regex: search, $options: 'i' };
      }
      if (status === 'published') {
        query.isPublished = true;
      } else if (status === 'draft') {
        query.isPublished = false;
      }
      if (category && category !== 'ALL') {
        query['category.en'] = { $regex: new RegExp(`^${category}$`, 'i') };
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
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to create blog' };
      // Fire-and-forget background translation
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Blog created. Arabic translation in progress.', data: BaseMapper.toDTO(newItem) };
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

      const updatedItem = await this._repository.update(id, data);
      if (!updatedItem) return { success: false, message: 'Failed to update blog' };

      // Fire-and-forget background translation
      const existingMeta = (existing as SafeAny).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Blog updated. Arabic translation in progress.', data: BaseMapper.toDTO(updatedItem) };
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
