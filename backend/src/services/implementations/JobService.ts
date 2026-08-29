import { IJobService } from '../interfaces/IJobService';
import { IJobRepository } from '../../repositories/interfaces/IJobRepository';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';

const JOB_FIELDS = TRANSLATABLE_FIELDS.Job;

export class JobService implements IJobService {
  private _repository: IJobRepository;

  constructor(repository: IJobRepository) {
    this._repository = repository;
  }
  async getAllJobs() {
    try {
      const items = await this._repository.findAll();
      return { success: true, message: 'Jobs retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getAllJobs:', error);
      return { success: false, message: 'Failed to retrieve Jobs' };
    }
  }
  async getJobById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Job not found' };
      return { success: true, message: 'Job retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getJobById:', error);
      return { success: false, message: 'Failed to retrieve Job' };
    }
  }
  async getJobBySlug(slug: string) {
    try {
      const item = await this._repository.findBySlug(slug);
      if (!item) return { success: false, message: 'Job not found' };
      return { success: true, message: 'Job retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getJobBySlug:', error);
      return { success: false, message: 'Failed to retrieve Job' };
    }
  }
  async createJob(data: any) {
    try {
      const newItem = await this._repository.create(data);
      this._translateAndUpdate(newItem._id.toString(), newItem.toObject ? newItem.toObject() : newItem, {});
      return { success: true, message: 'Job created. Arabic translation in progress.', data: newItem };
    } catch (error: any) {
      console.error('Error in createJob:', error);
      if (error?.code === 11000) return { success: false, message: 'A Job with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create Job' };
    }
  }
  async updateJob(id: string, data: any) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Job not found' };

      const updatedItem = await this._repository.update(id, data);
      const existingMeta = (existing as any).translationMeta || {};
      this._translateAndUpdate(id, updatedItem, existingMeta);
      return { success: true, message: 'Job updated. Arabic translation in progress.', data: updatedItem };
    } catch (error: any) {
      console.error('Error in updateJob:', error);
      if (error?.code === 11000) return { success: false, message: 'A Job with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update Job' };
    }
  }
  async deleteJob(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Job not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Job deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteJob:', error);
      return { success: false, message: 'Failed to delete Job' };
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
