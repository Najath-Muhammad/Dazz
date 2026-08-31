import { IJobApplicationService } from '../interfaces/IJobApplicationService';
import { IJobApplicationRepository } from '../../repositories/interfaces/IJobApplicationRepository';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

const ALLOWED_STATUSES = ['pending', 'reviewed', 'shortlisted', 'rejected'];

export class JobApplicationService implements IJobApplicationService {
  private _repository: IJobApplicationRepository;

  constructor(repository: IJobApplicationRepository) {
    this._repository = repository;
  }

  async getAllApplications() {
    try {
      const items = await this._repository.findAll();
      if (!items || items.length === 0) {
        return { success: true, message: 'No applications found', data: [] };
      }
      return { success: true, message: 'Applications retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: SafeAny) {
      console.error('Error in getAllApplications:', error);
      return { success: false, message: 'Failed to retrieve applications' };
    }
  }

  async getApplicationsPaginated({ search, status, page, limit }: { search?: string; status?: string; page: number; limit: number }) {
    try {
      const query: SafeAny = {};
      if (search) {
        query['$or'] = [
          { candidateName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
      if (status && status !== 'ALL' && status !== 'all') {
        query.status = { $regex: new RegExp(`^${status}$`, 'i') };
      }

      const { items, total } = await this._repository.findPaginated(query, page, limit);
      const totalPages = Math.ceil(total / limit);

      if (!items || items.length === 0) {
        return {
          success: true,
          message: total === 0 ? 'No applications found' : 'No results for this page',
          data: [],
          pagination: { total, page, limit, totalPages, hasNext: false, hasPrev: page > 1 }
        };
      }

      return {
        success: true,
        message: 'Applications retrieved successfully',
        data: BaseMapper.toDTOList(items),
        pagination: {
          total, page, limit, totalPages,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error: SafeAny) {
      console.error('Error in getApplicationsPaginated:', error);
      return { success: false, message: 'Failed to retrieve applications' };
    }
  }

  async getApplicationById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid application ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Application not found' };
      return { success: true, message: 'Application retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getApplicationById:', error);
      return { success: false, message: 'Failed to retrieve application' };
    }
  }

  async getApplicationsByJobId(jobId: string) {
    try {
      if (!isValidObjectId(jobId)) {
        return { success: false, message: 'Invalid job ID format' };
      }
      const items = await this._repository.findByJobId(jobId);
      if (!items || items.length === 0) {
        return { success: true, message: 'No applications found for this job', data: [] };
      }
      return { success: true, message: 'Applications retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: SafeAny) {
      console.error('Error in getApplicationsByJobId:', error);
      return { success: false, message: 'Failed to retrieve applications' };
    }
  }

  async createApplication(data: SafeAny) {
    try {
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to submit application' };
      return { success: true, message: 'Application submitted successfully', data: BaseMapper.toDTO(newItem) };
    } catch (error: SafeAny) {
      console.error('Error in createApplication:', error);
      return { success: false, message: 'Failed to submit application' };
    }
  }

  async updateApplicationStatus(id: string, status: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid application ID format' };
      }
      if (!status || !ALLOWED_STATUSES.includes(status)) {
        return { success: false, message: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(', ')}` };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Application not found' };

      if ((existing as SafeAny).status === status) {
        return { success: true, message: 'Application status is already up to date', data: BaseMapper.toDTO(existing) };
      }

      const updatedItem = await this._repository.update(id, { status });
      if (!updatedItem) return { success: false, message: 'Failed to update application status' };
      return { success: true, message: 'Application status updated successfully', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: SafeAny) {
      console.error('Error in updateApplicationStatus:', error);
      return { success: false, message: 'Failed to update application status' };
    }
  }

  async deleteApplication(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid application ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Application not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Application deleted successfully' };
    } catch (error: SafeAny) {
      console.error('Error in deleteApplication:', error);
      return { success: false, message: 'Failed to delete application' };
    }
  }
}
