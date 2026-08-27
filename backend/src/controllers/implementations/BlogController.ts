import { handleError } from '../../utils/errorHandler';
import { blogSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IBlogController } from '../interfaces/IBlogController';
import { IBlogService } from '../../services/interfaces/IBlogService';


export class BlogController implements IBlogController {
  private _service: IBlogService;

  constructor(service: IBlogService) {
    this._service = service;
  }
  getBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getAllBlogs();
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getBlogById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getBlogBySlug(req.params.slug as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = blogSchema.parse(req.body);
      const result = await this._service.createBlog(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = blogSchema.parse(req.body);
      const result = await this._service.updateBlog(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteBlog(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
}
