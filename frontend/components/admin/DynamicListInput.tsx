import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface LocalizedItem {
  en: string;
  ar: string;
}

interface DynamicListInputProps {
  label: string;
  items: LocalizedItem[];
  onChange: (items: LocalizedItem[]) => void;
  placeholderEn?: string;
  placeholderAr?: string;
}

export default function DynamicListInput({ label, items, onChange, placeholderEn, placeholderAr }: DynamicListInputProps) {
  const handleAdd = () => {
    onChange([...items, { en: '', ar: '' }]);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleChange = (index: number, lang: 'en' | 'ar', value: string) => {
    const newItems = [...items];
    newItems[index][lang] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs flex items-center gap-1 text-dazz-navy hover:text-dazz-gold font-medium transition-colors"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 italic py-2 border-l-2 border-slate-200 pl-3">No items added yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-3 bg-slate-50 p-3 rounded-md border border-slate-200">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={item.en}
                  onChange={(e) => handleChange(index, 'en', e.target.value)}
                  placeholder={placeholderEn || "English value"}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
                  dir="ltr"
                />
                <input
                  type="text"
                  value={item.ar}
                  onChange={(e) => handleChange(index, 'ar', e.target.value)}
                  placeholder={placeholderAr || "Arabic value"}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
                  dir="rtl"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white border border-slate-200 rounded-md"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
