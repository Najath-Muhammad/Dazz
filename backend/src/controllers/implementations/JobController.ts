import { handleError } from '../../utils/errorHandler';
import { jobSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { successResponse, errorResponse } from '@najathm/api-response';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IJobController } from '../interfaces/IJobController';
import { IJobService } from '../../services/interfaces/IJobService';


export class JobController implements IJobController {
  private _service: IJobService;

  constructor(service: IJobService) {
    this._service = service;
  }
  getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      const isQuerying = req.query.page || req.query.search || req.query.status;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || (isQuerying ? 10 : 100);
      const search = req.query.search as string;
      const status = req.query.status as string;

      const result = await this._service.getJobsPaginated({ page, limit, search, status });
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getJobById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getJobBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getJobBySlug(req.params.slug as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = jobSchema.parse(req.body);
      const result = await this._service.createJob(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updateJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = jobSchema.parse(req.body);
      const result = await this._service.updateJob(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  deleteJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteJob(req.params.id as string);
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
