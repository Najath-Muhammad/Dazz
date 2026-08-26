import { Request, Response } from 'express';

export interface IProjectController {
  getProjects(req: Request, res: Response): Promise<void>;
  getProjectById(req: Request, res: Response): Promise<void>;
  getProjectBySlug(req: Request, res: Response): Promise<void>;
  createProject(req: Request, res: Response): Promise<void>;
  updateProject(req: Request, res: Response): Promise<void>;
  deleteProject(req: Request, res: Response): Promise<void>;
}
