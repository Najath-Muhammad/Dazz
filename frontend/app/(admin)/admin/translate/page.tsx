'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { RefreshCw, CheckCircle2, AlertCircle, HelpCircle, Play } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TranslationStatus {
  total: number;
  completed: number;
  failed: number;
  pending: number;
  missing: number;
}

export default function BulkTranslationPage() {
  const [statuses, setStatuses] = useState<Record<string, TranslationStatus>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migratingModel, setMigratingModel] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get<{ success: boolean; data: Record<string, TranslationStatus> }>('/admin/translate/status');
      if (res.data.success) {
        setStatuses(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch translation status:', error);
      toast.error('Failed to load translation statuses.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStatus();
  }, []);

  const handleBulkMigrate = async (model?: string) => {
    try {
      setIsMigrating(true);
      setMigratingModel(model || 'all');
      const target = model ? model : 'All models';
      toast.loading(`Translating missing Arabic for ${target}...`, { id: 'migrate' });

      const payload = model ? { model } : {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await apiClient.post<{ success: boolean; message: string; data: any }>('/admin/translate/bulk-migrate', payload);
      
      if (res.data.success) {
        toast.success(`Bulk migration completed for ${target}.`, { id: 'migrate' });
        await fetchStatus();
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: unknown) {
      console.error('Migration failed:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.response?.data?.message || 'Bulk migration failed.', { id: 'migrate' });
    } finally {
      setIsMigrating(false);
      setMigratingModel(null);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-cabinet mb-2">Translation Manager</h1>
        <p className="text-slate-500">
          Monitor auto-translation status across all CMS models and trigger bulk translations for missing records.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-slate-200">
          <RefreshCw className="animate-spin text-dazz-navy w-8 h-8" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => handleBulkMigrate()}
              disabled={isMigrating}
              className="flex items-center gap-2 px-6 py-2.5 bg-dazz-navy text-white font-bold rounded hover:bg-dazz-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {isMigrating && migratingModel === 'all' ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
              Translate All Missing
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(statuses).map(([model, status]) => (
              <div key={model} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-bold text-slate-800">{model}</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {status.total} Records
                  </span>
                </div>

                <div className="space-y-3 flex-grow">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <CheckCircle2 size={16} className="text-green-500" />
                      Completed
                    </span>
                    <span className="font-semibold text-slate-900">{status.completed}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <RefreshCw size={16} className="text-amber-500" />
                      Pending
                    </span>
                    <span className="font-semibold text-slate-900">{status.pending}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <AlertCircle size={16} className="text-red-500" />
                      Failed
                    </span>
                    <span className="font-semibold text-slate-900">{status.failed}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <HelpCircle size={16} className="text-slate-400" />
                      Missing / Old
                    </span>
                    <span className="font-semibold text-slate-900">{status.missing}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => handleBulkMigrate(model)}
                    disabled={isMigrating || (status.missing === 0 && status.failed === 0)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 font-semibold rounded border border-slate-200 hover:bg-slate-100 hover:text-dazz-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isMigrating && migratingModel === model ? (
                      <RefreshCw size={16} className="animate-spin text-dazz-navy" />
                    ) : (
                      <Play size={16} />
                    )}
                    Translate {model}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
