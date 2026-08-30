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
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dazz Tradlink International',
    description: 'Dazz Tradlink delivers excellence across construction, food trading, logistics, and hospitality with industrial precision and corporate integrity.',
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Dazz Tradlink International' }],
  },
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

export default async function HomePage() {
  const [settings, projects, blogs] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getBlogs(),
  ]);

  const homeHeader = settings?.pageHeaders?.home;

  const heroTitleObj = homeHeader?.title || settings?.heroTitle;
  const heroTitle = typeof heroTitleObj === 'string' 
    ? heroTitleObj 
    : (heroTitleObj?.en || 'Building Solutions,\nBuilding Trust');

  const heroSubtitleObj = homeHeader?.subtitle || settings?.heroSubtitle;
  const heroSubtitle = typeof heroSubtitleObj === 'string'
    ? heroSubtitleObj
    : (heroSubtitleObj?.en || 'Your leading partner for comprehensive construction, trading, and industrial solutions across Saudi Arabia.');

  const rawBg = homeHeader?.media || settings?.heroBackgroundImage;
  let heroBg = 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg';
  
  if (rawBg?.url) {
    heroBg = rawBg.url;
  } else if (typeof rawBg === 'string' && rawBg !== '') {
    heroBg = rawBg;
  }

  const aboutImage = settings?.heroBackgroundImage || null;

  return (
    <>
      {/* 1. Hero */}
      <CinematicHero title={heroTitle} subtitle={heroSubtitle} backgroundImage={heroBg} isAr={false} />

      {/* 2. Short About Us */}
      <ShortAboutSection image={aboutImage} />

      {/* 3. Our Divisions */}
      <DivisionsSection />

      {/* 4. Why Dazz / Key Strengths */}
      <WhyDazzSection />

      {/* 5. Featured Projects */}
      <FeaturedProjectsSection projects={projects} />

      {/* 6. Latest News / Blog */}
      <LatestBlogSection posts={blogs} />

      {/* 7. Final Contact CTA */}
      <ContactCTASection />
    </>
  );
}
