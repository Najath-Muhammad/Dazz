'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { makeDefaultForm } from '@/lib/serviceFormTypes';
import { ServiceFormEditor } from '@/components/admin/sections/ServiceFormEditor';

export default function AdminNewServicePage() {
  const router = useRouter();
  const [form, setForm] = useState(makeDefaultForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (status: 'draft' | 'published') => {
    if (!form.name.en?.trim()) { setError('Service name (English) is required.'); return; }
    if (!form.slug?.trim()) { setError('Slug is required.'); return; }
    setSaving(true);
    setError('');
    try {
      await api.post('/admin/services', { ...form, status });
      router.push('/admin/services');
    } catch (e: any) {
      setError(e?.message || 'Failed to save service.');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/services" className="text-slate-400 hover:text-slate-700 text-sm">← Services</Link>
        <h1 className="text-2xl font-bold text-slate-900">Create Service</h1>
      </div>
      {error && <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-200">{error}</div>}
      <ServiceFormEditor form={form} setForm={setForm} onSave={handleSave} saving={saving} />
    </div>
  );
}
