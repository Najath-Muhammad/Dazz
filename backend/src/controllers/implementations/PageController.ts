import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IPageController } from '../interfaces/IPageController';
import { IPageService } from '../../services/interfaces/IPageService';

export class PageController implements IPageController {
  private service: IPageService;

  constructor(service: IPageService) {
    this.service = service;
  }

  getPages = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.getAllPages();
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, items));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getPageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.getPageById(req.params.id as string);
      if (!item) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, item));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };



  createPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.service.createPage(req.body);
      res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(RESPONSE_MESSAGES.CREATED, newItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  updatePage = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.service.updatePage(req.params.id as string, req.body);
      if (!updatedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, updatedItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  deletePage = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.service.deletePage(req.params.id as string);
      if (!deletedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.DELETED));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };
}
