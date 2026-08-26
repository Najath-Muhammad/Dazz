import { IContactMessageRepository } from '../interfaces/IContactMessageRepository';
import ContactMessage from '../../models/ContactMessage';

export class ContactMessageRepository implements IContactMessageRepository {
  async findAll(): Promise<any[]> {
    return await ContactMessage.find();
  }
  async findById(id: string): Promise<any | null> {
    return await ContactMessage.findById(id);
  }

  async create(data: any): Promise<any> {
    const newItem = new ContactMessage(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await ContactMessage.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await ContactMessage.findByIdAndDelete(id);
  }
}
