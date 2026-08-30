'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function AdminServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<SafeAny>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await api.get<SafeAny>(`/services/${id}`);
        setService(data);
      } catch (err) {
        setError('Failed to load service details.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  if (loading) return <div className="p-8 text-slate-400">Loading service details...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!service) return <div className="p-8 text-slate-400">Service not found.</div>;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/services" className="text-slate-400 hover:text-slate-700 text-sm">← Back to Services</Link>
        <h1 className="text-2xl font-bold text-slate-900 ml-2">Service Details: {service.name?.en || 'Untitled'}</h1>
        <Link 
          href={`/admin/services/${service.id}/edit`} 
          className="ml-auto text-xs font-bold bg-dazz-navy text-white rounded px-4 py-2 hover:bg-blue-900 transition-colors"
        >
          Edit Service
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="font-bold text-slate-800">Basic Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Name (EN)</p>
            <p className="text-slate-900 font-medium">{service.name?.en || '—'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Name (AR)</p>
            <p className="text-slate-900 font-arabic font-medium" dir="rtl">{service.name?.ar || '—'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Slug</p>
            <p className="text-slate-900 font-mono">{service.slug}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Category</p>
            <p className="text-slate-900 capitalize">{service.category}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
            <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${service.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {service.status?.toUpperCase() || 'DRAFT'}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Featured</p>
            <p className="text-slate-900">{service.featured ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="font-bold text-slate-800">Page Content Overview</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Enabled Sections</p>
            <div className="flex flex-wrap gap-2">
              {service.enabledSections?.length > 0 ? (
                service.enabledSections.map((sec: string) => (
                  <span key={sec} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md text-sm capitalize">
                    {sec}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-sm">No sections enabled</span>
              )}
            </div>
          </div>

          <div className="space-y-6 border-t border-slate-100 pt-6">
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">Hero Section Title</p>
              <p className="text-slate-600">{service.hero?.title?.en || '—'}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">Introduction Text</p>
              <p className="text-slate-600 line-clamp-3">{service.introduction?.mainDescription?.en || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="font-bold text-slate-800">System Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Created At</p>
            <p className="text-slate-900">{new Date(service.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Last Updated</p>
            <p className="text-slate-900">{new Date(service.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
