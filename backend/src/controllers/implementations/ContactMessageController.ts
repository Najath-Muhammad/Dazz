import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IContactMessageController } from '../interfaces/IContactMessageController';
import { IContactMessageService } from '../../services/interfaces/IContactMessageService';

export class ContactMessageController implements IContactMessageController {
  private service: IContactMessageService;

  constructor(service: IContactMessageService) {
    this.service = service;
  }

  getContactMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.getAllContactMessages();
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, items));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getContactMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.getContactMessageById(req.params.id as string);
      if (!item) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, item));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };



  createContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.service.createContactMessage(req.body);
      res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(RESPONSE_MESSAGES.CREATED, newItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  updateContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.service.updateContactMessage(req.params.id as string, req.body);
      if (!updatedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, updatedItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.service.deleteContactMessage(req.params.id as string);
      if (!deletedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.DELETED));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };
}
