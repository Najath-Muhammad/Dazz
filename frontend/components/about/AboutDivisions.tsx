'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MediaRenderer } from '@/components/MediaRenderer';

const divisions = [
  { id: '01', title: 'CONSTRUCTION', titleAr: 'المقاولات', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg' },
  { id: '02', title: 'FOOD TRADING', titleAr: 'تجارة الأغذية', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg' },
  { id: '03', title: 'LOGISTICS', titleAr: 'الخدمات اللوجستية', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg' },
  { id: '04', title: 'HOSPITALITY', titleAr: 'الضيافة', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg' },
];

export function AboutDivisions({ isAr }: { isAr?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-40 bg-white" aria-label="Our Divisions">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-16">
          <span className="text-[120px] font-extrabold text-slate-100 leading-none tracking-tighter block mb-6">03</span>
          <div className="w-12 h-px bg-dazz-navy mb-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            {isAr ? 'قطاعاتنا' : 'Our Divisions'}
          </h2>
        </div>

        <div className="relative border-t border-slate-200">
          {divisions.map((div, i) => (
            <Link 
              key={div.id} 
              href={`/${isAr ? 'ar' : 'en'}/services`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group block border-b border-slate-200 py-10 md:py-16 relative overflow-hidden"
            >
              {/* Background Reveal */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                  >
                    <MediaRenderer media={div.image} fill className="object-cover opacity-[0.08]" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="text-xl md:text-2xl font-mono text-slate-300 group-hover:text-dazz-gold transition-colors duration-500">
                    {div.id}
                  </span>
                  <h3 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tighter text-slate-900 group-hover:text-dazz-navy transition-colors duration-500">
                    {isAr ? div.titleAr : div.title}
                  </h3>
                </div>
                <motion.div
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:border-dazz-gold group-hover:bg-dazz-gold transition-colors duration-500"
                >
                  <ArrowRight size={24} className="text-slate-400 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
                </motion.div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
