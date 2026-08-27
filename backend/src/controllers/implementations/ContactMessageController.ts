import { handleError } from '../../utils/errorHandler';
import { contactMessageSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IContactMessageController } from '../interfaces/IContactMessageController';
import { IContactMessageService } from '../../services/interfaces/IContactMessageService';


export class ContactMessageController implements IContactMessageController {
  private _service: IContactMessageService;

  constructor(service: IContactMessageService) {
    this._service = service;
  }
  getContactMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getAllContactMessages();
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getContactMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getContactMessageById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      const result = await this._service.createContactMessage(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updateContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      const result = await this._service.updateContactMessage(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteContactMessage(req.params.id as string);
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
