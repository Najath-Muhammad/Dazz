'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Search, Filter, Eye } from 'lucide-react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { SearchBar } from '@/components/admin/SearchBar';

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  REVIEWING: 'bg-amber-100 text-amber-800',
  SHORTLISTED: 'bg-purple-100 text-purple-800',
  REJECTED: 'bg-red-100 text-red-800',
  HIRED: 'bg-green-100 text-green-800',
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const limit = 10;

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status: filterStatus === 'ALL' ? '' : filterStatus.toUpperCase()
      }).toString();
      
      const res: any = await api.get(`/applications?${qs}`);
      if (res.data && res.pagination) {
        setApplications(res.data);
        setTotalPages(res.pagination.totalPages);
        setTotalItems(res.pagination.total);
      } else {
        setApplications(res.data || res || []);
      }
    } catch {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, [page, search, filterStatus]);

  // Filter logic moved to backend

  const columns: Column<any>[] = [
    {
      key: 'candidate',
      header: 'Candidate Name',
      render: (app) => (
        <div>
          <p className="font-bold text-slate-900 line-clamp-1">{app.candidateName}</p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{app.email}</p>
        </div>
      ),
    },
    {
      key: 'job',
      header: 'Applied For',
      render: (app) => (
        <div>
          <p className="text-sm font-medium text-slate-800">
            {app.jobId ? app.jobId.title?.en : 'General Application'}
          </p>
          {app.jobId && <p className="text-xs text-slate-500">{app.jobId.department}</p>}
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (app) => (
        <span className="text-sm text-slate-500">
          {new Date(app.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (app) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
            STATUS_COLORS[app.status] ?? 'bg-slate-100 text-slate-800'
          }`}
        >
          {app.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (app) => (
        <Link
          href={`/admin/applications/${app._id}`}
          className="inline-flex items-center justify-center p-2 bg-slate-100 text-dazz-navy hover:bg-dazz-navy hover:text-white rounded-md transition-colors"
          title="Review Application"
        >
          <Eye size={16} />
        </Link>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
          <p className="text-slate-500 mt-1">Review candidates and manage recruitment</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-lg flex flex-wrap gap-4 items-center justify-between">
        <SearchBar 
          onSearch={(val) => { setSearch(val); setPage(1); }} 
          placeholder="Search by candidate name, email, or job..." 
        />
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            suppressHydrationWarning
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy"
          >
            <option value="ALL">All Status</option>
            <option value="NEW">New</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Rejected</option>
            <option value="HIRED">Hired</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-slate-200">
        <div className="border-b-0 border-transparent [&>div]:border-0 [&>div]:rounded-none">
          <DataTable
            columns={columns}
            data={applications}
            loading={loading}
            emptyMessage="No job applications found matching your criteria."
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
