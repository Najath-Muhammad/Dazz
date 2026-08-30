'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Edit2, Trash2, Search, Filter, Eye, MoreVertical } from 'lucide-react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { SearchBar } from '@/components/admin/SearchBar';

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const limit = 10;
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.dropdown-trigger')) setOpenDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status: filterStatus === 'ALL' ? '' : filterStatus.toLowerCase()
      }).toString();
      
      const data: any = await api.get(`/jobs?${qs}`);
      if (data.data && data.pagination) {
        setJobs(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.total);
      } else {
        setJobs(data.data || data || []);
      }
    } catch {
      console.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, [page, search, filterStatus]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter((j) => j._id !== id));
    } catch {
      alert('Failed to delete job');
    }
  };

  // Removed local filtering since it's handled by the backend

  const getStatusBadge = (status: string) => {
    if (status === 'PUBLISHED')
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>;
    if (status === 'CLOSED')
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Closed</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Draft</span>;
  };

  const columns: Column<any>[] = [
    {
      key: 'title',
      header: 'Job Title',
      render: (job) => (
        <div>
          <p className="font-bold text-slate-900 line-clamp-1">{job.title?.en || 'Untitled'}</p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">/{job.slug}</p>
        </div>
      ),
    },
    {
      key: 'dept',
      header: 'Department & Location',
      render: (job) => (
        <div>
          <p className="text-sm font-medium text-slate-800">{job.department}</p>
          <p className="text-xs text-slate-500">{job.location} • {job.type}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (job) => getStatusBadge(job.status),
    },
    {
      key: 'date',
      header: 'Posted Date',
      render: (job) => (
        <span className="text-sm text-slate-500">
          {job.publishedAt ? new Date(job.publishedAt).toLocaleDateString() : '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (job) => (
        <div className="relative">
          <button
            suppressHydrationWarning
            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === job._id ? null : job._id); }}
            className="dropdown-trigger p-2 text-slate-400 hover:text-dazz-navy hover:bg-slate-100 rounded-md transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          {openDropdown === job._id && (
            <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-[100] py-1 flex flex-col text-left">
              <Link href={`/en/careers/${job.slug}`} target="_blank" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <Eye size={16} className="text-slate-400" /> View Public
              </Link>
              <Link href={`/admin/careers/${job._id}`} className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <Edit2 size={16} className="text-slate-400" /> Edit Job
              </Link>
              <button
                suppressHydrationWarning
                onClick={(e) => { e.stopPropagation(); handleDelete(job._id); }}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left transition-colors"
              >
                <Trash2 size={16} className="text-red-400" /> Delete Job
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Careers &amp; Jobs</h1>
          <p className="text-slate-500 mt-1">Manage job openings and postings</p>
        </div>
        <Link href="/admin/careers/new" className="px-6 py-2.5 bg-dazz-navy text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition shadow-sm">
          + Post New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-lg flex flex-wrap gap-4 items-center justify-between">
        <SearchBar 
          onSearch={(val) => { setSearch(val); setPage(1); }} 
          placeholder="Search by title or department..." 
        />
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select suppressHydrationWarning value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy">
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-slate-200">
        <div className="border-b-0 border-transparent [&>div]:border-0 [&>div]:rounded-none">
          <DataTable
            columns={columns}
            data={jobs}
            loading={loading}
            emptyMessage="No jobs found matching your criteria."
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
    </div>
  );
}
