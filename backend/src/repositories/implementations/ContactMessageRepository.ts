import { IContactMessageRepository } from '../interfaces/IContactMessageRepository';
import ContactMessage from '../../models/ContactMessage';

export class ContactMessageRepository implements IContactMessageRepository {
  async findAll(): Promise<SafeAny[]> {
    return await ContactMessage.find();
  }
  async findById(id: string): Promise<any | null> {
    return await ContactMessage.findById(id);
  }

  async create(data: SafeAny): Promise<SafeAny> {
    const newItem = new ContactMessage(data);
    return await newItem.save();
  }
  async update(id: string, data: SafeAny): Promise<any | null> {
    return await ContactMessage.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await ContactMessage.findByIdAndDelete(id);
  }
}
