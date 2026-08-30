'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Container } from './Container';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MediaRenderer } from './MediaRenderer';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: SafeAny;
  children?: React.ReactNode;
}

export function HeroSection({ title, subtitle, backgroundImage, children }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Initial Load Cinematic Timeline
    const tl = gsap.timeline();
    
    // 1. Image scale and opacity fade in
    tl.fromTo(imageRef.current, 
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' }
    );

    // 2. Title mask reveal (split lines manually if possible, or just reveal as block)
    tl.fromTo(titleLinesRef.current,
      { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
      { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2, ease: 'power4.out' },
      "-=1.2"
    );

    // 3. Subtitle fade up
    tl.fromTo('.hero-subtitle',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=0.8"
    );

    // 4. CTA button reveal
    tl.fromTo('.hero-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      "-=0.6"
    );

    // SCROLL-DRIVEN PARALLAX (No Pinning for smoother experience)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top', // Animates while the hero is scrolling out of view
      scrub: true,
      animation: gsap.timeline()
        .to(imageRef.current, { 
          y: '30%', // Slower parallax scroll for the background
          ease: 'none' 
        }, 0)
        .to(textRef.current, { 
          y: '40%', // Text scrolls slightly faster
          opacity: 0, 
          ease: 'none' 
        }, 0)
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-black h-screen overflow-hidden flex items-center justify-center">
      
      {/* Background Image Container */}
      <div ref={imageRef} className="absolute inset-0 z-0 origin-center">
        {backgroundImage && (
          <MediaRenderer
            media={backgroundImage}
            fill
            sizes="100vw"
            className="object-cover opacity-60 mix-blend-screen"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90 z-0" />
      </div>

      <Container className="relative z-10 w-full">
        <div ref={textRef} className="max-w-4xl flex flex-col items-start justify-center">
          
          <div className="overflow-hidden mb-6">
            <h1 
              ref={titleLinesRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] text-white"
            >
              {title}
            </h1>
          </div>
          
          <p className="hero-subtitle text-lg md:text-2xl text-slate-300 mb-8 max-w-2xl font-light tracking-wide leading-relaxed">
            {subtitle}
          </p>
          
          {children && (
            <div className="hero-cta flex flex-wrap gap-4 mt-4">
              {children}
            </div>
          )}

        </div>
      </Container>
      
      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-indicator origin-top" />
        </div>
      </div>
    </section>
  );
}
