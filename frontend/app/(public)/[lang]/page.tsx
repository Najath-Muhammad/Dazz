import { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { ShortAboutSection } from '@/components/home/ShortAboutSection';
import { DivisionsList } from '@/components/ui/DivisionsList';
import { WhyDazzSection } from '@/components/home/WhyDazzSection';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
import { LatestBlogSection } from '@/components/home/LatestBlogSection';
import { CallToAction } from '@/components/ui/CallToAction';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dazz Tradlink International — Integrated Solutions, Trusted Partner',
  description: 'Dazz Tradlink delivers excellence across construction, food trading, logistics, and hospitality with industrial precision and corporate integrity across Saudi Arabia.',
};

async function getSiteSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/settings`, { next: { revalidate: 120 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) return json.data[0];
    return null;
  } catch { return null; }
}

async function getProjects() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/projects?status=published&limit=6`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch { return []; }
}

async function getBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/blogs?status=published&limit=3`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
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
      <PageHero 
        variant="home"
        title={heroTitle || ''} 
        subtitle={heroSubtitle || ''} 
        media={heroBg} 
        isAr={isAr} 
      >
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 max-w-2xl">
          {[
            { num: '500+', label: isAr ? 'متخصص' : 'Specialists' },
            { num: '4', label: isAr ? 'قطاعات' : 'Divisions' },
            { num: '15+', label: isAr ? 'سنوات من الخبرة' : 'Years Active' },
          ].map((stat) => (
            <div key={stat.label} className={`group ${isAr ? 'text-right' : ''}`}>
              <p className={`text-4xl md:text-5xl font-extrabold text-white tracking-tighter group-hover:text-dazz-gold transition-colors ${isAr ? 'font-arabic' : ''}`}>{stat.num}</p>
              <p className={`text-[10px] md:text-xs font-mono mt-2 tracking-[0.2em] text-white/50 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* 2. Short About Us */}
      <ShortAboutSection image={aboutImage} isAr={isAr} />

      {/* 3. Our Divisions */}
      <DivisionsList isAr={isAr} variant="grid" />

      {/* 4. Why Dazz / Key Strengths */}
      <WhyDazzSection isAr={isAr} />

      {/* 5. Featured Projects */}
      <FeaturedProjectsSection projects={projects} isAr={isAr} />

      {/* 6. Latest News / Blog */}
      <LatestBlogSection posts={blogs} isAr={isAr} />

      {/* 7. Final Contact CTA */}
      <CallToAction 
        variant="dark"
        titleLine1={isAr ? 'نبني اليوم.' : 'BUILD TODAY.'}
        titleLine2={isAr ? 'نقود الغد.' : 'LEAD TOMORROW.'}
        description={isAr ? 'تواصل مع فريق خبرائنا اليوم لمناقشة كيف يمكن لداز تريدلينك تقديم قيمة ملموسة لأعمالك.' : 'Contact our team of experts today to discuss how Dazz Tradlink can deliver measurable value to your business.'}
        label={isAr ? 'جاهزون للشراكة' : 'Ready to Partner'}
        primaryButtonText={isAr ? 'اتصل بنا' : 'CONTACT US'}
        primaryButtonLink={isAr ? '/ar/contact' : '/contact'}
        secondaryButtonText={isAr ? 'خدماتنا' : 'OUR SERVICES'}
        secondaryButtonLink={isAr ? '/ar/services' : '/en/services'}
        isAr={isAr}
      />
    </div>
  );
}
