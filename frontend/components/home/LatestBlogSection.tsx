'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MediaRenderer } from '@/components/MediaRenderer';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: { en: string; ar?: string };
  slug: string;
  excerpt?: { en: string; ar?: string };
  coverImage?: { url: string } | string;
  publishedAt?: string;
  author?: string;
}

export function LatestBlogSection({ posts }: { posts: BlogPost[] }) {
  const displayed = posts.slice(0, 3);

  const getImageUrl = (post: BlogPost) => {
    if (!post.coverImage) return '';
    if (typeof post.coverImage === 'string') return post.coverImage;
    return post.coverImage?.url || '';
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden" aria-labelledby="blog-heading">
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
              <span className="text-dazz-navy font-mono text-[10px] tracking-[0.3em] uppercase">Insights</span>
            </div>
            <h2 id="blog-heading" className="text-5xl md:text-6xl font-extrabold uppercase tracking-tighter text-slate-900">
              LATEST<br />NEWS
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/news"
              className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-dazz-navy transition-colors"
            >
              View All Articles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Posts */}
        {displayed.length === 0 ? (
          <div className="text-center py-24 text-slate-400 border border-slate-200">
            Articles coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayed.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/news/${post.slug}`} className="group flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-200 mb-6">
                    {getImageUrl(post) ? (
                      <MediaRenderer
                        media={getImageUrl(post)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-200" />
                    )}
                    <div className="absolute inset-0 bg-dazz-navy/0 group-hover:bg-dazz-navy/10 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    {post.publishedAt && (
                      <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-3">
                        {formatDate(post.publishedAt)}
                      </p>
                    )}
                    <h3 className="text-xl font-extrabold uppercase tracking-tight text-slate-900 group-hover:text-dazz-navy transition-colors leading-tight mb-4">
                      {post.title?.en}
                    </h3>
                    {post.excerpt?.en && (
                      <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-2 mb-6">
                        {post.excerpt.en}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400 group-hover:text-dazz-navy transition-colors">
                      Read Article
                      <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-300" />
                    </div>
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
