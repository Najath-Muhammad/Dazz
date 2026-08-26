import { Metadata } from 'next';
import { MediaRenderer } from '@/components/MediaRenderer';
import { HeroSection } from '@/components/HeroSection';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { ServiceCard } from '@/components/ServiceCard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PinnedServices } from '@/components/PinnedServices';
import { HorizontalGallery } from '@/components/HorizontalGallery';
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
async function getSiteSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/settings`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch settings for homepage:', error);
    return null;
  }
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  
  const heroTitle = settings?.heroTitle || "DAZZ TRADELINK INTERNATIONAL";
  const heroSubtitle = settings?.heroSubtitle || "Empowering Industrial Excellence. Designed to meet the operational needs of industrial environments.";
  
  let heroBg = "https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg";
  if (settings?.heroBackgroundImage?.url) {
    heroBg = settings.heroBackgroundImage.url;
  } else if (typeof settings?.heroBackgroundImage === 'string' && settings.heroBackgroundImage !== '') {
    heroBg = settings.heroBackgroundImage;
  }

  return (
    <>
      <HeroSection 
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroBg}
      >
        <Link href="/about-us">
          <Button variant="primary">Discover Our Legacy</Button>
        </Link>
        <Link href="/projects">
          <Button variant="outline" className="text-white border-white hover:text-slate-900">View Projects</Button>
        </Link>
      </HeroSection>

      <section className="py-24 bg-white overflow-hidden">
        <Container>
          <div className="max-w-3xl">
            <ScrollReveal>
              <SectionTitle title="Proudly Operating Across The Kingdom" subtitle="We Are In Saudi Arabia" />
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Proudly operating across the Kingdom, delivering trusted solutions and building stronger communities. With a nationwide presence and local expertise meeting global standards, we are committed to Saudi Vision 2030 and building long-term partnerships.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <Link href="/about-us">
                <Button variant="outline">Learn More About Us</Button>
              </Link>
            </ScrollReveal>
          </div>
        </Container>
      </section>


      <PinnedServices />

      {/* Capabilities Section */}
      <section className="py-24 bg-dazz-navy text-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal direction="right">
                <SectionTitle title="Innovative & Collaborative" subtitle="Our Approach" />
              </ScrollReveal>
              <ScrollReveal delay={0.2} direction="right">
                <p className="text-lg text-slate-300 mb-6">
                  DAZZ Tradelink is built on a foundation of innovation and collaboration. We continuously invest in modern technologies, advanced machinery, and sustainable methods to ensure our operations are future-proof.
                </p>
                <p className="text-lg text-slate-300 mb-8">
                  Whether it is large-scale contracting or global trading, our teams work seamlessly to exceed expectations and deliver measurable success.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4} direction="right">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-slate-300"><span className="text-dazz-gold mr-3">✓</span> ISO Certified Standards</li>
                  <li className="flex items-center text-slate-300"><span className="text-dazz-gold mr-3">✓</span> 500+ Specialized Workforce</li>
                  <li className="flex items-center text-slate-300"><span className="text-dazz-gold mr-3">✓</span> Advanced Heavy Equipment Fleet</li>
                </ul>
                <Link href="/contact">
                  <Button variant="primary">Partner With Us</Button>
                </Link>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3} direction="left">
              <div className="relative h-96 w-full rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
                <MediaRenderer media="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" altText="Industrial Operations" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-dazz-navy/20 mix-blend-overlay"></div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <HorizontalGallery />

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
        title="Building Today For A Better Tomorrow" 
        description="Contact our team of experts today to discuss how Dazz Tradelink can deliver value to your business."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Contact Us Now</Button>
        </Link>
      </CTASection>
    </>
  );
}
