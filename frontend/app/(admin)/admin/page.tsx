'use client';
import React, { useEffect, useState } from 'react';
import { authService } from '@/services/authService';

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState<{name: string, email: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const data = await authService.getMe();
        setAdmin(data);
      } catch (err: SafeAny) {
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>
      
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-slate-300 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-300 rounded"></div>
              <div className="h-4 bg-slate-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-sm border border-red-200">
          {error}
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Welcome back, {admin?.name}</h2>
          <p className="text-slate-600">Email: {admin?.email}</p>
          <p className="text-slate-600 mt-4">
            You are successfully authenticated. Use the sidebar to navigate the admin modules.
          </p>
        </div>
      )}
    </div>
  );
}