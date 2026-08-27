'use client';
import React from 'react';
import { BilingualField } from '../BilingualField';
import { MediaUploader } from '../MediaUploader';
import { emptyLoc, LocalizedField } from '@/lib/serviceFormTypes';

interface LocItem {
  _id?: string;
  icon?: string;
  title?: LocalizedField;
  description?: LocalizedField;
  name?: LocalizedField;       // for equipment
  specification?: LocalizedField; // for equipment
  label?: LocalizedField;      // for applications
  sub?: LocalizedField;        // for highlights
  image?: any;
  ctaText?: LocalizedField;
  ctaUrl?: string;
  stepNumber?: number;
  order: number;
}

interface RepeatableItemEditorProps {
  title: string;
  addLabel?: string;
  items: LocItem[];
  setItems: (items: LocItem[]) => void;
  hasImage?: boolean;
  imageFolder?: string;
  hasCta?: boolean;
  hasSpecification?: boolean;
  hasStepNumber?: boolean;
  titleKey?: 'title' | 'name' | 'label';
  subKey?: 'description' | 'sub';
}

function makeItem(extra: Partial<LocItem> = {}): LocItem {
  return { icon: '✅', title: emptyLoc(), description: emptyLoc(), name: emptyLoc(), label: emptyLoc(), sub: emptyLoc(), specification: emptyLoc(), ctaText: emptyLoc(), ctaUrl: '', image: null, stepNumber: 1, order: 0, ...extra };
}

export function RepeatableItemEditor({
  title, addLabel = '+ Add Item', items, setItems,
  hasImage = false, imageFolder = 'dazz/services',
  hasCta = false, hasSpecification = false, hasStepNumber = false,
  titleKey = 'title', subKey = 'description',
}: RepeatableItemEditorProps) {
  const add = () => setItems([...items, makeItem({ order: items.length })]);
  const remove = (i: number) => setItems(items.filter((_, j) => j !== i));
  const update = (i: number, key: string, val: any) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    setItems(next);
  };
  const updateLoc = (i: number, key: string, lang: 'en' | 'ar', val: string) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: { ...(next[i] as any)[key], [lang]: val } };
    setItems(next);
  };

  const inputClass = 'w-full border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-dazz-navy outline-none';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-600">{title}</span>
        <button type="button" onClick={add} className="text-xs font-bold text-dazz-navy hover:text-dazz-gold transition-colors">{addLabel}</button>
      </div>

      {items.length === 0 && (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 text-sm">
          No items yet. Click "{addLabel}" to add the first one.
        </div>
      )}

      {items.map((item, i) => (
        <div key={item._id || i} className="border border-slate-200 rounded-lg p-5 space-y-4 relative group">
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {i > 0 && (
              <button type="button" onClick={() => { const n=[...items]; [n[i-1],n[i]]=[n[i],n[i-1]]; setItems(n); }}
                className="text-slate-300 hover:text-slate-600 text-xs" title="Move up">↑</button>
            )}
            {i < items.length - 1 && (
              <button type="button" onClick={() => { const n=[...items]; [n[i],n[i+1]]=[n[i+1],n[i]]; setItems(n); }}
                className="text-slate-300 hover:text-slate-600 text-xs" title="Move down">↓</button>
            )}
            <button type="button" onClick={() => remove(i)} className="text-red-300 hover:text-red-600 text-xs font-bold" title="Remove">✕</button>
          </div>

          <div className="pr-16 flex items-center gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Icon</label>
              <input type="text" value={item.icon || ''} onChange={e => update(i, 'icon', e.target.value)}
                className="w-16 border border-slate-300 rounded-md px-2 py-2 text-center text-lg" />
            </div>
            {hasStepNumber && (
              <div>
                <label className="block text-xs text-slate-400 mb-1">Step #</label>
                <input type="number" value={item.stepNumber || i+1} min={1}
                  onChange={e => update(i, 'stepNumber', parseInt(e.target.value))}
                  className="w-16 border border-slate-300 rounded-md px-2 py-2 text-center text-sm" />
              </div>
            )}
          </div>

          {hasImage && (
            <MediaUploader label="Image" folder={imageFolder}
              value={item.image} onChange={m => update(i, 'image', m)} />
          )}

          <BilingualField
            label={titleKey === 'name' ? 'Name' : titleKey === 'label' ? 'Label' : 'Title'}
            nameEn={`${titleKey}_en_${i}`} nameAr={`${titleKey}_ar_${i}`}
            valueEn={(item as any)[titleKey]?.en || ''} valueAr={(item as any)[titleKey]?.ar || ''}
            onChangeEn={v => updateLoc(i, titleKey, 'en', v)}
            onChangeAr={v => updateLoc(i, titleKey, 'ar', v)} />

          <BilingualField
            label={subKey === 'sub' ? 'Sub-label' : 'Description'}
            nameEn={`${subKey}_en_${i}`} nameAr={`${subKey}_ar_${i}`}
            valueEn={(item as any)[subKey]?.en || ''} valueAr={(item as any)[subKey]?.ar || ''}
            onChangeEn={v => updateLoc(i, subKey, 'en', v)}
            onChangeAr={v => updateLoc(i, subKey, 'ar', v)}
            type="textarea" rows={2} />

          {hasSpecification && (
            <BilingualField label="Specification (optional)"
              nameEn={`spec_en_${i}`} nameAr={`spec_ar_${i}`}
              valueEn={item.specification?.en || ''} valueAr={item.specification?.ar || ''}
              onChangeEn={v => updateLoc(i, 'specification', 'en', v)}
              onChangeAr={v => updateLoc(i, 'specification', 'ar', v)} />
          )}

          {hasCta && (
            <div className="border-t border-slate-100 pt-3 space-y-3">
              <BilingualField label="CTA Button Text (optional)"
                nameEn={`cta_text_en_${i}`} nameAr={`cta_text_ar_${i}`}
                valueEn={item.ctaText?.en || ''} valueAr={item.ctaText?.ar || ''}
                onChangeEn={v => updateLoc(i, 'ctaText', 'en', v)}
                onChangeAr={v => updateLoc(i, 'ctaText', 'ar', v)} />
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-widest mb-1">CTA URL</label>
                <input type="text" value={item.ctaUrl || ''} onChange={e => update(i, 'ctaUrl', e.target.value)}
                  className={inputClass} placeholder="https://..." />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
