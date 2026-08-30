import { Request, Response } from 'express';
import { ILocationController } from '../interfaces/ILocationController';
import { ILocationService } from '../../services/interfaces/ILocationService';
import { handleError } from '../../utils/errorHandler';
import { HTTP_STATUS } from '../../utils/constants';
import { locationSchema } from '../../validations/entityValidations';

export class LocationController implements ILocationController {
  private _service: ILocationService;

  constructor(service: ILocationService) {
    this._service = service;
  }
  
  getActiveLocations = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getAllLocations(true);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  getAllLocations = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getAllLocations(false);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  
  getLocationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getLocationById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  
  createLocation = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = locationSchema.parse(req.body);
      const result = await this._service.createLocation(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  
  updateLocation = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = locationSchema.parse(req.body);
      const result = await this._service.updateLocation(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  
  deleteLocation = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteLocation(req.params.id as string);
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
