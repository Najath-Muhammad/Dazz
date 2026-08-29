'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function OurApproach({ isAr }: { isAr?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const words = isAr 
    ? ['مبتكر', 'متعاون', 'تشغيلي', 'شامل'] 
    : ['INNOVATIVE', 'COLLABORATIVE', 'OPERATIONAL', 'COMPREHENSIVE'];

  return (
    <section 
      ref={containerRef}
      className="py-32 md:py-48 bg-slate-50 relative overflow-hidden" 
      aria-label="Our Approach"
    >
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-evenly pointer-events-none opacity-[0.03]">
        <div className="w-px h-full bg-slate-900" />
        <div className="w-px h-full bg-slate-900" />
        <div className="w-px h-full bg-slate-900" />
        <div className="w-px h-full bg-slate-900" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="text-[120px] font-extrabold text-slate-200/60 leading-none tracking-tighter block mb-6">02</span>
          <div className="w-12 h-px bg-dazz-gold mb-4" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            {isAr ? 'نهجنا' : 'Our Approach'}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden py-2 border-b border-slate-200/50 hover:border-dazz-gold transition-colors duration-500 group">
              <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-8"
              >
                <span className="text-xl md:text-2xl font-mono text-slate-300 group-hover:text-dazz-gold transition-colors duration-300">
                  0{i + 1}
                </span>
                <span className="text-5xl md:text-7xl lg:text-[100px] font-extrabold uppercase tracking-tighter text-slate-900 group-hover:text-dazz-navy transition-colors duration-300">
                  {word}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
