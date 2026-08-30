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
  if (!heroTitle || typeof heroTitle === 'string' && heroTitle.toUpperCase() === 'DAZZ TRADLINK INTERNATIONAL') {
    heroTitle = isAr ? 'داز تريدلينك العالمية' : 'DAZZ TRADLINK INTERNATIONAL';
  } else if (typeof heroTitle === 'object') {
    heroTitle = isAr ? (heroTitle.ar || heroTitle.en) : heroTitle.en;
  }

  let heroSubtitle = homeHeader?.subtitle || settings?.heroSubtitle;
  if (!heroSubtitle || typeof heroSubtitle === 'string' && heroSubtitle.startsWith('Empowering')) {
    heroSubtitle = isAr 
      ? 'تمكين التميز الصناعي. تقديم حلول موثوقة في المقاولات، التجارة الغذائية، الخدمات اللوجستية، والضيافة.' 
      : 'Empowering Industrial Excellence. Delivering trusted solutions across construction, food trading, logistics, and hospitality.';
  } else if (typeof heroSubtitle === 'object') {
    heroSubtitle = isAr ? (heroSubtitle.ar || heroSubtitle.en) : heroSubtitle.en;
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
      <CinematicHero title={heroTitle || ''} subtitle={heroSubtitle || ''} backgroundImage={heroBg} />

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
