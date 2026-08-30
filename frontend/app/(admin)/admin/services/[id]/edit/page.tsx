'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { makeDefaultForm, ServiceFormData } from '@/lib/serviceFormTypes';
import { ServiceFormEditor } from '@/components/admin/sections/ServiceFormEditor';

export default function AdminEditServicePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<ServiceFormData>(makeDefaultForm());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await api.get<SafeAny>(`/services/${id}`);
        // Merge with default form to handle any missing fields from old records
        setForm({ ...makeDefaultForm(), ...data });
      } catch {
        setError('Failed to load service.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

  const handleSave = async (status: 'draft' | 'published') => {
    if (!form.name.en?.trim()) { setError('Service name (English) is required.'); return; }
    setSaving(true);
    setError('');
    try {
      await api.put(`/services/${id}`, { ...form, status });
      router.push('/admin/services');
    } catch (e: SafeAny) {
      setError(e?.message || 'Failed to update service.');
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-400">Loading service...</div>;

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/services" className="text-slate-400 hover:text-slate-700 text-sm">← Services</Link>
        <h1 className="text-2xl font-bold text-slate-900">Edit: {form.name.en || 'Service'}</h1>
        <a href={`/en/services/${form.slug}`} target="_blank" rel="noreferrer"
          className="ml-auto text-xs font-bold text-slate-400 hover:text-dazz-navy border border-slate-200 rounded px-3 py-1.5 transition-colors">
          Preview ↗
        </a>
      </div>
      {error && <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-200">{error}</div>}
      <ServiceFormEditor form={form} setForm={setForm} onSave={handleSave} saving={saving} isEdit />
    </div>
  );
}
