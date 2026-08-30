'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Principle {
  title: string;
  description: string;
  image?: string;
}

interface WhyWorkWithUsProps {
  title: string;
  description: string;
  principles: Principle[];
  isAr: boolean;
}

export function WhyWorkWithUsInteractive({ title, description, principles, isAr }: WhyWorkWithUsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);

  const activeImage = hoveredIndex !== null && principles[hoveredIndex]?.image 
    ? principles[hoveredIndex].image 
    : null;

  return (
    <section className="relative bg-[#0A0F1A] text-white py-24 md:py-32 overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Background Architectural Grid Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute w-full h-px bg-slate-700 top-1/4"></div>
        <div className="absolute w-full h-px bg-slate-700 top-2/4"></div>
        <div className="absolute w-full h-px bg-slate-700 top-3/4"></div>
        <div className={`absolute h-full w-px bg-slate-700 ${isAr ? 'right-[15%]' : 'left-[15%]'}`}></div>
        <div className={`absolute h-full w-px bg-slate-700 ${isAr ? 'right-[85%]' : 'left-[85%]'}`}></div>
      </div>

      {/* Dynamic Background Image Reveal for Desktop */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {activeImage && (
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeImage})` }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 md:mb-32">
          <p className={`font-mono text-dazz-gold text-xs tracking-[0.2em] mb-4 opacity-80 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
            {isAr ? 'لماذا تعمل معنا؟' : 'Why Work With Us'}
          </p>
          <h2 className={`text-4xl md:text-6xl font-serif font-bold max-w-3xl leading-tight ${isAr ? 'font-arabic' : ''}`}>
            {title}
          </h2>
          {description && (
            <p className={`mt-6 text-slate-400 max-w-xl text-lg md:text-xl font-light leading-relaxed whitespace-pre-wrap ${isAr ? 'font-arabic' : ''}`}>
              {description}
            </p>
          )}
        </div>

        {/* Desktop Editorial Layout */}
        <div className="hidden md:block relative border-t border-slate-700">
          {principles.map((principle, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;
            const formattedNum = (idx + 1).toString().padStart(2, '0');
            const totalNum = principles.length.toString().padStart(2, '0');

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative border-b border-slate-700 group cursor-pointer transition-all duration-500 ${
                  isAnyHovered && !isHovered ? 'opacity-30' : 'opacity-100'
                }`}
              >
                {/* Gold Accent Line */}
                <div 
                  className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} h-full w-1 bg-dazz-gold origin-top transition-transform duration-500 ease-out`}
                  style={{ transform: isHovered ? 'scaleY(1)' : 'scaleY(0)' }}
                />

                <div className="flex items-center py-10 px-8">
                  {/* Indicator & Number */}
                  <div className="flex items-center gap-6 w-[20%]">
                    <div className="font-mono text-xs text-slate-500 flex flex-col gap-1">
                      <span className={`transition-colors duration-300 ${isHovered ? 'text-dazz-gold' : ''}`}>
                        {formattedNum}
                      </span>
                      <span className="w-8 h-px bg-slate-600"></span>
                      <span>{totalNum}</span>
                    </div>
                  </div>

                  {/* Title & Arrow */}
                  <div className={`flex-1 flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-2xl lg:text-3xl font-bold font-serif transition-transform duration-500 ease-out ${
                      isHovered ? (isAr ? '-translate-x-4 text-white' : 'translate-x-4 text-white') : 'text-slate-300'
                    } ${isAr ? 'font-arabic' : ''}`}>
                      {principle.title}
                    </h3>
                    
                    <div className={`overflow-hidden transition-all duration-500 flex-shrink-0 ${
                      isHovered ? 'w-6 opacity-100' : 'w-0 opacity-0'
                    }`}>
                      <ArrowRight className={`text-dazz-gold ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Description Reveal */}
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isHovered ? '120px' : '0px', opacity: isHovered ? 1 : 0 }}
                >
                  <div className={`pb-10 w-1/2 ${isAr ? 'mr-[20%]' : 'ml-[20%]'}`}>
                    <p className={`text-slate-400 font-light text-lg leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion Layout */}
        <div className="block md:hidden space-y-4">
          {principles.map((principle, idx) => {
            const isExpanded = mobileExpanded === idx;
            const formattedNum = (idx + 1).toString().padStart(2, '0');

            return (
              <div 
                key={idx} 
                className={`border border-slate-700 bg-slate-800/20 rounded-lg overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'border-dazz-gold/50 bg-slate-800/40' : ''
                }`}
              >
                <button
                  onClick={() => setMobileExpanded(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className={`font-mono text-sm ${isExpanded ? 'text-dazz-gold' : 'text-slate-500'}`}>
                      {formattedNum}
                    </span>
                    <h3 className={`font-serif font-bold text-xl ${isExpanded ? 'text-white' : 'text-slate-300'} ${isAr ? 'font-arabic text-right' : ''}`}>
                      {principle.title}
                    </h3>
                  </div>
                  <ChevronDown className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-dazz-gold' : ''}`} size={18} />
                </button>
                
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isExpanded ? '400px' : '0px', opacity: isExpanded ? 1 : 0 }}
                >
                  <div className="p-6 pt-0 space-y-6">
                    <p className={`text-slate-400 font-light leading-relaxed ${isAr ? 'font-arabic text-right' : ''}`}>
                      {principle.description}
                    </p>
                    {principle.image && (
                      <div className="aspect-video w-full rounded border border-slate-700 overflow-hidden">
                        <img src={principle.image} alt={principle.title} className="w-full h-full object-cover opacity-80" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
