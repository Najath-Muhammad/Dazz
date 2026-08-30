import { IPageService } from '../interfaces/IPageService';
import { IPageRepository } from '../../repositories/interfaces/IPageRepository';
import { BaseMapper } from '../../mappers';

export class PageService implements IPageService {
  private _repository: IPageRepository;

  constructor(repository: IPageRepository) {
    this._repository = repository;
  }
  async getAllPages() {
    try {
      const items = await this._repository.findAll();
      return { success: true, message: 'Pages retrieved successfully', data: BaseMapper.toDTOList(items) };
    } catch (error: any) {
      console.error('Error in getAllPages:', error);
      return { success: false, message: 'Failed to retrieve Pages' };
    }
  }
  async getPageById(id: string) {
    try {
      const item = await this._repository.findById(id);
      if (!item) return { success: false, message: 'Page not found' };
      return { success: true, message: 'Page retrieved successfully', data: BaseMapper.toDTO(item) };
    } catch (error: any) {
      console.error('Error in getPageById:', error);
      return { success: false, message: 'Failed to retrieve Page' };
    }
  }
  async createPage(data: any) {
    try {
      // Check edge cases here if needed, like manually checking if slug exists, though mongo throws 11000
      const newItem = await this._repository.create(data);
      return { success: true, message: 'Page created successfully', data: BaseMapper.toDTO(newItem) };
    } catch (error: any) {
      console.error('Error in createPage:', error);
      if (error?.code === 11000) return { success: false, message: 'A Page with this unique identifier already exists.' };
      return { success: false, message: 'Failed to create Page' };
    }
  }
  async updatePage(id: string, data: any) {
    try {
      const updatedItem = await this._repository.update(id, data);
      return { success: true, message: 'Page updated successfully', data: BaseMapper.toDTO(updatedItem) };
    } catch (error: any) {
      console.error('Error in updatePage:', error);
      if (error?.code === 11000) return { success: false, message: 'A Page with this unique identifier already exists.' };
      return { success: false, message: 'Failed to update Page' };
    }
  }
  async deletePage(id: string) {
    try {
      const existing = await this._repository.findById(id);
      if (!existing) return { success: false, message: 'Page not found' };

      await this._repository.delete(id);
      return { success: true, message: 'Page deleted successfully' };
    } catch (error: any) {
      console.error('Error in deletePage:', error);
      return { success: false, message: 'Failed to delete Page' };
    }
  }
}
