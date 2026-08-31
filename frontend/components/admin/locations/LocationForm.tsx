'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button } from '@/components/Button';
import { ArrowLeft, Save, MapPin } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { useZodValidation } from '@/hooks/useZodValidation';
import { FormError } from '@/components/ui/FormError';

const locationSchema = z.object({
  name: z.object({
    en: z.string().min(1, 'English name is required'),
    ar: z.string().optional()
  }),
  country: z.object({
    en: z.string().min(1, 'English country is required'),
    ar: z.string().optional()
  }),
  city: z.object({
    en: z.string().min(1, 'English city is required'),
    ar: z.string().optional()
  }),
  address: z.object({
    en: z.string().min(1, 'English address is required'),
    ar: z.string().optional()
  }),
  latitude: z.number({ invalid_type_error: 'Latitude is required' } as SafeAny),
  longitude: z.number({ invalid_type_error: 'Longitude is required' } as SafeAny)
});

const MapPreview = dynamic(() => import('./MapPreview'), { ssr: false, loading: () => <div className="w-full h-[400px] bg-slate-200 animate-pulse flex items-center justify-center">Loading Map...</div> });

interface LocationFormProps {
  initialData?: SafeAny;
  isEdit?: boolean;
}

export default function LocationForm({ initialData, isEdit = false }: LocationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { errors, validate, clearErrors } = useZodValidation(locationSchema);

  const [formData, setFormData] = useState({
    name: { en: initialData?.name?.en || '', ar: initialData?.name?.ar || '' },
    type: { en: initialData?.type?.en || 'Branch', ar: initialData?.type?.ar || 'فرع' },
    country: { en: initialData?.country?.en || '', ar: initialData?.country?.ar || '' },
    city: { en: initialData?.city?.en || '', ar: initialData?.city?.ar || '' },
    address: { en: initialData?.address?.en || '', ar: initialData?.address?.ar || '' },
    description: { en: initialData?.description?.en || '', ar: initialData?.description?.ar || '' },
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    website: initialData?.website || '',
    latitude: initialData?.latitude || 21.5222,
    longitude: initialData?.longitude || 39.1718,
    isActive: initialData?.isActive !== false,
  });

  const handleChange = (field: string, value: SafeAny, isLocal = false) => {
    if (isLocal) {
      setFormData(prev => ({
        ...prev,
        [field]: { ...(prev as SafeAny)[field], en: value }
      }));
      // Clear nested error if exists
      if ((errors as SafeAny)[field]) clearErrors();
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
      if ((errors as SafeAny)[field]) clearErrors();
    }
  };

  const handleMapChange = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      if (isEdit) {
        await api.put(`/locations/${initialData.id}`, formData);
        setMessage('Location updated successfully!');
      } else {
        await api.post('/locations', formData);
        setMessage('Location created successfully!');
      }
      setTimeout(() => router.push('/admin/locations'), 1000);
    } catch (err: SafeAny) {
      console.error(err);
      setMessage(err.message || 'Failed to save location');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/locations" className="p-2 bg-white text-slate-500 hover:text-dazz-navy rounded-full border border-slate-200 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{isEdit ? 'Edit Location' : 'Add New Location'}</h1>
          <p className="text-slate-500 mt-1">Configure map markers for the public Contact Us page.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
              <span className="text-xs text-dazz-gold font-medium">✨ Auto-translates to Arabic on save</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location Name *</label>
                  <input type="text" value={formData.name.en} onChange={e => handleChange('name', e.target.value, true)} className={`w-full bg-white text-slate-900 border rounded-md px-4 py-2 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-dazz-gold'}`} placeholder="e.g. DAZZ JEDDAH OFFICE" />
                  <FormError message={errors.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location Type</label>
                  <input type="text" value={formData.type.en} onChange={e => handleChange('type', e.target.value, true)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold" placeholder="e.g. Headquarters" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                  <input type="text" value={formData.country.en} onChange={e => handleChange('country', e.target.value, true)} className={`w-full bg-white text-slate-900 border rounded-md px-4 py-2 focus:outline-none transition-colors ${errors.country ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-dazz-gold'}`} placeholder="e.g. Saudi Arabia" />
                  <FormError message={errors.country} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                  <input type="text" value={formData.city.en} onChange={e => handleChange('city', e.target.value, true)} className={`w-full bg-white text-slate-900 border rounded-md px-4 py-2 focus:outline-none transition-colors ${errors.city ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-dazz-gold'}`} placeholder="e.g. Jeddah" />
                  <FormError message={errors.city} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Address *</label>
                <textarea rows={3} value={formData.address.en} onChange={e => handleChange('address', e.target.value, true)} className={`w-full bg-white text-slate-900 border rounded-md px-4 py-2 focus:outline-none transition-colors ${errors.address ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-dazz-gold'}`} placeholder="Enter complete physical address..." />
                <FormError message={errors.address} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea rows={2} value={formData.description.en} onChange={e => handleChange('description', e.target.value, true)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold" placeholder="Any additional location details..." />
              </div>
            </div>
          </div>

          {/* Map Location Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><MapPin size={20} className="text-dazz-gold"/> Map Coordinates</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Latitude *</label>
                <input type="number" step="any" value={formData.latitude} onChange={e => handleChange('latitude', parseFloat(e.target.value))} className={`w-full bg-white text-slate-900 border rounded-md px-4 py-2 focus:outline-none transition-colors font-mono text-sm ${errors.latitude ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-dazz-gold'}`} />
                <FormError message={errors.latitude} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Longitude *</label>
                <input type="number" step="any" value={formData.longitude} onChange={e => handleChange('longitude', parseFloat(e.target.value))} className={`w-full bg-white text-slate-900 border rounded-md px-4 py-2 focus:outline-none transition-colors font-mono text-sm ${errors.longitude ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-dazz-gold'}`} />
                <FormError message={errors.longitude} />
              </div>
            </div>

            <div className="border border-slate-200 rounded-md overflow-hidden bg-slate-50">
              <MapPreview latitude={formData.latitude} longitude={formData.longitude} onChange={handleMapChange} />
            </div>
          </div>
          
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publishing */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Publishing</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-md hover:bg-slate-50 transition">
                <input 
                  type="checkbox" 
                  checked={formData.isActive}
                  onChange={e => handleChange('isActive', e.target.checked)}
                  className="w-5 h-5 text-dazz-gold rounded border-slate-300 focus:ring-dazz-gold"
                />
                <div>
                  <div className="font-semibold text-slate-900">Active Status</div>
                  <div className="text-xs text-slate-500">Only active locations appear on the public map.</div>
                </div>
              </label>

              <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                <Save size={18} /> {loading ? 'Saving...' : (isEdit ? 'Update Location' : 'Save Location')}
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Details</h2>
            <p className="text-xs text-slate-500 mb-4">These fields will appear in the map popup. They are completely optional.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="text" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold" placeholder="+966 5X XXX XXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold" placeholder="branch@dazztradlink.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
                <input type="url" value={formData.website} onChange={e => handleChange('website', e.target.value)} className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold" placeholder="https://" />
              </div>
            </div>
          </div>
          
        </div>
      </form>
    </div>
  );
}
