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

// Define the standard ApiResponse shape
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// Generic API Service wrapper that automatically unwraps the standard ApiResponse
export const api = {
  get: async <T>(url: string, params?: any): Promise<T> => {
    const res = await apiClient.get<ApiResponse<T>>(url, { params });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data as T;
  },
  post: async <T>(url: string, data: any): Promise<T> => {
    const isFormData = data instanceof FormData;
    const res = await apiClient.post<ApiResponse<T>>(url, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data as T;
  },
  put: async <T>(url: string, data: any): Promise<T> => {
    const isFormData = data instanceof FormData;
    const res = await apiClient.put<ApiResponse<T>>(url, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data as T;
  },
  delete: async <T>(url: string): Promise<T> => {
    const res = await apiClient.delete<ApiResponse<T>>(url);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data as T;
  },
};

export default api;
