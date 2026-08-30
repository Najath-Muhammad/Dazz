import api from '@/lib/api';

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    return await api.post<SafeAny>('/auth/login', credentials);
  },
  getMe: async () => {
    return await api.get<SafeAny>('/auth/me');
  },
  logout: async () => {
    return await api.post<SafeAny>('/auth/logout', {});
  },
};
