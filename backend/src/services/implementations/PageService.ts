import { IPageService } from '../interfaces/IPageService';
import { IPageRepository } from '../../repositories/interfaces/IPageRepository';
import { BaseMapper } from '../../mappers';
import { isValidObjectId } from '../../utils/isValidObjectId';

export class PageService implements IPageService {
  private _repository: IPageRepository;

  constructor(repository: IPageRepository) {
    this._repository = repository;
  }

  async getAllPages() {
    try {
      const items = await this._repository.findAll();
      if (!items || items.length === 0) {
        return { success: true, message: 'No pages found', data: [] };
      }
      return { success: true, message: 'Pages retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: SafeAny) {
      console.error('Error in getAllPages:', error);
      return { success: false, message: 'Failed to retrieve pages' };
    }
  }

  async getPageById(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid page ID format' };
      }
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Page not found' };
      return { success: true, message: 'Page retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: SafeAny) {
      console.error('Error in getPageById:', error);
      return { success: false, message: 'Failed to retrieve page' };
    }
  }

  async createPage(data: SafeAny) {
    try {
      const newItem = await this._repository.create(data);
      if (!newItem) return { success: false, message: 'Failed to create page' };
      return { success: true, message: 'Page created successfully', data: BaseMapper.toDTO(newItem) };
    } catch (error: SafeAny) {
      console.error('Error in createPage:', error);
      if (error?.code === 11000) return { success: false, message: 'A page with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create page' };
    }
  }

  async updatePage(id: string, data: SafeAny) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid page ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Page not found' };

      const updatedItem = await this._repository.update(id, data);
      if (!updatedItem) return { success: false, message: 'Failed to update page' };
      return { success: true, message: 'Page updated successfully', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: SafeAny) {
      console.error('Error in updatePage:', error);
      if (error?.code === 11000) return { success: false, message: 'A page with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update page' };
    }
  }

  async deletePage(id: string) {
    try {
      if (!isValidObjectId(id)) {
        return { success: false, message: 'Invalid page ID format' };
      }
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Page not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Page deleted successfully' };
    } catch (error: SafeAny) {
      console.error('Error in deletePage:', error);
      return { success: false, message: 'Failed to delete page' };
    }
  }
}
