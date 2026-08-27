export interface IProjectService {
  getAllProjects(): Promise<{ success: boolean; message: string; data?: any[] }>;
  getProjectById(id: string): Promise<{ success: boolean; message: string; data?: any }>;
  getProjectBySlug(slug: string): Promise<{ success: boolean; message: string; data?: any }>;
  createProject(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateProject(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deleteProject(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
