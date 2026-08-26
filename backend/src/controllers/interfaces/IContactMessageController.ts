import { Request, Response } from 'express';

export interface IContactMessageController {
  getContactMessages(req: Request, res: Response): Promise<void>;
  getContactMessageById(req: Request, res: Response): Promise<void>;

  createContactMessage(req: Request, res: Response): Promise<void>;
  updateContactMessage(req: Request, res: Response): Promise<void>;
  deleteContactMessage(req: Request, res: Response): Promise<void>;
}
