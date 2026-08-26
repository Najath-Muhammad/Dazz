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
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export function MediaRenderer({
  media,
  altText = 'Media',
  fill = false,
  width,
  height,
  sizes,
  className = '',
  priority = false,
  muted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
}: MediaRendererProps) {
  if (!media) return null;

  // Normalize media
  const isString = typeof media === 'string';
  const url = isString ? media : media.url;
  
  if (!url) return null;

  // Guess resource type if it's a string
  const isVideo = isString 
    ? url.match(/\.(mp4|webm|mov|ogg)$/i) 
    : media.resourceType === 'video';

  const alt = isString ? altText : (media.alt?.en || altText);

  if (isVideo) {
    return (
      <video
        src={url}
        className={className}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        // If fill is true, we often want the video to behave like object-cover absolute
        style={fill ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' } : undefined}
      />
    );
  }

  // It's an image
  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizes || '100vw'}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
