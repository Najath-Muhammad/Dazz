import cloudinary from '../../utils/cloudinary';
import streamifier from 'streamifier';
import { IMediaService } from '../interfaces/IMediaService';

export class MediaService implements IMediaService {
  async uploadMedia(buffer: Buffer, folder: string, resourceType: string): Promise<{ success: boolean; message: string; data?: SafeAny }> {
    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: resourceType as SafeAny },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve({ success: false, message: 'Failed to upload media to Cloudinary' });
            return;
          }
          if (result) {
            const mediaMetadata = {
              url: result.secure_url,
              publicId: result.public_id,
              resourceType: result.resource_type,
              format: result.format,
              width: result.width,
              height: result.height,
              duration: result.duration || null,
            };
            resolve({ success: true, message: 'Media uploaded successfully', data: mediaMetadata });
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  async validateUrl(url: string): Promise<{ success: boolean; message: string; data?: SafeAny }> {
    if (!url.includes('cloudinary.com')) {
      return { success: false, message: 'Please enter a valid Cloudinary image or video URL.' };
    }
    const isVideo = url.match(/\.(mp4|webm|mov|ogg)$/i);
    const resourceType = isVideo ? 'video' : 'image';
    const mediaMetadata = { url, publicId: null, resourceType, format: null, width: null, height: null, duration: null };
    return { success: true, message: 'URL validated successfully', data: mediaMetadata };
  }
}
