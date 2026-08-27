export interface IPageService {
  getAllPages(): Promise<{ success: boolean; message: string; data?: any[] }>;
  getPageById(id: string): Promise<{ success: boolean; message: string; data?: any }>;

  createPage(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updatePage(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deletePage(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
