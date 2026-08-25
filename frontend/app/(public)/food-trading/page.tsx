import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { ImageTextSection } from '@/components/ImageTextSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Food Trading',
  description: 'Global sourcing, processing, and distribution of premium food commodities.',
  alternates: {
    canonical: '/food-trading',
  },
  openGraph: {
    title: 'Food Trading | Dazz Tradelink',
    description: 'Global sourcing, processing, and distribution of premium food commodities.',
    url: '/food-trading',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Food Trading | Dazz Tradelink',
      }
    ],
  },
};
export default function FoodTradingPage() {
  return (
    <>
      <HeroSection 
        title="Food Trading Division"
        subtitle="Nourishing the world through a resilient, quality-controlled global supply chain."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <ImageTextSection 
        title="Global Reach, Local Quality"
        subtitle="Our Network"
        imagePosition="left"
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        imageAlt="Global Food Distribution"
        content={
          <>
            <p>
              Our Food Trading Division operates a sophisticated international network that sources, processes, and distributes premium agricultural commodities and packaged foods. We prioritize food security, stringent quality control, and sustainable sourcing.
            </p>
            <p>
              By leveraging our logistics infrastructure, we guarantee that products maintain their freshness and integrity from origin to destination.
            </p>
          </>
        }
      />

      <section className="py-24 bg-white">
        <Container>
          <SectionTitle title="Primary Commodities" subtitle="What We Trade" alignment="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            <div className="p-8 border border-slate-100 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Grains & Cereals</h4>
              <p className="text-slate-600">Bulk sourcing of wheat, rice, corn, and barley for industrial and retail sectors.</p>
            </div>
            <div className="p-8 border border-slate-100 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Edible Oils</h4>
              <p className="text-slate-600">High-quality palm, sunflower, and olive oils processed to international standards.</p>
            </div>
            <div className="p-8 border border-slate-100 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Spices & Pulses</h4>
              <p className="text-slate-600">Premium spices and legumes sourced directly from sustainable farming communities.</p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection 
        title="Source With Confidence" 
        description="Connect with our commodities team to secure your supply chain."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Contact Traders</Button>
        </Link>
      </CTASection>
    </>
  );
}