export interface IPageService {
  getAllPages(): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getPageById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;

  createPage(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updatePage(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deletePage(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
