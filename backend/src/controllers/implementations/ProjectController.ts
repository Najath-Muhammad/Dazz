import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IProjectController } from '../interfaces/IProjectController';
import { IProjectService } from '../../services/interfaces/IProjectService';

export class ProjectController implements IProjectController {
  private service: IProjectService;

  constructor(service: IProjectService) {
    this.service = service;
  }

  getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.getAllProjects();
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, items));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.getProjectById(req.params.id as string);
      if (!item) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, item));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.getProjectBySlug(req.params.slug as string);
      if (!item) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, item));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.service.createProject(req.body);
      res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(RESPONSE_MESSAGES.CREATED, newItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.service.updateProject(req.params.id as string, req.body);
      if (!updatedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, updatedItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.service.deleteProject(req.params.id as string);
      if (!deletedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.DELETED));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };
}
