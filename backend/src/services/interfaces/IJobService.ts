export interface IJobService {
  getAllJobs(): Promise<{ success: boolean; message: string; data?: any[] }>;
  getJobsPaginated(params: { search?: string; status?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: any[]; pagination?: any }>;
  getJobById(id: string): Promise<{ success: boolean; message: string; data?: any }>;
  getJobBySlug(slug: string): Promise<{ success: boolean; message: string; data?: any }>;

  createJob(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateJob(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deleteJob(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
