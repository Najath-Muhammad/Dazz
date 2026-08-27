'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const strengths = [
  {
    num: '500+',
    label: 'Specialist Workforce',
    desc: 'A deeply skilled team spanning engineering, logistics, trading, and hospitality operations.',
  },
  {
    num: '15+',
    label: 'Years of Operations',
    desc: 'Over a decade of building trust, delivering results, and growing across the Kingdom.',
  },
  {
    num: '4',
    label: 'Integrated Divisions',
    desc: 'Seamlessly interconnected business units that collaborate to deliver comprehensive solutions.',
  },
  {
    num: 'ISO',
    label: 'Certified Standards',
    desc: 'Operations maintained to international quality standards across all our divisions.',
  },
  {
    num: 'KSA',
    label: 'Saudi Vision 2030',
    desc: 'Committed to the Kingdom\'s national development goals — building for generations.',
  },
];

function CounterCard({ num, label, desc, index }: { num: string; label: string; desc: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col border-t border-white/10 pt-8 group hover:border-dazz-gold transition-colors duration-500"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
        className="text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-none mb-3 group-hover:text-dazz-gold transition-colors duration-500"
      >
        {num}
      </motion.p>
      <p className="text-xs font-mono tracking-[0.2em] uppercase text-dazz-gold/70 mb-3">{label}</p>
      <p className="text-sm text-white/40 font-light leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export function WhyDazzSection() {
  return (
    <section className="py-24 md:py-32 bg-dazz-navy text-white overflow-hidden" aria-labelledby="why-dazz-heading">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Left label column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:w-64 flex-shrink-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-dazz-gold" />
              <span className="text-dazz-gold font-mono text-[10px] tracking-[0.3em] uppercase">Why Dazz</span>
            </div>
            <h2 id="why-dazz-heading" className="text-5xl md:text-6xl font-extrabold uppercase tracking-tighter leading-[1] mb-8">
              KEY<br />STRENGTHS
            </h2>
            <p className="text-sm text-white/50 font-light leading-relaxed max-w-xs">
              Dazz Tradelink is built on a foundation of innovation, collaboration, and an unwavering commitment to the highest standards of quality.
            </p>
          </motion.div>

          {/* Strengths Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {strengths.map((s, i) => (
              <CounterCard key={s.num} {...s} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
