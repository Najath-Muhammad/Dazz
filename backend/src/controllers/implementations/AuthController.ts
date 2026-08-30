import { Request, Response } from 'express';
import { successResponse, errorResponse } from '@najathm/api-response';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IAuthController } from '../interfaces/IAuthController';
import { IAuthService } from '../../services/interfaces/IAuthService';

export class AuthController implements IAuthController {
  private service: IAuthService;

  constructor(service: IAuthService) {
    this.service = service;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.service.login(email, password);
      
      if (!result) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse({ message: RESPONSE_MESSAGES.INVALID_CREDENTIALS }));
        return;
      }
      
      res.status(HTTP_STATUS.OK).json(successResponse({ message: RESPONSE_MESSAGES.SUCCESS, data: result }));
    } catch (error) {
      console.error('Login Error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse({ message: RESPONSE_MESSAGES.SERVER_ERROR }));
    }
  };

  getMe = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse({ message: RESPONSE_MESSAGES.UNAUTHORIZED }));
        return;
      }

      const admin = await this.service.getMe(user.id);
      if (!admin) {
        res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse({ message: RESPONSE_MESSAGES.NOT_FOUND }));
        return;
      }

      res.status(HTTP_STATUS.OK).json(successResponse({ message: RESPONSE_MESSAGES.SUCCESS, data: admin }));
    } catch (error) {
      console.error('GetMe Error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse({ message: RESPONSE_MESSAGES.SERVER_ERROR }));
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.status(HTTP_STATUS.OK).json(successResponse({ message: RESPONSE_MESSAGES.SUCCESS, data: null }));
  };
}
