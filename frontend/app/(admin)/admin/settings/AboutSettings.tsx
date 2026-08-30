import React, { useState } from 'react';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { BilingualField } from '@/components/admin/BilingualField';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AboutSettingsProps {
  settings: SafeAny;
  onChange: (newSettings: SafeAny) => void;
}

export default function AboutSettings({ settings, onChange }: AboutSettingsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  // Default fallbacks
  const aboutUsPage = settings.aboutUsPage || {
    missionVision: {
      enabled: true,
      mission: { title: { en: '', ar: '' }, description: { en: '', ar: '' } },
      vision: { title: { en: '', ar: '' }, description: { en: '', ar: '' } }
    }
  };

  const updateSection = (fieldPath: string[], value: SafeAny) => {
    // deep clone
    const newSettings = JSON.parse(JSON.stringify(settings));
    
    let current = newSettings;
    if (!current.aboutUsPage) current.aboutUsPage = aboutUsPage;
    current = current.aboutUsPage;

    for (let i = 0; i < fieldPath.length - 1; i++) {
      if (!current[fieldPath[i]]) current[fieldPath[i]] = {};
      current = current[fieldPath[i]];
    }
    
    current[fieldPath[fieldPath.length - 1]] = value;

    onChange(newSettings);
  };

  const updateLocalized = (fieldPath: string[], lang: 'en' | 'ar', value: string) => {
    // Get current obj or create new one
    let currentVal = aboutUsPage;
    for (const key of fieldPath) {
      if (currentVal) currentVal = currentVal[key];
    }
    
    updateSection(fieldPath, { ...((currentVal as SafeAny) || { en: '', ar: '' }), [lang]: value });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const updateHero = (field: string, value: SafeAny) => {
    onChange({
      ...settings,
      pageHeaders: {
        ...settings.pageHeaders,
        about: {
          ...(settings.pageHeaders?.about || {}),
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('hero')}
        >
          <h2 className="text-xl font-bold text-slate-800">About Us Hero</h2>
          {expandedSection === 'hero' ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
        </div>
        
        {expandedSection === 'hero' && (
          <div className="mt-6 space-y-6 animate-fade-in border-t border-slate-100 pt-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Headline (Title)</label>
              <input 
                type="text" 
                value={settings.pageHeaders?.about?.title || ''} 
                onChange={(e) => updateHero('title', e.target.value)} 
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold"
                placeholder="e.g. EMPOWERING INDUSTRIAL EXCELLENCE"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle / Description</label>
              <textarea 
                rows={3} 
                value={settings.pageHeaders?.about?.subtitle || ''} 
                onChange={(e) => updateHero('subtitle', e.target.value)} 
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-gold"
                placeholder="A short description of this page..."
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <MediaUploader
                label="Cinematic Background (Image or Video)"
                folder="dazz/headers/about"
                value={settings.pageHeaders?.about?.media || ''}
                onChange={(media) => updateHero('media', media)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('missionVision')}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">Mission & Vision</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Enabled:</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateSection(['missionVision', 'enabled'], !aboutUsPage.missionVision?.enabled);
                }}
                className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${aboutUsPage.missionVision?.enabled ? 'bg-green-500' : 'bg-slate-300'}`}
              >
                <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${aboutUsPage.missionVision?.enabled ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>
          {expandedSection === 'missionVision' ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
        </div>

        {expandedSection === 'missionVision' && (
          <div className="mt-6 space-y-8 animate-fade-in border-t border-slate-100 pt-6">
            
            {/* Mission */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-l-4 border-dazz-gold pl-3">01 — Mission</h3>
              
              <BilingualField
                label="Mission Title"
                nameEn="missionTitleEn"
                nameAr="missionTitleAr"
                valueEn={aboutUsPage.missionVision?.mission?.title?.en || ''}
                valueAr={aboutUsPage.missionVision?.mission?.title?.ar || ''}
                onChangeEn={(v) => updateLocalized(['missionVision', 'mission', 'title'], 'en', v)}
                onChangeAr={(v) => updateLocalized(['missionVision', 'mission', 'title'], 'ar', v)}
              />

              <BilingualField
                label="Mission Description"
                nameEn="missionDescEn"
                nameAr="missionDescAr"
                type="textarea"
                valueEn={aboutUsPage.missionVision?.mission?.description?.en || ''}
                valueAr={aboutUsPage.missionVision?.mission?.description?.ar || ''}
                onChangeEn={(v) => updateLocalized(['missionVision', 'mission', 'description'], 'en', v)}
                onChangeAr={(v) => updateLocalized(['missionVision', 'mission', 'description'], 'ar', v)}
              />
            </div>

            <div className="h-px bg-slate-100 w-full" />

            {/* Vision */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-l-4 border-dazz-gold pl-3">02 — Vision</h3>
              
              <BilingualField
                label="Vision Title"
                nameEn="visionTitleEn"
                nameAr="visionTitleAr"
                valueEn={aboutUsPage.missionVision?.vision?.title?.en || ''}
                valueAr={aboutUsPage.missionVision?.vision?.title?.ar || ''}
                onChangeEn={(v) => updateLocalized(['missionVision', 'vision', 'title'], 'en', v)}
                onChangeAr={(v) => updateLocalized(['missionVision', 'vision', 'title'], 'ar', v)}
              />

              <BilingualField
                label="Vision Description"
                nameEn="visionDescEn"
                nameAr="visionDescAr"
                type="textarea"
                valueEn={aboutUsPage.missionVision?.vision?.description?.en || ''}
                valueAr={aboutUsPage.missionVision?.vision?.description?.ar || ''}
                onChangeEn={(v) => updateLocalized(['missionVision', 'vision', 'description'], 'en', v)}
                onChangeAr={(v) => updateLocalized(['missionVision', 'vision', 'description'], 'ar', v)}
              />
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
