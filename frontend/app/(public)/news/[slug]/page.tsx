import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Container } from '@/components/Container';
import Link from 'next/link';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch article metadata from backend using slug
  return {
    title: `News: ${slug} | Dazz Tradelink`,
    description: `Read the full article about ${slug}.`,
  };
}

export default async function NewsSinglePage({ params }: NewsPageProps) {
  const { slug } = await params;
  
  // MOCK DATA
  const article = {
    title: slug.replace(/-/g, ' ').toUpperCase(),
    date: '2026-08-20',
    content: 'This is temporary mock content for the news article. Eventually, this will be rich text fetched from the MongoDB database via the Express API.',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
  };

  return (
    <>
      <HeroSection 
        title={article.title}
        subtitle={new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        backgroundImage={article.imageUrl}
      />
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg text-slate-700">
              <p className="lead text-xl mb-8 font-medium text-slate-900">{article.content}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <h2>Industry Impact</h2>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
