'use client';
import React from 'react';
import { FormError } from '@/components/ui/FormError';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface BilingualFieldProps {
  label: string;
  nameEn: string;
  nameAr?: string;
  valueEn: string;
  valueAr?: string;
  onChangeEn: (value: string) => void;
  onChangeAr?: (value: string) => void;
  type?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
  placeholder?: string;
  note?: string;
  errorEn?: string;
  errorAr?: string;
  /** Pass the saved translationStatus.ar from the document to show server-side status */
  translationStatus?: 'pending' | 'completed' | 'failed' | 'none';
}

export function BilingualField({
  label,
  nameEn,
  valueEn,
  onChangeEn,
  type = 'input',
  rows = 3,
  required = false,
  placeholder,
  note,
  errorEn,
  translationStatus,
}: BilingualFieldProps) {
  const getBorderClass = (err?: string) =>
    err ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-dazz-navy focus:border-transparent';
  const inputClassEn = `w-full border bg-white text-slate-900 rounded-md px-4 py-2 focus:ring-2 outline-none text-sm transition-colors ${getBorderClass(errorEn)}`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <span className="inline-flex items-center gap-1 text-xs text-dazz-navy/70 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          <Sparkles size={11} className="text-dazz-gold" />
          {translationStatus === 'completed' ? (
            <span className="text-green-700 flex items-center gap-1">
              <CheckCircle2 size={11} /> Auto-translated to Arabic
            </span>
          ) : (
            'Auto-translates to Arabic on save'
          )}
        </span>
      </div>
      {note && <p className="text-xs text-slate-500 mt-0.5">{note}</p>}

      <div>
        {type === 'textarea' ? (
          <textarea
            name={nameEn}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            rows={rows}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            className={inputClassEn}
          />
        ) : (
          <input
            type="text"
            name={nameEn}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
            className={inputClassEn}
          />
        )}
        <FormError message={errorEn} />
      </div>
    </div>
  );
}
