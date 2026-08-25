import axios from 'axios';

// Create an Axios instance with base configuration
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed (e.g., for attaching JWT tokens)
apiClient.interceptors.request.use(
  (config) => {
    // We can add token from localStorage here when building the admin dashboard
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
