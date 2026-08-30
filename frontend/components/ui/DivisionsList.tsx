'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MediaRenderer } from '@/components/MediaRenderer';

export interface DivisionsListProps {
  isAr?: boolean;
  variant?: 'interactive' | 'grid';
}

const divisions = [
  {
    id: '01',
    title: 'CONSTRUCTION',
    titleAr: 'المقاولات',
    desc: 'Precision engineering, heavy infrastructure, and ready-mix concrete — building the Kingdom\'s future.',
    descAr: 'هندسة دقيقة، وبنية تحتية ثقيلة، وخرسانة جاهزة — نبني مستقبل المملكة.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    href: '/services', // Language prefix added dynamically
  },
  {
    id: '02',
    title: 'FOOD TRADING',
    titleAr: 'تجارة الأغذية',
    desc: 'Global sourcing and distribution of premium food products ensuring resilient supply chains.',
    descAr: 'توفير وتوزيع المنتجات الغذائية الفاخرة عالمياً لضمان سلاسل إمداد قوية.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    href: '/services',
  },
  {
    id: '03',
    title: 'LOGISTICS',
    titleAr: 'الخدمات اللوجستية',
    desc: 'End-to-end supply chain solutions, advanced fleet management and rapid distribution.',
    descAr: 'حلول متكاملة لسلاسل الإمداد، وإدارة أساطيل متطورة وتوزيع سريع.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    href: '/services',
  },
  {
    id: '04',
    title: 'HOSPITALITY',
    titleAr: 'الضيافة',
    desc: 'World-class guest experiences through premium property and service management.',
    descAr: 'تجارب ضيافة عالمية المستوى من خلال إدارة الممتلكات والخدمات الفاخرة.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    href: '/services',
  },
];

export function DivisionsList({ isAr = false, variant = 'grid' }: DivisionsListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (variant === 'interactive') {
    return (
      <section className="py-24 md:py-32 bg-white scroll-mt-24" aria-label="Our Divisions" id="about-divisions">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16">
            <span className={`text-[120px] font-extrabold text-slate-100 leading-none tracking-tighter block mb-6 ${isAr ? 'font-arabic text-right' : ''}`}>03</span>
            <div className={`w-12 h-px bg-dazz-navy mb-4 ${isAr ? 'ml-auto' : ''}`} />
            <h2 className={`text-sm font-bold tracking-widest text-slate-500 ${isAr ? 'font-arabic text-base uppercase-none text-right' : 'uppercase'}`}>
              {isAr ? 'قطاعاتنا' : 'Our Divisions'}
            </h2>
          </div>

          <div className="relative border-t border-slate-200">
            {divisions.map((div, i) => (
              <Link 
                key={div.id} 
                href={`/${isAr ? 'ar' : 'en'}${div.href}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group block border-b border-slate-200 py-10 md:py-16 relative overflow-hidden"
              >
                {/* Background Reveal */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 z-0 pointer-events-none"
                    >
                      <MediaRenderer media={div.image} fill className="object-cover opacity-[0.08]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`relative z-10 flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-8 md:gap-16 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xl md:text-2xl font-mono text-slate-300 group-hover:text-dazz-gold transition-colors duration-500">
                      {div.id}
                    </span>
                    <h3 className={`text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 group-hover:text-dazz-navy transition-colors duration-500 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                      {isAr ? div.titleAr : div.title}
                    </h3>
                  </div>
                  <motion.div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:border-dazz-gold group-hover:bg-dazz-gold transition-colors duration-500"
                  >
                    <ArrowRight size={24} className={`text-slate-400 group-hover:text-white transition-all duration-500 ${isAr ? 'rotate-180 group-hover:rotate-[225deg]' : 'group-hover:-rotate-45'}`} />
                  </motion.div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Grid Variant (Dark)
  return (
    <section className="py-24 md:py-32 bg-slate-950 text-white overflow-hidden" aria-labelledby="divisions-heading">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-[1px] bg-dazz-gold" />
              <span className={`text-dazz-gold font-mono uppercase ${isAr ? 'font-arabic text-xs tracking-widest uppercase-none' : 'text-[10px] tracking-[0.3em]'}`}>
                {isAr ? 'أقسامنا الرئيسية' : 'Our Core Divisions'}
              </span>
            </div>
            <h2 id="divisions-heading" className={`text-5xl md:text-6xl font-extrabold tracking-tighter ${isAr ? 'font-arabic text-4xl md:text-5xl text-right' : 'uppercase'}`}>
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
              href={`/${isAr ? 'ar' : 'en'}/services`}
              className={`group flex items-center gap-3 text-sm font-bold tracking-widest text-white/40 hover:text-white transition-colors ${isAr ? 'font-arabic uppercase-none flex-row-reverse' : 'uppercase'}`}
            >
              {isAr ? 'عرض جميع الخدمات' : 'View All Services'}
              <ArrowRight size={16} className={`transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </Link>
          </motion.div>
        </div>

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
                href={`/${isAr ? 'ar' : 'en'}${div.href}`}
                className={`group flex flex-col justify-between h-full p-10 bg-slate-950 hover:bg-white/[0.03] transition-all duration-500 min-h-[240px] ${isAr ? 'border-r-2 border-r-white/5 hover:border-r-dazz-gold' : 'border-l-2 border-l-white/5 hover:border-l-dazz-gold'}`}
              >
                <div className={`flex items-start justify-between gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className={isAr ? 'text-right' : ''}>
                    <p className="text-xs font-mono text-dazz-gold/50 mb-4 tracking-widest">{div.id}</p>
                    <h3 className={`text-3xl md:text-4xl font-extrabold tracking-tighter text-white group-hover:text-dazz-gold transition-colors duration-300 ${isAr ? 'font-arabic' : 'uppercase'}`}>
                      {isAr ? div.titleAr : div.title}
                    </h3>
                  </div>
                  <ArrowRight
                    size={20}
                    className={`text-white/10 group-hover:text-dazz-gold transition-all duration-300 flex-shrink-0 mt-2 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1`}
                  />
                </div>

                <div className={`mt-6 ${isAr ? 'flex flex-col items-end text-right' : ''}`}>
                  <div className={`w-12 h-px bg-white/10 mb-5 group-hover:w-24 group-hover:bg-dazz-gold/50 transition-all duration-500`} />
                  <p className={`text-sm text-white/50 font-light leading-relaxed max-w-sm ${isAr ? 'font-arabic' : ''}`}>
                    {isAr ? div.descAr : div.desc}
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
