'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Edit2, Trash2, Search, Filter, Star, Eye, MoreVertical } from 'lucide-react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { Pagination } from '@/components/admin/Pagination';
import { SearchBar } from '@/components/admin/SearchBar';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
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

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        status: filterStatus === 'ALL' ? '' : filterStatus.toLowerCase(),
        category: filterCategory === 'ALL' ? '' : filterCategory
      }).toString();
      
      const data: any = await api.get(`/blogs?${qs}`);
      if (data.data && data.pagination) {
        setBlogs(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.total);
      } else {
        setBlogs(data.data || data || []);
      }
    } catch {
      console.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, [page, search, filterCategory, filterStatus]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch {
      alert('Failed to delete blog post');
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    if (search && !b.title?.en?.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'ALL' && b.category?.en !== filterCategory) return false;
    if (filterStatus === 'PUBLISHED' && !b.isPublished) return false;
    if (filterStatus === 'DRAFT' && b.isPublished) return false;
    if (filterStatus === 'FEATURED' && !b.featured) return false;
    return true;
  });

  const columns: Column<any>[] = [
    {
      key: 'title',
      header: 'Post Title',
      render: (blog) => (
        <div className="flex items-center gap-3">
          {blog.featured && <Star size={15} className="text-amber-500 fill-amber-500 flex-shrink-0" />}
          <div>
            <p className="font-bold text-slate-900 line-clamp-1">{blog.title?.en || 'Untitled'}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">/{blog.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (blog) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
          {blog.category?.en || 'Uncategorized'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (blog) =>
        blog.isPublished ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Draft</span>
        ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (blog) => (
        <span className="text-sm text-slate-500">
          {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (blog) => (
        <div className="relative">
          <button
            suppressHydrationWarning
            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === blog.id ? null : blog.id); }}
            className="dropdown-trigger p-2 text-slate-400 hover:text-dazz-navy hover:bg-slate-100 rounded-md transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          {openDropdown === blog.id && (
            <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-[100] py-1 flex flex-col text-left">
              <Link href={`/en/news/${blog.slug}`} target="_blank" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <Eye size={16} className="text-slate-400" /> View Public Article
              </Link>
              <Link href={`/admin/blogs/${blog.id}`} className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <Edit2 size={16} className="text-slate-400" /> Edit Post
              </Link>
              <button
                suppressHydrationWarning
                onClick={(e) => { e.stopPropagation(); handleDelete(blog.id); }}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left transition-colors"
              >
                <Trash2 size={16} className="text-red-400" /> Delete Post
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">News &amp; Blogs</h1>
          <p className="text-slate-500 mt-1">Manage articles, news, and insights</p>
        </div>
        <Link href="/admin/blogs/new" className="bg-dazz-navy hover:bg-slate-800 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm">
          + Create New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-lg flex flex-wrap gap-4 items-center justify-between">
        <SearchBar 
          onSearch={(val) => { setSearch(val); setPage(1); }} 
          placeholder="Search by title..." 
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select suppressHydrationWarning value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }} className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy">
              <option value="ALL">All Categories</option>
              <option value="CONSTRUCTION">Construction</option>
              <option value="FOOD TRADING">Food Trading</option>
              <option value="LOGISTICS">Logistics</option>
              <option value="HOSPITALITY">Hospitality</option>
              <option value="COMPANY NEWS">Company News</option>
            </select>
          </div>
          <select suppressHydrationWarning value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy">
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="FEATURED">Featured Only</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-slate-200">
        <div className="border-b-0 border-transparent [&>div]:border-0 [&>div]:rounded-none">
          <DataTable
            columns={columns}
            data={blogs}
            loading={loading}
            emptyMessage="No blog posts found matching your criteria."
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
