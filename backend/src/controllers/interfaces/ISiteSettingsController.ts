import { Request, Response } from 'express';

export interface ISiteSettingsController {
  getSiteSettingss(req: Request, res: Response): Promise<void>;
  getSiteSettingsById(req: Request, res: Response): Promise<void>;

  createSiteSettings(req: Request, res: Response): Promise<void>;
  updateSiteSettings(req: Request, res: Response): Promise<void>;
  deleteSiteSettings(req: Request, res: Response): Promise<void>;
}
