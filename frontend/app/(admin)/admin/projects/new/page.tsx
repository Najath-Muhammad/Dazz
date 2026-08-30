'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { projectService } from '@/services/projectService';
import { Button } from '@/components/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    slug: '',
    category: { en: '', ar: '' },
    description: { en: '', ar: '' },
    coverImage: '',
    location: { en: '', ar: '' },
    year: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLocalizedChange = (field: 'title' | 'category' | 'description' | 'location', lang: 'en' | 'ar', value: string) => {
    setFormData(prev => {
      const next = { ...prev, [field]: { ...prev[field], [lang]: value } };
      if (field === 'title' && lang === 'en') {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return next;
    });
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await projectService.createProject(formData);
      router.push('/admin/projects');
    } catch (err: SafeAny) {
      setError(err.message || 'Failed to create project');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/projects" className="text-slate-500 hover:text-slate-900">
          &larr; Back
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Create New Project</h1>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-sm">{error}</div>}
          
          {/* Title Section */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">PROJECT TITLE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase flex items-center gap-2">
                  <span>🇬🇧</span> English
                </label>
                <input required type="text" value={formData.title.en} onChange={(e) => handleLocalizedChange('title', 'en', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2" />
              </div>
              <div dir="rtl">
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase flex items-center gap-2 text-left" dir="ltr">
                  <span>🇸🇦</span> Arabic
                </label>
                <input required type="text" value={formData.title.ar} onChange={(e) => handleLocalizedChange('title', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-500 mb-1 tracking-widest uppercase">URL Slug (Auto-generated)</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleStringChange} className="w-full md:w-1/2 border border-slate-300 rounded-md px-4 py-2 bg-white" />
            </div>
          </div>

          {/* Description Section */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">DESCRIPTION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase flex items-center gap-2">
                  <span>🇬🇧</span> English
                </label>
                <textarea required rows={5} value={formData.description.en} onChange={(e) => handleLocalizedChange('description', 'en', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2"></textarea>
              </div>
              <div dir="rtl">
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase flex items-center gap-2 text-left" dir="ltr">
                  <span>🇸🇦</span> Arabic
                </label>
                <textarea required rows={5} value={formData.description.ar} onChange={(e) => handleLocalizedChange('description', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right"></textarea>
              </div>
            </div>
          </div>

          {/* Category & Location Section */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">METADATA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase">Category 🇬🇧</label>
                <input required type="text" value={formData.category.en} onChange={(e) => handleLocalizedChange('category', 'en', e.target.value)} placeholder="e.g. Construction" className="w-full border border-slate-300 rounded-md px-4 py-2" />
              </div>
              <div dir="rtl">
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase text-left" dir="ltr">Category 🇸🇦</label>
                <input required type="text" value={formData.category.ar} onChange={(e) => handleLocalizedChange('category', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right" />
              </div>
              
              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase">Location 🇬🇧</label>
                <input type="text" value={formData.location.en} onChange={(e) => handleLocalizedChange('location', 'en', e.target.value)} placeholder="e.g. Riyadh" className="w-full border border-slate-300 rounded-md px-4 py-2" />
              </div>
              <div dir="rtl">
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase text-left" dir="ltr">Location 🇸🇦</label>
                <input type="text" value={formData.location.ar} onChange={(e) => handleLocalizedChange('location', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right" />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">MEDIA & DETAILS</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <MediaUploader
                  label="Cover Image / Video"
                  folder="dazz/projects"
                  value={formData.coverImage}
                  onChange={(media) => setFormData({ ...formData, coverImage: media as SafeAny })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase">Completion Year</label>
                <input type="text" name="year" value={formData.year} onChange={handleStringChange} placeholder="e.g., 2026" className="w-full md:w-1/3 border border-slate-300 rounded-md px-4 py-2" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 gap-4">
            <Link href="/admin/projects" className="px-6 py-3 border border-slate-300 text-slate-700 rounded-md font-medium hover:bg-slate-50">Cancel</Link>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
