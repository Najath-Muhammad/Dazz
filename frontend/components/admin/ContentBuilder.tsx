'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { MediaUploader } from './MediaUploader';
import { Trash2, GripVertical, Plus, Type, Heading, Image as ImageIcon, Quote, List, Video, RefreshCw } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'TEXT' | 'HEADING' | 'IMAGE' | 'QUOTE' | 'LIST' | 'VIDEO';
  en: string;
  ar: string;
}

interface ContentBuilderProps {
  value: string; // JSON string of ContentBlock[]
  onChange: (value: string) => void;
}

export function ContentBuilder({ value, onChange }: ContentBuilderProps) {
  const { translateOne } = useTranslation();
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          setBlocks(parsed);
        }
      } catch (e) {
        console.error("Failed to parse ContentBuilder value");
      }
    }
  }, []);

  const updateParent = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks);
    onChange(JSON.stringify(newBlocks));
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      en: '',
      ar: ''
    };
    updateParent([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    updateParent(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: string, field: 'en' | 'ar', val: string) => {
    updateParent(blocks.map(b => b.id === id ? { ...b, [field]: val } : b));
  };

  const moveBlock = (index: number, direction: 'UP' | 'DOWN') => {
    if (direction === 'UP' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      updateParent(newBlocks);
    }
    if (direction === 'DOWN' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
      updateParent(newBlocks);
    }
  };

  const handleTranslate = async (id: string, text: string) => {
    if (!text.trim()) return;
    setTranslatingId(id);
    const translated = await translateOne(text);
    if (translated) {
      updateBlock(id, 'ar', translated);
    }
    setTranslatingId(null);
  };

  const renderBlockEditor = (block: ContentBlock) => {
    const isTranslating = translatingId === block.id;

    if (block.type === 'IMAGE' || block.type === 'VIDEO') {
      return (
        <div className="w-full bg-white p-4 border border-slate-200 rounded-md">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            {block.type} BLOCK
          </p>
          <MediaUploader
            label={`Upload ${block.type}`}
            folder="dazz/blogs"
            value={block.en} // Store media URL in 'en' for simplicity
            onChange={(val) => {
              const url = typeof val === 'string' ? val : (val as any).url || '';
              const newBlocks = blocks.map(b => b.id === block.id ? { ...b, en: url, ar: url } : b);
              updateParent(newBlocks);
            }}
          />
        </div>
      );
    }

    // Text-based blocks
    return (
      <div className="w-full bg-white p-4 border border-slate-200 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {block.type} BLOCK
          </p>
          <button 
            type="button"
            onClick={() => handleTranslate(block.id, block.en)}
            disabled={!block.en.trim() || isTranslating}
            title="Regenerate Arabic for this block"
            className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded border border-slate-200 text-slate-400 hover:border-dazz-navy hover:text-dazz-navy transition-colors disabled:opacity-40"
          >
            {isTranslating ? <RefreshCw size={11} className="animate-spin" /> : <RefreshCw size={11} />}
            Regenerate Arabic
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 font-bold uppercase mb-1">English</label>
            {block.type === 'TEXT' || block.type === 'QUOTE' || block.type === 'LIST' ? (
              <textarea
                value={block.en}
                onChange={(e) => updateBlock(block.id, 'en', e.target.value)}
                placeholder={block.type === 'LIST' ? "Item 1\nItem 2\nItem 3" : `Enter ${block.type.toLowerCase()}...`}
                rows={4}
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3 py-2 text-sm focus:border-dazz-navy outline-none"
              />
            ) : (
              <input
                type="text"
                value={block.en}
                onChange={(e) => updateBlock(block.id, 'en', e.target.value)}
                placeholder={`Enter ${block.type.toLowerCase()}...`}
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3 py-2 text-sm focus:border-dazz-navy outline-none"
              />
            )}
          </div>
          <div dir="rtl">
            <label className="block text-xs text-slate-400 font-bold uppercase mb-1" dir="ltr">Arabic</label>
            {block.type === 'TEXT' || block.type === 'QUOTE' || block.type === 'LIST' ? (
              <textarea
                value={block.ar}
                onChange={(e) => updateBlock(block.id, 'ar', e.target.value)}
                rows={4}
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3 py-2 text-sm focus:border-dazz-navy outline-none text-right font-arabic"
              />
            ) : (
              <input
                type="text"
                value={block.ar}
                onChange={(e) => updateBlock(block.id, 'ar', e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3 py-2 text-sm focus:border-dazz-navy outline-none text-right font-arabic"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <div key={block.id} className="flex gap-4 items-start group">
          <div className="flex flex-col gap-2 pt-4">
            <button type="button" onClick={() => moveBlock(index, 'UP')} disabled={index === 0} className="text-slate-300 hover:text-slate-600 disabled:opacity-30">
              <GripVertical size={16} />
            </button>
            <button type="button" onClick={() => moveBlock(index, 'DOWN')} disabled={index === blocks.length - 1} className="text-slate-300 hover:text-slate-600 disabled:opacity-30">
              <GripVertical size={16} />
            </button>
          </div>
          <div className="flex-1">
            {renderBlockEditor(block)}
          </div>
          <button type="button" onClick={() => removeBlock(block.id)} className="text-slate-300 hover:text-red-500 pt-4">
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-6 text-center">
        <p className="text-sm font-medium text-slate-500 mb-4">Add Content Block</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => addBlock('HEADING')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:border-dazz-navy hover:text-dazz-navy transition-colors">
            <Heading size={14} /> Heading
          </button>
          <button type="button" onClick={() => addBlock('TEXT')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:border-dazz-navy hover:text-dazz-navy transition-colors">
            <Type size={14} /> Text
          </button>
          <button type="button" onClick={() => addBlock('IMAGE')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:border-dazz-navy hover:text-dazz-navy transition-colors">
            <ImageIcon size={14} /> Image
          </button>
          <button type="button" onClick={() => addBlock('QUOTE')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:border-dazz-navy hover:text-dazz-navy transition-colors">
            <Quote size={14} /> Quote
          </button>
          <button type="button" onClick={() => addBlock('LIST')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:border-dazz-navy hover:text-dazz-navy transition-colors">
            <List size={14} /> List
          </button>
          <button type="button" onClick={() => addBlock('VIDEO')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:border-dazz-navy hover:text-dazz-navy transition-colors">
            <Video size={14} /> Video
          </button>
        </div>
      </div>
    </div>
  );
}
