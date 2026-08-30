export interface IServiceService {
  getAllServices(isAdmin: boolean): Promise<{ success: boolean; message: string; data?: any[] }>;
  getServicesPaginated(params: { search?: string; status?: string; category?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: any[]; pagination?: any }>;
  getServiceBySlug(slug: string): Promise<{ success: boolean; message: string; data?: any }>;
  getServiceById(id: string): Promise<{ success: boolean; message: string; data?: any }>;
  createService(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateService(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deleteService(id: string): Promise<{ success: boolean; message: string }>;
  duplicateService(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
