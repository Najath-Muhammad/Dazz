import { Request, Response } from 'express';

export interface IJobController {
  getJobs(req: Request, res: Response): Promise<void>;
  getJobById(req: Request, res: Response): Promise<void>;

  createJob(req: Request, res: Response): Promise<void>;
  updateJob(req: Request, res: Response): Promise<void>;
  deleteJob(req: Request, res: Response): Promise<void>;
}
