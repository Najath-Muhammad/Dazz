import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProjectDetailClient } from '@/components/projects/ProjectDetailClient';

async function getProject(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/projects/slug/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  if (!project) return {};

  const lang = resolvedParams.lang === 'ar' ? 'ar' : 'en';
  return {
    title: project.metaTitle?.[lang] || project.title?.[lang] || project.title?.en,
    description: project.metaDescription?.[lang] || project.description?.[lang]?.substring(0, 160) || project.description?.en?.substring(0, 160),
    openGraph: project.coverImage ? {
      images: [project.coverImage.url || project.coverImage]
    } : undefined
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  
  if (!project || !project.isPublished) {
    notFound();
  }

  const lang = resolvedParams.lang === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  return <ProjectDetailClient project={project} lang={lang} isAr={isAr} dir={dir} />;
}
