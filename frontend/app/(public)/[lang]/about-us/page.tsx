import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { MissionVision } from '@/components/about/MissionVision';
import { OurApproach } from '@/components/about/OurApproach';
import { AboutDivisions } from '@/components/about/AboutDivisions';
import { WhyDazz } from '@/components/about/WhyDazz';
import { CoreValues } from '@/components/about/CoreValues';
import { IndustrialExcellence } from '@/components/about/IndustrialExcellence';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us | Dazz Tradlink',
  description: 'DAZZ Contracting Company is a diversified Saudi-based company delivering integrated solutions across the construction, infrastructure, and industrial sectors.',
  alternates: { canonical: '/en/about-us' },
};

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

export default async function AboutUsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const settings = await getHeroSettings();
  const aboutHeader = settings?.pageHeaders?.about;
  
  let heroTitle = aboutHeader?.title;
  if (!heroTitle || (typeof heroTitle === 'string' && (heroTitle.toUpperCase().includes('EMPOWERING') || heroTitle.toUpperCase().includes('BUILDING EXCELLENCE')))) {
    heroTitle = isAr ? 'بناء التميز.\nخلق تأثير.' : 'BUILDING EXCELLENCE.\nCREATING IMPACT.';
  } else if (typeof heroTitle === 'object') {
    heroTitle = isAr ? (heroTitle.ar || heroTitle.en) : heroTitle.en;
  }

  let heroSubtitle = aboutHeader?.subtitle;
  if (!heroSubtitle || (typeof heroSubtitle === 'string' && heroSubtitle.startsWith('Designed to meet'))) {
    heroSubtitle = isAr 
      ? 'مصمم لتلبية الاحتياجات التشغيلية للبيئات الصناعية.' 
      : 'Designed to meet the operational needs of industrial environments.';
  } else if (typeof heroSubtitle === 'object') {
    heroSubtitle = isAr ? (heroSubtitle.ar || heroSubtitle.en) : heroSubtitle.en;
  }
  
  const rawBg = aboutHeader?.media;
  const heroImage = rawBg?.url || (typeof rawBg === 'string' && rawBg !== '' ? rawBg : '/images/about-hero.png');

  const mvSettings = settings?.aboutUsPage?.missionVision;
  const showMissionVision = mvSettings?.enabled !== false; // defaults to true

  return (
    <div dir={dir} className="bg-slate-950 font-sans">
      <AboutHero title={heroTitle} subtitle={heroSubtitle} media={heroImage} isAr={isAr} />
      <WhoWeAre isAr={isAr} />
      {showMissionVision && (
        <MissionVision isAr={isAr} mission={mvSettings?.mission} vision={mvSettings?.vision} />
      )}
      <OurApproach isAr={isAr} />
      <AboutDivisions isAr={isAr} />
      <WhyDazz isAr={isAr} />
      <CoreValues isAr={isAr} />
      <IndustrialExcellence isAr={isAr} />
      <AboutCTA isAr={isAr} />
    </div>
  );
}
