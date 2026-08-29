import { Response } from 'express';
import { ZodError } from 'zod';
import { ApiResponse } from './ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from './constants';
import { ApiError } from './ApiError';

export const handleError = (res: Response, e: any) => {
  console.error('API Error:', e);
  
  if (e instanceof ZodError || e?.name === 'ZodError') {
    const message = (e as any).errors?.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ') || e.message;
    return res.status(400).json(ApiResponse.error(message));
  }
  if (e?.code === 11000) {
    return res.status(400).json(ApiResponse.error('A record with this unique identifier already exists.'));
  }
  if (e?.name === 'ValidationError') {
    return res.status(400).json(ApiResponse.error(e.message));
  }
  if (e instanceof ApiError) {
    return res.status(e.statusCode).json(ApiResponse.error(e.message));
  }
  console.error('Unhandled Error:', e);
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(e?.message || RESPONSE_MESSAGES.SERVER_ERROR));
};
