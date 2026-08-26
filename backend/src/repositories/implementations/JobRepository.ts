import { IJobRepository } from '../interfaces/IJobRepository';
import Job from '../../models/Job';

export class JobRepository implements IJobRepository {
  async findAll(): Promise<any[]> {
    return await Job.find();
  }
  async findById(id: string): Promise<any | null> {
    return await Job.findById(id);
  }

  async create(data: any): Promise<any> {
    const newItem = new Job(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await Job.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await Job.findByIdAndDelete(id);
  }
}
