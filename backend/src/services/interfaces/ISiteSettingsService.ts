export interface ISiteSettingsService {
  getAllSiteSettingss(): Promise<any[]>;
  getSiteSettingsById(id: string): Promise<any | null>;

  createSiteSettings(data: any): Promise<any>;
  updateSiteSettings(id: string, data: any): Promise<any | null>;
  deleteSiteSettings(id: string): Promise<any | null>;
}
