import React from 'react';
import Link from 'next/link';
import { MediaRenderer } from './MediaRenderer';

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: any;
  slug: string;
}

export function ProjectCard({ title, category, imageUrl, slug }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block relative overflow-hidden bg-slate-900 aspect-[4/3]">
      <MediaRenderer
        media={imageUrl}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
      </div>
    </Link>
  );
}
