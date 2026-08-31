'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { SearchBar } from '@/components/admin/SearchBar';
import { Filter, Eye, Edit2, Trash2 } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  'construction': 'Construction & Infrastructure',
  'construction-infrastructure': 'Construction & Infrastructure',
  'food-trading': 'Trading & Distribution',
  'trading-distribution': 'Trading & Distribution',
  'logistics': 'Logistics & Environmental Solutions',
  'logistics-environmental': 'Logistics & Environmental Solutions',
  'hospitality': 'Real Estate & Hospitality',
  'real-estate-hospitality': 'Real Estate & Hospitality',
  'other': 'Other',
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<SafeAny[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const limit = 10;
  
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean; title: string; message: string; onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status: filterStatus === 'ALL' ? '' : filterStatus.toLowerCase(),
        category: filterCategory === 'ALL' ? '' : filterCategory
      }).toString();
      
      const data = await api.get<SafeAny>(`/services?${qs}`);
      if (data.data && data.pagination) {
        setServices(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.total);
      } else {
        setServices(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
      }
    } catch {
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, [page, search, filterCategory, filterStatus]);

  const handleDeleteClick = (id: string, name: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Service',
      message: `Are you sure you want to delete "${name}"? This cannot be undone.`,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          await api.delete(`/services/${id}`);
          setServices((prev) => prev.filter((s) => s.id !== id));
        } catch {
          alert('Failed to delete service.');
        }
      },
    });
  };

  const handleTogglePublish = async (id: string, current: string) => {
    const newStatus = current === 'published' ? 'draft' : 'published';
    try {
      const updated = await api.put<SafeAny>(`/services/${id}`, { status: newStatus });
      setServices((prev) => prev.map((s) => (s.id === id ? { ...s, status: updated.status } : s)));
    } catch {
      alert('Failed to update status.');
    }
  };

  const columns: Column<SafeAny>[] = [
    {
      key: 'service',
      header: 'Service',
      render: (svc) => (
        <div className="flex items-center gap-3">
          <span className="text-xl">{svc.icon || '🏗️'}</span>
          <div>
            <p className="font-semibold text-slate-900 text-sm">{svc.name?.en || 'Untitled'}</p>
            {svc.name?.ar && <p className="text-slate-400 text-xs" dir="rtl">{svc.name.ar}</p>}
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (svc) => (
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {CATEGORY_LABELS[svc.category] || svc.category}
        </span>
      ),
    },
    {
      key: 'slug',
      header: 'Slug',
      render: (svc) => <span className="text-sm text-slate-500 font-mono">/{svc.slug}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (svc) => (
        <button
          onClick={() => handleTogglePublish(svc.id, svc.status)}
          className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-all ${
            svc.status === 'published'
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
        >
          {svc.status === 'published' ? '● Published' : '○ Draft'}
        </button>
      ),
    },
    {
      key: 'updated',
      header: 'Updated',
      render: (svc) => (
        <span className="text-sm text-slate-400">
          {svc.updatedAt ? new Date(svc.updatedAt).toLocaleDateString() : '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (svc) => {
        const id = svc.id || svc._id;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <a
              href={`/en/services/${svc.slug}`}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
              title="Preview"
            >
              <Eye size={16} />
            </a>
            <Link
              href={`/admin/services/${id}/edit`}
              className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
              title="Edit"
            >
              <Edit2 size={16} />
            </Link>
            <button
              onClick={() => handleDeleteClick(id, svc.name?.en || 'Untitled')}
              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all service pages. Published services appear on the public website automatically.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-dazz-navy text-white text-sm font-bold rounded-md hover:bg-dazz-navy/80 transition-all shadow-sm"
          >
            + Add Service
          </Link>
        </div>
      </div>

      {error && <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md text-sm">{error}</div>}

      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-lg flex flex-wrap gap-4 items-center justify-between">
        <SearchBar 
          onSearch={(val) => { setSearch(val); setPage(1); }} 
          placeholder="Search by service name..." 
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select suppressHydrationWarning value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }} className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy">
              <option value="ALL">All Categories</option>
              <option value="construction">Construction & Infrastructure</option>
              <option value="food-trading">Trading & Distribution</option>
              <option value="logistics">Logistics & Environmental Solutions</option>
              <option value="hospitality">Real Estate & Hospitality</option>
              <option value="other">Other</option>
            </select>
          </div>
          <select suppressHydrationWarning value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy">
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-slate-200">
        <div className="border-b-0 border-transparent [&>div]:border-0 [&>div]:rounded-none">
          <DataTable
            columns={columns}
            data={services}
            loading={loading}
            emptyMessage="No services yet."
            emptyAction={
              <Link href="/admin/services/new" className="text-dazz-navy font-semibold hover:underline text-sm">
                Create your first service →
              </Link>
            }
          />
        </div>
        <Pagination 
          page={page} 
          totalPages={totalPages} 
          onPageChange={setPage} 
          total={totalItems} 
          limit={limit} 
        />
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        isDestructive={true}
        confirmText="Delete"
      />
    </div>
  );
}
