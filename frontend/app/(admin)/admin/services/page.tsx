'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, apiClient } from '@/lib/api';

const CATEGORY_LABELS: Record<string, string> = {
  'construction': 'Construction',
  'food-trading': 'Food Trading',
  'logistics': 'Logistics',
  'hospitality': 'Hospitality',
  'other': 'Other',
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      const data = await api.get<any[]>('/admin/services');
      setServices(data);
    } catch {
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/services/${id}`);
      setServices(prev => prev.filter(s => s._id !== id));
    } catch {
      alert('Failed to delete service.');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const copy = await api.post<any>(`/admin/services/${id}/duplicate`, {});
      setServices(prev => [copy, ...prev]);
    } catch {
      alert('Failed to duplicate service.');
    }
  };

  const handleTogglePublish = async (id: string, current: string) => {
    const newStatus = current === 'published' ? 'draft' : 'published';
    try {
      const updated = await api.put<any>(`/admin/services/${id}`, { status: newStatus });
      setServices(prev => prev.map(s => s._id === id ? { ...s, status: updated.status } : s));
    } catch {
      alert('Failed to update status.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all service pages. Published services appear on the public website automatically.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-dazz-navy text-white text-sm font-bold rounded-md hover:bg-dazz-navy/80 transition-all"
        >
          + Add Service
        </Link>
      </div>

      {error && <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md text-sm">{error}</div>}

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Service</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Updated</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">Loading services...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">No services yet. <Link href="/admin/services/new" className="text-dazz-navy font-semibold hover:underline">Create your first service →</Link></td></tr>
            ) : services.map((svc) => (
              <tr key={svc._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{svc.icon || '🏗️'}</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{svc.name?.en || 'Untitled'}</p>
                      {svc.name?.ar && <p className="text-slate-400 text-xs" dir="rtl">{svc.name.ar}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {CATEGORY_LABELS[svc.category] || svc.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">/{svc.slug}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleTogglePublish(svc._id, svc.status)}
                    className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-all ${
                      svc.status === 'published'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    {svc.status === 'published' ? '● Published' : '○ Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {svc.updatedAt ? new Date(svc.updatedAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-sm font-medium">
                    <a href={`/services/${svc.slug}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-700">Preview</a>
                    <Link href={`/admin/services/${svc._id}/edit`} className="text-dazz-navy hover:text-dazz-gold transition-colors">Edit</Link>
                    <button onClick={() => handleDuplicate(svc._id)} className="text-slate-400 hover:text-dazz-navy transition-colors">Duplicate</button>
                    <button onClick={() => handleDelete(svc._id, svc.name?.en)} className="text-red-400 hover:text-red-600 transition-colors">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
