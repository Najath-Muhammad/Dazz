import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IBlogController } from '../interfaces/IBlogController';
import { IBlogService } from '../../services/interfaces/IBlogService';

export class BlogController implements IBlogController {
  private service: IBlogService;

  constructor(service: IBlogService) {
    this.service = service;
  }

  getBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.getAllBlogs();
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, items));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.getBlogById(req.params.id as string);
      if (!item) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, item));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.getBlogBySlug(req.params.slug as string);
      if (!item) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, item));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  createBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.service.createBlog(req.body);
      res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(RESPONSE_MESSAGES.CREATED, newItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.service.updateBlog(req.params.id as string, req.body);
      if (!updatedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, updatedItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.service.deleteBlog(req.params.id as string);
      if (!deletedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.DELETED));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };
}
