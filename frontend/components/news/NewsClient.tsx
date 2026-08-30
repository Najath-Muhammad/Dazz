'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: { en: string; ar?: string };
  slug: string;
  excerpt?: { en: string; ar?: string };
  coverImage?: { url: string } | string;
  publishedAt?: string;
  createdAt?: string;
  author?: string;
  category?: { en: string; ar?: string };
  featured?: boolean;
}

interface NewsClientProps {
  blogs: BlogPost[];
  lang: string;
  isAr: boolean;
  dir: 'ltr' | 'rtl';
}

export function NewsClient({ blogs, lang, isAr, dir }: NewsClientProps) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const getImageUrl = (post: BlogPost) => {
    if (!post.coverImage) return '';
    if (typeof post.coverImage === 'string') return post.coverImage;
    return post.coverImage?.url || '';
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Find featured post
  const featuredPost = blogs.find(b => b.featured) || blogs[0];
  const remainingPosts = blogs.filter(b => b._id !== featuredPost?._id);

  // Filter remaining posts
  const filteredPosts = activeCategory === 'ALL' 
    ? remainingPosts 
    : remainingPosts.filter(b => b.category?.en?.toUpperCase() === activeCategory);

  const categories = ['ALL', 'COMPANY NEWS', 'CONSTRUCTION', 'FOOD TRADING', 'LOGISTICS', 'HOSPITALITY'];

  return (
    <div className="bg-white">
      {/* Featured Article Section */}
      {featuredPost && (
        <section className="py-24 max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group block relative w-full h-[600px] md:h-[700px] bg-slate-100 overflow-hidden"
          >
            <Link href={`/${lang}/news/${featuredPost.slug}`} className="absolute inset-0 z-20">
              <span className="sr-only">Read {featuredPost.title?.en}</span>
            </Link>
            
            {getImageUrl(featuredPost) && (
              <MediaRenderer
                media={getImageUrl(featuredPost)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dazz-navy via-dazz-navy/40 to-transparent pointer-events-none" />

            <div className={`absolute bottom-0 ${isAr ? 'right-0' : 'left-0'} p-8 md:p-16 w-full md:w-2/3 lg:w-1/2 flex flex-col items-start gap-4 z-10`}>
              <div className="flex items-center gap-4">
                <span className={`bg-dazz-gold text-slate-900 text-[10px] font-bold tracking-widest px-3 py-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                  {isAr ? 'مقال مميز' : 'Featured Article'}
                </span>
                <span className="text-white/70 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                  <Clock size={12} />
                  {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                </span>
              </div>
              
              <h2 className={`text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight group-hover:text-dazz-gold transition-colors duration-500 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                {isAr ? (featuredPost.title?.ar || featuredPost.title?.en) : featuredPost.title?.en}
              </h2>
              
              <p className={`text-white/80 text-lg line-clamp-2 md:line-clamp-3 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                {isAr ? (featuredPost.excerpt?.ar || featuredPost.excerpt?.en) : featuredPost.excerpt?.en}
              </p>

              <div className={`mt-4 flex items-center gap-3 text-sm font-bold tracking-widest text-white group-hover:text-dazz-gold transition-colors ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                {isAr ? 'اقرأ المقال' : 'Read Article'}
                <ArrowRight size={16} className={`transition-transform duration-300 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Filter & Grid Section */}
      <section className="py-12 max-w-[1400px] mx-auto px-6 border-t border-slate-200">
        
        {/* Filter Bar */}
        <div className={`flex flex-wrap items-center gap-4 md:gap-8 mb-16 ${isAr ? 'flex-row-reverse' : ''}`}>
          <span className={`text-xs font-bold text-slate-400 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
            {isAr ? 'تصفية حسب:' : 'Filter by:'}
          </span>
          <div className={`flex flex-wrap gap-2 md:gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs md:text-sm font-bold tracking-widest px-4 py-2 transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-dazz-navy text-white' 
                    : 'text-slate-500 hover:text-dazz-navy hover:bg-slate-100'
                } ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}
              >
                {/* Need to translate category name but let's just stick to uppercase if not ar */}
                {isAr && cat === 'ALL' ? 'الكل' : (isAr && cat === 'COMPANY NEWS' ? 'أخبار الشركة' : cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-32 text-center border border-slate-100 bg-slate-50">
            <p className={`text-slate-500 font-medium ${isAr ? 'font-arabic' : ''}`}>
              {isAr ? 'لا توجد مقالات تطابق هذا الفلتر.' : 'No articles found for this category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16">
            {filteredPosts.map((post, i) => {
              // Asymmetrical layout: First post takes 7 cols, next takes 5, then standard 4 cols
              let colSpan = 'md:col-span-4';
              if (i === 0) colSpan = 'md:col-span-7';
              else if (i === 1) colSpan = 'md:col-span-5';

              return (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`${colSpan} group flex flex-col h-full`}
                >
                  <Link href={`/${lang}/news/${post.slug}`} className="block relative overflow-hidden bg-slate-100 mb-6 aspect-[4/3] md:aspect-auto md:h-[400px]">
                    {getImageUrl(post) ? (
                      <MediaRenderer
                        media={getImageUrl(post)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-200" />
                    )}
                    <div className="absolute inset-0 bg-dazz-navy/0 group-hover:bg-dazz-navy/10 transition-colors duration-500" />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className={`flex items-center gap-4 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      {post.category?.en && (
                        <span className={`text-[10px] font-bold tracking-widest text-dazz-gold ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                          {isAr ? (post.category.ar || post.category.en) : post.category.en}
                        </span>
                      )}
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>

                    <h3 className={`text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-dazz-navy transition-colors leading-tight mb-4 ${isAr ? 'font-arabic text-right uppercase-none' : 'uppercase'}`}>
                      <Link href={`/${lang}/news/${post.slug}`}>
                        {isAr ? (post.title?.ar || post.title?.en) : post.title?.en}
                      </Link>
                    </h3>

                    <p className={`text-slate-500 font-light leading-relaxed line-clamp-3 mb-6 ${isAr ? 'font-arabic text-right' : ''}`}>
                      {isAr ? (post.excerpt?.ar || post.excerpt?.en) : post.excerpt?.en}
                    </p>

                    <Link 
                      href={`/${lang}/news/${post.slug}`}
                      className={`mt-auto flex items-center gap-2 text-xs font-bold tracking-widest text-slate-900 group-hover:text-dazz-gold transition-colors w-fit ${isAr ? 'flex-row-reverse ml-auto font-arabic uppercase-none' : 'uppercase'}`}
                    >
                      {isAr ? 'اقرأ المقال' : 'Read Article'}
                      <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
