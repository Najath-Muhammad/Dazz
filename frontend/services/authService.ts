import api from '@/lib/api';

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    return await api.post<any>('/auth/login', credentials);
  },
  getMe: async () => {
    return await api.get<any>('/auth/me');
  },
  logout: async () => {
    return await api.post<any>('/auth/logout', {});
  },
};
