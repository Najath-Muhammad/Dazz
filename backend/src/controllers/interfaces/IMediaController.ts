import { Request, Response } from 'express';
export interface IMediaController {
  uploadMedia(req: Request, res: Response): Promise<void>;
  validateUrl(req: Request, res: Response): Promise<void>;
}
