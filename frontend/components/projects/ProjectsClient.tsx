'use client';
import React, { useState, useMemo } from 'react';
import { ProjectsFilter } from './ProjectsFilter';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/Button';

interface ProjectsClientProps {
  projects: any[];
  lang: string;
  isAr: boolean;
  dir: string;
}

export function ProjectsClient({ projects, lang, isAr, dir }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(isAr ? 'الكل' : 'ALL');

  // Extract unique categories based on the current language
  const categories = useMemo(() => {
    const defaultAll = isAr ? 'الكل' : 'ALL';
    const cats = new Set<string>();
    cats.add(defaultAll);
    
    projects.forEach(p => {
      const catName = p.category?.[lang];
      if (catName) {
        cats.add(catName.toUpperCase());
      }
    });
    
    return Array.from(cats);
  }, [projects, lang, isAr]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    const defaultAll = isAr ? 'الكل' : 'ALL';
    if (activeCategory === defaultAll) return projects;
    
    return projects.filter(p => {
      const catName = p.category?.[lang];
      return catName && catName.toUpperCase() === activeCategory;
    });
  }, [projects, activeCategory, lang, isAr]);

  return (
    <div dir={dir} className="bg-white">
      <section className="py-24 max-w-[1400px] mx-auto px-6">
        
        <ProjectsFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          isAr={isAr}
        />

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-slate-500 font-light text-lg col-span-full py-12 ${isAr ? 'font-arabic' : ''}`}
              >
                {isAr ? 'لا توجد مشاريع متاحة في هذه الفئة حالياً.' : 'No projects available in this category at the moment.'}
              </motion.p>
            ) : (
              filteredProjects.map((p, index) => {
                // Every 4th project spans 2 columns on desktop to create a masonry/editorial feel
                const isLarge = index % 4 === 0;
                
                return (
                  <ProjectCard 
                    key={p._id}
                    title={p.title?.[lang] || p.title?.en || ''}
                    category={p.category?.[lang] || p.category?.en || ''}
                    imageUrl={p.coverImage}
                    slug={p.slug}
                    year={p.year}
                    location={p.location?.[lang] || p.location?.en}
                    index={index}
                    size={isLarge ? 'large' : 'normal'}
                    variant="cinematic"
                    lang={lang}
                    isAr={isAr}
                  />
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 mb-6 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {isAr ? 'ناقش مشروعك القادم' : 'DISCUSS YOUR NEXT PROJECT'}
            </h2>
            <p className={`text-lg md:text-xl text-slate-500 font-light mb-10 max-w-2xl mx-auto ${isAr ? 'font-arabic' : ''}`}>
              {isAr 
                ? 'خبراؤنا مستعدون لتحويل رؤيتك إلى واقع ملموس بدقة صناعية.' 
                : 'Our experts are ready to turn your vision into reality with industrial precision.'}
            </p>
            <Link href={`/${isAr ? 'ar' : 'en'}/contact`}>
              <Button variant="primary" className={`text-lg px-10 py-4 ${isAr ? 'font-arabic uppercase-none' : ''}`}>
                {isAr ? 'تواصل معنا' : 'CONTACT US'}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
