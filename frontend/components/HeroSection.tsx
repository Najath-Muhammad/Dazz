import React from 'react';
import Image from 'next/image';
import { Container } from './Container';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function HeroSection({ title, subtitle, backgroundImage, children }: HeroSectionProps) {
  return (
    <section className="relative bg-slate-900 pt-32 pb-40 flex items-center min-h-[70vh]">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-0" />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          {children && <div className="flex flex-wrap gap-4">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
