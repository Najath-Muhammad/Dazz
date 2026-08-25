import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { ImageTextSection } from '@/components/ImageTextSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Construction Division | Dazz Tradelink',
  description: 'Building state-of-the-art infrastructure, commercial complexes, and industrial facilities with precision engineering.',
};

export default function ConstructionPage() {
  return (
    <>
      <HeroSection 
        title="Construction Division"
        subtitle="Engineering tomorrow's landscapes through innovative building solutions and sustainable practices."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <ImageTextSection 
        title="Precision & Durability"
        subtitle="Our Approach"
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        imageAlt="Modern Construction Site"
        content={
          <>
            <p>
              The Dazz Tradelink Construction Division stands at the forefront of modern infrastructure development. We specialize in managing complex, large-scale projects from conceptual design through to final handover.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Commercial & Residential High-rises</li>
              <li>Civil Infrastructure (Bridges, Roads, Dams)</li>
              <li>Industrial Facilities & Factories</li>
              <li>Sustainable Green Building Projects</li>
            </ul>
          </>
        }
      />

      <section className="py-24 bg-slate-50">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <SectionTitle title="Featured Construction Projects" subtitle="Portfolio" className="mb-0" />
            <Link href="/projects" className="hidden md:block">
              <Button variant="outline">All Projects</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard title="Downtown Skyscraper" category="Construction" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="downtown-skyscraper" />
            <ProjectCard title="National Highway Extension" category="Infrastructure" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="highway-extension" />
          </div>
        </Container>
      </section>

      <CTASection 
        title="Build With Us" 
        description="Partner with our construction experts for your next major development."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Request a Consultation</Button>
        </Link>
      </CTASection>
    </>
  );
}