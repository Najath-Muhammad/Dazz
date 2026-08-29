'use client';
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ArrowRight, Hexagon } from 'lucide-react';

interface Props {
  services: any[];
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  lang: string;
  isAr: boolean;
  dir: 'ltr' | 'rtl';
}

export function ServicesListingClient({ services, heroTitle, heroSubtitle, heroImage, lang, isAr, dir }: Props) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: isAr ? 'الكل' : 'All Divisions' },
    { id: 'construction', label: isAr ? 'المقاولات' : 'Construction' },
    { id: 'food-trading', label: isAr ? 'تجارة الأغذية' : 'Food Trading' },
    { id: 'logistics', label: isAr ? 'الخدمات اللوجستية' : 'Logistics' },
    { id: 'hospitality', label: isAr ? 'الضيافة' : 'Hospitality' },
    { id: 'other', label: isAr ? 'أخرى' : 'Other' }
  ];

  const availableCategoryIds = new Set(services.map(s => s.category));
  const activeTabs = categories.filter(c => c.id === 'all' || availableCategoryIds.has(c.id));

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const stripEmojis = (str: string) => {
    if (!str || typeof str !== 'string') return str;
    return str.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
  };

  const t = (field: any) => stripEmojis(field?.[lang] || field?.en || '');

  return (
    <div className="bg-white min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end justify-center overflow-hidden bg-dazz-navy">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <MediaRenderer media={heroImage} fill className="object-cover opacity-40 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-dazz-navy via-dazz-navy/60 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32" dir={dir}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-dazz-gold" />
              <p className="text-dazz-gold font-mono text-sm tracking-widest uppercase">
                {isAr ? 'الخدمات والأقسام' : 'DIVISIONS & SERVICES'}
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-tighter leading-[1.1] mb-8">
              {heroTitle}
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-slate-300 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full h-1/2 bg-dazz-gold"
              animate={{ top: ['-50%', '150%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-6" dir={dir}>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-dazz-gold" />
            <h2 className="text-3xl font-bold uppercase tracking-tight text-slate-900">
              {isAr ? 'مجالات خبرتنا' : 'AREAS OF EXPERTISE'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-slate-200 pb-4">
            {activeTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`text-sm font-bold uppercase tracking-widest px-4 py-2 transition-all ${
                  activeCategory === tab.id 
                    ? 'text-dazz-gold border-b-2 border-dazz-gold -mb-[18px]' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center text-slate-500 py-24 border border-slate-200 rounded-lg">
              {isAr ? 'لا توجد خدمات متاحة حاليا.' : 'No services are currently available.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredServices.map((svc: any, i: number) => {
                const title = t(svc.name);
                const desc = t(svc.shortDescription);
                const image = svc.hero?.media || '';
                
                return (
                  <Link key={svc._id} href={`/${lang}/services/${svc.slug}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: i % 2 === 0 ? 0 : 0.1 }}
                      className="group flex flex-col h-[450px] rounded-xl overflow-hidden bg-white border border-slate-200 hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative w-full h-[250px] bg-slate-100 overflow-hidden">
                        {image ? (
                          <MediaRenderer media={image} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                            <Hexagon size={48} className="text-slate-400" strokeWidth={1} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold uppercase tracking-tight text-slate-900 mb-4 group-hover:text-dazz-gold transition-colors">
                            {title}
                          </h3>
                          <p className="text-slate-600 font-light line-clamp-3 leading-relaxed">
                            {desc}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-slate-400 group-hover:text-dazz-navy transition-colors mt-6 uppercase">
                          {isAr ? 'عرض التفاصيل' : 'EXPLORE SERVICE'} 
                          <ArrowRight size={16} className={`transition-transform duration-300 group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
