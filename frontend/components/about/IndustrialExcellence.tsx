'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function IndustrialExcellence({ isAr }: { isAr?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 md:py-48 bg-slate-950 overflow-hidden" 
      aria-label="Industrial Excellence"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-30"
      >
        <img 
          src="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" 
          alt="Industrial Excellence" 
          className="w-full h-[140%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
      </motion.div>

      {/* Architectural Grid */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Gold Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-dazz-gold/50 to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-dazz-gold/50 to-transparent z-[2]" />
      <div className="absolute top-0 left-10 w-[1px] h-full bg-gradient-to-b from-transparent via-dazz-gold/20 to-transparent z-[2] hidden md:block" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-8 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-dazz-gold" />
                <span className="text-dazz-gold font-mono text-[10px] tracking-[0.3em] uppercase">06 — Excellence</span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-[100px] font-extrabold text-white uppercase tracking-tighter leading-[0.9]">
                {isAr ? 'تمكين التفوق' : 'EMPOWERING'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                  {isAr ? 'الصناعي' : 'INDUSTRIAL'}
                </span> <br />
                {isAr ? 'الامتياز.' : 'EXCELLENCE.'}
              </h2>
            </motion.div>
          </div>

          <div className="md:col-span-4 lg:col-span-3 flex md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm max-w-sm relative"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-dazz-gold" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-dazz-gold" />
              
              <p className="text-white/70 font-light leading-relaxed text-sm">
                {isAr 
                  ? 'مصمم لتلبية الاحتياجات التشغيلية للبيئات الصناعية، ومصمم لدفع الكفاءة على مستوى المملكة.' 
                  : 'Designed to meet the operational needs of industrial environments, engineered to drive efficiency across the Kingdom.'}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
