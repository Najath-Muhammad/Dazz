'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Edit2, Trash2, Search, Filter, Star, Eye, MoreVertical } from 'lucide-react';

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Only close if we didn't click inside a dropdown button
      if (!(e.target as Element).closest('.dropdown-trigger')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchBlogs = async () => {
    try {
      const res: any = await api.get('/blogs');
      setBlogs(res || []);
    } catch (err) {
      console.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err) {
      console.error('Failed to delete blog');
      alert('Failed to delete blog post');
    }
  };

  const filteredBlogs = blogs.filter(b => {
    if (search && !(b.title?.en?.toLowerCase().includes(search.toLowerCase()))) return false;
    if (filterCategory !== 'ALL' && b.category?.en !== filterCategory) return false;
    if (filterStatus === 'PUBLISHED' && !b.isPublished) return false;
    if (filterStatus === 'DRAFT' && b.isPublished) return false;
    if (filterStatus === 'FEATURED' && !b.featured) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">News & Blogs</h1>
          <p className="text-slate-500 mt-1">Manage articles, news, and insights</p>
        </div>
        <Link 
          href="/admin/blogs/new"
          className="bg-dazz-navy hover:bg-slate-800 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm"
        >
          + Create New Post
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
              placeholder="Search by title..." 
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
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy"
              >
                <option value="ALL">All Categories</option>
                <option value="CONSTRUCTION">Construction</option>
                <option value="FOOD TRADING">Food Trading</option>
                <option value="LOGISTICS">Logistics</option>
                <option value="HOSPITALITY">Hospitality</option>
                <option value="COMPANY NEWS">Company News</option>
              </select>
            </div>
            <select 
              suppressHydrationWarning
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="border border-slate-300 rounded-md py-2 px-3 text-sm outline-none focus:border-dazz-navy"
            >
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="FEATURED">Featured Only</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Post Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading blogs...</td></tr>
            ) : filteredBlogs.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No blog posts found matching your criteria.</td></tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {blog.featured && <Star size={16} className="text-amber-500 fill-amber-500 flex-shrink-0" />}
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{blog.title?.en || 'Untitled'}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">/{blog.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {blog.category?.en || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.isPublished ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button 
                      suppressHydrationWarning
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === blog._id ? null : blog._id);
                      }}
                      className="dropdown-trigger p-2 text-slate-400 hover:text-dazz-navy hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === blog._id && (
                      <div className="absolute right-8 top-12 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-50 py-1 flex flex-col text-left">
                        <Link 
                          href={`/en/news/${blog.slug}`} 
                          target="_blank" 
                          className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                        >
                          <Eye size={16} className="text-slate-400" /> View Public Article
                        </Link>
                        <Link 
                          href={`/admin/blogs/${blog._id}`} 
                          className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                        >
                          <Edit2 size={16} className="text-slate-400" /> Edit Post
                        </Link>
                        <button 
                          suppressHydrationWarning
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(blog._id);
                          }}
                          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 w-full text-left transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" /> Delete Post
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
