'use client';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
  debounceMs?: number;
}

export function SearchBar({ onSearch, placeholder = 'Search...', initialValue = '', debounceMs = 350 }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, onSearch, debounceMs]);

  return (
    <div className="relative flex-1 min-w-[260px]">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy transition-colors"
      />
    </div>
  );
}
