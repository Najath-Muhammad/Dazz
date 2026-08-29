import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { WhoWeAre } from '@/components/about/WhoWeAre';
import { OurApproach } from '@/components/about/OurApproach';
import { AboutDivisions } from '@/components/about/AboutDivisions';
import { WhyDazz } from '@/components/about/WhyDazz';
import { CoreValues } from '@/components/about/CoreValues';
import { IndustrialExcellence } from '@/components/about/IndustrialExcellence';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us | Dazz Tradelink',
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

export default async function AboutUsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const settings = await getHeroSettings();
  const aboutHeader = settings?.pageHeaders?.about;
  
  const heroTitle = aboutHeader?.title || (isAr ? 'تمكين\nالامتياز الصناعي.' : 'EMPOWERING\nINDUSTRIAL\nEXCELLENCE.');
  const heroSubtitle = aboutHeader?.subtitle || (isAr ? 'مصمم لتلبية الاحتياجات التشغيلية للبيئات الصناعية.' : 'Designed to meet the operational needs of industrial environments.');
  
  const rawBg = aboutHeader?.media;
  let heroImage = 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg';
  if (rawBg?.url) {
    heroImage = rawBg.url;
  } else if (typeof rawBg === 'string' && rawBg !== '') {
    heroImage = rawBg;
  }

  return (
    <div dir={dir} className="bg-slate-950 font-sans">
      <AboutHero title={heroTitle} subtitle={heroSubtitle} media={heroImage} isAr={isAr} />
      <WhoWeAre isAr={isAr} />
      <OurApproach isAr={isAr} />
      <AboutDivisions isAr={isAr} />
      <WhyDazz isAr={isAr} />
      <CoreValues isAr={isAr} />
      <IndustrialExcellence isAr={isAr} />
      <AboutCTA isAr={isAr} />
    </div>
  );
}
