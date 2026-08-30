'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

interface ProjectDetailClientProps {
  project: any;
  lang: string;
  isAr: boolean;
  dir: 'ltr' | 'rtl';
}

export function ProjectDetailClient({ project, lang, isAr, dir }: ProjectDetailClientProps) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const stripEmojis = (str: string) => {
    if (!str || typeof str !== 'string') return str;
    return str.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
  };
  const t = (field: any) => stripEmojis(field?.[lang] || field?.en || '');

  const title = t(project.title);
  const category = t(project.category);
  const description = t(project.description);
  const location = t(project.location);
  const year = project.year;

  return (
    <main dir={dir} className="bg-white selection:bg-dazz-gold selection:text-slate-900">
      
      {/* Cinematic Hero */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden bg-slate-950">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <MediaRenderer media={project.coverImage} fill className="object-cover opacity-60 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
        </motion.div>

        {/* Back button */}
        <div className="absolute top-8 left-8 z-20">
          <Link href={`/${lang}/projects`} className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-dazz-gold group-hover:border-dazz-gold transition-colors">
              <ArrowLeft size={16} className={isAr ? 'rotate-180' : ''} />
            </div>
            <span className={`text-xs font-bold tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'العودة للمشاريع' : 'Back to Projects'}</span>
          </Link>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className={`flex items-center gap-4 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-[1px] bg-dazz-gold" />
              <p className={`text-dazz-gold font-mono text-sm tracking-widest uppercase ${isAr ? 'font-arabic uppercase-none' : ''}`}>
                {category}
              </p>
            </div>
            
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-tight mb-8 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Project Metadata & Description */}
      <section className="py-24 md:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Metadata Sidebar */}
            <div className="w-full lg:w-1/3 shrink-0">
              <div className="bg-white p-10 border border-slate-200 sticky top-32">
                <h3 className={`text-sm font-bold tracking-[0.2em] text-slate-400 mb-8 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>
                  {isAr ? 'تفاصيل المشروع' : 'PROJECT DETAILS'}
                </h3>
                
                <div className="space-y-6">
                  {category && (
                    <div className="flex items-start gap-4">
                      <Tag size={20} className="text-dazz-gold mt-1" />
                      <div>
                        <p className={`text-xs font-mono text-slate-400 tracking-widest mb-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'القطاع' : 'DIVISION'}</p>
                        <p className={`text-lg font-bold text-slate-900 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{category}</p>
                      </div>
                    </div>
                  )}
                  
                  {location && (
                    <div className="flex items-start gap-4 pt-6 border-t border-slate-100">
                      <MapPin size={20} className="text-dazz-gold mt-1" />
                      <div>
                        <p className={`text-xs font-mono text-slate-400 tracking-widest mb-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'الموقع' : 'LOCATION'}</p>
                        <p className={`text-lg font-bold text-slate-900 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{location}</p>
                      </div>
                    </div>
                  )}
                  
                  {year && (
                    <div className="flex items-start gap-4 pt-6 border-t border-slate-100">
                      <Calendar size={20} className="text-dazz-gold mt-1" />
                      <div>
                        <p className={`text-xs font-mono text-slate-400 tracking-widest mb-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'السنة' : 'YEAR'}</p>
                        <p className={`text-lg font-bold text-slate-900 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{year}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description Body */}
            <div className="w-full lg:w-2/3">
              <div className={`flex items-center gap-3 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-1.5 h-6 bg-dazz-navy" />
                <h2 className={`text-2xl md:text-3xl font-bold tracking-tight text-slate-900 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                  {isAr ? 'نظرة عامة' : 'PROJECT OVERVIEW'}
                </h2>
              </div>
              
              <div className={`prose prose-lg prose-slate max-w-none font-light leading-relaxed text-slate-600 ${isAr ? 'font-arabic text-right' : ''}`}>
                {/* Assuming description is plain text that might contain newlines */}
                {description.split('\n').map((para: string, idx: number) => (
                  <p key={idx} className="mb-6">{para}</p>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-1.5 h-6 bg-dazz-gold" />
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight text-white ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                {isAr ? 'معرض الصور' : 'GALLERY'}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {project.galleryImages.map((img: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="relative aspect-square md:aspect-[4/3] bg-slate-900 overflow-hidden group"
              >
                <MediaRenderer 
                  media={img} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-white text-center border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tighter text-slate-900 mb-6 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
            {isAr ? 'ناقش مشروعك القادم' : 'DISCUSS YOUR NEXT PROJECT'}
          </h2>
          <p className={`text-lg md:text-xl text-slate-500 font-light mb-10 max-w-2xl mx-auto ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'خبراؤنا مستعدون لتحويل رؤيتك إلى واقع ملموس بدقة صناعية.' 
              : 'Our experts are ready to turn your vision into reality with industrial precision.'}
          </p>
          <Link 
            href={`/${lang}/contact`}
            className={`inline-block px-10 py-5 bg-slate-950 text-white font-bold tracking-widest text-sm hover:bg-dazz-gold transition-colors ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}
          >
            {isAr ? 'تواصل معنا' : 'CONTACT US'}
          </Link>
        </div>
      </section>

    </main>
  );
}
