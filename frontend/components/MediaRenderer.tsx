'use client';
import React from 'react';
import Image from 'next/image';

export interface Media {
  url: string;
  publicId: string | null;
  resourceType: 'image' | 'video' | 'auto';
  format: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  alt?: { en: string; ar: string };
}

interface MediaRendererProps {
  media: Media | string | null | undefined;
  altText?: string; // Fallback alt text
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

import type { ImageLoaderProps } from 'next/image';

const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    // Strip existing transformation flags if present so we always apply pristine high quality settings
    let cleanSrc = src;
    if (cleanSrc.includes('/upload/')) {
      cleanSrc = cleanSrc.replace(/\/upload\/(?:[^\/]+\/)*(v\d+)/, '/upload/$1');
    }
    
    // Always request at least 1920px (or double Next.js width) to guarantee 4K/Full-HD sharpness
    const targetWidth = Math.min(Math.max((width || 800) * 2, 1920), 3840);
    const qParam = quality && quality > 75 ? `q_${quality}` : 'q_100';
    const params = ['f_auto', 'dpr_2.0', `w_${targetWidth}`, 'c_limit', qParam];
    
    return cleanSrc.replace('/upload/', `/upload/${params.join(',')}/`);
  }
  return src;
};

export function MediaRenderer({
  media,
  altText = 'Media',
  fill = false,
  width,
  height,
  sizes,
  className = '',
  priority = false,
  quality = 90,
  muted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
}: MediaRendererProps) {
  if (!media) return null;

  // Normalize media
  const isString = typeof media === 'string';
  let url = isString ? media : media.url;
  
  if (!url) return null;

  // Guess resource type if it's a string
  const isVideo = isString 
    ? url.match(/\.(mp4|webm|mov|ogg)$/i) 
    : media.resourceType === 'video';

  const alt = isString ? altText : (media.alt?.en || altText);

  // Small placeholder generation for Cloudinary images (approx 10px wide)
  const isCloudinary = url.includes('res.cloudinary.com') && url.includes('/upload/');
  let blurDataURL: string | undefined = undefined;
  if (isCloudinary && !isVideo) {
    blurDataURL = url.includes('/upload/f_') ? url : url.replace('/upload/', '/upload/w_10,f_webp,q_10,e_blur:200/');
  }

  if (isVideo) {
    // Optimize video url directly
    if (isCloudinary && !url.includes('/upload/f_')) {
      url = url.replace('/upload/', '/upload/f_auto,q_auto/');
    }

    return (
      <video
        src={url}
        className={className}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        poster={isCloudinary ? url.replace(/\.(mp4|webm|mov|ogg)$/i, '.jpg').replace('/upload/', '/upload/f_auto,q_auto/') : undefined}
        // If fill is true, we often want the video to behave like object-cover absolute
        style={fill ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' } : undefined}
      />
    );
  }

  // It's an image
  if (fill) {
    return (
      <Image
        loader={isCloudinary ? cloudinaryLoader : undefined}
        src={url}
        alt={alt}
        fill
        quality={quality}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={className}
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        unoptimized={!isCloudinary} // Only optimize if Cloudinary to save Next.js server resources
      />
    );
  }

  return (
    <Image
      loader={isCloudinary ? cloudinaryLoader : undefined}
      src={url}
      alt={alt}
      width={width || 800}
      height={height || 600}
      quality={quality}
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      unoptimized={!isCloudinary}
    />
  );
}
