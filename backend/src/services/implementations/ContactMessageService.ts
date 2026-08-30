import { IContactMessageService } from '../interfaces/IContactMessageService';
import { IContactMessageRepository } from '../../repositories/interfaces/IContactMessageRepository';
import { BaseMapper } from '../../mappers';

export class ContactMessageService implements IContactMessageService {
  private _repository: IContactMessageRepository;

  constructor(repository: IContactMessageRepository) {
    this._repository = repository;
  }
  async getAllContactMessages() {
    try {
      const items = await this._repository.findAll();
      return { success: true, message: 'ContactMessages retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: any) {
      console.error('Error in getAllContactMessages:', error);
      return { success: false, message: 'Failed to retrieve ContactMessages' };
    }
  }
  async getContactMessageById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'ContactMessage not found' };
      return { success: true, message: 'ContactMessage retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: any) {
      console.error('Error in getContactMessageById:', error);
      return { success: false, message: 'Failed to retrieve ContactMessage' };
    }
  }
  async createContactMessage(data: any) {
    try {
      // Check edge cases here if needed, like manually checking if slug exists, though mongo throws 11000
      const newItem = await this._repository.create(data);
      return { success: true, message: 'ContactMessage created successfully', data: BaseMapper.toDTO(newItem) };
    } catch (error: any) {
      console.error('Error in createContactMessage:', error);
      if (error?.code === 11000) return { success: false, message: 'A ContactMessage with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create ContactMessage' };
    }
  }
  async updateContactMessage(id: string, data: any) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'ContactMessage not found' };
      
      const updatedItem = await this._repository.update(id, data);
      return { success: true, message: 'ContactMessage updated successfully', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: any) {
      console.error('Error in updateContactMessage:', error);
      if (error?.code === 11000) return { success: false, message: 'A ContactMessage with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update ContactMessage' };
    }
  }
  async deleteContactMessage(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'ContactMessage not found' };

      await this._repository.delete(id);
      return { success: true, message: 'ContactMessage deleted successfully' };
    } catch (error: any) {
      console.error('Error in deleteContactMessage:', error);
      return { success: false, message: 'Failed to delete ContactMessage' };
    }
  }
}
