import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { ImageTextSection } from '@/components/ImageTextSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Logistics Division | Dazz Tradelink',
  description: 'End-to-end supply chain solutions, freight forwarding, and modern warehousing.',
};

export default function LogisticsPage() {
  return (
    <>
      <HeroSection 
        title="Logistics Division"
        subtitle="Connecting markets through efficient, reliable, and technology-driven supply chain solutions."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <ImageTextSection 
        title="Moving the World's Cargo"
        subtitle="Our Operations"
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        imageAlt="Logistics Fleet"
        content={
          <>
            <p>
              Dazz Tradelink's Logistics Division provides comprehensive freight and supply chain management. Whether by sea, air, or land, we ensure that goods are transported safely and efficiently across borders.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>International Freight Forwarding (Ocean & Air)</li>
              <li>Customs Brokerage and Compliance</li>
              <li>State-of-the-Art Warehousing & Distribution</li>
              <li>Last-Mile Delivery Solutions</li>
            </ul>
          </>
        }
      />

      <section className="py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Advanced Warehousing" subtitle="Infrastructure" />
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Our strategically located warehouse facilities are equipped with modern inventory management systems (WMS) and climate-control technology, ensuring that your products—from electronics to perishables—are stored in optimal conditions.
              </p>
              <Link href="/careers-contact">
                <Button variant="outline">Inquire About Storage</Button>
              </Link>
            </div>
            <div className="bg-slate-900 p-12 text-white text-center rounded-sm">
              <div className="text-5xl font-bold text-amber-500 mb-4">1M+</div>
              <div className="text-xl font-semibold mb-2">Sq. Ft. of Storage Space</div>
              <p className="text-slate-400">Across major global trading hubs</p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection 
        title="Optimize Your Supply Chain" 
        description="Let our logistics experts streamline your operations and reduce transit times."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Get a Quote</Button>
        </Link>
      </CTASection>
    </>
  );
}