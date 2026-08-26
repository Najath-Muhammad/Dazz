export interface IProjectService {
  getAllProjects(): Promise<any[]>;
  getProjectById(id: string): Promise<any | null>;
  getProjectBySlug(slug: string): Promise<any | null>;
  createProject(data: any): Promise<any>;
  updateProject(id: string, data: any): Promise<any | null>;
  deleteProject(id: string): Promise<any | null>;
}
