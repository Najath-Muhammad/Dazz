export interface IJobApplicationService {
  getAllApplications(): Promise<{ success: boolean; message: string; data?: any[] }>;
  getApplicationsPaginated(params: { search?: string; status?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: any[]; pagination?: any }>;
  getApplicationById(id: string): Promise<{ success: boolean; message: string; data?: any }>;
  getApplicationsByJobId(jobId: string): Promise<{ success: boolean; message: string; data?: any[] }>;

  createApplication(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateApplicationStatus(id: string, status: string): Promise<{ success: boolean; message: string; data?: any }>;
  deleteApplication(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
