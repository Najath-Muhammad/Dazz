import { handleError } from '../../utils/errorHandler';
import { IServiceController } from '../interfaces/IServiceController';
import { IServiceService } from '../../services/interfaces/IServiceService';
import { serviceSchema } from '../../validations/serviceValidation';
import { Request, Response } from 'express';

import { successResponse, errorResponse } from '@najathm/api-response';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';



export class ServiceController implements IServiceController {
  private _service: IServiceService;

  constructor(service: IServiceService) {
    this._service = service;
  }

  getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const isAdmin = !!(req as SafeAny).user;
    
    if (isAdmin && req.query.page) {
      // If admin and using pagination
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 100;
      const search = req.query.search as string;
      const status = req.query.status as string;
      const category = req.query.category as string;

      const result = await this._service.getServicesPaginated({ page, limit, search, status, category });
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } else {
      // Public facing or non-paginated admin fetch
      const result = await this._service.getAllServices(isAdmin);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    }
  } catch (e) {
    handleError(res, e);
  }
};
  getServiceBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await this._service.getServiceBySlug(req.params.slug as string);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      return;
    }
    res.status(HTTP_STATUS.OK).json(result);
  } catch (e) {
    handleError(res, e);
  }
};
  getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await this._service.getServiceById(req.params.id as string);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      return;
    }
    res.status(HTTP_STATUS.OK).json(result);
  } catch (e) {
    handleError(res, e);
  }
};
  createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = serviceSchema.parse(req.body);
      const result = await this._service.createService(validatedData);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      return;
    }
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (e) {
    handleError(res, e);
  }
};
  updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = serviceSchema.parse(req.body);
      const result = await this._service.updateService(req.params.id as string, validatedData);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      return;
    }
    res.status(HTTP_STATUS.OK).json(result);
  } catch (e) {
    handleError(res, e);
  }
};
  deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await this._service.deleteService(req.params.id as string);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      return;
    }
    res.status(HTTP_STATUS.OK).json(result);
  } catch (e) {
    handleError(res, e);
  }
};
  duplicateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await this._service.duplicateService(req.params.id as string);
    if (!result.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      return;
    }
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (e) {
    handleError(res, e);
  }
};

}
