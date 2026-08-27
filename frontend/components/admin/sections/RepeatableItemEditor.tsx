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
  const safeItems = items || [];
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});

  const toggle = (i: number) => setExpanded(p => {
    const current = p[i] ?? (safeItems.length <= 2);
    return { ...p, [i]: !current };
  });

  const add = () => {
    const newIdx = safeItems.length;
    setItems([...safeItems, makeItem({ order: newIdx })]);
    
    // Explicitly collapse all existing items, and expand only the new one
    setExpanded((prev) => {
      const next: Record<number, boolean> = { ...prev };
      for (let i = 0; i < newIdx; i++) next[i] = false;
      next[newIdx] = true;
      return next;
    });
  };

  const remove = (i: number) => setItems(safeItems.filter((_, j) => j !== i));
  const update = (i: number, key: string, val: any) => {
    const next = [...safeItems];
    next[i] = { ...next[i], [key]: val };
    setItems(next);
  };
  const updateLoc = (i: number, key: string, lang: 'en' | 'ar', val: string) => {
    const next = [...safeItems];
    next[i] = { ...next[i], [key]: { ...(next[i] as any)[key], [lang]: val } };
    setItems(next);
  };

  const inputClass = 'w-full border border-slate-300 bg-white text-slate-900 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-dazz-navy outline-none';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-600">{title}</span>
        <button type="button" onClick={add} className="text-xs font-bold text-dazz-navy hover:text-dazz-gold transition-colors">{addLabel}</button>
      </div>

      {safeItems.length === 0 && (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 text-sm">
          No items yet. Click "{addLabel}" to add the first one.
        </div>
      )}

      {safeItems.map((item, i) => {
        const isExpanded = expanded[i] ?? (safeItems.length <= 2);
        const itemTitle = (item as any)[titleKey]?.en || `Item #${i + 1}`;
        
        return (
        <div key={item._id || i} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <div 
            className={`flex items-center justify-between p-4 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors select-none ${isExpanded ? 'border-b border-slate-200' : ''}`}
            onClick={() => toggle(i)}
          >
            <div className="flex items-center gap-3 font-semibold text-slate-700">
              <span className="text-slate-400 text-xs w-4">{isExpanded ? '▼' : '▶'}</span>
              <span className="text-xl leading-none">{item.icon || '◾'}</span>
              <span>{itemTitle}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {i > 0 && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); const n=[...safeItems]; [n[i-1],n[i]]=[n[i],n[i-1]]; setItems(n); }}
                    className="text-slate-300 hover:text-slate-600 text-sm font-bold px-2 py-1 bg-white border border-slate-200 rounded shadow-sm" title="Move up">↑</button>
                )}
                {i < safeItems.length - 1 && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); const n=[...safeItems]; [n[i],n[i+1]]=[n[i+1],n[i]]; setItems(n); }}
                    className="text-slate-300 hover:text-slate-600 text-sm font-bold px-2 py-1 bg-white border border-slate-200 rounded shadow-sm" title="Move down">↓</button>
                )}
              </div>
              <button type="button" onClick={(e) => { e.stopPropagation(); remove(i); }} className="text-red-400 hover:text-red-600 text-xs font-bold uppercase tracking-wider px-2 py-1 bg-red-50 hover:bg-red-100 rounded" title="Remove">Remove</button>
            </div>
          </div>

          {isExpanded && (
            <div className="p-5 space-y-5 relative">
              <div className="pr-16 flex items-center gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Icon (Emoji)</label>
                  <input type="text" value={item.icon || ''} onChange={e => update(i, 'icon', e.target.value)}
                    className="w-20 border border-slate-300 bg-white text-slate-900 rounded-md px-2 py-2 text-center text-xl" />
                </div>
                {hasStepNumber && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Step #</label>
                    <input type="number" value={item.stepNumber || i+1} min={1}
                      onChange={e => update(i, 'stepNumber', parseInt(e.target.value))}
                      className="w-20 border border-slate-300 bg-white text-slate-900 rounded-md px-2 py-2 text-center text-sm" />
                  </div>
                )}
              </div>

              {hasImage && (
                <MediaUploader label="Image" folder={imageFolder}
                  value={item.image} onChange={m => update(i, 'image', m)} />
              )}

              <BilingualField
                label={titleKey === 'name' ? 'Name' : titleKey === 'label' ? 'Label' : 'Title'}
                note={titleKey === 'name' ? 'The name of the item.' : titleKey === 'label' ? 'A short label for the item.' : 'The main title for this item.'}
                nameEn={`${titleKey}_en_${i}`} nameAr={`${titleKey}_ar_${i}`}
                valueEn={(item as any)[titleKey]?.en || ''} valueAr={(item as any)[titleKey]?.ar || ''}
                onChangeEn={v => updateLoc(i, titleKey, 'en', v)}
                onChangeAr={v => updateLoc(i, titleKey, 'ar', v)} />

              <BilingualField
                label={subKey === 'sub' ? 'Sub-label' : 'Description'}
                note="Additional details or secondary text."
                nameEn={`${subKey}_en_${i}`} nameAr={`${subKey}_ar_${i}`}
                valueEn={(item as any)[subKey]?.en || ''} valueAr={(item as any)[subKey]?.ar || ''}
                onChangeEn={v => updateLoc(i, subKey, 'en', v)}
                onChangeAr={v => updateLoc(i, subKey, 'ar', v)}
                type="textarea" rows={2} />

              {hasSpecification && (
                <BilingualField label="Specification (optional)"
                  note="Technical details (e.g., dimensions, capacity)."
                  nameEn={`spec_en_${i}`} nameAr={`spec_ar_${i}`}
                  valueEn={item.specification?.en || ''} valueAr={item.specification?.ar || ''}
                  onChangeEn={v => updateLoc(i, 'specification', 'en', v)}
                  onChangeAr={v => updateLoc(i, 'specification', 'ar', v)} />
              )}

              {hasCta && (
                <div className="border-t border-slate-100 pt-5 mt-2 space-y-4">
                  <BilingualField label="CTA Button Text (optional)"
                    note="Text to appear on the button."
                    nameEn={`cta_text_en_${i}`} nameAr={`cta_text_ar_${i}`}
                    valueEn={item.ctaText?.en || ''} valueAr={item.ctaText?.ar || ''}
                    onChangeEn={v => updateLoc(i, 'ctaText', 'en', v)}
                    onChangeAr={v => updateLoc(i, 'ctaText', 'ar', v)} />
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">CTA URL</label>
                    <input type="text" value={item.ctaUrl || ''} onChange={e => update(i, 'ctaUrl', e.target.value)}
                      className={inputClass} placeholder="https://..." />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )})}
    </div>
  );
}
