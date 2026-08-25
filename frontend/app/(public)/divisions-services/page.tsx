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
  description: 'Explore our specialized divisions: Construction, Food Trading, Logistics, and Hospitality.',
  alternates: {
    canonical: '/divisions-services',
  },
  openGraph: {
    title: 'Divisions & Services | Dazz Tradelink',
    description: 'Explore our specialized divisions: Construction, Food Trading, Logistics, and Hospitality.',
    url: '/divisions-services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Divisions & Services | Dazz Tradelink',
      }
    ],
  },
};
export default function DivisionsPage() {
  return (
    <>
      <HeroSection 
        title="Our Divisions & Services"
        subtitle="Four specialized sectors, one unified standard of excellence."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionTitle title="Comprehensive Solutions" subtitle="What We Do" alignment="center" />
            <p className="text-lg text-slate-600">
              Dazz Tradelink operates across four primary business sectors. By maintaining dedicated divisions with specialized leadership, we ensure that every client receives expert, industry-specific service backed by the resources of a global conglomerate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard 
              title="Construction" 
              description="Our construction division handles everything from commercial high-rises to civil infrastructure projects, utilizing advanced engineering methodologies and sustainable practices."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/construction"
            />
            <ServiceCard 
              title="Food Trading" 
              description="We source, process, and distribute premium food commodities globally, ensuring food security and quality from farm to table through our rigorous supply chain."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/food-trading"
            />
            <ServiceCard 
              title="Logistics" 
              description="Providing end-to-end freight forwarding, warehousing, and supply chain management solutions that keep global trade moving efficiently."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/logistics"
            />
            <ServiceCard 
              title="Hospitality" 
              description="Creating and managing exceptional spaces and services that redefine luxury and comfort in the global tourism and facility management sectors."
              imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
              href="/hospitality"
            />
          </div>
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