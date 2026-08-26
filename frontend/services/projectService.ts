import api from '@/lib/api';

export const projectService = {
  getProjects: async () => {
    return await api.get<any[]>('/projects');
  },
  getProjectById: async (id: string) => {
    return await api.get<any>(`/projects/${id}`);
  },
  getProjectBySlug: async (slug: string) => {
    return await api.get<any>(`/projects/slug/${slug}`);
  },
  createProject: async (data: any) => {
    return await api.post<any>('/projects', data);
  },
  updateProject: async (id: string, data: any) => {
    return await api.put<any>(`/projects/${id}`, data);
  },
  deleteProject: async (id: string) => {
    return await api.delete<any>(`/projects/${id}`);
  },
};
