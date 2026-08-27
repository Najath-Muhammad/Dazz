import { Request, Response } from 'express';
import { ITranslationController } from '../interfaces/ITranslationController';
import { ITranslationService } from '../../services/interfaces/ITranslationService';
import { HTTP_STATUS } from '../../utils/constants';
import { handleError } from '../../utils/errorHandler';

export class TranslationController implements ITranslationController {
  private _service: ITranslationService;

  constructor(service: ITranslationService) {
    this._service = service;
  }

  translateText = async (req: Request, res: Response): Promise<void> => {
    try {
      const { text } = req.body;
      const result = await this._service.translate(text);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  translateBatch = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fields } = req.body;
      const result = await this._service.translateBatch(fields);
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
