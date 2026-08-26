import { Request, Response } from 'express';

export interface IBlogController {
  getBlogs(req: Request, res: Response): Promise<void>;
  getBlogById(req: Request, res: Response): Promise<void>;
  getBlogBySlug(req: Request, res: Response): Promise<void>;
  createBlog(req: Request, res: Response): Promise<void>;
  updateBlog(req: Request, res: Response): Promise<void>;
  deleteBlog(req: Request, res: Response): Promise<void>;
}
