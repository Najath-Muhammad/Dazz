export interface IContactMessageService {
  getAllContactMessages(): Promise<any[]>;
  getContactMessageById(id: string): Promise<any | null>;

  createContactMessage(data: any): Promise<any>;
  updateContactMessage(id: string, data: any): Promise<any | null>;
  deleteContactMessage(id: string): Promise<any | null>;
}
