'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { api } from '@/lib/api';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default function AdminNewServicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    content: {
      bannerImageUrl: '',
      introduction: '',
      features: [''], // Array of strings for dynamic adding
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name in formData.content) {
      setFormData({
        ...formData,
        content: { ...formData.content, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Auto-generate slug
      if (name === 'title') {
        const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setFormData(prev => ({ ...prev, title: value, slug }));
      }
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.content.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      content: { ...formData.content, features: newFeatures }
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      content: { ...formData.content, features: [...formData.content.features, ''] }
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.content.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      content: { ...formData.content, features: newFeatures }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/content', formData);
      router.push('/admin/services');
    } catch (err: any) {
      setError(err.message || 'Failed to create service page');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/services" className="text-slate-500 hover:text-slate-900">&larr; Back</Link>
        <h1 className="text-3xl font-bold text-slate-900">Create Division/Service Page</h1>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Service Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-navy focus:border-transparent outline-none" placeholder="e.g., Construction" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-navy focus:border-transparent outline-none" />
            </div>
          </div>

          <div>
            <MediaUploader
              label="Banner Image / Video URL (Cloudinary)"
              folder="dazz/services"
              value={formData.content.bannerImageUrl}
              onChange={(media) => setFormData(prev => ({
                ...prev,
                content: { ...prev.content, bannerImageUrl: media as any }
              }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Introduction Paragraph</label>
            <textarea required name="introduction" rows={4} value={formData.content.introduction} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-navy focus:border-transparent outline-none"></textarea>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-700">Key Features / Offerings</label>
              <button type="button" onClick={addFeature} className="text-xs text-dazz-navy font-semibold hover:text-dazz-gold">+ Add Feature</button>
            </div>
            <div className="space-y-3">
              {formData.content.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder={`Feature ${index + 1}`} className="flex-1 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-navy focus:border-transparent outline-none" />
                  {formData.content.features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700 px-2">X</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-200" />
          <h3 className="text-lg font-semibold text-slate-900">SEO Meta Data</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Meta Title</label>
              <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-navy focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
              <input type="text" name="metaDescription" value={formData.metaDescription} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-navy focus:border-transparent outline-none" />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Publish Service Page'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
