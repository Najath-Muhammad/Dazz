'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Search, Filter, Eye } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchApplications = async () => {
    try {
      const res: any = await api.get('/careers');
      setApplications(res || []);
    } catch (err) {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.candidateName?.toLowerCase().includes(search.toLowerCase()) || 
                          app.jobId?.title?.en?.toLowerCase().includes(search.toLowerCase()) ||
                          app.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'NEW': return 'bg-blue-100 text-blue-800';
      case 'REVIEWING': return 'bg-amber-100 text-amber-800';
      case 'SHORTLISTED': return 'bg-purple-100 text-purple-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'HIRED': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
          <p className="text-slate-500 mt-1">Review candidates and manage recruitment</p>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg">
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[260px]">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              suppressHydrationWarning
              type="text" 
              placeholder="Search by candidate name, email, or job..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select 
                suppressHydrationWarning
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
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
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Applied For</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading applications...</td></tr>
            ) : filteredApplications.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No applications found matching your criteria.</td></tr>
            ) : (
              filteredApplications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{app.candidateName}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-slate-800">{app.jobId ? app.jobId.title?.en : 'General Application'}</p>
                    {app.jobId && <p className="text-xs text-slate-500">{app.jobId.department}</p>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/applications/${app._id}`} 
                      className="inline-flex items-center justify-center p-2 bg-slate-100 text-dazz-navy hover:bg-dazz-navy hover:text-white rounded-md transition-colors"
                      title="Review Application"
                    >
                      <Eye size={16} />
                    </Link>
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
