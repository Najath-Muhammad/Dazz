import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ServicePresentation } from '@/components/public/ServicePresentation';

async function getService(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const res = await fetch(`${apiUrl}/services/slug/${slug}`, {
    next: { revalidate: 60 } // revalidate every minute
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);
  if (!service) return {};

  const lang = resolvedParams.lang === 'ar' ? 'ar' : 'en';
  return {
    title: service.seo?.title?.[lang] || service.name?.[lang] || service.name?.en,
    description: service.seo?.description?.[lang] || service.shortDescription?.[lang] || service.shortDescription?.en,
    openGraph: service.seo?.ogImage ? {
      images: [service.seo.ogImage.url || service.seo.ogImage]
    } : undefined
  };
}

export default async function UniversalServicePage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);
  
  if (!service || service.status !== 'published') {
    notFound();
  }

  const lang = resolvedParams.lang === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  return <ServicePresentation service={service} lang={lang} isAr={isAr} dir={dir} />;
}
