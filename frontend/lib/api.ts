import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance with base configuration
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Generic API Service wrapper
export const api = {
  get: <T>(url: string, params?: any) => apiClient.get<T>(url, { params }).then(res => res.data),
  post: <T>(url: string, data: any) => apiClient.post<T>(url, data).then(res => res.data),
  put: <T>(url: string, data: any) => apiClient.put<T>(url, data).then(res => res.data),
  delete: <T>(url: string) => apiClient.delete<T>(url).then(res => res.data),
};

export default api;
