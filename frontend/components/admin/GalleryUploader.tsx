'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { X, Plus, Image, Upload } from 'lucide-react';
import { Media } from '@/components/admin/MediaUploader';

interface GalleryUploaderProps {
  value: any[];
  onChange: (images: any[]) => void;
  folder?: string;
}

export function GalleryUploader({ value = [], onChange, folder = 'dazz/projects' }: GalleryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');

  const normalizeUrl = (img: any): string => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    return img.url || '';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setIsUploading(true);
    setError('');

    const uploaded: Media[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('resourceType', 'auto');
      try {
        const res = await api.post<Media>('/admin/media/upload', formData);
        uploaded.push(res);
      } catch {
        setError(`Failed to upload ${file.name}`);
      }
    }

    onChange([...value, ...uploaded]);
    setIsUploading(false);
    if (e.target) e.target.value = '';
  };

  const handleUrlAdd = async () => {
    if (!urlInput.trim()) return;
    setIsUploading(true);
    setError('');
    try {
      const res = await api.post<Media>('/admin/media/validate-url', { url: urlInput.trim() });
      onChange([...value, res]);
      setUrlInput('');
    } catch {
      setError('Invalid or inaccessible URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Existing Images Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {value.map((img, i) => (
            <div key={i} className="relative group aspect-square bg-slate-100 rounded-md overflow-hidden border border-slate-200">
              <img
                src={normalizeUrl(img)}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Remove"
                >
                  <X size={14} />
                </button>
              </div>
              <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center bg-slate-50">
          <Image size={32} className="text-slate-300 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">No gallery images yet. Add images below.</p>
        </div>
      )}

      {/* Upload Controls */}
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        <div className="flex gap-4 mb-4 border-b border-slate-100 pb-2">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`text-sm font-semibold ${inputMode === 'upload' ? 'text-dazz-navy border-b-2 border-dazz-navy' : 'text-slate-400'}`}
          >
            Upload Images
          </button>
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`text-sm font-semibold ${inputMode === 'url' ? 'text-dazz-navy border-b-2 border-dazz-navy' : 'text-slate-400'}`}
          >
            Add via URL
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {inputMode === 'upload' ? (
          <label className={`flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isUploading ? 'opacity-60 cursor-not-allowed border-slate-200' : 'border-slate-300 hover:border-dazz-navy hover:bg-dazz-navy/5'}`}>
            <Upload size={18} className="text-slate-400" />
            <span className="text-sm text-slate-600 font-medium">
              {isUploading ? 'Uploading...' : 'Click to select images (multiple allowed)'}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={isUploading}
              onChange={handleFileUpload}
              className="sr-only"
            />
          </label>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://res.cloudinary.com/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={isUploading}
              className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-dazz-navy"
            />
            <button
              type="button"
              onClick={handleUrlAdd}
              disabled={isUploading || !urlInput.trim()}
              className="flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              <Plus size={15} /> Add
            </button>
          </div>
        )}
      </div>

      {value.length > 0 && (
        <p className="text-xs text-slate-400 font-mono">{value.length} image{value.length !== 1 ? 's' : ''} in gallery</p>
      )}
    </div>
  );
}
