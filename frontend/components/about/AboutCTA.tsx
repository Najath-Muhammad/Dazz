'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

export function AboutCTA({ isAr }: { isAr?: boolean }) {
  return (
    <section className="py-24 md:py-40 bg-white text-center" aria-label="Call to Action">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
        >
          <span className={`text-[120px] font-extrabold text-slate-100 leading-none tracking-tighter block mb-6 ${isAr ? 'font-arabic' : ''}`}>07</span>
          <div className="w-12 h-px bg-dazz-navy mx-auto mb-12" />
          
          <h2 className={`text-4xl md:text-6xl lg:text-[80px] font-extrabold tracking-tighter text-slate-900 mb-8 leading-tight ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
            {isAr ? 'دعنا نبني' : "LET'S BUILD"} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-400">
              {isAr ? 'ما هو قادم.' : "WHAT'S NEXT."}
            </span>
          </h2>
          
          <p className={`text-lg md:text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'اكتشف قطاعاتنا أو تواصل مع فريقنا لمناقشة مبادرتك الكبرى القادمة.' 
              : 'Explore our divisions or contact the team to discuss your next major initiative.'}
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
            <Link href={`/${isAr ? 'ar' : 'en'}/services`}>
              <Button variant="primary" className={`w-full sm:w-auto text-lg px-8 py-4 ${isAr ? 'font-arabic uppercase-none' : ''}`}>
                {isAr ? 'استكشف القطاعات' : 'EXPLORE DIVISIONS'}
              </Button>
            </Link>
            <Link href={`/${isAr ? 'ar' : 'en'}/contact`}>
              <Button variant="secondary" className={`w-full sm:w-auto text-lg px-8 py-4 ${isAr ? 'font-arabic uppercase-none' : ''}`}>
                {isAr ? 'تواصل معنا' : 'CONTACT US'}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
