import { handleError } from '../../utils/errorHandler';
import { siteSettingsSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { ISiteSettingsController } from '../interfaces/ISiteSettingsController';
import { ISiteSettingsService } from '../../services/interfaces/ISiteSettingsService';


export class SiteSettingsController implements ISiteSettingsController {
  private _service: ISiteSettingsService;

  constructor(service: ISiteSettingsService) {
    this._service = service;
  }
  getSiteSettingss = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getAllSiteSettingss();
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getSiteSettingsById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getSiteSettingsById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createSiteSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = siteSettingsSchema.parse(req.body);
      const result = await this._service.createSiteSettings(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updateSiteSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = siteSettingsSchema.parse(req.body);
      const result = await this._service.updateSiteSettings(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  deleteSiteSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteSiteSettings(req.params.id as string);
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
