import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Container } from '@/components/Container';
import { BlogCard } from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'News & Blog | Dazz Tradelink',
  description: 'Latest insights, company news, and industry updates from Dazz Tradelink.',
};

export default function NewsPage() {
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
            <BlogCard title="Innovations in Modern Construction" excerpt="Exploring new sustainable materials in high-rise buildings." date="2026-08-20T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="innovations-construction" />
            <BlogCard title="Global Food Supply Chain Resiliency" excerpt="How we ensure continuous distribution during global shortages." date="2026-08-15T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="food-supply-chain" />
            <BlogCard title="The Future of Luxury Hospitality" excerpt="Adapting to the new standards of international tourism." date="2026-08-10T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="future-luxury-hospitality" />
            <BlogCard title="Expanding our Logistics Network" excerpt="New distribution centers opening in key Asian markets." date="2026-08-05T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="expanding-logistics-network" />
            <BlogCard title="Corporate Sustainability Goals 2030" excerpt="Our commitment to reducing carbon footprint across all divisions." date="2026-08-01T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="sustainability-goals-2030" />
            <BlogCard title="Award-winning Infrastructure Design" excerpt="Recognized for excellence in our latest civil engineering project." date="2026-07-25T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="award-winning-infrastructure" />
          </div>
        </Container>
      </section>
    </>
  );
}