'use client';
import React, { useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: any;
  hideExtras?: boolean;
}

function isVideoMedia(media: any): boolean {
  if (!media) return false;
  if (typeof media === 'string') {
    return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(media);
  }
  if (media?.resourceType === 'video') return true;
  if (media?.url) return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(media.url);
  return false;
}

export function CinematicHero({ title, subtitle, backgroundImage, hideExtras = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVideo = useMemo(() => isVideoMedia(backgroundImage), [backgroundImage]);

  // Only apply JS parallax for images — videos should never be translated
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end pt-32 pb-16 md:pb-24 overflow-hidden bg-slate-950"
      aria-label="Hero"
    >
      {/* Background */}
      {isVideo ? (
        /* ── VIDEO background: simple absolute fill, no parallax, no inset trick ── */
        <div className="absolute inset-0 z-0">
          <MediaRenderer
            media={backgroundImage}
            fill
            className="object-cover opacity-60"
            muted
            autoPlay
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />
        </div>
      ) : (
        /* ── IMAGE background: oversized wrapper enables CSS parallax ── */
        <div className="hero-bg-img absolute inset-[-10%] z-0 will-change-transform">
          <MediaRenderer
            media={backgroundImage}
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
        </div>
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
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full mt-auto">
        {/* Removed Label */}
        {/* Title */}
        <div className="overflow-hidden mb-8 max-w-4xl">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white uppercase tracking-tighter leading-tight"
          >
            {title.includes('\n') ? title.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i !== arr.length - 1 && <br />}
              </React.Fragment>
            )) : title}
          </motion.h1>
        </div>

        {/* Subtitle & CTA row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mt-8 mb-16 border-l-2 border-dazz-gold pl-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-2xl text-slate-200 max-w-2xl font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex-shrink-0"
          >
            <Link href="/contact" className="group flex items-center justify-center gap-4 bg-dazz-gold text-slate-950 px-8 py-4 rounded-sm font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors">
              <span>Partner With Us</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        {!hideExtras && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 max-w-2xl"
          >
            {[
              { num: '500+', label: 'Specialists' },
              { num: '4', label: 'Divisions' },
              { num: '15+', label: 'Years Active' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter group-hover:text-dazz-gold transition-colors">{stat.num}</p>
                <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-white/40 uppercase mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
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
