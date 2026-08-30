import { handleError } from '../../utils/errorHandler';
import { projectSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IProjectController } from '../interfaces/IProjectController';
import { IProjectService } from '../../services/interfaces/IProjectService';


export class ProjectController implements IProjectController {
  private _service: IProjectService;

  constructor(service: IProjectService) {
    this._service = service;
  }
  getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 100; // Use 100 as default to support existing public endpoints
      const search = req.query.search as string;
      const status = req.query.status as string;

      const result = await this._service.getProjectsPaginated({ page, limit, search, status });
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getProjectById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getProjectBySlug(req.params.slug as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = projectSchema.parse(req.body);
      const result = await this._service.createProject(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = projectSchema.parse(req.body);
      const result = await this._service.updateProject(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteProject(req.params.id as string);
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
