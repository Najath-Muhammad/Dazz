'use client';
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import { FormError } from '@/components/ui/FormError';
import { RefreshCw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

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
  note?: string;
  errorEn?: string;
  errorAr?: string;
  /** Pass the saved translationStatus.ar from the document to show server-side status */
  translationStatus?: 'pending' | 'completed' | 'failed' | 'none';
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
  errorEn,
  errorAr,
  translationStatus,
}: BilingualFieldProps) {
  const { translateOne } = useTranslation();
  const [localStatus, setLocalStatus] = useState<'idle' | 'translating' | 'done' | 'error'>('idle');
  const [localError, setLocalError] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });

  const getBorderClass = (err?: string) =>
    err ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-dazz-navy focus:border-transparent';
  const inputClassEn = `w-full border bg-white text-slate-900 rounded-md px-4 py-2 focus:ring-2 outline-none text-sm transition-colors ${getBorderClass(errorEn)}`;
  const inputClassAr = `w-full border bg-white text-slate-900 rounded-md px-4 py-2 focus:ring-2 outline-none text-sm transition-colors font-arabic ${getBorderClass(errorAr)}`;

  const executeTranslation = async () => {
    setIsWorking(true);
    setLocalError('');
    setLocalStatus('translating');

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

  const handleRegenerate = () => {
    if (!valueEn?.trim()) {
      setLocalError('Enter the English content first.');
      setLocalStatus('error');
      return;
    }

    // Warn if Arabic already exists (manual override)
    if (valueAr?.trim()) {
      setConfirmModal({ isOpen: true });
      return;
    }

    executeTranslation();
  };

  /** Determine which status badge to show */
  const renderStatusBadge = () => {
    // Local (in-progress) status takes priority
    if (localStatus === 'translating') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
          <RefreshCw size={12} className="animate-spin" /> Translating...
        </span>
      );
    }
    if (localStatus === 'done') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
          <CheckCircle2 size={12} /> Auto-translated
        </span>
      );
    }
    if (localStatus === 'error') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-red-500 font-medium">
          <AlertCircle size={12} /> {localError}
        </span>
      );
    }

    // Fall back to server-side translation status
    if (translationStatus === 'completed' && valueAr?.trim()) {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
          <CheckCircle2 size={12} /> Auto-translated
        </span>
      );
    }
    if (translationStatus === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
          <RefreshCw size={12} className="animate-spin" /> Translating...
        </span>
      );
    }
    if (translationStatus === 'failed') {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-red-500 font-medium">
          <AlertCircle size={12} /> Translation failed
        </span>
      );
    }

    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {renderStatusBadge()}
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
            placeholder={placeholder}
            className={inputClassEn}
          />
        ) : (
          <input
            type="text"
            name={nameEn}
            value={valueEn}
            onChange={(e) => { onChangeEn(e.target.value); setLocalStatus('idle'); }}
            placeholder={placeholder}
            className={inputClassEn}
          />
        )}
        <FormError message={errorEn} />
      </div>

      {/* Arabic Field */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest flex items-center gap-2">
            Arabic
            <span className="text-slate-300 normal-case tracking-normal">— auto-translated, editable</span>
          </span>

          {/* Regenerate button — advanced/override only */}
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isWorking || !valueEn?.trim()}
            title="Regenerate Arabic translation"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded border border-slate-200 text-slate-500 hover:border-dazz-navy hover:text-dazz-navy disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isWorking ? (
              <RefreshCw size={11} className="animate-spin" />
            ) : (
              <Sparkles size={11} />
            )}
            {isWorking ? 'Translating...' : 'Regenerate'}
          </button>
        </div>

        {type === 'textarea' ? (
          <textarea
            name={nameAr}
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            rows={rows}
            dir="rtl"
            className={`${inputClassAr} text-right`}
            placeholder="Arabic translation is generated automatically on save..."
          />
        ) : (
          <input
            type="text"
            name={nameAr}
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            dir="rtl"
            className={`${inputClassAr} text-right`}
            placeholder="Arabic translation is generated automatically on save..."
          />
        )}
        <FormError message={errorAr} isAr />
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Regenerate Arabic Translation"
        message="This will overwrite the current Arabic content with a freshly generated translation. Are you sure?"
        onConfirm={() => {
          setConfirmModal({ isOpen: false });
          executeTranslation();
        }}
        onCancel={() => setConfirmModal({ isOpen: false })}
        confirmText="Yes, Regenerate"
        cancelText="Cancel"
      />
    </div>
  );
}
