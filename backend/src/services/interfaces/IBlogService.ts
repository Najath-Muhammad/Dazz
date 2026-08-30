export interface IBlogService {
  getAllBlogs(): Promise<{ success: boolean; message: string; data?: any[] }>;
  getBlogsPaginated(params: { search?: string; status?: string; category?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: any[]; pagination?: any }>;
  getBlogById(id: string): Promise<{ success: boolean; message: string; data?: any }>;
  getBlogBySlug(slug: string): Promise<{ success: boolean; message: string; data?: any }>;
  createBlog(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateBlog(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deleteBlog(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
