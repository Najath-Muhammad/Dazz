import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Container } from '@/components/Container';
import Link from 'next/link';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlog(slug);

  if (!article) {
    return { title: 'Article Not Found | Dazz Tradelink' };
  }

  return {
    title: `${article.title} | Dazz Tradelink News`,
    description: article.excerpt,
    openGraph: {
      images: [article.imageUrl],
    },
  };
}

export default async function NewsSinglePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getBlog(slug);

  if (!article) {
    return <div className="py-24 text-center text-2xl text-slate-500">Article Not Found</div>;
  }

  return (
    <>
      <HeroSection 
        title={article.title}
        subtitle={new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        backgroundImage={article.imageUrl}
      />
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg text-slate-700">
              <p className="lead text-xl mb-8 font-medium text-slate-900">{article.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
            </div>
            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link href="/news" className="text-amber-600 font-semibold hover:text-amber-700 transition">
                &larr; Back to News
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
