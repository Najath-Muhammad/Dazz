'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ChevronDown } from 'lucide-react';

interface AboutHeroProps {
  title: string;
  subtitle: string;
  media: any;
  isAr: boolean;
}

export function AboutHero({ title, subtitle, media, isAr }: AboutHeroProps) {
  // We use CSS masking or simple framer-motion reveals
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden bg-slate-950" aria-label="About Hero">
      {/* Background Media with reveal */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <MediaRenderer
          media={media}
          fill
          className="object-cover opacity-60"
          muted
          autoPlay
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
        <div className={`absolute inset-0 bg-gradient-to-${isAr ? 'l' : 'r'} from-slate-950/80 via-transparent to-transparent`} />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-24 md:pb-32 w-full">
        {/* Accent Line & Metadata */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="max-w-[120px] mb-8"
        >
          <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="h-[1px] bg-dazz-gold flex-1" />
            <span className={`text-dazz-gold font-mono text-[10px] tracking-[0.3em] whitespace-nowrap ${isAr ? 'font-arabic uppercase-none text-xs tracking-widest' : 'uppercase'}`}>
              {isAr ? 'عن داز' : 'ABOUT DAZZ'}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className={`text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-white tracking-tighter leading-tight ${isAr ? 'font-arabic text-5xl md:text-7xl lg:text-[6rem]' : 'uppercase'}`}
          >
            {title.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`max-w-2xl font-light leading-relaxed ${isAr ? 'font-arabic text-xl md:text-2xl text-slate-300' : 'text-lg md:text-xl text-slate-400'}`}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <ChevronDown size={16} className="text-white/30 animate-bounce" />
        <div className="w-[1px] h-14 bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-dazz-gold"
            style={{ height: '40%' }}
            animate={{ top: ['-40%', '140%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
