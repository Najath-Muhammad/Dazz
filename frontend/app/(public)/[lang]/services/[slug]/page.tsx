import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MediaRenderer } from '@/components/MediaRenderer';

async function getService(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const res = await fetch(`${apiUrl}/services/slug/${slug}`, {
    next: { revalidate: 60 } // revalidate every minute
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data; // assuming ApiResponse wrapper
}

export async function generateMetadata({ params }: { params: { lang: string, slug: string } }): Promise<Metadata> {
  const service = await getService(params.slug);
  if (!service) return {};

  const lang = params.lang === 'ar' ? 'ar' : 'en';
  return {
    title: service.seo?.title?.[lang] || service.name?.[lang] || service.name?.en,
    description: service.seo?.description?.[lang] || service.shortDescription?.[lang] || service.shortDescription?.en,
    openGraph: service.seo?.ogImage ? {
      images: [service.seo.ogImage.url || service.seo.ogImage]
    } : undefined
  };
}

export default async function UniversalServicePage({ params }: { params: { lang: string, slug: string } }) {
  const service = await getService(params.slug);
  
  if (!service || service.status !== 'published') {
    notFound();
  }

  const lang = params.lang === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const t = (field: any) => field?.[lang] || field?.en || '';

  // Render helpers
  const enabled = (section: string) => service.enabledSections.includes(section);
  
  const renderHero = () => {
    if (!enabled('hero')) return null;
    const hero = service.hero;
    return (
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MediaRenderer media={hero?.media} fill className="object-cover" />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full text-center text-white" dir={dir}>
          {t(hero?.eyebrow) && <p className="text-dazz-gold font-bold tracking-widest uppercase mb-4 text-sm md:text-base">{t(hero?.eyebrow)}</p>}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{t(hero?.title)}</h1>
          {t(hero?.subtitle) && <p className="text-xl md:text-2xl font-medium text-slate-200 mb-6">{t(hero?.subtitle)}</p>}
          {t(hero?.description) && <p className="max-w-2xl mx-auto text-slate-300 md:text-lg mb-8">{t(hero?.description)}</p>}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {t(hero?.ctaPrimary?.text) && (
              <a href={hero.ctaPrimary.url || '#'} className="px-8 py-4 bg-dazz-gold text-slate-900 font-bold rounded hover:bg-yellow-400 transition-colors">
                {t(hero.ctaPrimary.text)}
              </a>
            )}
            {t(hero?.ctaSecondary?.text) && (
              <a href={hero.ctaSecondary.url || '#'} className="px-8 py-4 border border-white text-white font-bold rounded hover:bg-white/10 transition-colors">
                {t(hero.ctaSecondary.text)}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderIntro = () => {
    if (!enabled('introduction')) return null;
    const intro = service.introduction;
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div dir={dir} className={isAr ? 'lg:order-2' : ''}>
              {t(intro?.sectionLabel) && <p className="text-dazz-gold font-bold uppercase tracking-widest mb-2">{t(intro.sectionLabel)}</p>}
              <h2 className="text-4xl font-bold text-slate-900 mb-6">{t(intro?.title)}</h2>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed font-medium">{t(intro?.mainDescription)}</p>
              {intro?.paragraphs?.map((p: any, i: number) => (
                <p key={i} className="text-slate-600 mb-4 leading-relaxed">{t(p)}</p>
              ))}
            </div>
            {intro?.image && (
              <div className={`relative h-[500px] rounded-lg overflow-hidden ${isAr ? 'lg:order-1' : ''}`}>
                <MediaRenderer media={intro.image} fill className="object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderCapabilities = () => {
    if (!enabled('capabilities') || !service.capabilities?.length) return null;
    return (
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" dir={dir}>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{isAr ? 'قدراتنا' : 'Our Capabilities'}</h2>
            <div className="w-24 h-1 bg-dazz-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.capabilities.map((cap: any, i: number) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group" dir={dir}>
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform origin-left">{cap.icon || '✅'}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t(cap.title)}</h3>
                <p className="text-slate-600 leading-relaxed">{t(cap.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderHighlights = () => {
    if (!enabled('highlights') || !service.highlights?.length) return null;
    return (
      <section className="py-16 bg-dazz-navy text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-700/50">
            {service.highlights.map((high: any, i: number) => (
              <div key={i} className="text-center px-4" dir={dir}>
                <div className="text-3xl mb-4">{high.icon || '⭐'}</div>
                <h4 className="text-xl font-bold text-dazz-gold mb-2">{t(high.title)}</h4>
                <p className="text-slate-300 text-sm">{t(high.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderGallery = () => {
    if (!enabled('gallery') || !service.gallery?.length) return null;
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" dir={dir}>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{isAr ? 'معرض الصور' : 'Gallery'}</h2>
            <div className="w-24 h-1 bg-dazz-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.gallery.map((item: any, i: number) => (
              <div key={i} className="relative h-64 group overflow-hidden rounded-lg">
                <MediaRenderer media={item.media} fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300 flex items-center justify-center">
                  {t(item.caption) && (
                    <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 text-center px-4" dir={dir}>
                      {t(item.caption)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderCTA = () => {
    if (!enabled('cta')) return null;
    const cta = service.cta;
    return (
      <section className="relative py-24 bg-dazz-navy text-white overflow-hidden">
        {cta?.backgroundImage && (
          <div className="absolute inset-0 opacity-20">
            <MediaRenderer media={cta.backgroundImage} fill className="object-cover" />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" dir={dir}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t(cta?.title)}</h2>
          <p className="text-xl text-slate-300 mb-10">{t(cta?.description)}</p>
          {t(cta?.buttonText) && (
            <a href={cta.buttonUrl || '#'} className="inline-block px-10 py-4 bg-dazz-gold text-slate-900 font-bold text-lg rounded hover:bg-yellow-400 transition-colors">
              {t(cta.buttonText)}
            </a>
          )}
        </div>
      </section>
    );
  };

  // Section Ordering logic
  const sections = service.sectionOrder || [];
  const renderedSections = sections.map((key: string) => {
    switch (key) {
      case 'hero': return <React.Fragment key={key}>{renderHero()}</React.Fragment>;
      case 'introduction': return <React.Fragment key={key}>{renderIntro()}</React.Fragment>;
      case 'capabilities': return <React.Fragment key={key}>{renderCapabilities()}</React.Fragment>;
      case 'highlights': return <React.Fragment key={key}>{renderHighlights()}</React.Fragment>;
      case 'gallery': return <React.Fragment key={key}>{renderGallery()}</React.Fragment>;
      case 'cta': return <React.Fragment key={key}>{renderCTA()}</React.Fragment>;
      default: return null;
    }
  });

  return (
    <main className="w-full">
      {renderedSections}
    </main>
  );
}
