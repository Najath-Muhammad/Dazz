'use client';
import React from 'react';
import { BilingualField } from '../BilingualField';
import { MediaUploader } from '../MediaUploader';
import { ServiceFormData, emptyLoc, LocalizedField } from '@/lib/serviceFormTypes';

interface Props { form: ServiceFormData; setForm: React.Dispatch<React.SetStateAction<ServiceFormData>>; }

export function IntroductionEditor({ form, setForm }: Props) {
  const intro = form.introduction;

  const setLoc = (key: keyof typeof intro, lang: 'en' | 'ar', val: string) =>
    setForm(p => ({ ...p, introduction: { ...p.introduction, [key]: { ...(p.introduction[key] as LocalizedField), [lang]: val } } }));

  const setPara = (i: number, lang: 'en' | 'ar', val: string) => {
    const paras = [...intro.paragraphs];
    paras[i] = { ...paras[i], [lang]: val };
    setForm(p => ({ ...p, introduction: { ...p.introduction, paragraphs: paras } }));
  };

  const addPara = () => setForm(p => ({ ...p, introduction: { ...p.introduction, paragraphs: [...p.introduction.paragraphs, emptyLoc()] } }));
  const removePara = (i: number) => setForm(p => ({ ...p, introduction: { ...p.introduction, paragraphs: p.introduction.paragraphs.filter((_, j) => j !== i) } }));

  return (
    <div className="space-y-6">
      <BilingualField label="Section Label" nameEn="intro_label_en" nameAr="intro_label_ar"
        valueEn={intro.sectionLabel.en} valueAr={intro.sectionLabel.ar}
        onChangeEn={v => setLoc('sectionLabel', 'en', v)} onChangeAr={v => setLoc('sectionLabel', 'ar', v)}
        placeholder="e.g., About Our Division" />
      <BilingualField label="Section Title" nameEn="intro_title_en" nameAr="intro_title_ar"
        valueEn={intro.title.en} valueAr={intro.title.ar}
        onChangeEn={v => setLoc('title', 'en', v)} onChangeAr={v => setLoc('title', 'ar', v)} />
      <BilingualField label="Main Description" nameEn="intro_main_en" nameAr="intro_main_ar"
        valueEn={intro.mainDescription.en} valueAr={intro.mainDescription.ar}
        onChangeEn={v => setLoc('mainDescription', 'en', v)} onChangeAr={v => setLoc('mainDescription', 'ar', v)}
        type="textarea" rows={4} />

      {/* Additional paragraphs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-slate-600">Additional Paragraphs</span>
          <button type="button" onClick={addPara} className="text-xs font-bold text-dazz-navy hover:text-dazz-gold">+ Add Paragraph</button>
        </div>
        {intro.paragraphs.map((para, i) => (
          <div key={i} className="border border-slate-100 rounded-md p-4 mb-3 relative">
            <button type="button" onClick={() => removePara(i)} className="absolute top-2 right-2 text-red-400 text-xs font-bold hover:text-red-600">✕</button>
            <BilingualField label={`Paragraph ${i + 1}`}
              nameEn={`para_en_${i}`} nameAr={`para_ar_${i}`}
              valueEn={para.en} valueAr={para.ar}
              onChangeEn={v => setPara(i, 'en', v)} onChangeAr={v => setPara(i, 'ar', v)}
              type="textarea" rows={3} />
          </div>
        ))}
      </div>

      <MediaUploader label="Section Image (optional)" folder="dazz/services/intro"
        value={intro.image} onChange={m => setForm(p => ({ ...p, introduction: { ...p.introduction, image: m } }))} />
    </div>
  );
}
