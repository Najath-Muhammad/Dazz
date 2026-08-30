'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { projectService } from '@/services/projectService';
import { Button } from '@/components/Button';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { SearchBar } from '@/components/admin/SearchBar';
import { Filter } from 'lucide-react';
import { Trash2, Edit2, Eye } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<SafeAny[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const limit = 10;

  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getProjects({
        page,
        limit,
        search,
        status: status === 'ALL' ? '' : status.toLowerCase()
      });
      // Handle the paginated response format
      if (data.data && data.pagination) {
        setProjects(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.total);
      } else {
        // Fallback for unpaginated
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, [page, search, status]);

  const handleDeleteClick = (id: string) => setConfirmModal({ isOpen: true, id });

  const confirmDelete = async () => {
    if (!confirmModal.id) return;
    setConfirmModal({ isOpen: false, id: null });
    try {
      await projectService.deleteProject(confirmModal.id);
      fetchProjects();
    } catch {
      alert('Failed to delete project');
    }
  };

  const columns: Column<SafeAny>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (p) => (
        <span className="text-sm font-semibold text-slate-900">
          {p.title?.en || p.title || 'Untitled'}
        </span>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (p) => (
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {p.category?.en || p.category || 'Uncategorized'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            p.isPublished !== false
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {p.isPublished !== false ? '● Published' : '○ Draft'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (p) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={`/en/projects/${p.slug}`}
            target="_blank"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
            title="Preview"
          >
            <Eye size={15} />
          </Link>
          <Link
            href={`/admin/projects/${p.id}/edit`}
            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            title="Edit"
          >
            <Edit2 size={15} />
          </Link>
          <button
            onClick={() => handleDeleteClick(p.id)}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 text-sm mt-1">Manage portfolio projects shown on the public site.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button variant="primary">+ Add New Project</Button>
        </Link>
      </div>

      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-lg flex flex-wrap gap-4 items-center justify-between">
        <SearchBar 
          onSearch={(val) => { setSearch(val); setPage(1); }} 
          placeholder="Search projects..." 
        />
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy"
          >
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
            data={projects}
            loading={loading}
            emptyMessage="No projects found. Create your first one!"
            emptyAction={
              <Link href="/admin/projects/new" className="text-dazz-navy font-semibold hover:underline text-sm">
                Create your first project →
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, id: null })}
        isDestructive={true}
        confirmText="Delete"
      />
    </div>
  );
}
