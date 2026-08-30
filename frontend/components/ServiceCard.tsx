import React from 'react';
import Link from 'next/link';
import { MediaRenderer } from './MediaRenderer';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: SafeAny;
  href: string;
}

export function ServiceCard({ title, description, imageUrl, href }: ServiceCardProps) {
  return (
    <div className="group relative bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 w-full overflow-hidden">
        <MediaRenderer
          media={imageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 mb-6 line-clamp-3">{description}</p>
        <Link 
          href={href}
          className="inline-flex items-center text-amber-500 font-semibold hover:text-amber-600 transition-colors"
        >
          Explore Service
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
