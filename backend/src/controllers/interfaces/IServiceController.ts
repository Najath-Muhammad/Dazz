import { Request, Response } from 'express';

export interface IServiceController {
  getServices(req: Request, res: Response): Promise<void>;
  getServiceBySlug(req: Request, res: Response): Promise<void>;
  getServiceById(req: Request, res: Response): Promise<void>;
  createService(req: Request, res: Response): Promise<void>;
  updateService(req: Request, res: Response): Promise<void>;
  deleteService(req: Request, res: Response): Promise<void>;
  duplicateService(req: Request, res: Response): Promise<void>;
}
