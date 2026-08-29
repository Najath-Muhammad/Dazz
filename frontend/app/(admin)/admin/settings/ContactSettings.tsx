import React from 'react';
import { BilingualField } from '@/components/admin/BilingualField';

interface ContactSettingsProps {
  settings: any;
  onChange: (newSettings: any) => void;
}

export default function ContactSettings({ settings, onChange }: ContactSettingsProps) {
  const contactPage = settings.contactPage || {};
  const mapConfig = settings.mapConfig || { latitude: 24.7136, longitude: 46.6753, address: { en: '', ar: '' }, markerTitle: { en: '', ar: '' }, zoom: 12 };

  const updateSection = (section: string, field: string, value: any) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };

  const updateRoot = (field: string, value: any) => {
    onChange({
      ...settings,
      [field]: value
    });
  };

  const updateRootLocalized = (field: string, lang: 'en' | 'ar', value: string) => {
    updateRoot(field, { ...(settings[field] || { en: '', ar: '' }), [lang]: value });
  };

  const updateContactPageLocalized = (section: 'hero' | 'cta', field: string, lang: 'en' | 'ar', value: string) => {
    const sectionData = contactPage[section] || {};
    onChange({
      ...settings,
      contactPage: {
        ...contactPage,
        [section]: {
          ...sectionData,
          [field]: { ...(sectionData[field] || { en: '', ar: '' }), [lang]: value }
        }
      }
    });
  };

  const updateContactHeading = (lang: 'en' | 'ar', value: string) => {
    onChange({
      ...settings,
      contactPage: {
        ...contactPage,
        contactHeading: { ...(contactPage.contactHeading || { en: '', ar: '' }), [lang]: value }
      }
    });
  };

  const updateMapLocalized = (field: 'address' | 'markerTitle', lang: 'en' | 'ar', value: string) => {
    onChange({
      ...settings,
      mapConfig: {
        ...mapConfig,
        [field]: { ...(mapConfig[field] || { en: '', ar: '' }), [lang]: value }
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Contact Page Content */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Contact Page Content</h2>
        
        <BilingualField
          label="Hero Heading"
          nameEn="heroTitleEn"
          nameAr="heroTitleAr"
          valueEn={contactPage.hero?.title?.en || ''}
          valueAr={contactPage.hero?.title?.ar || ''}
          onChangeEn={(v) => updateContactPageLocalized('hero', 'title', 'en', v)}
          onChangeAr={(v) => updateContactPageLocalized('hero', 'title', 'ar', v)}
        />
        
        <BilingualField
          label="Hero Description"
          nameEn="heroDescEn"
          nameAr="heroDescAr"
          valueEn={contactPage.hero?.description?.en || ''}
          valueAr={contactPage.hero?.description?.ar || ''}
          onChangeEn={(v) => updateContactPageLocalized('hero', 'description', 'en', v)}
          onChangeAr={(v) => updateContactPageLocalized('hero', 'description', 'ar', v)}
          type="textarea"
        />

        <div className="pt-4 border-t border-slate-100">
          <BilingualField
            label="Contact Section Heading"
            nameEn="contactHeadingEn"
            nameAr="contactHeadingAr"
            valueEn={contactPage.contactHeading?.en || ''}
            valueAr={contactPage.contactHeading?.ar || ''}
            onChangeEn={(v) => updateContactHeading('en', v)}
            onChangeAr={(v) => updateContactHeading('ar', v)}
          />
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-6">
          <h3 className="font-semibold text-slate-700">Call to Action (CTA) Section</h3>
          <BilingualField
            label="CTA Heading"
            nameEn="ctaHeadingEn"
            nameAr="ctaHeadingAr"
            valueEn={contactPage.cta?.heading?.en || ''}
            valueAr={contactPage.cta?.heading?.ar || ''}
            onChangeEn={(v) => updateContactPageLocalized('cta', 'heading', 'en', v)}
            onChangeAr={(v) => updateContactPageLocalized('cta', 'heading', 'ar', v)}
          />
          <BilingualField
            label="CTA Description"
            nameEn="ctaDescEn"
            nameAr="ctaDescAr"
            valueEn={contactPage.cta?.description?.en || ''}
            valueAr={contactPage.cta?.description?.ar || ''}
            onChangeEn={(v) => updateContactPageLocalized('cta', 'description', 'en', v)}
            onChangeAr={(v) => updateContactPageLocalized('cta', 'description', 'ar', v)}
            type="textarea"
          />
          <BilingualField
            label="CTA Button Text"
            nameEn="ctaBtnEn"
            nameAr="ctaBtnAr"
            valueEn={contactPage.cta?.buttonText?.en || ''}
            valueAr={contactPage.cta?.buttonText?.ar || ''}
            onChangeEn={(v) => updateContactPageLocalized('cta', 'buttonText', 'en', v)}
            onChangeAr={(v) => updateContactPageLocalized('cta', 'buttonText', 'ar', v)}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Contact Information (Global)</h2>
        
        <BilingualField
          label="Company Address"
          nameEn="addressEn"
          nameAr="addressAr"
          valueEn={settings.address?.en || ''}
          valueAr={settings.address?.ar || ''}
          onChangeEn={(v) => updateRootLocalized('address', 'en', v)}
          onChangeAr={(v) => updateRootLocalized('address', 'ar', v)}
          type="textarea"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              value={settings.phoneNumber || ''} 
              onChange={(e) => updateRoot('phoneNumber', e.target.value)} 
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold outline-none" 
              placeholder="+966 59 222 8228"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
            <input 
              type="email" 
              value={settings.contactEmail || ''} 
              onChange={(e) => updateRoot('contactEmail', e.target.value)} 
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold outline-none" 
              placeholder="info@dazztradlink.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
            <input 
              type="url" 
              value={settings.websiteUrl || ''} 
              onChange={(e) => updateRoot('websiteUrl', e.target.value)} 
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold outline-none" 
              placeholder="www.dazztradlink.com"
            />
          </div>
        </div>
      </div>

      {/* Map Settings */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Map Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
            <input 
              type="number" 
              step="any"
              value={mapConfig.latitude || ''} 
              onChange={(e) => updateSection('mapConfig', 'latitude', parseFloat(e.target.value))} 
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
            <input 
              type="number"
              step="any" 
              value={mapConfig.longitude || ''} 
              onChange={(e) => updateSection('mapConfig', 'longitude', parseFloat(e.target.value))} 
              className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold outline-none" 
            />
          </div>
        </div>
        
        <BilingualField
          label="Map Marker Title"
          nameEn="mapMarkerEn"
          nameAr="mapMarkerAr"
          valueEn={mapConfig.markerTitle?.en || ''}
          valueAr={mapConfig.markerTitle?.ar || ''}
          onChangeEn={(v) => updateMapLocalized('markerTitle', 'en', v)}
          onChangeAr={(v) => updateMapLocalized('markerTitle', 'ar', v)}
        />
        
        <div className="text-xs text-slate-500 italic mt-2">
          Note: If using an external map provider (like Google Maps), ensure the API key is set in your environment variables.
        </div>
      </div>
    </div>
  );
}
