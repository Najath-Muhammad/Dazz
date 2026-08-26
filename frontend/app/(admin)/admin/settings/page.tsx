'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { api } from '@/lib/api';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'DAZZ Tradelink',
    contactEmail: '',
    contactPhone: '',
    heroTitle: '',
    heroSubtitle: '',
    heroBackgroundImage: '',
    aboutUsText: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.get<any>('/settings');
        if (data) {
          setSettings(data);
        }
      } catch (err) {
        console.error('Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.put('/settings', settings);
      setMessage('Settings updated successfully!');
    } catch (err: any) {
      setMessage(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Hero & Site Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-slate-200 rounded-lg p-8 space-y-8">
        {message && (
          <div className={`p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Homepage Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hero Title</label>
              <input type="text" name="heroTitle" value={settings.heroTitle} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle</label>
              <textarea name="heroSubtitle" rows={3} value={settings.heroSubtitle} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hero Background Image/Video URL</label>
              <input type="text" name="heroBackgroundImage" value={settings.heroBackgroundImage} onChange={handleChange} placeholder="https://..." className="w-full border border-slate-300 rounded-md px-4 py-2" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Global Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
              <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
              <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleChange} className="w-full border border-slate-300 rounded-md px-4 py-2" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
