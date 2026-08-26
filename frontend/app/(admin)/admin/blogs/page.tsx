'use client';
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const data = await api.get<any[]>('/blogs');
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">News & Blogs</h1>
        <button className="bg-dazz-navy hover:bg-dazz-navy-light text-white px-4 py-2 rounded-md font-medium transition-colors">
          + Create New Post
        </button>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Post Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date Published</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">Loading blogs...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">No blog posts found.</td></tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{blog.title?.en || blog.title || 'Untitled'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{blog.author || 'Dazz Admin'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-dazz-navy hover:text-dazz-gold transition-colors mr-4">Edit</button>
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
