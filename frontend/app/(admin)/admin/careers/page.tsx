'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Edit2, Trash2, Search, Filter, Eye, MoreVertical } from 'lucide-react';

export default function AdminCareersPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.dropdown-trigger')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchJobs = async () => {
    try {
      const res: any = await api.get('/jobs');
      setJobs(res || []);
    } catch (err) {
      console.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter(j => j._id !== id));
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.en?.toLowerCase().includes(search.toLowerCase()) || 
                          job.department?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Careers & Jobs</h1>
          <p className="text-slate-500 mt-1">Manage job openings and postings</p>
        </div>
        <Link 
          href="/admin/careers/new"
          className="px-6 py-2.5 bg-dazz-navy text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition shadow-sm"
        >
          + Post New Job
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg">
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[260px]">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              suppressHydrationWarning
              type="text" 
              placeholder="Search by title or department..." 
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
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Department & Location</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Posted Date</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading jobs...</td></tr>
            ) : filteredJobs.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No jobs found matching your criteria.</td></tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job._id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{job.title?.en || 'Untitled'}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">/{job.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-slate-800">{job.department}</p>
                    <p className="text-xs text-slate-500">{job.location} • {job.type}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.status === 'PUBLISHED' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : job.status === 'CLOSED' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Closed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {job.publishedAt ? new Date(job.publishedAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button 
                      suppressHydrationWarning
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === job._id ? null : job._id);
                      }}
                      className="dropdown-trigger p-2 text-slate-400 hover:text-dazz-navy hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openDropdown === job._id && (
                      <div className="absolute right-8 top-12 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-50 py-1 flex flex-col text-left">
                        <Link 
                          href={`/en/careers/${job.slug}`} 
                          target="_blank" 
                          className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                        >
                          <Eye size={16} className="text-slate-400" /> View Public
                        </Link>
                        <Link 
                          href={`/admin/careers/${job._id}`} 
                          className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                        >
                          <Edit2 size={16} className="text-slate-400" /> Edit Job
                        </Link>
                        <button 
                          suppressHydrationWarning
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(job._id);
                          }}
                          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" /> Delete Job
                        </button>
                      </div>
                    )}
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
