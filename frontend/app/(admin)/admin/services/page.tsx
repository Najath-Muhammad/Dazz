'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { SearchBar } from '@/components/admin/SearchBar';
import { Filter } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  'construction': 'Construction',
  'food-trading': 'Food Trading',
  'logistics': 'Logistics',
  'hospitality': 'Hospitality',
  'other': 'Other',
};

const ActionDropdown = ({ svc, onDelete }: { svc: any; onDelete: () => void }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button onClick={() => setOpen(!open)} className="text-slate-400 hover:text-dazz-navy p-1.5 rounded hover:bg-slate-100 transition-colors">
        <span className="text-xl leading-none">⋮</span>
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[100] overflow-hidden text-left">
          <div className="py-1">
            <Link href={`/admin/services/${svc._id}`} className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Details</Link>
            <a href={`/en/services/${svc.slug}`} target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Preview</a>
            <Link href={`/admin/services/${svc._id}/edit`} className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Edit</Link>
            <button onClick={() => { setOpen(false); onDelete(); }} className="block w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
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
  
  const [pageData, setPageData] = useState<any>(null);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [savingPage, setSavingPage] = useState(false);
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
      
      const data = await api.get<any>(`/services?${qs}`);
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

  const fetchPageData = async () => {
    try {
      const data = await api.get<any>('/content/services');
      setPageData(data);
    } catch { /* will create on save */ }
  };

  useEffect(() => { fetchPageData(); }, []);
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
          setServices((prev) => prev.filter((s) => s._id !== id));
        } catch {
          alert('Failed to delete service.');
        }
      },
    });
  };

  const handleTogglePublish = async (id: string, current: string) => {
    const newStatus = current === 'published' ? 'draft' : 'published';
    try {
      const updated = await api.put<any>(`/services/${id}`, { status: newStatus });
      setServices((prev) => prev.map((s) => (s._id === id ? { ...s, status: updated.status } : s)));
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleSavePageData = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPage(true);
    try {
      await api.put('/content/services', {
        slug: 'services',
        title: pageData?.title || { en: 'Our Services', ar: 'خدماتنا' },
        content: {
          heroSubtitle: pageData?.content?.heroSubtitle || { en: '', ar: '' },
          heroImage: pageData?.content?.heroImage || '',
        },
      });
      setIsPageModalOpen(false);
    } catch {
      alert('Failed to save page settings');
    } finally {
      setSavingPage(false);
    }
  };

  const columns: Column<any>[] = [
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
          onClick={() => handleTogglePublish(svc._id, svc.status)}
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
      render: (svc) => (
        <ActionDropdown svc={svc} onDelete={() => handleDeleteClick(svc._id, svc.name?.en || 'Untitled')} />
      ),
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
          <button
            onClick={() => setIsPageModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-md hover:bg-slate-50 transition-all shadow-sm"
          >
            ⚙️ Edit Listing Page
          </button>
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
              <option value="construction">Construction</option>
              <option value="food-trading">Food Trading</option>
              <option value="logistics">Logistics</option>
              <option value="hospitality">Hospitality</option>
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

      {isPageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">Edit Services Listing Page</h2>
              <button onClick={() => setIsPageModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={handleSavePageData} className="p-6 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Hero Title</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">English</label>
                    <input type="text" value={pageData?.title?.en || ''} onChange={(e) => setPageData({ ...pageData, title: { ...pageData?.title, en: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-dazz-navy focus:border-dazz-navy" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Arabic</label>
                    <input type="text" dir="rtl" value={pageData?.title?.ar || ''} onChange={(e) => setPageData({ ...pageData, title: { ...pageData?.title, ar: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-dazz-navy focus:border-dazz-navy" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Hero Subtitle</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">English</label>
                    <textarea rows={3} value={pageData?.content?.heroSubtitle?.en || ''} onChange={(e) => setPageData({ ...pageData, content: { ...pageData?.content, heroSubtitle: { ...pageData?.content?.heroSubtitle, en: e.target.value } } })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-dazz-navy focus:border-dazz-navy" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Arabic</label>
                    <textarea rows={3} dir="rtl" value={pageData?.content?.heroSubtitle?.ar || ''} onChange={(e) => setPageData({ ...pageData, content: { ...pageData?.content, heroSubtitle: { ...pageData?.content?.heroSubtitle, ar: e.target.value } } })} className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-dazz-navy focus:border-dazz-navy" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Hero Background Image</h3>
                <MediaUploader value={pageData?.content?.heroImage || ''} onChange={(media) => setPageData({ ...pageData, content: { ...pageData?.content, heroImage: media.url } })} />
              </div>
              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsPageModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Cancel</button>
                <button type="submit" disabled={savingPage} className="px-6 py-2 bg-dazz-navy text-white text-sm font-bold rounded-md hover:bg-dazz-navy/90 disabled:opacity-50">
                  {savingPage ? 'Saving...' : 'Save Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
