import { IJobService } from '../interfaces/IJobService';
import { IJobRepository } from '../../repositories/interfaces/IJobRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

const JOB_FIELDS = TRANSLATABLE_FIELDS.Job;

export class JobService implements IJobService {
  private _repository: IJobRepository;

  constructor(repository: IJobRepository) {
    this._repository = repository;
  }

  async getAllJobs() {
    try {
      const items = await this._repository.findAll();
      if (!items || items.length === 0) {
        return { success: true, message: 'No jobs found', data: [] };
      }
      return { success: true, message: 'Jobs retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: any) {
      console.error('Error in getAllJobs:', error);
      return { success: false, message: 'Failed to retrieve jobs' };
    }
  }

  async getJobsPaginated({ search, status, page, limit }: { search?: string; status?: string; page: number; limit: number }) {
    try {
      const query: any = {};
      if (search) {
        query['$or'] = [
          { 'title.en': { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }
      if (status === 'published') {
        query.isActive = true;
      } else if (status === 'draft') {
        query.isActive = false;
      }

      const { items, total } = await this._repository.findPaginated(query, page, limit);
      const totalPages = Math.ceil(total / limit);

      if (!items || items.length === 0) {
        return {
          success: true,
          message: total === 0 ? 'No jobs found' : 'No results for this page',
          data: [],
          pagination: { total, page, limit, totalPages, hasNext: false, hasPrev: page > 1 }
        };
      }

      return {
        success: true,
        message: 'Jobs retrieved successfully',
        data: BaseMapper.toDTOList(items),
        pagination: {
          total, page, limit, totalPages,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error: any) {
      console.error('Error in getJobsPaginated:', error);
      return { success: false, message: 'Failed to retrieve jobs' };
    }
  }

  async getJobById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid job ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Job not found' };
      return { success: true, message: 'Job retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: any) {
      console.error('Error in getJobById:', error);
      return { success: false, message: 'Failed to retrieve job' };
    }
  }

  async getJobBySlug(slug: string) {
    try {
      if (!slug || slug.trim() === '') {
        return { success: false, message: 'Job slug is required' };
      }
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Job not found' };
      return { success: true, message: 'Job retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: any) {
      console.error('Error in getJobBySlug:', error);
      return { success: false, message: 'Failed to retrieve job' };
    }
  }

  async createJob(data: any) {
    try {
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to create job' };
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Job created. Arabic translation in progress.', data: BaseMapper.toDTO(newItem) };
    } catch (error: any) {
      console.error('Error in createJob:', error);
      if (error?.code === 11000) return { success: false, message: 'A job with this slug already exists.' };
      return { success: false, message: 'Failed to create job' };
    }
  }

  async updateJob(id: string, data: any) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid job ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Job not found' };

      const updatedItem = await this._repository.update(id, data);
      if (!updatedItem) return { success: false, message: 'Failed to update job' };

      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Job updated. Arabic translation in progress.', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: any) {
      console.error('Error in updateJob:', error);
      if (error?.code === 11000) return { success: false, message: 'A job with this slug already exists.' };
      return { success: false, message: 'Failed to update job' };
    }
  }

  async deleteJob(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid job ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Job not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Job deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteJob:', error);
      return { success: false, message: 'Failed to delete job' };
    }
  }

  private async _translateAndUpdate(id: string, docData: any, existingMeta: Record<string, string>) {
    try {
      const { updatedData, translationMeta, status } = await autoTranslate(docData, JOB_FIELDS, existingMeta);
      await this._repository.update(id, {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      });
      console.log(`[JobService] Translation ${status} for job ${id}`);
    } catch (err) {
      console.error(`[JobService] Background translation failed for job ${id}:`, err);
      await this._repository.update(id, { translationStatus: { ar: 'failed' } });
    }
  }
}
