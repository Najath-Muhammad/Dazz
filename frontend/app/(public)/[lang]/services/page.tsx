import { Metadata } from 'next';
import { Suspense } from 'react';
import { ServicesListingClient } from '@/components/public/ServicesListingClient';

export const metadata: Metadata = {
  title: 'Our Services | Dazz Tradlink',
  description: 'Explore our specialized divisions and services.',
  alternates: { canonical: '/en/services' },
};

async function getServices() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}

async function getHeroSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) return json.data[0];
    return null;
  } catch (error) {
    return null;
  }
}

export default async function ServicesListingPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const services = await getServices();
  const settings = await getHeroSettings();
  
  const servicesHeader = settings?.pageHeaders?.services;
  
  let heroTitle = servicesHeader?.title;
  if (!heroTitle || (typeof heroTitle === 'string' && heroTitle.toUpperCase().includes('SERVICES'))) {
    heroTitle = isAr ? 'خدماتنا' : 'OUR SERVICES';
  } else if (typeof heroTitle === 'object') {
    heroTitle = isAr ? (heroTitle.ar || heroTitle.en) : heroTitle.en;
  }

  let heroSubtitle = servicesHeader?.subtitle;
  if (!heroSubtitle || (typeof heroSubtitle === 'string' && heroSubtitle.startsWith('Delivering Quality'))) {
    heroSubtitle = isAr 
      ? 'تقديم حلول عالية الجودة في البناء والصناعة.' 
      : 'Delivering Quality Solutions Across Construction and Industry';
  } else if (typeof heroSubtitle === 'object') {
    heroSubtitle = isAr ? (heroSubtitle.ar || heroSubtitle.en) : heroSubtitle.en;
  }
  
  const rawBg = servicesHeader?.media;
  const heroImage = rawBg?.url || (typeof rawBg === 'string' && rawBg !== '' ? rawBg : '/images/service-hero.png');

  return (
    <Suspense fallback={<div className="min-h-screen bg-dazz-navy" />}>
      <ServicesListingClient 
        services={services}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroImage={heroImage}
        lang={lang}
        isAr={isAr}
        dir={dir}
      />
    </Suspense>
  );
}