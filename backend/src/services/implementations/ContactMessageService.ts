import { IContactMessageService } from '../interfaces/IContactMessageService';
import { IContactMessageRepository } from '../../repositories/interfaces/IContactMessageRepository';

export class ContactMessageService implements IContactMessageService {
  private repository: IContactMessageRepository;

  constructor(repository: IContactMessageRepository) {
    this.repository = repository;
  }

  async getAllContactMessages(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async getContactMessageById(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }

  async createContactMessage(data: any): Promise<any> {
    return await this.repository.create(data);
  }
  async updateContactMessage(id: string, data: any): Promise<any | null> {
    return await this.repository.update(id, data);
  }
  async deleteContactMessage(id: string): Promise<any | null> {
    return await this.repository.delete(id);
  }
}
