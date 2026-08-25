'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Button } from '@/components/Button';

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Construction',
    description: '',
    imageUrl: '',
    client: '',
    location: '',
    completionDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Auto-generate slug from title if editing title
    if (e.target.name === 'title') {
      const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, title: e.target.value, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/projects', formData);
      router.push('/admin/projects');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create project');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/projects" className="text-slate-500 hover:text-slate-900">
          &larr; Back
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Create New Project</h1>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-sm">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-slate-300 rounded-sm px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border border-slate-300 rounded-sm px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-slate-300 rounded-sm px-4 py-2">
                <option>Construction</option>
                <option>Logistics</option>
                <option>Hospitality</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL (Cloudinary)</label>
              <input required type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://res.cloudinary.com/..." className="w-full border border-slate-300 rounded-sm px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
              <input type="text" name="client" value={formData.client} onChange={handleChange} className="w-full border border-slate-300 rounded-sm px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border border-slate-300 rounded-sm px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Completion Date</label>
              <input type="text" name="completionDate" value={formData.completionDate} onChange={handleChange} placeholder="e.g., Q4 2025" className="w-full border border-slate-300 rounded-sm px-4 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea required name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full border border-slate-300 rounded-sm px-4 py-2"></textarea>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
