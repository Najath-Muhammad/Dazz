import { handleError } from '../../utils/errorHandler';
import { jobApplicationSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../utils/constants';
import { IJobApplicationController } from '../interfaces/IJobApplicationController';
import { IJobApplicationService } from '../../services/interfaces/IJobApplicationService';


export class JobApplicationController implements IJobApplicationController {
  private _service: IJobApplicationService;

  constructor(service: IJobApplicationService) {
    this._service = service;
  }
  getApplications = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 100;
      const search = req.query.search as string;
      const status = req.query.status as string;

      const result = await this._service.getApplicationsPaginated({ page, limit, search, status });
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getApplicationById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getApplicationById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getApplicationsByJobId = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getApplicationsByJobId(req.params.jobId as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createApplication = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = jobApplicationSchema.parse(req.body);
      const result = await this._service.createApplication(validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      const result = await this._service.updateApplicationStatus(req.params.id as string, status);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  deleteApplication = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteApplication(req.params.id as string);
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
