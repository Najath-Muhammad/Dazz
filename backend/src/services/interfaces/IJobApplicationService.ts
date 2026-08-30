export interface IJobApplicationService {
  getAllApplications(): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getApplicationsPaginated(params: { search?: string; status?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: SafeAny[]; pagination?: SafeAny }>;
  getApplicationById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  getApplicationsByJobId(jobId: string): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;

  createApplication(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateApplicationStatus(id: string, status: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteApplication(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
