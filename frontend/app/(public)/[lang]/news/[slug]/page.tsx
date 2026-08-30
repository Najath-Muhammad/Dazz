import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MediaRenderer } from '@/components/MediaRenderer';
import { BlockRenderer } from '@/components/news/BlockRenderer';
import { ArrowLeft, ArrowRight, Share2, Link2 } from 'lucide-react';

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    return null;
  }
}

async function getRelatedBlogs(category: string, currentId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs?status=published&limit=4`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    if (!json.success || !json.data) return [];
    
    // Filter out current and try to match category if possible
    const related = json.data.filter((b: SafeAny) => b.id !== currentId);
    return related.slice(0, 3);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogBySlug(resolvedParams.slug);
  if (!post) return {};

  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  
  return {
    title: `${isAr ? (post.metaTitle?.ar || post.title?.ar || post.title?.en) : (post.metaTitle?.en || post.title?.en)} | Dazz Tradlink`,
    description: isAr ? (post.metaDescription?.ar || post.excerpt?.ar || post.excerpt?.en) : (post.metaDescription?.en || post.excerpt?.en),
    openGraph: {
      title: isAr ? (post.title?.ar || post.title?.en) : post.title?.en,
      images: post.coverImage ? [{ url: typeof post.coverImage === 'string' ? post.coverImage : post.coverImage.url }] : [],
    }
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const resolvedParams = await params;
  const post = await getBlogBySlug(resolvedParams.slug);
  if (!post) return notFound();

  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const relatedPosts = await getRelatedBlogs(post.category?.en, post.id);

  const heroImage = typeof post.coverImage === 'string' ? post.coverImage : (post.coverImage?.url || 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg');
  
  const title = isAr ? (post.title?.ar || post.title?.en) : post.title?.en;
  const category = isAr ? (post.category?.ar || post.category?.en) : post.category?.en;
  const content = isAr ? (post.content?.ar || post.content?.en) : post.content?.en;
  const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main dir={dir} className="min-h-screen bg-white selection:bg-dazz-gold selection:text-slate-900">
      
      {/* Article Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-end justify-center bg-slate-900">
        <MediaRenderer media={heroImage} fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 md:pb-24 text-center flex flex-col items-center">
          {category && (
            <span className={`bg-dazz-gold text-slate-900 text-xs font-bold tracking-widest px-4 py-1.5 mb-6 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {category}
            </span>
          )}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
            {title}
          </h1>
          <div className="flex items-center gap-6 text-white/70 text-sm font-mono tracking-widest uppercase">
            <span>{date}</span>
            {post.author && (
              <>
                <span className="w-1 h-1 bg-white/30 rounded-full" />
                <span>{isAr ? 'بقلم:' : 'BY:'} {post.author}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 md:py-32">
        <div className="max-w-[800px] mx-auto px-6">
          <Link 
            href={`/${lang}/news`}
            className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 hover:text-dazz-navy transition-colors mb-16 ${isAr ? 'flex-row-reverse font-arabic uppercase-none' : 'uppercase'}`}
          >
            {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {isAr ? 'العودة إلى الأخبار' : 'Back to News'}
          </Link>

          <article>
            <BlockRenderer content={content || '[]'} isAr={isAr} />
          </article>

          {/* Social Share */}
          <div className={`mt-20 pt-8 border-t border-slate-200 flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className={`text-sm font-bold text-slate-900 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {isAr ? 'مشاركة المقال' : 'Share Article'}
            </span>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-dazz-navy hover:border-dazz-navy transition-all">
                <Link2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-dazz-navy hover:border-dazz-navy transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className={`flex items-center justify-between mb-12 ${isAr ? 'flex-row-reverse' : ''}`}>
              <h3 className={`text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
                {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
              </h3>
              <Link href={`/${lang}/news`} className={`hidden md:flex items-center gap-2 text-sm font-bold tracking-widest text-slate-400 hover:text-dazz-navy transition-colors group ${isAr ? 'flex-row-reverse font-arabic uppercase-none' : 'uppercase'}`}>
                {isAr ? 'عرض الكل' : 'View All'}
                {isAr ? <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rp: SafeAny) => {
                const rpTitle = isAr ? (rp.title?.ar || rp.title?.en) : rp.title?.en;
                const rpImage = typeof rp.coverImage === 'string' ? rp.coverImage : (rp.coverImage?.url || '');
                const rpDate = new Date(rp.publishedAt || rp.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

                return (
                  <Link key={rp.id} href={`/${lang}/news/${rp.slug}`} className="group block h-full">
                    <div className="relative h-[250px] overflow-hidden bg-slate-200 mb-6">
                      <MediaRenderer media={rpImage} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      <div className="absolute inset-0 bg-dazz-navy/0 group-hover:bg-dazz-navy/10 transition-colors duration-500" />
                    </div>
                    <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-3">{rpDate}</p>
                    <h4 className={`text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-dazz-navy transition-colors leading-tight ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>
                      {rpTitle}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
