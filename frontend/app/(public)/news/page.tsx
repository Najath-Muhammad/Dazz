import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Container } from '@/components/Container';
import { BlogCard } from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'News & Blog | Dazz Tradelink',
  description: 'Latest insights, company news, and industry updates from Dazz Tradelink.',
};

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function NewsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <HeroSection 
        title="News & Insights"
        subtitle="Stay updated with our latest company milestones and industry perspectives."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <section className="py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length === 0 ? (
              <p className="text-slate-500">No articles available.</p>
            ) : (
              blogs.map((b: any) => (
                <BlogCard 
                  key={b._id}
                  title={b.title} 
                  excerpt={b.excerpt} 
                  date={b.publishedAt} 
                  imageUrl={b.imageUrl} 
                  slug={b.slug} 
                />
              ))
            )}
          </div>
        </Container>
      </section>
    </>
  );
}