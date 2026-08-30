export interface IJobService {
  getAllJobs(): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getJobsPaginated(params: { search?: string; status?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: SafeAny[]; pagination?: SafeAny }>;
  getJobById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  getJobBySlug(slug: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;

  createJob(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateJob(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteJob(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
