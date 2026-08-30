'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function DivisionsSection({ isAr }: { isAr?: boolean }) {
  const divisions = [
    {
      id: '01',
      title: isAr ? 'المقاولات' : 'CONSTRUCTION',
      desc: isAr ? 'هندسة دقيقة، وبنية تحتية ثقيلة، وخرسانة جاهزة — نبني مستقبل المملكة.' : 'Precision engineering, heavy infrastructure, and ready-mix concrete — building the Kingdom\'s future.',
      href: isAr ? '/ar/services' : '/en/services',
    },
    {
      id: '02',
      title: isAr ? 'التجارة الغذائية' : 'FOOD TRADING',
      desc: isAr ? 'توفير وتوزيع المنتجات الغذائية الفاخرة عالمياً لضمان سلاسل إمداد قوية.' : 'Global sourcing and distribution of premium food products ensuring resilient supply chains.',
      href: isAr ? '/ar/services' : '/en/services',
    },
    {
      id: '03',
      title: isAr ? 'الخدمات اللوجستية' : 'LOGISTICS',
      desc: isAr ? 'حلول متكاملة لسلاسل الإمداد، وإدارة أساطيل متطورة وتوزيع سريع.' : 'End-to-end supply chain solutions, advanced fleet management and rapid distribution.',
      href: isAr ? '/ar/services' : '/en/services',
    },
    {
      id: '04',
      title: isAr ? 'الضيافة' : 'HOSPITALITY',
      desc: isAr ? 'تجارب ضيافة عالمية المستوى من خلال إدارة الممتلكات والخدمات الفاخرة.' : 'World-class guest experiences through premium property and service management.',
      href: isAr ? '/ar/services' : '/en/services',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden" aria-labelledby="divisions-heading">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-dazz-gold" />
              <span className="text-dazz-gold font-mono text-[10px] tracking-[0.3em] uppercase">
                {isAr ? 'أقسامنا الرئيسية' : 'Our Core Divisions'}
              </span>
            </div>
            <h2 id="divisions-heading" className={`text-5xl md:text-6xl font-extrabold tracking-tighter ${isAr ? 'font-arabic text-4xl md:text-5xl' : 'uppercase'}`}>
              {isAr ? (
                <>مجالات<br />الخبرة</>
              ) : (
                <>AREAS OF<br />EXPERTISE</>
              )}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href={isAr ? '/ar/services' : '/en/services'}
              className={`group flex items-center gap-3 text-sm font-bold tracking-widest text-white/40 hover:text-white transition-colors ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}
            >
              {isAr ? 'عرض جميع الخدمات' : 'View All Services'}
              <ArrowRight size={16} className={`transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </Link>
          </motion.div>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {divisions.map((div, i) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={div.href}
                className={`group flex flex-col justify-between h-full p-10 bg-slate-950 hover:bg-white/[0.03] transition-all duration-500 min-h-[240px] ${isAr ? 'border-r-2 border-r-white/5 hover:border-r-dazz-gold' : 'border-l-2 border-l-white/5 hover:border-l-dazz-gold'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-dazz-gold/50 mb-4 tracking-widest">{div.id}</p>
                    <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tighter text-white group-hover:text-dazz-gold transition-colors duration-300 ${isAr ? 'font-arabic' : 'uppercase'}`}>
                      {div.title}
                    </h3>
                  </div>
                  <ArrowRight
                    size={20}
                    className={`text-white/10 group-hover:text-dazz-gold transition-all duration-300 flex-shrink-0 mt-2 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1`}
                  />
                </div>

                <div className="mt-6">
                  <div className="w-12 h-px bg-white/10 mb-5 group-hover:w-24 group-hover:bg-dazz-gold/50 transition-all duration-500" />
                  <p className={`text-sm text-white/50 font-light leading-relaxed max-w-sm ${isAr ? 'font-arabic' : ''}`}>
                    {div.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
