import { IJobApplicationRepository } from '../interfaces/IJobApplicationRepository';
import JobApplication from '../../models/JobApplication';

export class JobApplicationRepository implements IJobApplicationRepository {
  async findAll(): Promise<any[]> {
    return await JobApplication.find().populate('jobId', 'title department location');
  }
  async findById(id: string): Promise<any | null> {
    return await JobApplication.findById(id).populate('jobId', 'title department location');
  }
  async findByJobId(jobId: string): Promise<any[]> {
    return await JobApplication.find({ jobId }).populate('jobId', 'title department location');
  }

  async create(data: any): Promise<any> {
    const newItem = new JobApplication(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await JobApplication.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await JobApplication.findByIdAndDelete(id);
  }
}
