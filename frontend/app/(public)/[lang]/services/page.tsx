import { Metadata } from 'next';
import { ServicesListingClient } from '@/components/public/ServicesListingClient';

export const metadata: Metadata = {
  title: 'Our Services | Dazz Tradelink',
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

export default async function ServicesListingPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const services = await getServices();
  const settings = await getHeroSettings();
  
  const servicesHeader = settings?.pageHeaders?.services;
  
  const heroTitle = servicesHeader?.title || (isAr ? 'خدماتنا' : 'OUR DIVISIONS & SERVICES');
  const heroSubtitle = servicesHeader?.subtitle || (isAr ? 'استكشف مجموعتنا الشاملة من الخدمات المتخصصة.' : 'Explore our comprehensive range of specialized services.');
  
  const rawBg = servicesHeader?.media;
  let heroImage = '/images/service-hero.png';
  if (rawBg?.url) {
    heroImage = rawBg.url;
  } else if (typeof rawBg === 'string' && rawBg !== '') {
    heroImage = rawBg;
  }

  return (
    <ServicesListingClient 
      services={services}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      heroImage={heroImage}
      lang={lang}
      isAr={isAr}
      dir={dir}
    />
  );
}