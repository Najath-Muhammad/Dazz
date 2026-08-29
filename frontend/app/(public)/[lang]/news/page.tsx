import { Metadata } from 'next';
import { CinematicHero } from '@/components/home/CinematicHero';
import { NewsClient } from '@/components/news/NewsClient';

export const metadata: Metadata = {
  title: 'News & Insights | Dazz Tradlink',
  description: 'Latest insights, company news, and industry updates from Dazz Tradlink.',
};

async function getSiteSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && Array.isArray(json.data) && json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    return null;
  }
}

async function getBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
    const res = await fetch(`${apiUrl}/blogs?status=published&limit=50`, { cache: 'no-store' });
    if (!res.ok) {
      console.error('getBlogs failed with status:', res.status);
      return [];
    }
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error('getBlogs fetch error:', error);
    return [];
  }
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const [settings, blogs] = await Promise.all([
    getSiteSettings(),
    getBlogs()
  ]);

  const newsHeader = settings?.pageHeaders?.news;
  const heroTitle = newsHeader?.title || (isAr ? 'الأخبار\nوالرؤى' : 'NEWS &\nINSIGHTS');
  const heroSubtitle = newsHeader?.subtitle || (isAr ? 'أحدث الإنجازات وتحديثات الصناعة من شركة داز ترادلينك.' : 'Stay updated with our latest company milestones and industry perspectives.');
  
  const rawBg = newsHeader?.media;
  const heroImage = rawBg?.url || (typeof rawBg === 'string' && rawBg !== '' ? rawBg : '/images/about-hero.png');

  return (
    <main dir={dir} className="min-h-screen bg-white">
      <CinematicHero 
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage}
      />
      <NewsClient 
        blogs={blogs} 
        lang={lang} 
        isAr={isAr} 
        dir={dir} 
      />
    </main>
  );
}