'use client';
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface BilingualFieldProps {
  label: string;
  nameEn: string;
  nameAr: string;
  valueEn: string;
  valueAr: string;
  onChangeEn: (value: string) => void;
  onChangeAr: (value: string) => void;
  type?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
  placeholder?: string;
  showGenerateAll?: false; // per-field only
  note?: string;
}

export function BilingualField({
  label,
  nameEn,
  nameAr,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr,
  type = 'input',
  rows = 3,
  required = false,
  placeholder,
  note,
}: BilingualFieldProps) {
  const { translateOne, isTranslating, status, error } = useTranslation();
  const [localStatus, setLocalStatus] = useState<'idle' | 'done' | 'error'>('idle');
  const [localError, setLocalError] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  const inputClass = 'w-full border border-slate-300 bg-white text-slate-900 rounded-md px-4 py-2 focus:ring-2 focus:ring-dazz-navy focus:border-transparent outline-none text-sm';
  const inputArClass = `${inputClass} font-arabic` ;

  const [confirmModal, setConfirmModal] = useState({ isOpen: false });

  const executeTranslation = async () => {
    setIsWorking(true);
    setLocalError('');
    setLocalStatus('idle');

    const translated = await translateOne(valueEn);

    if (translated) {
      onChangeAr(translated);
      setLocalStatus('done');
    } else {
      setLocalStatus('error');
      setLocalError('Translation failed. Please try again.');
    }

    setIsWorking(false);
  };

  const handleGenerate = () => {
    if (!valueEn?.trim()) {
      setLocalError('Enter the English content first.');
      setLocalStatus('error');
      return;
    }

    // Warn if Arabic already exists
    if (valueAr?.trim()) {
      setConfirmModal({ isOpen: true });
      return;
    }

    executeTranslation();
  };

  const InputEl = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700">{label}</label>
        {localStatus === 'done' && (
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            ✓ Arabic generated
          </span>
        )}
      </div>
      {note && <p className="text-xs text-slate-500 mt-0.5">{note}</p>}

      {/* English Field */}
      <div>
        <span className="block text-xs text-slate-400 mb-1 font-medium uppercase tracking-widest">English</span>
        {type === 'textarea' ? (
          <textarea
            name={nameEn}
            value={valueEn}
            onChange={(e) => { onChangeEn(e.target.value); setLocalStatus('idle'); }}
            rows={rows}
            required={required}
            placeholder={placeholder}
            className={inputClass}
          />
        ) : (
          <input
            type="text"
            name={nameEn}
            value={valueEn}
            onChange={(e) => { onChangeEn(e.target.value); setLocalStatus('idle'); }}
            required={required}
            placeholder={placeholder}
            className={inputClass}
          />
        )}
      </div>

      {/* Generate Arabic Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isWorking || !valueEn?.trim()}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-md bg-dazz-navy text-white hover:bg-dazz-navy/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isWorking ? (
            <>
              <span className="animate-spin">⏳</span> Translating...
            </>
          ) : (
            <>✨ Generate Arabic</>
          )}
        </button>
        {localStatus === 'error' && (
          <span className="text-xs text-red-500">{localError}</span>
        )}
      </div>

      {/* Arabic Field */}
      <div>
        <span className="block text-xs text-slate-400 mb-1 font-medium uppercase tracking-widest flex items-center gap-2">
          Arabic
          <span className="text-slate-300 normal-case tracking-normal">— editable</span>
        </span>
        {type === 'textarea' ? (
          <textarea
            name={nameAr}
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            rows={rows}
            dir="rtl"
            className={`${inputArClass} text-right`}
            placeholder="Arabic translation will appear here..."
          />
        ) : (
          <input
            type="text"
            name={nameAr}
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            dir="rtl"
            className={`${inputArClass} text-right`}
            placeholder="Arabic translation will appear here..."
          />
        )}
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Overwrite Arabic Translation"
        message="Arabic content already exists for this field. Do you want to replace it with a newly generated translation?"
        onConfirm={() => {
          setConfirmModal({ isOpen: false });
          executeTranslation();
        }}
        onCancel={() => setConfirmModal({ isOpen: false })}
        confirmText="Yes, Replace"
        cancelText="Cancel"
      />
    </div>
  );
}
