import { IBlogRepository } from '../interfaces/IBlogRepository';
import Blog from '../../models/Blog';

export class BlogRepository implements IBlogRepository {
  async findAll(): Promise<SafeAny[]> {
    return await Blog.find();
  }
  async findPaginated(query: object, page: number, limit: number): Promise<{ items: SafeAny[], total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(query)
    ]);
    return { items, total };
  }
  async findById(id: string): Promise<any | null> {
    return await Blog.findById(id);
  }
  async findBySlug(slug: string): Promise<any | null> {
    return await Blog.findOne({ slug });
  }
  async create(data: SafeAny): Promise<SafeAny> {
    const newItem = new Blog(data);
    return await newItem.save();
  }
  async update(id: string, data: SafeAny): Promise<any | null> {
    return await Blog.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  }
  async delete(id: string): Promise<any | null> {
    return await Blog.findByIdAndDelete(id);
  }
}
