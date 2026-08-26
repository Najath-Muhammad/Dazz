export interface IPageService {
  getAllPages(): Promise<any[]>;
  getPageById(id: string): Promise<any | null>;

  createPage(data: any): Promise<any>;
  updatePage(id: string, data: any): Promise<any | null>;
  deletePage(id: string): Promise<any | null>;
}
