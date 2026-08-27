import { handleError } from '../../utils/errorHandler';
import { pageSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IPageController } from '../interfaces/IPageController';
import { IPageService } from '../../services/interfaces/IPageService';


export class PageController implements IPageController {
  private _service: IPageService;

  constructor(service: IPageService) {
    this._service = service;
  }
  getPages = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getAllPages();
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getPageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getPageById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = pageSchema.parse(req.body);
      const result = await this._service.createPage(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updatePage = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = pageSchema.parse(req.body);
      const result = await this._service.updatePage(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  deletePage = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deletePage(req.params.id as string);
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
