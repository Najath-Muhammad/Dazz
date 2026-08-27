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

async function getPageData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/content/services`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    return null;
  }
}

export default async function ServicesListingPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const services = await getServices();
  const pageData = await getPageData();
  
  const content = pageData?.content || {};
  const heroTitle = pageData?.title?.[lang] || (isAr ? 'خدماتنا' : 'OUR DIVISIONS & SERVICES');
  const heroSubtitle = content.heroSubtitle?.[lang] || (isAr ? 'استكشف مجموعتنا الشاملة من الخدمات المتخصصة.' : 'Explore our comprehensive range of specialized services.');
  const heroImage = content.heroImage || 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg';

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