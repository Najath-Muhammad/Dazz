import { Metadata } from 'next';
import { CinematicHero } from '@/components/home/CinematicHero';
import { ShortAboutSection } from '@/components/home/ShortAboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { WhyDazzSection } from '@/components/home/WhyDazzSection';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { LatestBlogSection } from '@/components/home/LatestBlogSection';
import { ContactCTASection } from '@/components/home/ContactCTASection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dazz Tradlink International — Integrated Solutions, Trusted Partner',
  description: 'Dazz Tradlink delivers excellence across construction, food trading, logistics, and hospitality with industrial precision and corporate integrity across Saudi Arabia.',
};

async function getSiteSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/settings`, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) return json.data[0];
    return null;
  } catch { return null; }
}

async function getProjects() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/projects?status=published&limit=6`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch { return []; }
}

async function getBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/blogs?status=published&limit=3`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch { return []; }
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  
  const [settings, projects, blogs] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getBlogs(),
  ]);

  const isAr = resolvedParams.lang === 'ar';
  const homeHeader = settings?.pageHeaders?.home;

  let heroTitle = homeHeader?.title || settings?.heroTitle;
  if (typeof heroTitle === 'object' && heroTitle !== null) {
    heroTitle = isAr ? (heroTitle.ar || heroTitle.en) : heroTitle.en;
  }
  if (!heroTitle || (typeof heroTitle === 'string' && (heroTitle.toUpperCase().includes('DAZZ TRADLINK') || heroTitle.includes('Building Solutions')))) {
    heroTitle = isAr ? 'نبني الحلول،\nنبني الثقة' : 'Building Solutions,\nBuilding Trust';
  }

  let heroSubtitle = homeHeader?.subtitle || settings?.heroSubtitle;
  if (typeof heroSubtitle === 'object' && heroSubtitle !== null) {
    heroSubtitle = isAr ? (heroSubtitle.ar || heroSubtitle.en) : heroSubtitle.en;
  }
  if (!heroSubtitle || (typeof heroSubtitle === 'string' && (heroSubtitle.startsWith('Empowering') || heroSubtitle.includes('Your leading partner')))) {
    heroSubtitle = isAr 
      ? 'شريكك الرائد للحلول الشاملة في مجال البناء والتجارة والصناعة في جميع أنحاء المملكة العربية السعودية.' 
      : 'Your leading partner for comprehensive construction, trading, and industrial solutions across Saudi Arabia.';
  }

  const rawBg = homeHeader?.media || settings?.heroBackgroundImage;
  let heroBg = 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg';
  
  if (rawBg?.url) {
    heroBg = rawBg.url;
  } else if (typeof rawBg === 'string' && rawBg !== '') {
    heroBg = rawBg;
  }

  const aboutImage = settings?.heroBackgroundImage || null;

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      {/* 1. Hero */}
      <CinematicHero title={heroTitle || ''} subtitle={heroSubtitle || ''} backgroundImage={heroBg} isAr={isAr} />

      {/* 2. Short About Us */}
      <ShortAboutSection image={aboutImage} isAr={isAr} />

      {/* 3. Our Divisions */}
      <DivisionsSection isAr={isAr} />

      {/* 4. Why Dazz / Key Strengths */}
      <WhyDazzSection isAr={isAr} />

      {/* 5. Featured Projects */}
      <FeaturedProjectsSection projects={projects} isAr={isAr} />

      {/* 6. Latest News / Blog */}
      <LatestBlogSection posts={blogs} isAr={isAr} />

      {/* 7. Final Contact CTA */}
      <ContactCTASection isAr={isAr} />
    </div>
  );
}
