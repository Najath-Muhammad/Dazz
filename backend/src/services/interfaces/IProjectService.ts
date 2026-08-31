export interface IProjectService {
  getAllProjects(): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getProjectsPaginated(params: { search?: string; status?: string; category?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: SafeAny[]; pagination?: SafeAny }>;
  getProjectById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  getProjectBySlug(slug: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  createProject(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateProject(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteProject(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
