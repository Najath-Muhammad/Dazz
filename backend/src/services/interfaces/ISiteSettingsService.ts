export interface ISiteSettingsService {
  getAllSiteSettingss(): Promise<{ success: boolean; message: string; data?: SafeAny[] }>;
  getSiteSettingsById(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;

  createSiteSettings(data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  updateSiteSettings(id: string, data: SafeAny): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  deleteSiteSettings(id: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
