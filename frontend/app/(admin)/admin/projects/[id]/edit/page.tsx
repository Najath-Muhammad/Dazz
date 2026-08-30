'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { projectService } from '@/services/projectService';
import { Button } from '@/components/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { GalleryUploader } from '@/components/admin/GalleryUploader';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function AdminEditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id);
        setFormData({
          title: data.title || { en: '', ar: '' },
          slug: data.slug || '',
          category: data.category || { en: '', ar: '' },
          description: data.description || { en: '', ar: '' },
          coverImage: data.coverImage || '',
          galleryImages: data.galleryImages || [],
          location: data.location || { en: '', ar: '' },
          year: data.year || '',
          isPublished: data.isPublished !== false,
        });
      } catch {
        setError('Failed to load project.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleLocalizedChange = (
    field: 'title' | 'category' | 'description' | 'location',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await projectService.updateProject(id, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3" />
          <div className="h-64 bg-slate-200 rounded-lg" />
          <div className="h-64 bg-slate-200 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error || 'Project not found.'}</div>
        <Link href="/admin/projects" className="mt-4 inline-block text-slate-600 hover:text-slate-900">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Project</h1>
          <p className="text-slate-500 text-sm mt-0.5 font-mono">/{formData.slug}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">{error}</div>}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm flex items-center gap-2">
            <CheckCircle size={16} /> Changes saved successfully!
          </div>
        )}

        {/* Title */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">Project Title</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">🇬🇧 English</label>
              <input required type="text" value={formData.title.en} onChange={(e) => handleLocalizedChange('title', 'en', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
            <div dir="rtl">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest text-left" dir="ltr">🇸🇦 Arabic</label>
              <input type="text" value={formData.title.ar} onChange={(e) => handleLocalizedChange('title', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest">URL Slug</label>
            <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full md:w-1/2 border border-slate-300 rounded-md px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
          </div>
        </div>

        {/* Description */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">Description</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">🇬🇧 English</label>
              <textarea required rows={5} value={formData.description.en} onChange={(e) => handleLocalizedChange('description', 'en', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
            <div dir="rtl">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest text-left" dir="ltr">🇸🇦 Arabic</label>
              <textarea rows={5} value={formData.description.ar} onChange={(e) => handleLocalizedChange('description', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">Metadata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Category 🇬🇧</label>
              <input type="text" value={formData.category.en} onChange={(e) => handleLocalizedChange('category', 'en', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
            <div dir="rtl">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest text-left" dir="ltr">Category 🇸🇦</label>
              <input type="text" value={formData.category.ar} onChange={(e) => handleLocalizedChange('category', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Location 🇬🇧</label>
              <input type="text" value={formData.location.en} onChange={(e) => handleLocalizedChange('location', 'en', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
            <div dir="rtl">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest text-left" dir="ltr">Location 🇸🇦</label>
              <input type="text" value={formData.location.ar} onChange={(e) => handleLocalizedChange('location', 'ar', e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Completion Year</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g., 2025" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dazz-navy" />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 accent-dazz-navy"
              />
              <label htmlFor="isPublished" className="text-sm font-semibold text-slate-700">Published (visible on public site)</label>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">Cover Image / Video</h3>
          <MediaUploader
            folder="dazz/projects"
            value={formData.coverImage}
            onChange={(media) => setFormData({ ...formData, coverImage: media })}
          />
        </div>

        {/* Gallery */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Photo Gallery</h3>
              <p className="text-xs text-slate-500 mt-1">These images appear in the gallery section on the project detail page.</p>
            </div>
            {formData.galleryImages.length > 0 && (
              <span className="text-xs font-bold text-slate-400 bg-slate-200 px-2.5 py-1 rounded-full">
                {formData.galleryImages.length} images
              </span>
            )}
          </div>
          <GalleryUploader
            folder="dazz/projects/gallery"
            value={formData.galleryImages}
            onChange={(imgs) => setFormData({ ...formData, galleryImages: imgs })}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/admin/projects" className="px-6 py-3 border border-slate-300 text-slate-700 rounded-md font-medium hover:bg-slate-50 text-sm transition-colors">
            Cancel
          </Link>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-green-600 text-sm font-medium flex items-center gap-1.5">
                <CheckCircle size={15} /> Saved!
              </span>
            )}
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
