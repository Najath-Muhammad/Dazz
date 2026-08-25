import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Container } from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return { title: 'Project Not Found | Dazz Tradelink' };
  }

  return {
    title: `${project.title} | Dazz Tradelink Projects`,
    description: project.description.substring(0, 160),
    openGraph: {
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectSinglePage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return <div className="py-24 text-center text-2xl text-slate-500">Project Not Found</div>;
  }

  return (
    <>
      <HeroSection 
        title={project.title}
        subtitle={project.category}
        backgroundImage={project.imageUrl}
      />
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6 text-slate-700 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Project Overview</h2>
              <p>{project.description}</p>
              
              <div className="mt-12">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  width={800} 
                  height={500} 
                  className="w-full h-auto rounded-sm"
                />
              </div>
            </div>
            <div className="bg-slate-50 p-8 border border-slate-100 h-fit">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Project Details</h3>
              <ul className="space-y-4">
                {project.client && (
                  <li>
                    <span className="block text-sm text-slate-500 font-semibold uppercase tracking-wider">Client</span>
                    <span className="text-slate-900 font-medium">{project.client}</span>
                  </li>
                )}
                {project.location && (
                  <li>
                    <span className="block text-sm text-slate-500 font-semibold uppercase tracking-wider">Location</span>
                    <span className="text-slate-900 font-medium">{project.location}</span>
                  </li>
                )}
                {project.completionDate && (
                  <li>
                    <span className="block text-sm text-slate-500 font-semibold uppercase tracking-wider">Completion Date</span>
                    <span className="text-slate-900 font-medium">{project.completionDate}</span>
                  </li>
                )}
                <li>
                  <span className="block text-sm text-slate-500 font-semibold uppercase tracking-wider">Category</span>
                  <span className="text-slate-900 font-medium">{project.category}</span>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-slate-200">
                <Link href="/projects" className="text-amber-600 font-semibold hover:text-amber-700 transition">
                  &larr; Back to Gallery
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
