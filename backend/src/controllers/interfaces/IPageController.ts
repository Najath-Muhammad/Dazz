import { Request, Response } from 'express';

export interface IPageController {
  getPages(req: Request, res: Response): Promise<void>;
  getPageById(req: Request, res: Response): Promise<void>;

  createPage(req: Request, res: Response): Promise<void>;
  updatePage(req: Request, res: Response): Promise<void>;
  deletePage(req: Request, res: Response): Promise<void>;
}
