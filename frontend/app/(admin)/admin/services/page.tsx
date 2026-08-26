'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { api } from '@/lib/api';

export default function AdminServicesPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const data = await api.get<any[]>('/content');
      setPages(data);
    } catch (err) {
      console.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Divisions & Services</h1>
        <Link href="/admin/services/new">
          <Button variant="primary">+ Add Service Page</Button>
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">URL Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">Loading services...</td></tr>
            ) : pages.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">No service pages found. Create one to get started.</td></tr>
            ) : (
              pages.map((page) => (
                <tr key={page._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{page.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">/{page.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(page.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/services/${page._id}`} className="text-dazz-navy hover:text-dazz-gold transition-colors mr-4">Edit</Link>
                    <button className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
