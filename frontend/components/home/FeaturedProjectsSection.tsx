'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ArrowRight } from 'lucide-react';

interface Project {
  _id: string;
  title: { en: string; ar?: string };
  slug: string;
  coverImage?: { url: string } | string;
  location?: { en: string; ar?: string };
  description?: { en: string };
}

export function FeaturedProjectsSection({ projects, isAr }: { projects: Project[]; isAr?: boolean }) {
  const displayed = projects.slice(0, 5);

  const getImageUrl = (p: Project) => {
    if (!p.coverImage) return '';
    if (typeof p.coverImage === 'string') return p.coverImage;
    return p.coverImage?.url || '';
  };

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden" aria-labelledby="projects-heading">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-dazz-navy" />
              <span className="text-dazz-navy font-mono text-[10px] tracking-[0.3em] uppercase">
                {isAr ? 'محفظة الأعمال' : 'Portfolio'}
              </span>
            </div>
            <h2 id="projects-heading" className={`text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-900 ${isAr ? 'font-arabic text-4xl md:text-5xl' : 'uppercase'}`}>
              {isAr ? (
                <>مشاريع<br />متميزة</>
              ) : (
                <>FEATURED<br />PROJECTS</>
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
              href={isAr ? '/ar/projects' : '/projects'}
              className={`group flex items-center gap-3 text-sm font-bold tracking-widest text-slate-400 hover:text-dazz-navy transition-colors ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}
            >
              {isAr ? 'عرض جميع المشاريع' : 'View All Projects'}
              <ArrowRight size={16} className={`transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </Link>
          </motion.div>
        </div>

        {/* Projects */}
        {displayed.length === 0 ? (
          <div className="text-center py-24 text-slate-400 border border-slate-100">
            {isAr ? 'المشاريع قريباً.' : 'Projects coming soon.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large featured first project */}
            {displayed[0] && (
              <motion.div
                className="md:col-span-7"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Link href={`/projects/${displayed[0].slug}`} className="group block relative h-[480px] overflow-hidden bg-slate-100">
                  {getImageUrl(displayed[0]) && (
                    <MediaRenderer
                      media={getImageUrl(displayed[0])}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <p className="text-xs font-mono text-dazz-gold tracking-widest mb-2">
                      {isAr ? (displayed[0].location?.ar || displayed[0].location?.en || 'المملكة العربية السعودية') : (displayed[0].location?.en || 'Saudi Arabia')}
                    </p>
                    <h3 className={`text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-dazz-gold transition-colors ${isAr ? 'font-arabic' : 'uppercase'}`}>
                      {isAr ? (displayed[0].title?.ar || displayed[0].title?.en) : displayed[0].title?.en}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Right side: smaller projects */}
            <div className="md:col-span-5 grid grid-rows-2 gap-4">
              {displayed.slice(1, 3).map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block relative h-[228px] overflow-hidden bg-slate-100">
                    {getImageUrl(project) && (
                      <MediaRenderer
                        media={getImageUrl(project)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className={`text-lg font-extrabold text-white tracking-tight group-hover:text-dazz-gold transition-colors ${isAr ? 'font-arabic' : 'uppercase'}`}>
                        {isAr ? (project.title?.ar || project.title?.en) : project.title?.en}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom row small projects */}
            {displayed.slice(3).map((project, i) => (
              <motion.div
                key={project._id}
                className="md:col-span-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * (i + 3) }}
              >
                <Link href={`/projects/${project.slug}`} className="group block relative h-[220px] overflow-hidden bg-slate-100">
                  {getImageUrl(project) && (
                    <MediaRenderer
                      media={getImageUrl(project)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className={`text-base font-extrabold text-white tracking-tight group-hover:text-dazz-gold transition-colors ${isAr ? 'font-arabic' : 'uppercase'}`}>
                      {isAr ? (project.title?.ar || project.title?.en) : project.title?.en}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
