'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove('admin_token');
    router.push('/admin/login');
  };

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-dazz-navy text-white flex flex-col md:sticky md:top-0 md:h-screen overflow-y-auto scrollbar-none z-10 shadow-lg">
        <div className="p-6 border-b border-dazz-navy-dark">
          <Link href="/admin" className="flex flex-col justify-center">
            <div className="relative h-12 w-48">
              <Image 
                src="/images/logo-transparent.png" 
                alt="DAZZ Tradlink" 
                fill
                priority
                sizes="250px"
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 text-[15px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            Dashboard
          </Link>
          <div className="pt-6 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Content Management</div>
          <Link href="/admin/settings" className="block px-4 py-3 text-[15px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            Hero & Site Settings
          </Link>
          <Link href="/admin/services" className="block px-4 py-3 text-[15px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            Divisions & Services
          </Link>
          <Link href="/admin/projects" className="block px-4 py-3 text-[15px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            Project Gallery
          </Link>
          <Link href="/admin/blogs" className="block px-4 py-3 text-[15px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            News & Blogs
          </Link>
          <div className="pt-6 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Interactions</div>
          <Link href="/admin/careers" className="block px-4 py-3 text-[15px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            Careers & Jobs
          </Link>
          <Link href="/admin/applications" className="block px-4 py-3 text-[15px] font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200">
            Job Applications
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            suppressHydrationWarning
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
