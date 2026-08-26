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

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

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
            {projects.length === 0 ? (
              <p className="text-slate-500">No projects available at the moment.</p>
            ) : (
              projects.map((p: any) => (
                <ProjectCard 
                  key={p._id}
                  title={p.title} 
                  category={p.category} 
                  imageUrl={p.imageUrl} 
                  slug={p.slug} 
                />
              ))
            )}
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