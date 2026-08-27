import { Request, Response } from 'express';
import { ServiceRepository } from '../repositories/implementations/ServiceRepository';
import { ApiResponse } from '../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';

const repo = new ServiceRepository();

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const isAdmin = (req as any).user;
    const services = isAdmin ? await repo.findAll() : await repo.findPublished();
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, services));
  } catch (e) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
  }
};

export const getServiceBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await repo.findBySlug(req.params.slug);
    if (!service) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, service));
  } catch (e) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
  }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await repo.findById(req.params.id);
    if (!service) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, service));
  } catch (e) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await repo.create(req.body);
    res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(RESPONSE_MESSAGES.CREATED, service));
  } catch (e: any) {
    const msg = e?.code === 11000 ? 'A service with this slug already exists.' : RESPONSE_MESSAGES.SERVER_ERROR;
    res.status(HTTP_STATUS.BAD_REQUEST).json(ApiResponse.error(msg));
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await repo.update(req.params.id, req.body);
    if (!service) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, service));
  } catch (e: any) {
    const msg = e?.code === 11000 ? 'A service with this slug already exists.' : RESPONSE_MESSAGES.SERVER_ERROR;
    res.status(HTTP_STATUS.BAD_REQUEST).json(ApiResponse.error(msg));
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await repo.delete(req.params.id);
    if (!service) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.DELETED));
  } catch (e) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
  }
};

export const duplicateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const copy = await repo.duplicate(req.params.id);
    if (!copy) { res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND)); return; }
    res.status(HTTP_STATUS.CREATED).json(ApiResponse.success('Service duplicated successfully', copy));
  } catch (e) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
  }
};
