import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Container } from '@/components/Container';
import { ProjectCard } from '@/components/ProjectCard';
import { CTASection } from '@/components/CTASection';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project Gallery | Dazz Tradelink',
  description: 'Explore our portfolio of global projects across construction, logistics, and hospitality.',
};

export default function ProjectsPage() {
  return (
    <>
      <HeroSection 
        title="Project Gallery"
        subtitle="A showcase of our most prestigious and impactful endeavors around the globe."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-wrap gap-4 mb-12">
            <Button variant="primary" size="sm">All Projects</Button>
            <Button variant="outline" size="sm">Construction</Button>
            <Button variant="outline" size="sm">Logistics</Button>
            <Button variant="outline" size="sm">Hospitality</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard title="Downtown Skyscraper" category="Construction" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="downtown-skyscraper" />
            <ProjectCard title="Global Supply Hub" category="Logistics" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="global-supply-hub" />
            <ProjectCard title="Luxury Resort Complex" category="Hospitality" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="luxury-resort-complex" />
            <ProjectCard title="National Highway Extension" category="Construction" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="highway-extension" />
            <ProjectCard title="Automated Warehouse" category="Logistics" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="automated-warehouse" />
            <ProjectCard title="Boutique Urban Hotel" category="Hospitality" imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg" slug="boutique-urban-hotel" />
          </div>
        </Container>
      </section>

      <CTASection 
        title="Discuss Your Next Project" 
        description="Our experts are ready to turn your vision into reality."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Contact Us</Button>
        </Link>
      </CTASection>
    </>
  );
}