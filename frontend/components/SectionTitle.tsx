import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionTitle({ title, subtitle, alignment = 'left', className = '' }: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`mb-12 flex flex-col ${alignClasses[alignment]} ${className} relative`}>
      {/* Futuristic thin coordinate line */}
      <div className={`absolute top-2 w-[150px] h-[1px] bg-slate-200 ${alignment === 'left' ? '-left-[170px]' : alignment === 'right' ? '-right-[170px]' : 'hidden'}`}>
        <span className="absolute -top-[14px] right-0 text-[8px] font-mono text-slate-400">COORD: {Math.floor(Math.random() * 90)}.{Math.floor(Math.random() * 999)}</span>
      </div>

      {subtitle && (
        <span className="text-dazz-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
          {alignment === 'right' && <span className="w-4 h-px bg-dazz-gold block" />}
          {subtitle}
          {alignment !== 'right' && <span className="w-4 h-px bg-dazz-gold block" />}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tighter uppercase leading-[0.9]">
        {title}
      </h2>
    </div>
  );
}
