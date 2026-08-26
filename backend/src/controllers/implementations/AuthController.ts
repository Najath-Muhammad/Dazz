import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
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
        res.status(HTTP_STATUS.UNAUTHORIZED).json(ApiResponse.error(RESPONSE_MESSAGES.INVALID_CREDENTIALS));
        return;
      }
      
      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, result));
    } catch (error) {
      console.error('Login Error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  getMe = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(ApiResponse.error(RESPONSE_MESSAGES.UNAUTHORIZED));
        return;
      }

      const admin = await this.service.getMe(user.id);
      if (!admin) {
        res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND));
        return;
      }

      res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, admin));
    } catch (error) {
      console.error('GetMe Error:', error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS));
  };
}
