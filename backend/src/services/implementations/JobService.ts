import { IJobService } from '../interfaces/IJobService';
import { IJobRepository } from '../../repositories/interfaces/IJobRepository';

export class JobService implements IJobService {
  private repository: IJobRepository;

  constructor(repository: IJobRepository) {
    this.repository = repository;
  }

  async getAllJobs(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async getJobById(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }

  async createJob(data: any): Promise<any> {
    return await this.repository.create(data);
  }
  async updateJob(id: string, data: any): Promise<any | null> {
    return await this.repository.update(id, data);
  }
  async deleteJob(id: string): Promise<any | null> {
    return await this.repository.delete(id);
  }
}
