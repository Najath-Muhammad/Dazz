export interface IBlogService {
  getAllBlogs(): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getBlogsPaginated(params: { search?: string; status?: string; category?: string; page: number; limit: number }): Promise<{ success: boolean; message: string; data?: SafeAny[]; pagination?: SafeAny }>;
  getBlogById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  getBlogBySlug(slug: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  createBlog(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateBlog(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteBlog(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
