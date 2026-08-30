'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';

export interface CallToActionProps {
  variant?: 'light' | 'dark' | 'simple';
  titleLine1: React.ReactNode;
  titleLine2?: React.ReactNode;
  description: string;
  label?: string; // Used for "07" in light or "Ready to Partner" in dark
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  isAr?: boolean;
}

export function CallToAction({
  variant = 'dark',
  titleLine1,
  titleLine2,
  description,
  label,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  isAr = false,
}: CallToActionProps) {
  
  if (variant === 'light') {
    return (
      <section className="py-24 md:py-40 bg-white text-center" aria-label="Call to Action">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            {label && (
              <>
                <span className={`text-[120px] font-extrabold text-slate-100 leading-none tracking-tighter block mb-6 ${isAr ? 'font-arabic' : ''}`}>
                  {label}
                </span>
                <div className="w-12 h-px bg-dazz-navy mx-auto mb-12" />
              </>
            )}
            
            <h2 className={`text-4xl md:text-6xl lg:text-[80px] font-extrabold tracking-tighter text-slate-900 mb-8 leading-tight ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {titleLine1} {titleLine2 && <br/>}
              {titleLine2 && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-400">
                  {titleLine2}
                </span>
              )}
            </h2>
            
            <p className={`text-lg md:text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto ${isAr ? 'font-arabic' : ''}`}>
              {description}
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
              {secondaryButtonText && secondaryButtonLink && (
                <Link href={secondaryButtonLink}>
                  <Button variant="primary" className={`w-full sm:w-auto text-lg px-8 py-4 ${isAr ? 'font-arabic uppercase-none' : ''}`}>
                    {secondaryButtonText}
                  </Button>
                </Link>
              )}
              <Link href={primaryButtonLink}>
                <Button variant="secondary" className={`w-full sm:w-auto text-lg px-8 py-4 ${isAr ? 'font-arabic uppercase-none' : ''}`}>
                  {primaryButtonText}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Dark variant
  return (
    <section className="relative py-28 md:py-40 bg-dazz-navy overflow-hidden" aria-labelledby="cta-heading">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-dazz-gold/30 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-dazz-gold/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {label && (
            <div className={`flex items-center justify-center gap-4 mb-10 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-px bg-dazz-gold/50" />
              <span className={`text-dazz-gold font-mono whitespace-nowrap ${isAr ? 'font-arabic uppercase-none text-xs tracking-widest' : 'text-[10px] tracking-[0.3em] uppercase'}`}>
                {label}
              </span>
              <div className="w-16 h-px bg-dazz-gold/50" />
            </div>
          )}
        </motion.div>

        <div className="overflow-hidden mb-8">
          <motion.h2
            id="cta-heading"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`text-6xl md:text-8xl lg:text-[100px] font-extrabold text-white tracking-tighter leading-[0.95] ${isAr ? 'font-arabic text-5xl md:text-7xl lg:text-[80px]' : 'uppercase'}`}
          >
            {titleLine1}
            {titleLine2 && (
              <>
                <br />
                <span className="text-dazz-gold">{titleLine2}</span>
              </>
            )}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-14 ${isAr ? 'font-arabic' : ''}`}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-5 ${isAr ? 'sm:flex-row-reverse' : ''}`}
        >
          <Link
            href={primaryButtonLink}
            className={`group flex items-center gap-3 px-10 py-5 bg-dazz-gold text-dazz-navy text-sm font-bold tracking-widest hover:bg-dazz-gold-light transition-all duration-300 ${isAr ? 'font-arabic uppercase-none flex-row-reverse' : 'uppercase'}`}
          >
            {primaryButtonText}
            <ArrowRight size={16} className={`transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </Link>
          {secondaryButtonText && secondaryButtonLink && (
            <Link
              href={secondaryButtonLink}
              className={`group flex items-center gap-3 text-sm font-bold tracking-widest text-white/40 hover:text-white transition-colors ${isAr ? 'font-arabic uppercase-none flex-row-reverse' : 'uppercase'}`}
            >
              {secondaryButtonText}
              <span className="w-10 h-px bg-current group-hover:w-16 transition-all duration-300" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
