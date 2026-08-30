import React, { useState } from 'react';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { BilingualField } from '@/components/admin/BilingualField';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface CareersSettingsProps {
  settings: SafeAny;
  onChange: (newSettings: SafeAny) => void;
}

export default function CareersSettings({ settings, onChange }: CareersSettingsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const careers = settings.careers || {
    hero: { title: { en: '', ar: '' }, subtitle: { en: '', ar: '' }, media: null },
    whyWorkWithUs: { enabled: true, title: { en: '', ar: '' }, description: { en: '', ar: '' }, benefits: [] },
    culture: { enabled: true, title: { en: '', ar: '' }, description: { en: '', ar: '' }, gallery: [] }
  };

  const updateSection = (section: 'hero' | 'whyWorkWithUs' | 'culture', field: string, value: SafeAny) => {
    onChange({
      ...settings,
      careers: {
        ...careers,
        [section]: {
          ...careers[section],
          [field]: value
        }
      }
    });
  };

  const updateLocalized = (section: 'hero' | 'whyWorkWithUs' | 'culture', field: string, lang: 'en'|'ar', value: string) => {
    updateSection(section, field, { ...(careers[section][field] || {en:'', ar:''}), [lang]: value });
  };

  const addBenefit = () => {
    const newBenefits = [
      ...(careers.whyWorkWithUs.benefits || []),
      { title: { en: '', ar: '' }, description: { en: '', ar: '' } }
    ];
    updateSection('whyWorkWithUs', 'benefits', newBenefits);
    setExpandedIndex(newBenefits.length - 1);
  };

  const updateBenefit = (index: number, field: 'title' | 'description', lang: 'en'|'ar', value: string) => {
    const newBenefits = [...(careers.whyWorkWithUs.benefits || [])];
    newBenefits[index] = {
      ...newBenefits[index],
      [field]: { ...(newBenefits[index][field] || {en:'',ar:''}), [lang]: value }
    };
    updateSection('whyWorkWithUs', 'benefits', newBenefits);
  };

  const updateBenefitImage = (index: number, media: SafeAny) => {
    const newBenefits = [...(careers.whyWorkWithUs.benefits || [])];
    newBenefits[index] = {
      ...newBenefits[index],
      image: media
    };
    updateSection('whyWorkWithUs', 'benefits', newBenefits);
  };

  const removeBenefit = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newBenefits = [...(careers.whyWorkWithUs.benefits || [])];
    newBenefits.splice(index, 1);
    updateSection('whyWorkWithUs', 'benefits', newBenefits);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const toggleBenefit = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Careers Hero Section</h2>
        
        <BilingualField
          label="Hero Title"
          nameEn="heroTitleEn"
          nameAr="heroTitleAr"
          valueEn={careers.hero?.title?.en || ''}
          valueAr={careers.hero?.title?.ar || ''}
          onChangeEn={(v) => updateLocalized('hero', 'title', 'en', v)}
          onChangeAr={(v) => updateLocalized('hero', 'title', 'ar', v)}
        />
        
        <BilingualField
          label="Hero Subtitle"
          nameEn="heroSubEn"
          nameAr="heroSubAr"
          valueEn={careers.hero?.subtitle?.en || ''}
          valueAr={careers.hero?.subtitle?.ar || ''}
          onChangeEn={(v) => updateLocalized('hero', 'subtitle', 'en', v)}
          onChangeAr={(v) => updateLocalized('hero', 'subtitle', 'ar', v)}
          type="textarea"
        />

        <div className="pt-4 border-t border-slate-100">
          <MediaUploader
            label="Hero Background Media"
            folder="dazz/careers/hero"
            value={careers.hero?.media}
            onChange={(media) => updateSection('hero', 'media', media)}
          />
        </div>
      </div>

      {/* Why Work With Us Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-xl font-bold text-slate-800">Why Work With Dazz</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-medium text-slate-600">Enabled</span>
            <input
              type="checkbox"
              checked={careers.whyWorkWithUs?.enabled !== false}
              onChange={(e) => updateSection('whyWorkWithUs', 'enabled', e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-dazz-navy focus:ring-dazz-navy"
            />
          </label>
        </div>
        
        {careers.whyWorkWithUs?.enabled !== false && (
          <>
            <BilingualField
              label="Section Title"
              nameEn="whyTitleEn"
              nameAr="whyTitleAr"
              valueEn={careers.whyWorkWithUs?.title?.en || ''}
              valueAr={careers.whyWorkWithUs?.title?.ar || ''}
              onChangeEn={(v) => updateLocalized('whyWorkWithUs', 'title', 'en', v)}
              onChangeAr={(v) => updateLocalized('whyWorkWithUs', 'title', 'ar', v)}
            />

            <BilingualField
              label="Section Description"
              nameEn="whyDescEn"
              nameAr="whyDescAr"
              valueEn={careers.whyWorkWithUs?.description?.en || ''}
              valueAr={careers.whyWorkWithUs?.description?.ar || ''}
              onChangeEn={(v) => updateLocalized('whyWorkWithUs', 'description', 'en', v)}
              onChangeAr={(v) => updateLocalized('whyWorkWithUs', 'description', 'ar', v)}
              type="textarea"
            />

            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-slate-700">Benefits List</label>
                <button type="button" onClick={addBenefit} className="text-sm text-dazz-navy hover:text-dazz-gold flex items-center gap-1">
                  <Plus size={16} /> Add Benefit
                </button>
              </div>
              
              <div className="space-y-4">
                {(careers.whyWorkWithUs?.benefits || []).map((benefit: SafeAny, index: number) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <div key={index} className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm transition-all">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() => toggleBenefit(index)}
                      >
                        <span className="font-semibold text-slate-700">
                          {benefit.title?.en || `New Benefit ${index + 1}`}
                        </span>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button" 
                            onClick={(e) => removeBenefit(index, e)} 
                            className="text-slate-400 hover:text-red-500 p-1 transition-colors rounded-md hover:bg-red-50"
                            title="Remove Benefit"
                          >
                            <Trash2 size={18} />
                          </button>
                          <div className="text-slate-400 p-1">
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </div>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-6">
                          <BilingualField
                            label="Benefit Title"
                            nameEn={`b_titleEn_${index}`}
                            nameAr={`b_titleAr_${index}`}
                            valueEn={benefit.title?.en || ''}
                            valueAr={benefit.title?.ar || ''}
                            onChangeEn={(v) => updateBenefit(index, 'title', 'en', v)}
                            onChangeAr={(v) => updateBenefit(index, 'title', 'ar', v)}
                          />
                          <BilingualField
                            label="Benefit Description"
                            nameEn={`b_descEn_${index}`}
                            nameAr={`b_descAr_${index}`}
                            valueEn={benefit.description?.en || ''}
                            valueAr={benefit.description?.ar || ''}
                            onChangeEn={(v) => updateBenefit(index, 'description', 'en', v)}
                            onChangeAr={(v) => updateBenefit(index, 'description', 'ar', v)}
                            type="textarea"
                          />
                          <div className="pt-2">
                            <MediaUploader
                              label="Optional Background Image"
                              folder="dazz/careers/principles"
                              value={benefit.image}
                              onChange={(media) => updateBenefitImage(index, media)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {(careers.whyWorkWithUs?.benefits?.length || 0) === 0 && (
                  <p className="text-sm text-slate-400 italic">No benefits added yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>


    </div>
  );
}
