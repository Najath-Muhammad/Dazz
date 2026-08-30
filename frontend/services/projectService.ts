import api from '@/lib/api';

export const projectService = {
  getProjects: async (params?: Record<string, SafeAny>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return await api.get<SafeAny>(`/projects${qs}`);
  },
  getProjectById: async (id: string) => {
    return await api.get<SafeAny>(`/projects/${id}`);
  },
  getProjectBySlug: async (slug: string) => {
    return await api.get<SafeAny>(`/projects/slug/${slug}`);
  },
  createProject: async (data: SafeAny) => {
    return await api.post<SafeAny>('/projects', data);
  },
  updateProject: async (id: string, data: SafeAny) => {
    return await api.put<SafeAny>(`/projects/${id}`, data);
  },
  deleteProject: async (id: string) => {
    return await api.delete<SafeAny>(`/projects/${id}`);
  },
};
