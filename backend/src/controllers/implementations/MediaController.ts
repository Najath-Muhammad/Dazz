import { Request, Response } from 'express';
import { IMediaController } from '../interfaces/IMediaController';
import { IMediaService } from '../../services/interfaces/IMediaService';
import { HTTP_STATUS } from '../../utils/constants';
import { handleError } from '../../utils/errorHandler';

export class MediaController implements IMediaController {
  private _service: IMediaService;

  constructor(service: IMediaService) {
    this._service = service;
  }

  uploadMedia = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'No file provided' });
        return;
      }
      const folder = req.body.folder || 'dazz/general';
      const resourceType = req.body.resourceType || 'auto';
      
      const result = await this._service.uploadMedia(req.file.buffer, folder, resourceType);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  validateUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Invalid URL provided' });
        return;
      }
      
      const result = await this._service.validateUrl(url);
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
