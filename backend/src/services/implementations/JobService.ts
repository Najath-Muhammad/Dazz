import { IJobService } from '../interfaces/IJobService';
import { IJobRepository } from '../../repositories/interfaces/IJobRepository';

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
  async createJob(data: any) {
    try {
      // Check edge cases here if needed, like manually checking if slug exists, though mongo throws 11000
      const newItem = await this._repository.create(data);
      return { success: true, message: 'Job created successfully', data: newItem };
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
      return { success: true, message: 'Job updated successfully', data: updatedItem };
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
}
