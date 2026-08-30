'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';

export function WhoWeAre({ isAr }: { isAr?: boolean }) {
  const content = isAr ? [
    "شركة داز للمقاولات هي شركة سعودية متنوعة تقدم حلولاً متكاملة في قطاعات البناء والبنية التحتية والصناعة والمواد والمعدات والبيئة والعقارات.",
    "نحن ملتزمون بدعم متطلبات البناء والبنية التحتية المتنامية في المملكة من خلال توفير منتجات موثوقة وخدمات متخصصة ومعدات حديثة وحلول توريد فعالة.",
    "تتيح لنا قدراتنا المتنوعة خدمة المقاولين والمطورين والشركات الصناعية ومشاريع البنية التحتية وغيرها من المنظمات من خلال شريك أعمال واحد وموثوق."
  ] : [
    "DAZZ Contracting Company is a diversified Saudi-based company delivering integrated solutions across the construction, infrastructure, industrial, materials, equipment, environmental, and real estate sectors.",
    "We are committed to supporting the Kingdom's growing construction and infrastructure requirements by providing reliable products, specialized services, modern equipment, and efficient supply solutions.",
    "Our diversified capabilities allow us to serve contractors, developers, industrial companies, infrastructure projects, and other organizations through a single, dependable business partner."
  ];

  return (
    <section className="py-24 md:py-32 bg-white scroll-mt-24" aria-label="Who We Are" id="who-we-are">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          
          {/* Section Marker */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4"
          >
            <div className="flex flex-col gap-6">
              <span className={`text-[120px] font-extrabold text-slate-100 leading-none tracking-tighter ${isAr ? 'font-arabic' : ''}`}>01</span>
              <div>
                <div className={`w-12 h-px bg-dazz-navy mb-4 ${isAr ? 'ml-auto' : ''}`} />
                <h2 className={`text-2xl font-bold tracking-widest text-slate-900 ${isAr ? 'font-arabic text-3xl uppercase-none' : 'uppercase'}`}>
                  {isAr ? 'من نحن' : 'Who We Are'}
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="md:col-span-8 lg:col-span-7 pt-4">
            <div className="space-y-12">
              {content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className={`${index === 0 ? 'text-xl md:text-2xl font-light text-slate-900 leading-snug' : 'text-lg text-slate-600 font-light leading-relaxed'} ${isAr ? 'font-arabic' : ''}`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
