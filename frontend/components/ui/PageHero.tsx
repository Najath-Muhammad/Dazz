'use client';
import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ChevronDown } from 'lucide-react';

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  media: SafeAny;
  label?: string; // Optional small label above title, e.g. "ABOUT DAZZ"
  isAr?: boolean;
  variant?: 'home' | 'standard' | 'short'; // Dictates height and padding
  children?: React.ReactNode; // Optional extra content (like stats or CTA buttons) inserted below subtitle
}

function isVideoMedia(media: SafeAny): boolean {
  if (!media) return false;
  if (typeof media === 'string') {
    return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(media);
  }
  if (media?.resourceType === 'video') return true;
  if (media?.url) return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(media.url);
  return false;
}

export function PageHero({ 
  title, 
  subtitle, 
  media, 
  label, 
  isAr = false, 
  variant = 'standard',
  children 
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVideo = useMemo(() => isVideoMedia(media), [media]);

  // Parallax effect for image backgrounds (videos shouldn't be transformed for performance)
  useEffect(() => {
    if (isVideo) return;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const y = window.scrollY;
      const imgEl = containerRef.current.querySelector('.hero-bg-img') as HTMLElement;
      if (imgEl) imgEl.style.transform = `translateY(${y * 0.28}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideo]);

  // Determine container height based on variant
  const heightClasses = {
    home: 'min-h-screen pt-32 pb-16 md:pb-24 flex-col justify-end',
    standard: 'h-screen min-h-[700px] flex items-end pb-24 md:pb-32',
    short: 'h-[80vh] min-h-[600px] flex items-end pb-24'
  };

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-950 flex ${heightClasses[variant]}`}
      aria-label="Hero Section"
    >
      {/* Background */}
      {isVideo ? (
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
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="hero-bg-img absolute inset-[-10%] z-0 will-change-transform"
        >
          <MediaRenderer
            media={media}
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
          <div className={`absolute inset-0 bg-gradient-to-${isAr ? 'l' : 'r'} from-slate-950/60 via-transparent to-transparent`} />
        </motion.div>
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className={`relative z-10 max-w-[1400px] mx-auto px-6 w-full ${variant === 'home' ? 'mt-auto' : ''}`}>
        
        {/* Optional Label / Accent Line */}
        {label && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="max-w-[150px] mb-8"
          >
            <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="h-[1px] bg-dazz-gold flex-1" />
              <span className={`text-dazz-gold font-mono whitespace-nowrap ${isAr ? 'font-arabic text-xs tracking-widest uppercase-none' : 'text-[10px] tracking-[0.3em] uppercase'}`}>
                {label}
              </span>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <div className={`overflow-hidden ${subtitle || children ? 'mb-6' : ''}`}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className={`font-extrabold text-white tracking-tighter leading-tight ${
              variant === 'home' 
                ? 'text-4xl md:text-5xl lg:text-7xl max-w-4xl' 
                : 'text-4xl md:text-6xl lg:text-[5rem]'
            } ${isAr ? (variant === 'home' ? 'font-arabic uppercase-none text-right' : 'font-arabic uppercase-none text-5xl md:text-7xl lg:text-[6rem]') : 'uppercase'}`}
          >
            {typeof title === 'string' && title.includes('\n') ? title.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                <span className={variant !== 'home' ? "block" : ""}>{line}</span>
                {i !== arr.length - 1 && variant === 'home' && <br />}
              </React.Fragment>
            )) : title}
          </motion.h1>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`font-light leading-relaxed max-w-2xl drop-shadow-md ${
              variant === 'home'
                ? 'text-lg md:text-2xl text-slate-300'
                : 'text-lg md:text-xl text-slate-400'
            } ${isAr ? (variant === 'home' ? 'font-arabic text-right' : 'font-arabic text-xl md:text-2xl text-slate-300') : ''}`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Extra children content */}
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className={`absolute bottom-8 right-8 z-10 flex-col items-center gap-2 ${variant === 'home' ? 'flex' : 'hidden md:flex'}`}
        aria-hidden="true"
      >
        <ChevronDown size={16} className="text-white/30 animate-bounce" />
        {variant !== 'short' && (
          <div className="w-[1px] h-14 bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-dazz-gold"
              style={{ height: '40%' }}
              animate={{ top: ['-40%', '140%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
