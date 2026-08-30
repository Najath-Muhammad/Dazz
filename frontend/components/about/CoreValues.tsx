'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const values = [
  { title: 'Integrity', titleAr: 'النزاهة', desc: 'We conduct our business with honesty, transparency, and strong ethical principles.', descAr: 'ندير أعمالنا بصدق وشفافية ومبادئ أخلاقية قوية.' },
  { title: 'Safety', titleAr: 'السلامة', desc: 'We place the safety and well-being of our people, clients, and communities at the highest priority.', descAr: 'نضع سلامة ورفاهية أفرادنا وعملائنا ومجتمعاتنا في أعلى أولوياتنا.' },
  { title: 'Quality', titleAr: 'الجودة', desc: 'We are committed to delivering high-quality products and services that meet or exceed client expectations.', descAr: 'نحن ملتزمون بتقديم منتجات وخدمات عالية الجودة تلبي أو تتجاوز توقعات العملاء.' },
  { title: 'Innovation', titleAr: 'الابتكار', desc: 'We embrace new ideas, technologies, and smarter ways of working to create better solutions.', descAr: 'نتبنى أفكارًا وتقنيات جديدة وطرق عمل أذكى لخلق حلول أفضل.' },
  { title: 'Customer Service', titleAr: 'خدمة العملاء', desc: 'We are committed to understanding our customers and delivering solutions that exceed their expectations.', descAr: 'نحن ملتزمون بفهم عملائنا وتقديم حلول تتجاوز توقعاتهم.' },
  { title: 'Accountability', titleAr: 'المساءلة', desc: 'We take responsibility for our commitments, decisions, actions, and results.', descAr: 'نتحمل مسؤولية التزاماتنا وقراراتنا وإجراءاتنا ونتائجنا.' },
];

export function CoreValues({ isAr }: { isAr?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-40 bg-white border-t border-slate-100" aria-label="Core Values">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-20">
          <span className={`text-[120px] font-extrabold text-slate-100 leading-none tracking-tighter block mb-6 ${isAr ? 'font-arabic text-right' : ''}`}>05</span>
          <div className={`w-12 h-px bg-dazz-navy mb-4 ${isAr ? 'ml-auto' : ''}`} />
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>
            {isAr ? 'القيم والمبادئ' : 'VALUES & PRINCIPLES'}
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <div className={`flex items-center gap-4 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-xs font-mono text-dazz-gold">0{i + 1}</span>
                <div className="h-[1px] bg-slate-200 flex-1 group-hover:bg-dazz-gold transition-colors duration-500" />
              </div>
              <h3 className={`text-2xl font-bold tracking-tight text-slate-900 mb-4 ${isAr ? 'font-arabic text-right uppercase-none' : 'uppercase'}`}>
                {isAr ? val.titleAr : val.title}
              </h3>
              <p className={`text-slate-500 font-light leading-relaxed ${isAr ? 'font-arabic text-right' : ''}`}>
                {isAr ? val.descAr : val.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
