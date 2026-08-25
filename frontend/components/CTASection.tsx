import React from 'react';
import { Container } from './Container';

interface CTASectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function CTASection({ title, description, children }: CTASectionProps) {
  return (
    <section className="bg-amber-500 py-20">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-slate-800 text-lg">
              {description}
            </p>
          </div>
          {children && (
            <div className="flex-shrink-0">
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
