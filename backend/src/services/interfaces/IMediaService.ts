export interface IMediaService {
  uploadMedia(buffer: Buffer, folder: string, resourceType: string): Promise<{ success: boolean; message: string; data?: any }>;
  validateUrl(url: string): Promise<{ success: boolean; message: string; data?: any }>;
}
