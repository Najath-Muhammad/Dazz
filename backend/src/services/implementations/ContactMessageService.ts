import { IContactMessageService } from '../interfaces/IContactMessageService';
import { IContactMessageRepository } from '../../repositories/interfaces/IContactMessageRepository';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

export class ContactMessageService implements IContactMessageService {
  private _repository: IContactMessageRepository;

  constructor(repository: IContactMessageRepository) {
    this._repository = repository;
  }

  async getAllContactMessages() {
    try {
      const items = await this._repository.findAll();
      if (!items || items.length === 0) {
        return { success: true, message: 'No contact messages found', data: [] };
      }
      return { success: true, message: 'Contact messages retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: SafeAny) {
      console.error('Error in getAllContactMessages:', error);
      return { success: false, message: 'Failed to retrieve contact messages' };
    }
  }

  async getContactMessageById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid contact message ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Contact message not found' };
      return { success: true, message: 'Contact message retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getContactMessageById:', error);
      return { success: false, message: 'Failed to retrieve contact message' };
    }
  }

  async createContactMessage(data: SafeAny) {
    try {
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to submit contact message' };
      return { success: true, message: 'Contact message submitted successfully', data: BaseMapper.toDTO(newItem) };
    } catch (error: SafeAny) {
      console.error('Error in createContactMessage:', error);
      if (error?.code === 11000) return { success: false, message: 'A contact message with this unique identifier already exists.' };
      return { success: false, message: 'Failed to submit contact message' };
    }
  }

  async updateContactMessage(id: string, data: SafeAny) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid contact message ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Contact message not found' };

      const updatedItem = await this._repository.update(id, data);
      if (!updatedItem) return { success: false, message: 'Failed to update contact message' };
      return { success: true, message: 'Contact message updated successfully', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: SafeAny) {
      console.error('Error in updateContactMessage:', error);
      if (error?.code === 11000) return { success: false, message: 'A contact message with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update contact message' };
    }
  }

  async deleteContactMessage(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid contact message ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Contact message not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Contact message deleted successfully' };
    } catch (error: SafeAny) {
      console.error('Error in deleteContactMessage:', error);
      return { success: false, message: 'Failed to delete contact message' };
    }
  }
}
