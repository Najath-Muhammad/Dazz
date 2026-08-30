import { Request, Response } from 'express';
export interface ITranslationController {
  translateText(req: Request, res: Response): Promise<void>;
  translateBatch(req: Request, res: Response): Promise<void>;
}
