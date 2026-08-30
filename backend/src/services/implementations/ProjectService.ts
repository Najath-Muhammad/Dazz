import { IProjectService } from '../interfaces/IProjectService';
import { IProjectRepository } from '../../repositories/interfaces/IProjectRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

const PROJECT_FIELDS = TRANSLATABLE_FIELDS.Project;

export class ProjectService implements IProjectService {
  private _repository: IProjectRepository;

  constructor(repository: IProjectRepository) {
    this._repository = repository;
  }

  async getAllProjects() {
    try {
      const items = await this._repository.findAll();
      if (!items || items.length === 0) {
        return { success: true, message: 'No projects found', data: [] };
      }
      return { success: true, message: 'Projects retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: any) {
      console.error('Error in getAllProjects:', error);
      return { success: false, message: 'Failed to retrieve projects' };
    }
  }

  async getProjectsPaginated({ search, status, page, limit }: { search?: string; status?: string; page: number; limit: number }) {
    try {
      const query: any = {};
      if (search) {
        query['title.en'] = { $regex: search, $options: 'i' };
      }
      if (status === 'published') {
        query.isPublished = true;
      } else if (status === 'draft') {
        query.isPublished = false;
      }

      const { items, total } = await this._repository.findPaginated(query, page, limit);
      const totalPages = Math.ceil(total / limit);

      if (!items || items.length === 0) {
        return {
          success: true,
          message: total === 0 ? 'No projects found' : 'No results for this page',
          data: [],
          pagination: { total, page, limit, totalPages, hasNext: false, hasPrev: page > 1 }
        };
      }

      return {
        success: true,
        message: 'Projects retrieved successfully',
        data: BaseMapper.toDTOList(items),
        pagination: {
          total, page, limit, totalPages,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error: any) {
      console.error('Error in getProjectsPaginated:', error);
      return { success: false, message: 'Failed to retrieve projects' };
    }
  }

  async getProjectById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid project ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Project not found' };
      return { success: true, message: 'Project retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: any) {
      console.error('Error in getProjectById:', error);
      return { success: false, message: 'Failed to retrieve project' };
    }
  }

  async getProjectBySlug(slug: string) {
    try {
      if (!slug || slug.trim() === '') {
        return { success: false, message: 'Project slug is required' };
      }
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Project not found' };
      return { success: true, message: 'Project retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: any) {
      console.error('Error in getProjectBySlug:', error);
      return { success: false, message: 'Failed to retrieve project' };
    }
  }

  async createProject(data: any) {
    try {
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to create project' };
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Project created. Arabic translation in progress.', data: BaseMapper.toDTO(newItem) };
    } catch (error: any) {
      console.error('Error in createProject:', error);
      if (error?.code === 11000) return { success: false, message: 'A project with this slug already exists.' };
      return { success: false, message: 'Failed to create project' };
    }
  }

  async updateProject(id: string, data: any) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid project ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Project not found' };

      const updatedItem = await this._repository.update(id, data);
      if (!updatedItem) return { success: false, message: 'Failed to update project' };

      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Project updated. Arabic translation in progress.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: any) {
      console.error('Error in updateProject:', error);
      if (error?.code === 11000) return { success: false, message: 'A project with this slug already exists.' };
      return { success: false, message: 'Failed to update project' };
    }
  }

  async deleteProject(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid project ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Project not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Project deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteProject:', error);
      return { success: false, message: 'Failed to delete project' };
    }
  }

  private async _translateAndUpdate(id: string, docData: any, existingMeta: Record<string, string>) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(docData, PROJECT_FIELDS, existingMeta);
      await this._repository.update(id, {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      });
      console.log(`[ProjectService] Translation ${status} for project ${id}`);
    } catch (err) {
      console.error(`[ProjectService] Background translation failed for project ${id}:`, err);
      await this._repository.update(id, { translationStatus: { ar: 'failed' } });
    }
  }
}
