'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const claims = [
  { id: '01', title: 'Industrial Focus', titleAr: 'التركيز الصناعي', desc: 'Designed to meet the operational needs of industrial environments.', descAr: 'مصمم لتلبية الاحتياجات التشغيلية للبيئات الصناعية.' },
  { id: '02', title: 'Innovation', titleAr: 'الابتكار', desc: 'Embracing new ideas and technologies to create smarter solutions.', descAr: 'تبني أفكار وتقنيات جديدة لخلق حلول أكثر ذكاءً.' },
  { id: '03', title: 'Collaboration', titleAr: 'التعاون', desc: 'Working as a single, dependable business partner across all sectors.', descAr: 'العمل كشريك أعمال واحد وموثوق في جميع القطاعات.' },
  { id: '04', title: 'Operational Solutions', titleAr: 'الحلول التشغيلية', desc: 'Delivering reliable products, modern equipment, and efficient supply chains.', descAr: 'توفير منتجات موثوقة ومعدات حديثة وسلاسل توريد فعالة.' },
];

export function WhyDazz({ isAr }: { isAr?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-40 bg-slate-50" aria-label="Why Dazz">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 ${isAr ? 'flex-row-reverse lg:flex-row-reverse text-right' : ''}`}>
          <div className="lg:w-1/3">
            <span className={`text-[120px] font-extrabold text-slate-200/60 leading-none tracking-tighter block mb-6 ${isAr ? 'font-arabic' : ''}`}>04</span>
            <div className={`w-12 h-px bg-dazz-gold mb-4 ${isAr ? 'ml-auto' : ''}`} />
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900 mb-6 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {isAr ? 'لماذا داز' : 'WHY DAZZ'}
            </h2>
            <p className={`text-slate-500 font-light leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
              {isAr 
                ? 'توجيه قراراتنا وتشكيل ثقافتنا، وتحديد الطريقة التي نعمل بها. نحن الخيار الموثوق للمشاريع الكبرى.' 
                : 'Guiding our decisions, shaping our culture, and defining the way we work. We are the trusted choice for major initiatives.'}
            </p>
          </div>

          <div ref={ref} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {claims.map((claim, i) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`relative border-slate-200 hover:border-dazz-gold transition-colors duration-300 ${isAr ? 'pr-8 border-r text-right' : 'pl-8 border-l'}`}
              >
                <span className={`absolute top-0 w-[2px] h-0 bg-dazz-gold transition-all duration-500 group-hover:h-full ${isAr ? '-right-[1px]' : '-left-[1px]'}`} />
                <div className="text-2xl font-mono text-slate-300 mb-4">{claim.id}</div>
                <h3 className={`text-xl font-bold tracking-widest text-slate-900 mb-3 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                  {isAr ? claim.titleAr : claim.title}
                </h3>
                <p className={`text-slate-500 font-light leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                  {isAr ? claim.descAr : claim.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
