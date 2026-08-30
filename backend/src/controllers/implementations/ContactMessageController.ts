import { handleError } from '../../utils/errorHandler';
import { contactMessageSchema } from '../../validations/entityValidations';
import { Request, Response } from 'express';
import { successResponse, errorResponse } from '@najathm/api-response';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../../utils/constants';
import { IContactMessageController } from '../interfaces/IContactMessageController';
import { IContactMessageService } from '../../services/interfaces/IContactMessageService';
import { sendAdminNotification } from '../../utils/emailService';
import SiteSettings from '../../models/SiteSettings';


export class ContactMessageController implements IContactMessageController {
  private _service: IContactMessageService;

  constructor(service: IContactMessageService) {
    this._service = service;
  }
  getContactMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getAllContactMessages();
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  getContactMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.getContactMessageById(req.params.id as string);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  createContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);

      // Send email notification to admin asynchronously
      try {
        const settings = await SiteSettings.findOne();
        const adminEmail = settings?.contactEmail || process.env.ADMIN_EMAIL;
        
        if (adminEmail) {
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e293b;">New Contact Enquiry</h2>
              <p>You have received a new message from the Dazz Tradlink Contact Form:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 120px;">Name:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">${validatedData.fullName}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Email:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">${validatedData.email}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Phone:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">${validatedData.phone || 'N/A'}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Company:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">${validatedData.company || 'N/A'}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Subject:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">${validatedData.subject || 'N/A'}</td></tr>
              </table>
              <h4 style="margin-top: 20px;">Message:</h4>
              <p style="background-color: #f8fafc; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${validatedData.message}</p>
              <p style="font-size: 12px; color: #64748b; margin-top: 30px;">This is an automated notification from the Dazz Tradlink platform.</p>
            </div>
          `;
          
          // Send asynchronously without awaiting to avoid blocking the API response
          console.log(`Sending email to: ${adminEmail}`);
          sendAdminNotification({
            to: adminEmail,
            subject: `New Contact Enquiry: ${validatedData.subject || 'No Subject'} - ${validatedData.fullName}`,
            html: emailHtml
          });
        }
      } catch (emailError) {
        console.error('Failed to dispatch admin email:', emailError);
      }

      res.status(HTTP_STATUS.CREATED).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      handleError(res, error);
    }
  };
  updateContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      const result = await this._service.updateContactMessage(req.params.id as string, validatedData);
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };
  updateContactMessageStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      if (!['NEW', 'READ', 'IN PROGRESS', 'RESOLVED'].includes(status)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Invalid status' });
        return;
      }
      const result = await this._service.updateContactMessage(req.params.id as string, { status });
      if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
        return;
      }
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      handleError(res, error);
    }
  };

  deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this._service.deleteContactMessage(req.params.id as string);
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
