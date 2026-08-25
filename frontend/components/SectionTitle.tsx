import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionTitle({ title, subtitle, alignment = 'left', className = '' }: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={`mb-12 ${alignClasses[alignment]} ${className}`}>
      {subtitle && (
        <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
        {title}
      </h2>
      <div className={`h-1 w-20 bg-amber-500 mt-6 ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`} />
    </div>
  );
}
