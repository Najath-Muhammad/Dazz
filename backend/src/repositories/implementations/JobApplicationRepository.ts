import { IJobApplicationRepository } from '../interfaces/IJobApplicationRepository';
import JobApplication from '../../models/JobApplication';

export class JobApplicationRepository implements IJobApplicationRepository {
  async findAll(): Promise<SafeAny[]> {
    return await JobApplication.find().populate('jobId', 'title department location');
  }
  async findPaginated(query: object, page: number, limit: number): Promise<{ items: SafeAny[], total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      JobApplication.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('jobId', 'title department location'),
      JobApplication.countDocuments(query)
    ]);
    return { items, total };
  }
  async findById(id: string): Promise<any | null> {
    return await JobApplication.findById(id).populate('jobId', 'title department location');
  }
  async findByJobId(jobId: string): Promise<SafeAny[]> {
    return await JobApplication.find({ jobId }).populate('jobId', 'title department location');
  }

  async create(data: SafeAny): Promise<SafeAny> {
    const newItem = new JobApplication(data);
    return await newItem.save();
  }
  async update(id: string, data: SafeAny): Promise<any | null> {
    return await JobApplication.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  }
  async delete(id: string): Promise<any | null> {
    return await JobApplication.findByIdAndDelete(id);
  }
}
