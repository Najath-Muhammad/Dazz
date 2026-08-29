'use client';

import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { LucideIcon, ArrowRight, Check, ChevronRight, Activity, Cpu, Hexagon } from 'lucide-react';

interface Props {
  service: any;
  lang: string;
  isAr: boolean;
  dir: 'ltr' | 'rtl';
}

export function ServicePresentation({ service, lang, isAr, dir }: Props) {
  const stripEmojis = (str: string) => {
    if (!str || typeof str !== 'string') return str;
    return str.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
  };

  const t = (field: any) => stripEmojis(field?.[lang] || field?.en || '');
  const enabled = (section: string) => service.enabledSections?.includes(section);

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Section Ordering logic
  const ALL_POSSIBLE = [
    'hero', 'introduction', 'capabilities', 'solutions',
    'categories', 'applications', 'process', 'equipment',
    'whyChooseUs', 'highlights', 'gallery', 'cta'
  ];
  
  const savedOrder = service.sectionOrder || [];
  const missingSections = ALL_POSSIBLE.filter(s => !savedOrder.includes(s));
  const sections = [...savedOrder];
  
  if (missingSections.length > 0) {
    const ctaIdx = sections.indexOf('cta');
    if (ctaIdx !== -1) {
       sections.splice(ctaIdx, 0, ...missingSections);
    } else {
       sections.push(...missingSections);
    }
  }

  const renderHero = () => {
    if (!enabled('hero')) return null;
    const hero = service.hero;
    return (
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-end pb-24 overflow-hidden bg-dazz-navy">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <MediaRenderer media={hero?.media || service.seo?.ogImage} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white" dir={dir}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[2px] bg-dazz-gold mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-dazz-gold font-mono tracking-[0.2em] uppercase mb-4 text-xs md:text-sm">
              {service.category} / 01
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.1] uppercase">
              {t(hero?.title) || t(service.name)}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <p className="text-xl md:text-2xl font-light text-slate-300 max-w-xl">
                {t(hero?.description) || t(service.shortDescription)}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex justify-start md:justify-end"
            >
              <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                DAZZ TRADLINK INTERNATIONAL<br/>{isAr ? 'قسم الخدمات' : 'SERVICE DIVISION'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  const renderIntro = () => {
    if (!enabled('introduction')) return null;
    const intro = service.introduction;
    return (
      <section className="py-24 md:py-32 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex-1 ${isAr ? 'lg:order-2' : ''}`}
              dir={dir}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono text-slate-400">01</span>
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-dazz-navy">
                  {t(intro?.sectionLabel) || (isAr ? 'عن الخدمة' : 'ABOUT THE SERVICE')}
                </h2>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-light leading-tight mb-8">
                {t(intro?.title)}
              </h3>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                {t(intro?.mainDescription)}
              </p>
              
              {intro?.paragraphs?.map((p: any, i: number) => (
                <p key={i} className="text-slate-500 mb-6 leading-relaxed font-light">
                  {t(p)}
                </p>
              ))}
            </motion.div>
            
            {intro?.image && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className={`flex-1 w-full relative h-[60vh] min-h-[500px] ${isAr ? 'lg:order-1' : ''}`}
              >
                <div className="absolute inset-0 bg-slate-100" />
                <MediaRenderer media={intro.image} fill className="object-cover" />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderCapabilities = () => {
    if (!enabled('capabilities') || !service.capabilities?.length) return null;
    return (
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16" dir={dir}>
            <div className="md:w-1/3">
              <div className="sticky top-40">
                <span className="text-xs font-mono text-slate-400 block mb-4">02</span>
                <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900 mb-6">
                  {isAr ? 'القدرات الأساسية' : 'CORE CAPABILITIES'}
                </h2>
                <div className="w-12 h-[2px] bg-dazz-gold" />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="flex flex-col">
                {service.capabilities.filter((c: any) => t(c.title)).map((cap: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group border-b border-slate-200 py-8 relative cursor-default"
                  >
                    <div className="absolute left-0 bottom-0 h-[2px] bg-dazz-navy w-0 group-hover:w-full transition-all duration-700 ease-out z-10" />
                    <div className="flex flex-col md:flex-row gap-6 md:items-start relative z-20">
                      <div className="text-xl font-mono text-dazz-gold font-bold group-hover:-translate-y-2 transition-transform duration-500">
                        {(i + 1).toString().padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 uppercase tracking-tight group-hover:text-dazz-navy transition-colors">
                          {t(cap.title)}
                        </h3>
                        <p className="text-slate-600 leading-relaxed font-light">
                          {t(cap.description)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderSolutions = () => {
    if (!enabled('solutions') || !service.solutions?.length) return null;
    return (
      <section className="py-24 bg-dazz-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16" dir={dir}>
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-4">03</span>
              <h2 className="text-3xl font-bold uppercase tracking-tight">{isAr ? 'الحلول والخدمات' : 'SOLUTIONS & SERVICES'}</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 border border-slate-800">
            {service.solutions.filter((s: any) => t(s.title)).map((sol: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-dazz-navy p-10 lg:p-16 group hover:bg-[#0f1f3a] transition-colors"
                dir={dir}
              >
                <div className="mb-8">
                  {sol.image ? (
                    <div className="w-20 h-20 relative overflow-hidden bg-slate-800">
                      <MediaRenderer media={sol.image} fill className="object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  ) : null}
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{t(sol.title)}</h3>
                <p className="text-slate-400 leading-relaxed font-light mb-8">{t(sol.description)}</p>
                {t(sol.ctaText) && (
                  <a href={sol.ctaUrl || '#'} className="inline-flex items-center gap-2 text-dazz-gold text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
                    {t(sol.ctaText)} <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderApplications = () => {
    if (!enabled('applications') || !service.applications?.length) return null;
    return (
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12" dir={dir}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-dazz-gold" />
              <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900">
                {isAr ? 'تطبيقاتنا' : 'OUR APPLICATIONS'}
              </h2>
            </div>
            <div className="w-24 h-[2px] bg-dazz-gold ml-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.applications.filter((a: any) => t(a.title)).map((app: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl overflow-hidden bg-[#0A192F] shadow-lg group border border-slate-200/20" 
                dir={dir}
              >
                <div className="relative w-full h-[280px] bg-slate-200 overflow-hidden">
                  {app.image && (
                    <MediaRenderer media={app.image} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
                </div>
                
                <div className="relative flex justify-center -mt-10 z-10">
                  <div className="w-20 h-20 rounded-full bg-[#0A192F] border-[3px] border-dazz-gold flex items-center justify-center shadow-xl">
                    <div className="text-white text-3xl font-light">
                      <Hexagon size={32} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 pb-6 px-4 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">
                    {t(app.title)}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderProcess = () => {
    if (!enabled('process') || !service.process?.length) return null;
    return (
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20" dir={dir}>
            <span className="text-xs font-mono text-dazz-gold block mb-4">05 / PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">{isAr ? 'آلية العمل' : 'HOW WE WORK'}</h2>
          </div>
          
          <div className="space-y-16 lg:space-y-0 relative">
            {service.process.filter((p: any) => t(p.title)).map((step: any, i: number) => {
              const isEven = i % 2 !== 0;
              return (
                <div key={i} className={`flex flex-col lg:flex-row items-center justify-between ${isEven ? (isAr ? 'lg:flex-row-reverse' : 'lg:flex-row') : (isAr ? 'lg:flex-row' : 'lg:flex-row-reverse')} w-full lg:min-h-[300px]`}>
                  <div className="w-full lg:w-[45%] mb-8 lg:mb-0">
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`text-left ${isEven ? 'lg:text-right' : 'lg:text-left'} bg-slate-800/50 p-8 border border-slate-700/50`}
                      dir={dir}
                    >
                      <div className="text-dazz-gold font-mono text-4xl font-light mb-4">
                        {(i + 1).toString().padStart(2, '0')}
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{t(step.title)}</h3>
                      <p className="text-slate-400 font-light leading-relaxed">{t(step.description)}</p>
                    </motion.div>
                  </div>
                  
                  <div className="hidden lg:flex w-[10%] justify-center items-center relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-4 h-4 bg-dazz-gold z-10" 
                    />
                  </div>
                  
                  <div className="w-full lg:w-[45%]">
                    {step.image && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-video bg-slate-800 overflow-hidden"
                      >
                        <MediaRenderer media={step.image} fill className="object-cover mix-blend-luminosity opacity-60 hover:opacity-100 hover:mix-blend-normal transition-all duration-700" />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  const renderEquipment = () => {
    if (!enabled('equipment') || !service.equipment?.length) return null;
    return (
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16" dir={dir}>
            <span className="text-xs font-mono text-slate-400 block mb-4">06 / TECHNICAL</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900">{isAr ? 'المعدات والمواصفات التقنية' : 'EQUIPMENT & SPECIFICATIONS'}</h2>
          </div>
          
          <div className="space-y-4">
            {service.equipment.filter((e: any) => t(e.title) || t(e.name)).map((eq: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-200 flex flex-col md:flex-row group" 
                dir={dir}
              >
                {eq.image && (
                  <div className="w-full md:w-[300px] h-64 md:h-auto relative bg-slate-100 overflow-hidden shrink-0">
                    <MediaRenderer media={eq.image} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 uppercase tracking-tight">{t(eq.name || eq.title)}</h3>
                  <p className="text-slate-600 font-light mb-6 leading-relaxed max-w-3xl">{t(eq.description)}</p>
                  
                  {t(eq.specification) && (
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Technical Specs</p>
                      <p className="font-mono text-sm text-slate-700 bg-slate-50 inline-block px-4 py-2 border border-slate-100">
                        {t(eq.specification)}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderWhyChooseUs = () => {
    if (!enabled('whyChooseUs') || !service.whyChooseUs?.length) return null;
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16" dir={dir}>
            <div className="md:w-1/3">
              <span className="text-xs font-mono text-slate-400 block mb-4">07</span>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900">{isAr ? 'لماذا تختارنا' : 'WHY CHOOSE US'}</h2>
            </div>
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {service.whyChooseUs.filter((w: any) => t(w.title)).map((item: any, i: number) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div className="text-dazz-gold font-mono text-sm mb-4">/ {(i + 1).toString().padStart(2, '0')}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-tight">{t(item.title)}</h3>
                    <p className="text-slate-600 font-light leading-relaxed">{t(item.description)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderHighlights = () => {
    if (!enabled('highlights') || !service.highlights?.length) return null;
    const items = service.highlights;
    const colClass = items.length === 2 ? 'md:grid-cols-2' : items.length === 3 ? 'md:grid-cols-3' : items.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-4';
    
    return (
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${colClass} gap-y-12 gap-x-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800`}>
            {items.filter((h: any) => t(h.title)).map((high: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`px-6 ${i === 0 ? 'sm:pl-0' : ''}`}
                dir={dir}
              >
                <p className="text-xs font-mono text-dazz-gold uppercase tracking-widest mb-2">{t(high.title)}</p>
                <p className="text-2xl text-white font-light tracking-tight">{t(high.description) || t(high.sub)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderGallery = () => {
    if (!enabled('gallery') || !service.gallery?.length) return null;
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16" dir={dir}>
            <span className="text-xs font-mono text-slate-400 block mb-4">08 / MEDIA</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900">{isAr ? 'معرض الصور' : 'PROJECT GALLERY'}</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {service.gallery.map((img: any, i: number) => {
              const isLarge = i === 0 || i === 5;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative overflow-hidden bg-slate-100 group ${isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                >
                  <MediaRenderer media={img.media} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  {t(img.caption) && (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium">{t(img.caption)}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  const renderCTA = () => {
    if (!enabled('cta')) return null;
    const cta = service.cta;
    return (
      <section className="relative py-32 bg-slate-900 text-white overflow-hidden flex items-center justify-center min-h-[50vh]">
        {cta?.backgroundImage && (
          <div className="absolute inset-0 z-0">
            <MediaRenderer media={cta.backgroundImage} fill className="object-cover opacity-30 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90" />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center" dir={dir}>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-[2px] bg-dazz-gold mb-8"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight leading-tight"
          >
            {t(cta?.title)}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl font-light text-slate-300 mb-10 max-w-2xl"
          >
            {t(cta?.description)}
          </motion.p>
          {t(cta?.buttonText) && (
            <motion.a 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              href={cta.buttonUrl || '#'} 
              className="inline-block px-10 py-5 bg-white text-slate-900 font-bold tracking-widest text-sm uppercase hover:bg-dazz-gold transition-colors"
            >
              {t(cta.buttonText)}
            </motion.a>
          )}
        </div>
      </section>
    );
  };

  const renderCategories = () => {
    if (!enabled('categories') || !service.categories?.length) return null;
    return (
      <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16" dir={dir}>
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-4">03b</span>
              <h2 className="text-3xl font-bold uppercase tracking-tight">{isAr ? 'المنتجات' : 'PRODUCTS & CATEGORIES'}</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {service.categories.filter((cat: any) => t(cat.title)).map((cat: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-50 p-10 lg:p-16 group hover:bg-white transition-colors"
                dir={dir}
              >
                <div className="mb-8">
                  {cat.image ? (
                    <div className="w-20 h-20 relative overflow-hidden bg-slate-200">
                      <MediaRenderer media={cat.image} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : null}
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-slate-900">{t(cat.title)}</h3>
                <p className="text-slate-600 leading-relaxed font-light mb-8">{t(cat.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderedSections = sections.map((key: string) => {
    switch (key) {
      case 'hero': return <React.Fragment key={key}>{renderHero()}</React.Fragment>;
      case 'introduction': return <React.Fragment key={key}>{renderIntro()}</React.Fragment>;
      case 'capabilities': return <React.Fragment key={key}>{renderCapabilities()}</React.Fragment>;
      case 'solutions': return <React.Fragment key={key}>{renderSolutions()}</React.Fragment>;
      case 'applications': return <React.Fragment key={key}>{renderApplications()}</React.Fragment>;
      case 'process': return <React.Fragment key={key}>{renderProcess()}</React.Fragment>;
      case 'equipment': return <React.Fragment key={key}>{renderEquipment()}</React.Fragment>;
      case 'whyChooseUs': return <React.Fragment key={key}>{renderWhyChooseUs()}</React.Fragment>;
      case 'categories': return <React.Fragment key={key}>{renderCategories()}</React.Fragment>;
      case 'highlights': return <React.Fragment key={key}>{renderHighlights()}</React.Fragment>;
      case 'gallery': return <React.Fragment key={key}>{renderGallery()}</React.Fragment>;
      case 'cta': return <React.Fragment key={key}>{renderCTA()}</React.Fragment>;
      default: return null;
    }
  });

  return (
    <main className="w-full bg-slate-900 selection:bg-dazz-gold selection:text-slate-900">
      {renderedSections}
    </main>
  );
}
