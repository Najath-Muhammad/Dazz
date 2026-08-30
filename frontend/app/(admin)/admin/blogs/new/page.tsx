'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/Button';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { BilingualField } from '@/components/admin/BilingualField';
import { ContentBuilder } from '@/components/admin/ContentBuilder';
import { z } from 'zod';
import { useZodValidation } from '@/hooks/useZodValidation';
import { FormError } from '@/components/ui/FormError';

const blogSchema = z.object({
  title: z.object({
    en: z.string().min(1, 'English title is required'),
    ar: z.string().min(1, 'Arabic title is required')
  }),
  slug: z.string().min(1, 'Slug is required'),
  category: z.object({
    en: z.string().min(1, 'English category is required'),
    ar: z.string().min(1, 'Arabic category is required')
  }),
  excerpt: z.object({
    en: z.string().min(1, 'English excerpt is required'),
    ar: z.string().min(1, 'Arabic excerpt is required')
  }),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
});

export default function AdminNewBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    slug: '',
    category: { en: '', ar: '' },
    excerpt: { en: '', ar: '' },
    content: { en: '[]', ar: '[]' },
    coverImage: '',
    author: '',
    publishedAt: new Date().toISOString().slice(0, 16),
    isPublished: true,
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { errors, validate, clearErrors } = useZodValidation(blogSchema);

  const handleLocalizedChange = (field: 'title' | 'category' | 'excerpt' | 'content', lang: 'en' | 'ar', value: string) => {
    setFormData(prev => {
      const next = { ...prev, [field]: { ...prev[field], [lang]: value } };
      if (field === 'title' && lang === 'en') {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return next;
    });
    if ((errors as SafeAny)[field]) clearErrors();
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if ((errors as SafeAny)[e.target.name]) clearErrors();
  };

  const handleContentChange = (val: string) => {
    // Content builder manages both en and ar inside a single JSON array of blocks.
    // We just save that JSON string into both en and ar so the backend validator accepts it.
    // At render time, we parse it once.
    setFormData(prev => ({
      ...prev,
      content: { en: val, ar: val }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) return;
    
    setLoading(true);
    setError('');

    try {
      // Ensure date is proper ISO string if empty
      const payload = {
        ...formData,
        publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : new Date().toISOString()
      };
      await api.post('/blogs', payload);
      router.push('/admin/blogs');
    } catch (err: SafeAny) {
      setError(err.response?.data?.message || err.message || 'Failed to create blog post');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/blogs" className="text-slate-500 hover:text-slate-900">
          &larr; Back
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Create Blog Post</h1>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-8">
        <form noValidate onSubmit={handleSubmit} className="space-y-8">
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-sm">{error}</div>}
          
          {/* Title Section */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">BASIC INFORMATION</h3>
            
            <div className="space-y-6">
              <BilingualField
                label="Article Title"
                nameEn="titleEn"
                nameAr="titleAr"
                valueEn={formData.title.en}
                valueAr={formData.title.ar}
                onChangeEn={(v) => handleLocalizedChange('title', 'en', v)}
                onChangeAr={(v) => handleLocalizedChange('title', 'ar', v)}
                errorEn={(errors as SafeAny).title?.en || (errors.title === 'English title is required' ? errors.title : undefined)}
                errorAr={(errors as SafeAny).title?.ar || (errors.title === 'Arabic title is required' ? errors.title : undefined)}
              />

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-widest uppercase">URL Slug (Auto-generated)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleStringChange} className={`w-full bg-white text-slate-900 border rounded-md px-4 py-2 transition-colors focus:outline-none ${errors.slug ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-dazz-navy'}`} />
                <FormError message={errors.slug} />
              </div>

              <BilingualField
                label="Category"
                nameEn="categoryEn"
                nameAr="categoryAr"
                valueEn={formData.category.en}
                valueAr={formData.category.ar}
                onChangeEn={(v) => handleLocalizedChange('category', 'en', v)}
                onChangeAr={(v) => handleLocalizedChange('category', 'ar', v)}
                placeholder="e.g. COMPANY NEWS"
                errorEn={(errors as SafeAny).category?.en || (errors.category === 'English category is required' ? errors.category : undefined)}
                errorAr={(errors as SafeAny).category?.ar || (errors.category === 'Arabic category is required' ? errors.category : undefined)}
              />

              <BilingualField
                label="Short Excerpt"
                nameEn="excerptEn"
                nameAr="excerptAr"
                valueEn={formData.excerpt.en}
                valueAr={formData.excerpt.ar}
                onChangeEn={(v) => handleLocalizedChange('excerpt', 'en', v)}
                onChangeAr={(v) => handleLocalizedChange('excerpt', 'ar', v)}
                type="textarea"
                rows={2}
                note="A brief summary shown on the blog cards."
                errorEn={(errors as SafeAny).excerpt?.en || (errors.excerpt === 'English excerpt is required' ? errors.excerpt : undefined)}
                errorAr={(errors as SafeAny).excerpt?.ar || (errors.excerpt === 'Arabic excerpt is required' ? errors.excerpt : undefined)}
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-200 pb-2">FEATURED IMAGE & PUBLISHING</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <MediaUploader
                  label="Featured Image"
                  folder="dazz/blogs"
                  value={formData.coverImage}
                  onChange={(media) => setFormData({ ...formData, coverImage: media as SafeAny })}
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase">Author Name</label>
                  <input type="text" name="author" value={formData.author} onChange={handleStringChange} placeholder="e.g. John Doe" className="w-full border border-slate-300 rounded-md px-4 py-2" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 tracking-widest uppercase">Publish Date</label>
                  <input type="datetime-local" name="publishedAt" value={formData.publishedAt} onChange={handleStringChange} className="w-full border border-slate-300 rounded-md px-4 py-2" />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleStringChange} className="w-4 h-4 text-dazz-navy border-slate-300 rounded focus:ring-dazz-navy" />
                    <span className="text-sm font-bold text-slate-700">Published</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleStringChange} className="w-4 h-4 text-dazz-navy border-slate-300 rounded focus:ring-dazz-navy" />
                    <span className="text-sm font-bold text-slate-700">Featured Article</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Content Builder Section */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-2">
              <h3 className="text-lg font-bold text-slate-800">ARTICLE CONTENT BUILDER</h3>
              <p className="text-xs text-slate-500">Build your article using blocks.</p>
            </div>
            
            <ContentBuilder 
              value={formData.content.en} 
              onChange={handleContentChange} 
            />
          </div>

          <div className="flex justify-end pt-4 gap-4 sticky bottom-4 bg-white p-4 border-t border-slate-200 rounded-lg shadow-sm">
            <Link href="/admin/blogs" className="px-6 py-3 border border-slate-300 text-slate-700 rounded-md font-medium hover:bg-slate-50 transition-colors">Cancel</Link>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Publish Blog Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
