export interface IContactMessageService {
  getAllContactMessages(): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getContactMessageById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;

  createContactMessage(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateContactMessage(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteContactMessage(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
