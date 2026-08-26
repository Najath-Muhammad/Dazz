export interface IBlogService {
  getAllBlogs(): Promise<any[]>;
  getBlogById(id: string): Promise<any | null>;
  getBlogBySlug(slug: string): Promise<any | null>;
  createBlog(data: any): Promise<any>;
  updateBlog(id: string, data: any): Promise<any | null>;
  deleteBlog(id: string): Promise<any | null>;
}
