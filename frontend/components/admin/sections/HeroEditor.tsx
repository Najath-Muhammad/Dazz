'use client';
import React from 'react';
import { BilingualField } from '../BilingualField';
import { MediaUploader } from '../MediaUploader';
import { ServiceFormData, emptyLoc } from '@/lib/serviceFormTypes';

interface Props {
  form: ServiceFormData;
  setForm: React.Dispatch<React.SetStateAction<ServiceFormData>>;
}

export function HeroEditor({ form, setForm }: Props) {
  const set = (path: string, lang: 'en' | 'ar', val: string) =>
    setForm(p => ({ ...p, hero: { ...p.hero, [path]: { ...(p.hero as any)[path], [lang]: val } } }));

  return (
    <div className="space-y-6">
      <BilingualField label="Eyebrow / Label" nameEn="hero_eyebrow_en" nameAr="hero_eyebrow_ar"
        note="Small text appearing above the main title."
        valueEn={form.hero.eyebrow.en} valueAr={form.hero.eyebrow.ar}
        onChangeEn={v => set('eyebrow', 'en', v)} onChangeAr={v => set('eyebrow', 'ar', v)}
        placeholder="e.g., Our Services" />
      <BilingualField label="Hero Title *" nameEn="hero_title_en" nameAr="hero_title_ar"
        note="The large main heading of the page."
        valueEn={form.hero.title.en} valueAr={form.hero.title.ar}
        onChangeEn={v => set('title', 'en', v)} onChangeAr={v => set('title', 'ar', v)}
        required placeholder="e.g., Ready Mix Concrete" />
      <BilingualField label="Subtitle" nameEn="hero_sub_en" nameAr="hero_sub_ar"
        note="Optional secondary heading below the main title."
        valueEn={form.hero.subtitle.en} valueAr={form.hero.subtitle.ar}
        onChangeEn={v => set('subtitle', 'en', v)} onChangeAr={v => set('subtitle', 'ar', v)} />
      <BilingualField label="Description" nameEn="hero_desc_en" nameAr="hero_desc_ar"
        note="A short paragraph introducing the service in the hero area."
        valueEn={form.hero.description.en} valueAr={form.hero.description.ar}
        onChangeEn={v => set('description', 'en', v)} onChangeAr={v => set('description', 'ar', v)}
        type="textarea" rows={3} />
      <MediaUploader label="Hero Image / Video" folder="dazz/services/hero"
        value={form.hero.media}
        onChange={m => setForm(p => ({ ...p, hero: { ...p.hero, media: m } }))} />

      <div className="border-t border-slate-100 pt-4 space-y-4">
        <h4 className="text-sm font-bold text-slate-600 uppercase tracking-widest">Primary CTA</h4>
        <BilingualField label="Button Text" nameEn="cta1_text_en" nameAr="cta1_text_ar"
          note="Text for the primary call-to-action button in the hero."
          valueEn={form.hero.ctaPrimary.text.en} valueAr={form.hero.ctaPrimary.text.ar}
          onChangeEn={v => setForm(p => ({ ...p, hero: { ...p.hero, ctaPrimary: { ...p.hero.ctaPrimary, text: { ...p.hero.ctaPrimary.text, en: v } } } }))}
          onChangeAr={v => setForm(p => ({ ...p, hero: { ...p.hero, ctaPrimary: { ...p.hero.ctaPrimary, text: { ...p.hero.ctaPrimary.text, ar: v } } } }))} />
        <div>
          <label className="block text-xs font-bold text-slate-500 tracking-widest uppercase mb-1">URL</label>
          <input type="text" value={form.hero.ctaPrimary.url}
            onChange={e => setForm(p => ({ ...p, hero: { ...p.hero, ctaPrimary: { ...p.hero.ctaPrimary, url: e.target.value } } }))}
            className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm" placeholder="/contact" />
        </div>
      </div>
    </div>
  );
}
