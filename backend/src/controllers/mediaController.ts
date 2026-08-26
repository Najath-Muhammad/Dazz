import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import streamifier from 'streamifier';

export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    // Determine folder from request body
    const folder = req.body.folder || 'dazz/general';
    
    // Resource type (auto, image, or video)
    const resourceType = req.body.resourceType || 'auto';

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          res.status(500).json({ error: 'Failed to upload media to Cloudinary' });
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
          res.status(200).json(mediaMetadata);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ error: 'Internal server error during media upload' });
  }
};

export const validateUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.body;
    
    if (!url || typeof url !== 'string') {
      res.status(400).json({ error: 'Invalid URL provided' });
      return;
    }

    // Basic validation to ensure it's a Cloudinary URL
    // Can also accept valid external URLs if needed, but per requirements, stick to Cloudinary
    if (!url.includes('cloudinary.com')) {
      res.status(400).json({ error: 'Please enter a valid Cloudinary image or video URL.' });
      return;
    }

    // Determine resource type simply by extension or default to image
    const isVideo = url.match(/\.(mp4|webm|mov|ogg)$/i);
    const resourceType = isVideo ? 'video' : 'image';

    const mediaMetadata = {
      url: url,
      publicId: null, // Since we don't know it for sure from just pasting a raw URL
      resourceType: resourceType,
      format: null,
      width: null,
      height: null,
      duration: null,
    };

    res.status(200).json(mediaMetadata);
  } catch (error) {
    console.error('URL validation error:', error);
    res.status(500).json({ error: 'Internal server error during URL validation' });
  }
};
