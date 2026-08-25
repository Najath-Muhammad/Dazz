import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { ImageTextSection } from '@/components/ImageTextSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hospitality',
  description: 'Creating luxurious experiences and managing world-class facilities globally.',
  alternates: {
    canonical: '/hospitality',
  },
  openGraph: {
    title: 'Hospitality | Dazz Tradelink',
    description: 'Creating luxurious experiences and managing world-class facilities globally.',
    url: '/hospitality',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hospitality | Dazz Tradelink',
      }
    ],
  },
};
export default function HospitalityPage() {
  return (
    <>
      <HeroSection 
        title="Hospitality Division"
        subtitle="Redefining luxury, comfort, and service excellence in the global tourism sector."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <ImageTextSection 
        title="Exceptional Experiences"
        subtitle="Our Philosophy"
        imagePosition="left"
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        imageAlt="Luxury Resort"
        content={
          <>
            <p>
              Our Hospitality Division manages a prestigious portfolio of luxury hotels, resorts, and corporate facilities. We combine cultural authenticity with international service standards to create unforgettable experiences for our guests.
            </p>
            <p>
              From boutique urban hotels to expansive beachfront resorts, our properties are designed to offer unparalleled comfort and state-of-the-art amenities.
            </p>
          </>
        }
      />

      <section className="py-24 bg-white">
        <Container>
          <SectionTitle title="Our Services" subtitle="Capabilities" alignment="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="p-6 bg-slate-50 rounded-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Hotel Management</h4>
              <p className="text-slate-600 text-sm">Comprehensive operational management for luxury properties.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Facility Services</h4>
              <p className="text-slate-600 text-sm">Maintaining corporate environments to the highest standards.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Event Spaces</h4>
              <p className="text-slate-600 text-sm">Operating premium venues for international conferences and events.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Culinary Excellence</h4>
              <p className="text-slate-600 text-sm">Managing fine dining establishments and catering services.</p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection 
        title="Discover Our Properties" 
        description="Experience the Dazz standard of hospitality across our global portfolio."
      >
        <Link href="/projects">
          <Button variant="secondary">View Portfolio</Button>
        </Link>
      </CTASection>
    </>
  );
}