export interface IMediaService {
  uploadMedia(buffer: Buffer, folder: string, resourceType: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
  validateUrl(url: string): Promise<{ success: boolean; message: string; data?: SafeAny }>;
}
