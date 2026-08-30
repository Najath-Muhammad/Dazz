import { IProjectService } from '../interfaces/IProjectService';
import { IProjectRepository } from '../../repositories/interfaces/IProjectRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';

const PROJECT_FIELDS = TRANSLATABLE_FIELDS.Project;

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
      
      return { 
        success: true, 
        message: 'Projects retrieved successfully', 
        data: items,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error: any) {
      console.error('Error in getProjectsPaginated:', error);
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
      const newItem = await this._repository.create(data);
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Project created. Arabic translation in progress.', data: newItem };
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
      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Project updated. Arabic translation in progress.', data: updatedItem };
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
