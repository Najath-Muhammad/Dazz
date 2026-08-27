import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { SectionTitle } from '@/components/SectionTitle';
import { Container } from '@/components/Container';
import { ServiceCard } from '@/components/ServiceCard';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Divisions & Services',
  description: 'Explore our specialized divisions and services.',
  alternates: { canonical: '/divisions-services' },
};

async function getServices() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/services`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}

export default async function DivisionsPage() {
  const services = await getServices();

  return (
    <>
      <HeroSection 
        title="Our Divisions & Services"
        subtitle="Explore our comprehensive range of specialized services."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionTitle title="Comprehensive Solutions" subtitle="What We Do" alignment="center" />
            <p className="text-lg text-slate-600">
              Dazz Tradelink operates across multiple specialized sectors, delivering expert, industry-specific services backed by the resources of a global conglomerate.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              Services are currently being updated. Please check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((svc: any) => (
                <ServiceCard 
                  key={svc._id}
                  title={svc.name?.en || 'Service'} 
                  description={svc.shortDescription?.en || ''}
                  imageUrl={svc.hero?.media || svc.icon || 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg'}
                  href={`/en/services/${svc.slug}`}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTASection 
        title="Need a Custom Solution?" 
        description="Our divisions frequently collaborate to deliver comprehensive turnkey projects. Contact us to learn more."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Contact Us</Button>
        </Link>
      </CTASection>
    </>
  );
}