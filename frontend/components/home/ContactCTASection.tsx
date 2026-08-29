'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function ContactCTASection() {
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
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-16 h-px bg-dazz-gold/50" />
            <span className="text-dazz-gold font-mono text-[10px] tracking-[0.3em] uppercase">Ready to Partner</span>
            <div className="w-16 h-px bg-dazz-gold/50" />
          </div>
        </motion.div>

        <div className="overflow-hidden mb-8">
          <motion.h2
            id="cta-heading"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[100px] font-extrabold text-white uppercase tracking-tighter leading-[0.95]"
          >
            BUILD TODAY.<br />
            <span className="text-dazz-gold">LEAD TOMORROW.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-14"
        >
          Contact our team of experts today to discuss how Dazz Tradlink can deliver measurable value to your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/contact"
            className="group flex items-center gap-3 px-10 py-5 bg-dazz-gold text-dazz-navy text-sm font-bold tracking-widest uppercase hover:bg-dazz-gold-light transition-all duration-300"
          >
            CONTACT US
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/en/services"
            className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
          >
            OUR SERVICES
            <span className="w-10 h-px bg-current group-hover:w-16 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
