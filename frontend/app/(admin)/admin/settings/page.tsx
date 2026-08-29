'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { api } from '@/lib/api';
import { MediaUploader } from '@/components/admin/MediaUploader';
import CareersSettings from './CareersSettings';
import ContactSettings from './ContactSettings';
import AboutSettings from './AboutSettings';

const TABS = [
  { id: 'general', label: 'General Info' },
  { id: 'home', label: 'Homepage Hero' },
  { id: 'about', label: 'About Us Page' },
  { id: 'services', label: 'Services Hero' },
  { id: 'projects', label: 'Projects Hero' },
  { id: 'news', label: 'News Hero' },
  { id: 'contact', label: 'Contact Hero' },
  { id: 'contact_page', label: 'Contact Page Details' },
  { id: 'careers', label: 'Careers Page' },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    companyName: { en: 'DAZZ Tradlink', ar: '' },
    contactEmail: '',
    phoneNumber: '',
    heroTitle: '',
    heroSubtitle: '',
    heroBackgroundImage: '',
    pageHeaders: {},
    aboutUsText: ''
  });
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.get<any>('/settings');
        let currentSettings = data;
        if (data && Array.isArray(data) && data.length > 0) {
          currentSettings = data[0];
        }
        
        // Ensure pageHeaders object exists
        if (!currentSettings.pageHeaders) currentSettings.pageHeaders = {};

        // Auto-migrate legacy homepage hero data to the new UI structure
        if (!currentSettings.pageHeaders.home) {
          currentSettings.pageHeaders.home = {
            title: currentSettings.heroTitle || '',
            subtitle: currentSettings.heroSubtitle || '',
            media: currentSettings.heroBackgroundImage || ''
          };
        }

        // Auto-fetch legacy services page data just in case they added it before we centralized
        if (!currentSettings.pageHeaders.services || (!currentSettings.pageHeaders.services.title && !currentSettings.pageHeaders.services.media)) {
           try {
             const svcData = await api.get<any>('/content/services');
             if (svcData && svcData.content) {
                currentSettings.pageHeaders.services = {
                   title: svcData.title?.en || '',
                   subtitle: svcData.content.heroSubtitle?.en || '',
                   media: svcData.content.heroImage || ''
                };
             }
           } catch(e) { /* ignore */ }
        }
        
        setSettings(currentSettings);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleHeroChange = (page: string, field: string, value: any) => {
    setSettings({
      ...settings,
      pageHeaders: {
        ...settings.pageHeaders,
        [page]: {
          ...(settings.pageHeaders[page] || {}),
          [field]: value
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      if (settings._id) {
        await api.put(`/settings/${settings._id}`, settings);
      } else {
        await api.post('/settings', settings);
      }
      setMessage('Settings updated successfully!');
    } catch (err: any) {
      setMessage(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Hero & Site Settings</h1>
        <Button onClick={handleSubmit} variant="primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Tabs Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-dazz-navy text-white'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-8">
          {activeTab === 'general' ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Global Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                    <input type="email" name="contactEmail" value={settings.contactEmail || ''} onChange={handleChange} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                    <input type="text" name="phoneNumber" value={settings.phoneNumber || ''} onChange={handleChange} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold" />
                  </div>
                </div>
              </div>

              {/* Legacy fallback removed since we auto-migrate on load */}
            </div>
          ) : activeTab === 'careers' ? (
            <CareersSettings 
              settings={settings} 
              onChange={(newSettings) => setSettings(newSettings)} 
            />
          ) : activeTab === 'contact_page' ? (
            <ContactSettings 
              settings={settings} 
              onChange={(newSettings) => setSettings(newSettings)} 
            />
          ) : activeTab === 'about' ? (
            <AboutSettings
              settings={settings}
              onChange={(newSettings) => setSettings(newSettings)}
            />
          ) : (
            /* Dynamic Hero Tab */
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                {TABS.find(t => t.id === activeTab)?.label}
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Headline (Title)</label>
                <input 
                  type="text" 
                  value={settings.pageHeaders?.[activeTab]?.title || ''} 
                  onChange={(e) => handleHeroChange(activeTab, 'title', e.target.value)} 
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold"
                  placeholder="e.g. OUR DIVISIONS"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle / Description</label>
                <textarea 
                  rows={3} 
                  value={settings.pageHeaders?.[activeTab]?.subtitle || ''} 
                  onChange={(e) => handleHeroChange(activeTab, 'subtitle', e.target.value)} 
                  className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold"
                  placeholder="A short description of this page..."
                />
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <MediaUploader
                  label="Cinematic Background (Image or Video)"
                  folder={`dazz/headers/${activeTab}`}
                  value={settings.pageHeaders?.[activeTab]?.media || ''}
                  onChange={(media) => handleHeroChange(activeTab, 'media', media)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
