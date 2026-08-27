export interface ISiteSettingsService {
  getAllSiteSettingss(): Promise<{ success: boolean; message: string; data?: any[] }>;
  getSiteSettingsById(id: string): Promise<{ success: boolean; message: string; data?: any }>;

  createSiteSettings(data: any): Promise<{ success: boolean; message: string; data?: any }>;
  updateSiteSettings(id: string, data: any): Promise<{ success: boolean; message: string; data?: any }>;
  deleteSiteSettings(id: string): Promise<{ success: boolean; message: string; data?: any }>;
}
