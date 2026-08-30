import React from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Column<T> {
  /** Unique key for React reconciliation */
  key: string;
  /** Header label shown in <thead> */
  header: string;
  /** Cell horizontal alignment (default: 'left') */
  align?: 'left' | 'right' | 'center';
  /** Render the cell content for a given row */
  render: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: Column<T>[];
  /** Row data */
  data: T[];
  /** Show skeleton loading rows instead of data */
  loading?: boolean;
  /** Field used as the React key for each row (defaults to '_id') */
  keyField?: keyof T;
  /** Message shown when data is empty */
  emptyMessage?: string;
  /** Optional CTA element rendered below emptyMessage (e.g. a Link button) */
  emptyAction?: React.ReactNode;
  /** Number of skeleton rows to display while loading (default: 5) */
  skeletonRows?: number;
}

// ─── Skeleton shimmer row ───────────────────────────────────────────────────────

function SkeletonRow({ colCount }: { colCount: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: colCount }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div
            className={`h-4 bg-slate-200 rounded ${
              i === 0 ? 'w-2/3' : i === colCount - 1 ? 'w-1/3 ml-auto' : 'w-1/2'
            }`}
          />
        </td>
      ))}
    </tr>
  );
}

// ─── DataTable ──────────────────────────────────────────────────────────────────

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  keyField = '_id' as keyof T,
  emptyMessage = 'No records found.',
  emptyAction,
  skeletonRows = 5,
}: DataTableProps<T>) {
  const alignClass = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  };

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-lg">
      <div className="w-full">
        <table className="min-w-full divide-y divide-slate-100">
          {/* ── Head ── */}
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-widest ${
                    alignClass[col.align ?? 'left']
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody className="bg-white divide-y divide-slate-100">
            {loading ? (
              /* Loading skeleton */
              Array.from({ length: skeletonRows }).map((_, i) => (
                <SkeletonRow key={i} colCount={columns.length} />
              ))
            ) : data.length === 0 ? (
              /* Empty state */
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
                        />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">{emptyMessage}</p>
                    {emptyAction && <div className="mt-1">{emptyAction}</div>}
                  </div>
                </td>
              </tr>
            ) : (
              /* Data rows */
              data.map((row, index) => (
                <tr
                  key={String(row[keyField] ?? index)}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 ${alignClass[col.align ?? 'left']} relative`}
                    >
                      {col.render(row, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
