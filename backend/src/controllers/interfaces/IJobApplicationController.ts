import { Request, Response } from 'express';

export interface IJobApplicationController {
  getApplications(req: Request, res: Response): Promise<void>;
  getApplicationById(req: Request, res: Response): Promise<void>;
  getApplicationsByJobId(req: Request, res: Response): Promise<void>;

  createApplication(req: Request, res: Response): Promise<void>;
  updateApplicationStatus(req: Request, res: Response): Promise<void>;
  deleteApplication(req: Request, res: Response): Promise<void>;
}
