import React from 'react';
import Image from 'next/image';
import { Container } from './Container';

interface ImageTextSectionProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  className?: string;
}

export function ImageTextSection({
  title,
  subtitle,
  content,
  imageUrl,
  imageAlt,
  imagePosition = 'right',
  className = ''
}: ImageTextSectionProps) {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <Container>
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          <div className="flex-1 w-full space-y-6">
            {subtitle && (
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm block">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
            <div className="h-1 w-20 bg-amber-500" />
            <div className="text-slate-600 leading-relaxed text-lg pt-4 space-y-4">
              {content}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full rounded-sm overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-sm" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
