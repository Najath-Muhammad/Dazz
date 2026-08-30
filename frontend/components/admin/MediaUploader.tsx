'use client';
import React, { useState } from 'react';
import api from '@/lib/api';

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

interface MediaUploaderProps {
  value: Media | string | null;
  onChange: (media: Media) => void;
  folder?: string;
  label?: string;
}

export function MediaUploader({ value, onChange, folder = 'dazz/general', label = 'Media' }: MediaUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [urlInput, setUrlInput] = useState('');

  // Normalize the incoming value
  const mediaValue: Media | null = typeof value === 'string' && value ? {
    url: value,
    publicId: null,
    resourceType: value.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image',
    format: null,
    width: null,
    height: null,
    duration: null,
  } : (value as Media | null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('resourceType', 'auto');

    try {
      const response = await api.post<Media>('/admin/media/upload', formData);
      onChange(response);
    } catch (err: SafeAny) {
      setError(err.message || 'Failed to upload media');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleUrlSubmit = async () => {
    if (!urlInput) return;
    setIsUploading(true);
    setError('');
    try {
      const response = await api.post<Media>('/admin/media/validate-url', { url: urlInput });
      onChange(response);
      setUrlInput('');
    } catch (err: SafeAny) {
      setError(err.message || 'Invalid Cloudinary URL');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase">{label}</label>
      
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      {mediaValue?.url ? (
        <div className="border border-slate-200 rounded-md p-4 bg-white relative">
          <div className="mb-4">
            {mediaValue.resourceType === 'video' ? (
              <video src={mediaValue.url} controls className="w-full max-h-64 object-contain bg-slate-100 rounded-sm" />
            ) : (
              <img src={mediaValue.url} alt="Media Preview" className="w-full max-h-64 object-contain bg-slate-100 rounded-sm" />
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 truncate max-w-[200px]" title={mediaValue.url}>{mediaValue.url}</span>
            <button
              type="button"
              onClick={() => onChange({} as Media)} // Reset
              className="text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-md p-4 bg-white">
          <div className="flex gap-4 mb-4 border-b border-slate-100 pb-2">
            <button
              type="button"
              className={`text-sm font-semibold ${mode === 'upload' ? 'text-dazz-navy border-b-2 border-dazz-navy' : 'text-slate-400'}`}
              onClick={() => setMode('upload')}
            >
              Upload Media
            </button>
            <button
              type="button"
              className={`text-sm font-semibold ${mode === 'url' ? 'text-dazz-navy border-b-2 border-dazz-navy' : 'text-slate-400'}`}
              onClick={() => setMode('url')}
            >
              Use Cloudinary URL
            </button>
          </div>

          {mode === 'upload' ? (
            <div>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-dazz-gold/10 file:text-dazz-navy hover:file:bg-dazz-gold/20 cursor-pointer"
              />
              {isUploading && <p className="text-xs text-slate-500 mt-2">Uploading...</p>}
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://res.cloudinary.com/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm"
                disabled={isUploading}
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                disabled={isUploading || !urlInput}
                className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-700 disabled:opacity-50"
              >
                {isUploading ? 'Checking...' : 'Save URL'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
