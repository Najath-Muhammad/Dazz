import React from 'react';
import Link from 'next/link';
import { MediaRenderer } from './MediaRenderer';

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: any;
  date: string;
  slug: string;
}

export function BlogCard({ title, excerpt, imageUrl, date, slug }: BlogCardProps) {
  return (
    <article className="flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/news/${slug}`} className="relative h-56 w-full overflow-hidden block">
        <MediaRenderer
          media={imageUrl}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-6 flex-1 flex flex-col">
        <time dateTime={date} className="text-sm text-amber-600 font-medium mb-3 block">
          {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </time>
        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-amber-600 transition-colors">
          <Link href={`/news/${slug}`}>{title}</Link>
        </h3>
        <p className="text-slate-600 mb-6 line-clamp-3 flex-1">{excerpt}</p>
        <Link 
          href={`/news/${slug}`}
          className="text-sm font-semibold text-slate-900 hover:text-amber-600 uppercase tracking-wider inline-flex items-center transition-colors mt-auto"
        >
          Read Article
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
