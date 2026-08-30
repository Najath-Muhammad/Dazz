'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MediaRenderer } from '@/components/MediaRenderer';

interface CinematicProjectCardProps {
  title: string;
  category: string;
  imageUrl: any;
  slug: string;
  year?: string;
  location?: string;
  index: number;
  isLarge?: boolean;
  lang: string;
}

export function CinematicProjectCard({ title, category, imageUrl, slug, year, location, index, isLarge = false, lang }: CinematicProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      className={`group block relative overflow-hidden bg-slate-900 ${isLarge ? 'md:col-span-2 aspect-[16/9]' : 'col-span-1 aspect-[4/5] md:aspect-[3/4]'}`}
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

        {/* Top Metadata */}
        <div className={`absolute top-0 p-6 md:p-8 w-full flex justify-between items-start ${lang === 'ar' ? 'flex-row-reverse right-0' : 'left-0'}`}>
          {year && (
            <span className={`text-white/50 font-mono text-sm tracking-widest ${lang === 'ar' ? 'font-arabic' : ''}`}>{year}</span>
          )}
          {location && (
            <span className={`text-white/50 font-mono text-sm tracking-widest text-right max-w-[50%] ${lang === 'ar' ? 'font-arabic' : ''}`}>{location}</span>
          )}
        </div>

        {/* Bottom Content */}
        <div className={`absolute bottom-0 p-6 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out ${lang === 'ar' ? 'right-0' : 'left-0'}`}>
          <div className={`flex items-end justify-between gap-4 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
            <div>
              <span className={`text-dazz-gold font-mono text-[10px] md:text-xs tracking-[0.2em] mb-3 block opacity-80 group-hover:opacity-100 transition-opacity duration-300 ${lang === 'ar' ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                {category}
              </span>
              <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tighter leading-tight max-w-[90%] ${lang === 'ar' ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                {title}
              </h3>
            </div>
            
            <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-hover:bg-dazz-gold group-hover:border-dazz-gold transition-all duration-500 transform ${lang === 'ar' ? 'translate-x-[20px]' : 'translate-x-[-20px]'} group-hover:translate-x-0`}>
              <ArrowRight size={20} className={`text-white transition-transform duration-500 ${lang === 'ar' ? 'rotate-180 group-hover:rotate-[225deg]' : 'group-hover:-rotate-45'}`} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
