import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IJobController } from '../interfaces/IJobController';
import { IJobService } from '../../services/interfaces/IJobService';

export class JobController implements IJobController {
  private service: IJobService;

  constructor(service: IJobService) {
    this.service = service;
  }

  getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.getAllJobs();
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, items));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.getJobById(req.params.id as string);
      if (!item) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, item));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };



  createJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.service.createJob(req.body);
      res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(RESPONSE_MESSAGES.CREATED, newItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  updateJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.service.updateJob(req.params.id as string, req.body);
      if (!updatedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, updatedItem));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.service.deleteJob(req.params.id as string);
      if (!deletedItem) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.DELETED));
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };
}
