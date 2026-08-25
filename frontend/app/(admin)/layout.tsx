'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('admin_token');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="text-2xl font-bold tracking-tight">
            DAZZ<span className="text-amber-500">.</span> Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-sm transition">
            Dashboard
          </Link>
          <Link href="/admin/pages" className="block px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-sm transition">
            Pages Content
          </Link>
          <Link href="/admin/projects" className="block px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-sm transition">
            Projects
          </Link>
          <Link href="/admin/blogs" className="block px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-sm transition">
            Blogs
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-sm transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
