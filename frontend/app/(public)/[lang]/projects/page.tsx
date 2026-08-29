import { Metadata } from 'next';
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { ProjectsClient } from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Project Gallery | Dazz Tradelink',
  description: 'Explore our portfolio of global projects across construction, logistics, and hospitality.',
  alternates: { canonical: '/en/projects' },
};

async function getHeroSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${apiUrl}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) return json.data[0];
    return null;
  } catch (error) {
    return null;
  }
}

async function getProjects() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    // Fetch all published projects, limit can be increased or removed if pagination is needed later
    const res = await fetch(`${apiUrl}/projects?status=published&limit=50`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const [settings, projects] = await Promise.all([
    getHeroSettings(),
    getProjects()
  ]);

  const projectsHeader = settings?.pageHeaders?.projects;
  
  const heroTitle = projectsHeader?.title?.[lang] || (isAr ? 'معرض\nالمشاريع' : 'PROJECT\nGALLERY');
  const heroSubtitle = projectsHeader?.subtitle?.[lang] || (isAr ? 'عرض لأهم مساعينا وأكثرها تأثيراً في جميع أنحاء المملكة.' : 'A showcase of our most prestigious and impactful endeavors across the Kingdom.');
  
  const rawBg = projectsHeader?.media;
  let heroImage = 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg';
  if (rawBg?.url) {
    heroImage = rawBg.url;
  } else if (typeof rawBg === 'string' && rawBg !== '') {
    heroImage = rawBg;
  }

  return (
    <main dir={dir} className="min-h-screen bg-slate-50 font-sans">
      <ProjectsHero 
        title={heroTitle} 
        subtitle={heroSubtitle} 
        media={heroImage} 
        isAr={isAr} 
      />
      <ProjectsClient 
        projects={projects}
        lang={lang}
        isAr={isAr}
        dir={dir}
      />
    </main>
  );
}
