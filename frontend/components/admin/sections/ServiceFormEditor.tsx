'use client';
import React, { useState } from 'react';
import { BilingualField } from '../BilingualField';
import { MediaUploader } from '../MediaUploader';
import { ServiceFormData, SectionKey, SECTION_LABELS, ALL_SECTIONS, ALWAYS_ENABLED, emptyLoc } from '@/lib/serviceFormTypes';
import { HeroEditor } from './HeroEditor';
import { IntroductionEditor } from './IntroductionEditor';
import { RepeatableItemEditor } from './RepeatableItemEditor';

interface Props {
  form: ServiceFormData;
  setForm: React.Dispatch<React.SetStateAction<ServiceFormData>>;
  onSave: (status: 'draft' | 'published') => Promise<void>;
  saving: boolean;
  isEdit?: boolean;
}

const CATEGORIES = [
  { value: 'construction', label: 'Construction' },
  { value: 'food-trading', label: 'Food Trading' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'other', label: 'Other' },
];

const inputClass = 'w-full border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-dazz-navy outline-none';

export function ServiceFormEditor({ form, setForm, onSave, saving, isEdit }: Props) {
  const [activeSection, setActiveSection] = useState<SectionKey | 'basic' | 'seo'>('basic');
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleSection = (key: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const toggleEnabled = (key: SectionKey) => {
    if (ALWAYS_ENABLED.includes(key)) return;
    setForm(p => ({
      ...p,
      enabledSections: p.enabledSections.includes(key)
        ? p.enabledSections.filter(s => s !== key)
        : [...p.enabledSections, key]
    }));
  };

  const autoSlug = (en: string) => en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const setArr = (key: keyof ServiceFormData) => (items: any[]) =>
    setForm(p => ({ ...p, [key]: items }));

  const renderSection = () => {
    if (activeSection === 'basic') return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Icon (Emoji)</label>
            <input type="text" value={form.icon}
              onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
              className="w-20 border border-slate-300 rounded-md px-3 py-2 text-xl text-center" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Category</label>
            <select value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className={inputClass}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <BilingualField label="Service Name *" nameEn="name_en" nameAr="name_ar"
          valueEn={form.name.en} valueAr={form.name.ar}
          onChangeEn={v => { setForm(p => ({ ...p, name: { ...p.name, en: v }, slug: autoSlug(v) })); }}
          onChangeAr={v => setForm(p => ({ ...p, name: { ...p.name, ar: v } }))}
          required placeholder="e.g., Ready Mix Concrete" />

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">URL Slug</label>
          <input type="text" value={form.slug}
            onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
            className={`${inputClass} font-mono`} placeholder="ready-mix-concrete" />
        </div>

        <BilingualField label="Short Description" nameEn="short_desc_en" nameAr="short_desc_ar"
          valueEn={form.shortDescription.en} valueAr={form.shortDescription.ar}
          onChangeEn={v => setForm(p => ({ ...p, shortDescription: { ...p.shortDescription, en: v } }))}
          onChangeAr={v => setForm(p => ({ ...p, shortDescription: { ...p.shortDescription, ar: v } }))}
          type="textarea" rows={2} placeholder="Brief description shown in service listings" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Display Order</label>
            <input type="number" value={form.displayOrder} min={0}
              onChange={e => setForm(p => ({ ...p, displayOrder: parseInt(e.target.value) }))}
              className={inputClass} />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
              className="w-4 h-4" />
            <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured Service</label>
          </div>
        </div>

        {/* Section Selector */}
        <div className="border-t border-slate-100 pt-6">
          <p className="text-sm font-bold text-slate-700 mb-4">Content Sections</p>
          <div className="grid grid-cols-2 gap-2">
            {ALL_SECTIONS.map(key => {
              const isAlways = ALWAYS_ENABLED.includes(key);
              const isEnabled = form.enabledSections.includes(key);
              return (
                <label key={key} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${isEnabled ? 'border-dazz-navy bg-dazz-navy/5' : 'border-slate-200 bg-white'} ${isAlways ? 'opacity-60 cursor-not-allowed' : 'hover:border-dazz-navy/40'}`}>
                  <input type="checkbox" checked={isEnabled} disabled={isAlways} onChange={() => toggleEnabled(key)} className="w-4 h-4" />
                  <span className="text-sm font-medium text-slate-700">{SECTION_LABELS[key]}</span>
                  {isAlways && <span className="text-xs text-slate-400 ml-auto">Required</span>}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );

    if (activeSection === 'seo') return (
      <div className="space-y-6">
        <BilingualField label="SEO Title" nameEn="seo_title_en" nameAr="seo_title_ar"
          valueEn={form.seo.title.en} valueAr={form.seo.title.ar}
          onChangeEn={v => setForm(p => ({ ...p, seo: { ...p.seo, title: { ...p.seo.title, en: v } } }))}
          onChangeAr={v => setForm(p => ({ ...p, seo: { ...p.seo, title: { ...p.seo.title, ar: v } } }))} />
        <BilingualField label="SEO Description" nameEn="seo_desc_en" nameAr="seo_desc_ar"
          valueEn={form.seo.description.en} valueAr={form.seo.description.ar}
          onChangeEn={v => setForm(p => ({ ...p, seo: { ...p.seo, description: { ...p.seo.description, en: v } } }))}
          onChangeAr={v => setForm(p => ({ ...p, seo: { ...p.seo, description: { ...p.seo.description, ar: v } } }))}
          type="textarea" rows={2} />
        <MediaUploader label="OG Image" folder="dazz/services/seo"
          value={form.seo.ogImage} onChange={m => setForm(p => ({ ...p, seo: { ...p.seo, ogImage: m } }))} />
      </div>
    );

    if (activeSection === 'hero') return <HeroEditor form={form} setForm={setForm} />;
    if (activeSection === 'introduction') return <IntroductionEditor form={form} setForm={setForm} />;

    if (activeSection === 'capabilities') return (
      <RepeatableItemEditor title="Capabilities" addLabel="+ Add Capability"
        items={form.capabilities} setItems={setArr('capabilities')} />
    );
    if (activeSection === 'solutions') return (
      <RepeatableItemEditor title="Solutions / Services" addLabel="+ Add Solution"
        items={form.solutions} setItems={setArr('solutions')} hasImage hasCta imageFolder="dazz/services/solutions" />
    );
    if (activeSection === 'categories') return (
      <RepeatableItemEditor title="Products / Categories" addLabel="+ Add Category"
        items={form.categories} setItems={setArr('categories')} hasImage imageFolder="dazz/services/categories" />
    );
    if (activeSection === 'applications') return (
      <RepeatableItemEditor title="Applications / Industries" addLabel="+ Add Application"
        items={form.applications} setItems={setArr('applications')} hasImage imageFolder="dazz/services/applications" />
    );
    if (activeSection === 'process') return (
      <RepeatableItemEditor title="Process Steps" addLabel="+ Add Step"
        items={form.process} setItems={setArr('process')} hasImage hasStepNumber imageFolder="dazz/services/process" />
    );
    if (activeSection === 'equipment') return (
      <RepeatableItemEditor title="Equipment" addLabel="+ Add Equipment"
        items={form.equipment} setItems={setArr('equipment')} hasImage hasSpecification titleKey="name" imageFolder="dazz/services/equipment" />
    );
    if (activeSection === 'whyChooseUs') return (
      <RepeatableItemEditor title="Why Choose Us" addLabel="+ Add Reason"
        items={form.whyChooseUs} setItems={setArr('whyChooseUs')} />
    );
    if (activeSection === 'highlights') return (
      <RepeatableItemEditor title="Key Highlights" addLabel="+ Add Highlight"
        items={form.highlights} setItems={setArr('highlights')} subKey="sub" />
    );
    if (activeSection === 'gallery') return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-600">Gallery Items</span>
          <button type="button"
            onClick={() => setForm(p => ({ ...p, gallery: [...p.gallery, { mediaType: 'image', media: null, caption: emptyLoc(), category: '', order: p.gallery.length }] }))}
            className="text-xs font-bold text-dazz-navy hover:text-dazz-gold">+ Add Media</button>
        </div>
        {form.gallery.map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-lg p-4 space-y-3 relative">
            <button type="button" onClick={() => setForm(p => ({ ...p, gallery: p.gallery.filter((_, j) => j !== i) }))}
              className="absolute top-2 right-2 text-red-400 text-xs font-bold hover:text-red-600">✕</button>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Media Type</label>
              <select value={item.mediaType}
                onChange={e => { const g = [...form.gallery]; g[i] = { ...g[i], mediaType: e.target.value as 'image' | 'video' }; setForm(p => ({ ...p, gallery: g })); }}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm">
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <MediaUploader label="Media" folder="dazz/services/gallery"
              value={item.media} onChange={m => { const g = [...form.gallery]; g[i] = { ...g[i], media: m }; setForm(p => ({ ...p, gallery: g })); }} />
            <BilingualField label="Caption" nameEn={`cap_en_${i}`} nameAr={`cap_ar_${i}`}
              valueEn={item.caption.en} valueAr={item.caption.ar}
              onChangeEn={v => { const g = [...form.gallery]; g[i] = { ...g[i], caption: { ...g[i].caption, en: v } }; setForm(p => ({ ...p, gallery: g })); }}
              onChangeAr={v => { const g = [...form.gallery]; g[i] = { ...g[i], caption: { ...g[i].caption, ar: v } }; setForm(p => ({ ...p, gallery: g })); }} />
          </div>
        ))}
      </div>
    );
    if (activeSection === 'cta') return (
      <div className="space-y-6">
        <BilingualField label="CTA Title" nameEn="cta_title_en" nameAr="cta_title_ar"
          valueEn={form.cta.title.en} valueAr={form.cta.title.ar}
          onChangeEn={v => setForm(p => ({ ...p, cta: { ...p.cta, title: { ...p.cta.title, en: v } } }))}
          onChangeAr={v => setForm(p => ({ ...p, cta: { ...p.cta, title: { ...p.cta.title, ar: v } } }))} />
        <BilingualField label="Description" nameEn="cta_desc_en" nameAr="cta_desc_ar"
          valueEn={form.cta.description.en} valueAr={form.cta.description.ar}
          onChangeEn={v => setForm(p => ({ ...p, cta: { ...p.cta, description: { ...p.cta.description, en: v } } }))}
          onChangeAr={v => setForm(p => ({ ...p, cta: { ...p.cta, description: { ...p.cta.description, ar: v } } }))}
          type="textarea" rows={2} />
        <BilingualField label="Button Text" nameEn="cta_btn_en" nameAr="cta_btn_ar"
          valueEn={form.cta.buttonText.en} valueAr={form.cta.buttonText.ar}
          onChangeEn={v => setForm(p => ({ ...p, cta: { ...p.cta, buttonText: { ...p.cta.buttonText, en: v } } }))}
          onChangeAr={v => setForm(p => ({ ...p, cta: { ...p.cta, buttonText: { ...p.cta.buttonText, ar: v } } }))} />
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Button URL</label>
          <input type="text" value={form.cta.buttonUrl}
            onChange={e => setForm(p => ({ ...p, cta: { ...p.cta, buttonUrl: e.target.value } }))}
            className={inputClass} placeholder="/careers-contact" />
        </div>
        <MediaUploader label="Background Image" folder="dazz/services/cta"
          value={form.cta.backgroundImage} onChange={m => setForm(p => ({ ...p, cta: { ...p.cta, backgroundImage: m } }))} />
      </div>
    );

    return null;
  };

  const navItems: { key: SectionKey | 'basic' | 'seo'; label: string; badge?: string }[] = [
    { key: 'basic', label: '⚙️ Basic Info' },
    ...ALL_SECTIONS.map(key => ({
      key,
      label: `${form.enabledSections.includes(key) ? '●' : '○'} ${SECTION_LABELS[key]}`,
      badge: !form.enabledSections.includes(key) ? 'off' : undefined
    })),
    { key: 'seo', label: '🔍 SEO' },
  ];

  return (
    <div className="flex gap-6 min-h-[70vh]">
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden sticky top-4">
          {navItems.map(item => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveSection(item.key as any)}
              className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-slate-100 last:border-0 transition-colors flex items-center justify-between ${
                activeSection === item.key
                  ? 'bg-dazz-navy text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="truncate">{item.label}</span>
              {item.badge === 'off' && activeSection !== item.key && (
                <span className="text-xs text-slate-300 ml-1">off</span>
              )}
            </button>
          ))}
        </div>

        {/* Save actions */}
        <div className="mt-4 space-y-2">
          <button type="button" onClick={() => onSave('draft')} disabled={saving}
            className="w-full px-4 py-2.5 border border-dazz-navy text-dazz-navy text-sm font-bold rounded-md hover:bg-dazz-navy/5 disabled:opacity-50 transition-all">
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button type="button" onClick={() => onSave('published')} disabled={saving}
            className="w-full px-4 py-2.5 bg-dazz-navy text-white text-sm font-bold rounded-md hover:bg-dazz-navy/80 disabled:opacity-50 transition-all">
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Main editor */}
      <div className="flex-1 bg-white border border-slate-200 rounded-lg p-8">
        <h2 className="text-base font-bold text-slate-800 mb-6 pb-3 border-b border-slate-100">
          {activeSection === 'basic' ? '⚙️ Basic Information' :
           activeSection === 'seo' ? '🔍 SEO' :
           SECTION_LABELS[activeSection as SectionKey]}
        </h2>
        {renderSection()}
      </div>
    </div>
  );
}
