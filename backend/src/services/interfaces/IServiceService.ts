export interface IServiceService {
  getAllServices(isAdmin: boolean): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getServicesPaginated(params: { search?: string; status?: string; category?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: SafeAny[]; pagination?: SafeAny }>;
  getServiceBySlug(slug: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  getServiceById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  createService(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateService(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteService(id: string): Promise<{ success: boolean; message: string }>;
  duplicateService(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
