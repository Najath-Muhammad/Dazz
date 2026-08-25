import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { ServiceCard } from '@/components/ServiceCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Dazz Tradelink delivers excellence across construction, food trading, logistics, and hospitality with industrial precision and corporate integrity.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Home | Dazz Tradelink',
    description: 'Dazz Tradelink delivers excellence across construction, food trading, logistics, and hospitality with industrial precision and corporate integrity.',
    url: '/',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Home | Dazz Tradelink',
      }
    ],
  },
};
export default function HomePage() {
  return (
    <>
      <HeroSection 
        title="Building the Future of Industry"
        subtitle="Dazz Tradelink delivers comprehensive solutions across construction, food trading, logistics, and hospitality."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      >
        <Link href="/about-us">
          <Button variant="primary">Discover Our Legacy</Button>
        </Link>
        <Link href="/projects">
          <Button variant="outline" className="text-white border-white hover:text-slate-900">View Projects</Button>
        </Link>
      </HeroSection>

      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl">
            <SectionTitle title="A Legacy of Excellence" subtitle="About Us" />
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Dazz Tradelink is a leading multifaceted corporation dedicated to driving industrial growth and creating sustainable value. With decades of expertise, we seamlessly integrate our diverse divisions to deliver turnkey solutions for global clients.
            </p>
            <Link href="/about-us">
              <Button variant="outline">Learn More About Us</Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-slate-50">
        <Container>
          <SectionTitle title="Our Divisions" subtitle="Capabilities" alignment="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <ServiceCard 
              title="Construction" 
              description="Engineering and building state-of-the-art infrastructure."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/construction"
            />
            <ServiceCard 
              title="Food Trading" 
              description="Global sourcing and distribution of premium commodities."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/food-trading"
            />
            <ServiceCard 
              title="Logistics" 
              description="End-to-end supply chain and freight forwarding."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/logistics"
            />
            <ServiceCard 
              title="Hospitality" 
              description="Delivering world-class experiences and facility management."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/hospitality"
            />
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <SectionTitle title="Featured Projects" subtitle="Portfolio" className="mb-0" />
            <Link href="/projects" className="hidden md:block">
              <Button variant="ghost">View All Projects</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard title="Downtown Skyscraper" category="Construction" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="downtown-skyscraper" />
            <ProjectCard title="Global Supply Hub" category="Logistics" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="global-supply-hub" />
            <ProjectCard title="Luxury Resort Complex" category="Hospitality" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="luxury-resort-complex" />
          </div>
        </Container>
      </section>

      <section className="py-24 bg-slate-50">
        <Container>
          <SectionTitle title="Latest Insights" subtitle="News & Blog" alignment="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <BlogCard title="Innovations in Modern Construction" excerpt="Exploring new sustainable materials in high-rise buildings." date="2026-08-20T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="innovations-construction" />
            <BlogCard title="Global Food Supply Chain Resiliency" excerpt="How we ensure continuous distribution during global shortages." date="2026-08-15T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="food-supply-chain" />
            <BlogCard title="The Future of Luxury Hospitality" excerpt="Adapting to the new standards of international tourism." date="2026-08-10T00:00:00Z" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="future-luxury-hospitality" />
          </div>
        </Container>
      </section>

      <CTASection 
        title="Ready to Start Your Next Project?" 
        description="Contact our team of experts today to discuss how Dazz Tradelink can deliver value to your business."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Contact Us Now</Button>
        </Link>
      </CTASection>
    </>
  );
}
