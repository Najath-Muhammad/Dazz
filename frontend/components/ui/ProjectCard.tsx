'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MediaRenderer } from '@/components/MediaRenderer';

export interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: any;
  slug: string;
  lang?: string;
  year?: string;
  location?: string;
  index?: number;
  variant?: 'standard' | 'cinematic';
  size?: 'normal' | 'large';
  isAr?: boolean;
}

export function ProjectCard({ 
  title, 
  category, 
  imageUrl, 
  slug, 
  lang = 'en',
  year, 
  location, 
  index = 0, 
  variant = 'cinematic',
  size = 'normal',
  isAr = false
}: ProjectCardProps) {
  
  if (variant === 'standard') {
    return (
      <Link href={`/${lang}/projects/${slug}`} className={`group block relative overflow-hidden bg-slate-900 ${size === 'large' ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <MediaRenderer
          media={imageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        <div className={`absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ${isAr ? 'text-right right-0 left-auto' : ''}`}>
          <span className={`text-amber-400 font-semibold tracking-wider mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ${isAr ? 'font-arabic text-xs uppercase-none' : 'text-sm uppercase'}`}>
            {category}
          </span>
          <h3 className={`font-bold text-white tracking-tight ${size === 'large' ? 'text-3xl' : 'text-xl md:text-2xl'} ${isAr ? 'font-arabic' : ''}`}>
            {title}
          </h3>
        </div>
      </Link>
    );
  }

  // Cinematic Variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      className={`group block relative overflow-hidden bg-slate-900 ${size === 'large' ? 'md:col-span-2 aspect-[16/9]' : 'col-span-1 aspect-[4/5] md:aspect-[3/4]'}`}
    >
      <Link href={`/${lang}/projects/${slug}`} className="w-full h-full block relative">
        <MediaRenderer
          media={imageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-90 transition-all duration-1000 group-hover:scale-105"
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
        <div className="absolute inset-0 bg-dazz-navy/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className={`absolute bottom-0 w-full p-8 md:p-10 flex flex-col justify-end h-full z-10 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
            
            {/* Meta Tags */}
            <div className={`flex flex-wrap gap-3 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ${isAr ? 'justify-end' : ''}`}>
              <span className={`px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 ${isAr ? 'font-arabic text-[10px] uppercase-none' : 'text-[10px] uppercase tracking-widest'}`}>
                {category}
              </span>
              {year && (
                <span className={`px-3 py-1 bg-dazz-gold/90 text-dazz-navy font-bold ${isAr ? 'font-arabic text-[10px] uppercase-none' : 'text-[10px] uppercase tracking-widest'}`}>
                  {year}
                </span>
              )}
            </div>

            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-tight ${isAr ? 'font-arabic' : ''}`}>
              {title}
            </h3>
            
            {location && (
              <p className={`text-slate-400 mb-6 font-light ${size === 'large' ? 'text-lg' : 'text-sm'} ${isAr ? 'font-arabic' : ''}`}>
                {location}
              </p>
            )}

            {/* Read More link */}
            <div className="overflow-hidden">
              <div className={`flex items-center gap-3 text-dazz-gold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-full group-hover:translate-y-0 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className={`text-xs font-bold ${isAr ? 'font-arabic uppercase-none' : 'uppercase tracking-widest'}`}>
                  {isAr ? 'اكتشف المزيد' : 'Discover More'}
                </span>
                <ArrowRight size={14} className={isAr ? 'rotate-180' : ''} />
              </div>
            </div>
          </div>
        </div>

        {/* Hover corner accents */}
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-dazz-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-dazz-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
      </Link>
    </motion.div>
  );
}
