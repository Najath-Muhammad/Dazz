import React from 'react';
import { MediaRenderer } from '@/components/MediaRenderer';

interface ContentBlock {
  id: string;
  type: 'TEXT' | 'HEADING' | 'IMAGE' | 'QUOTE' | 'LIST' | 'VIDEO';
  en: string;
  ar: string;
}

interface BlockRendererProps {
  content: string;
  isAr: boolean;
}

export function BlockRenderer({ content, isAr }: BlockRendererProps) {
  let blocks: ContentBlock[] = [];
  
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      blocks = parsed;
    }
  } catch (e) {
    return <div className="text-slate-500 italic">Error parsing content blocks.</div>;
  }

  if (blocks.length === 0) return null;

  return (
    <div className={`space-y-8 md:space-y-12 ${isAr ? 'font-arabic text-right' : 'font-sans text-left'}`}>
      {blocks.map((block) => {
        const text = isAr ? block.ar : block.en;

        switch (block.type) {
          case 'HEADING':
            return (
              <h2 key={block.id} className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-16 mb-6">
                {text}
              </h2>
            );
          
          case 'TEXT':
            return (
              <p key={block.id} className="text-lg text-slate-600 leading-relaxed">
                {text}
              </p>
            );

          case 'IMAGE':
            if (!text) return null;
            return (
              <div key={block.id} className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden my-12 bg-slate-100">
                <MediaRenderer media={text} fill className="object-cover" />
              </div>
            );

          case 'VIDEO':
            if (!text) return null;
            return (
              <div key={block.id} className="relative w-full aspect-video rounded-lg overflow-hidden my-12 bg-slate-900">
                <MediaRenderer media={text} fill className="object-cover" />
              </div>
            );

          case 'QUOTE':
            return (
              <blockquote key={block.id} className={`my-12 relative ${isAr ? 'pr-8 border-r-4 border-dazz-gold' : 'pl-8 border-l-4 border-dazz-gold'}`}>
                <p className="text-2xl md:text-3xl font-medium text-slate-900 italic leading-snug">
                  "{text}"
                </p>
              </blockquote>
            );

          case 'LIST':
            if (!text) return null;
            const items = text.split('\n').filter(i => i.trim());
            return (
              <ul key={block.id} className={`space-y-4 my-8 ${isAr ? 'pr-6' : 'pl-6'}`}>
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-dazz-gold mt-2.5 flex-shrink-0" />
                    <span className="text-lg text-slate-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
