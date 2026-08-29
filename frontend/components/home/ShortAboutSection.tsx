'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ArrowRight } from 'lucide-react';

interface AboutProps {
  image?: any;
}

export function ShortAboutSection({ image }: AboutProps) {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden" aria-labelledby="about-heading">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">

          {/* Text column */}
          <div className="md:col-span-6 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-dazz-navy" />
                <span className="text-dazz-navy font-mono text-[10px] tracking-[0.3em] uppercase">About Dazz</span>
              </div>
              <h2 id="about-heading" className="text-5xl md:text-6xl font-extrabold uppercase tracking-tighter text-slate-900 leading-[1] mb-8">
                PROUDLY<br />OPERATING<br />ACROSS THE<br />KINGDOM
              </h2>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8">
                Dazz Tradlink International is a Saudi-rooted conglomerate operating across four integrated divisions. With a nationwide presence and a deeply skilled workforce, we are committed to Saudi Vision 2030 and building long-term partnerships that endure.
              </p>
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-dazz-navy hover:text-dazz-gold transition-colors"
              >
                Read More About Us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div
            className="md:col-span-6 lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative h-[440px] md:h-[520px] overflow-hidden bg-slate-100">
              {image ? (
                <MediaRenderer
                  media={image}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-200" />
              )}
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-dazz-gold/60 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-dazz-gold/60 pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
