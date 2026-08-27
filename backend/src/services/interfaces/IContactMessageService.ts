export interface IContactMessageService {
  getAllContactMessages(): Promise<{ success: boolean; message: string; data?: any[] }>;
  getContactMessageById(id: string): Promise<{ success: boolean; message: string; data?: any }>;

  createContactMessage(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateContactMessage(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deleteContactMessage(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
