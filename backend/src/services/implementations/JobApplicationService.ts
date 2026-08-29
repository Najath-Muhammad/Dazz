import { IJobApplicationService } from '../interfaces/IJobApplicationService';
import { IJobApplicationRepository } from '../../repositories/interfaces/IJobApplicationRepository';

export class JobApplicationService implements IJobApplicationService {
  private _repository: IJobApplicationRepository;

  constructor(repository: IJobApplicationRepository) {
    this._repository = repository;
  }
  async getAllApplications() {
    try {
      const items = await this._repository.findAll();
      return { success: true, message: 'Applications retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getAllApplications:', error);
      return { success: false, message: 'Failed to retrieve applications' };
    }
  }
  async getApplicationById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Application not found' };
      return { success: true, message: 'Application retrieved successfully', data: item };
    } catch (error: any) {
      console.error('Error in getApplicationById:', error);
      return { success: false, message: 'Failed to retrieve application' };
    }
  }
  async getApplicationsByJobId(jobId: string) {
    try {
      const items = await this._repository.findByJobId(jobId);
      return { success: true, message: 'Applications retrieved successfully', data: items };
    } catch (error: any) {
      console.error('Error in getApplicationsByJobId:', error);
      return { success: false, message: 'Failed to retrieve applications' };
    }
  }
  async createApplication(data: any) {
    try {
      const newItem = await this._repository.create(data);
      return { success: true, message: 'Application submitted successfully', data: newItem };
    } catch (error: any) {
      console.error('Error in createApplication:', error);
      return { success: false, message: 'Failed to submit application' };
    }
  }
  async updateApplicationStatus(id: string, status: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Application not found' };
      
      const updatedItem = await this._repository.update(id, { status });
      return { success: true, message: 'Application status updated successfully', data: updatedItem };
    } catch (error: any) {
      console.error('Error in updateApplicationStatus:', error);
      return { success: false, message: 'Failed to update application status' };
    }
  }
  async deleteApplication(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Application not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Application deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteApplication:', error);
      return { success: false, message: 'Failed to delete application' };
    }
  }
}
