'use client';
import { useState } from 'react';
import { apiClient } from '@/lib/api';

export type TranslationStatus = 'idle' | 'translating' | 'done' | 'error';

export function useTranslation() {
  const [status, setStatus] = useState<TranslationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  /**
   * Translate a single English text to Arabic.
   * Returns the translated Arabic string, or null on failure.
   */
  const translateOne = async (text: string): Promise<string | null> => {
    if (!text?.trim()) {
      setError('Enter the English content first.');
      return null;
    }

    setStatus('translating');
    setError(null);

    try {
      const res = await apiClient.post<{ success: boolean; data: { translation: string }; message: string }>(
        '/api/admin/translate',
        { text, sourceLanguage: 'en', targetLanguage: 'ar' }
      );
      if (!res.data.success) throw new Error(res.data.message);
      setStatus('done');
      return res.data.data.translation;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Translation failed. Please try again.';
      setError(msg);
      setStatus('error');
      return null;
    }
  };

  /**
   * Translate a batch of English fields to Arabic.
   * Returns a map of { fieldKey: arabicTranslation }, or null on failure.
   */
  const translateBatch = async (fields: Record<string, string>): Promise<Record<string, string> | null> => {
    const nonEmpty = Object.entries(fields).filter(([, v]) => v?.trim());
    if (!nonEmpty.length) {
      setError('No English content to translate.');
      return null;
    }

    setStatus('translating');
    setError(null);

    try {
      const res = await apiClient.post<{ success: boolean; data: { translations: Record<string, string> }; message: string }>(
        '/api/admin/translate/batch',
        { fields: Object.fromEntries(nonEmpty), sourceLanguage: 'en', targetLanguage: 'ar' }
      );
      if (!res.data.success) throw new Error(res.data.message);
      setStatus('done');
      return res.data.data.translations;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Batch translation failed. Please try again.';
      setError(msg);
      setStatus('error');
      return null;
    }
  };

  const reset = () => {
    setStatus('idle');
    setError(null);
  };

  return { status, error, translateOne, translateBatch, reset, isTranslating: status === 'translating' };
}
