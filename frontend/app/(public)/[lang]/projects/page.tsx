import { Metadata } from 'next';
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { ProjectsClient } from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Project Gallery | Dazz Tradlink',
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
  
  let heroTitle = projectsHeader?.title;
  if (!heroTitle || (typeof heroTitle === 'string' && heroTitle.toUpperCase().includes('PROJECT'))) {
    heroTitle = isAr ? 'معرض\nالمشاريع' : 'PROJECT\nGALLERY';
  } else if (typeof heroTitle === 'object') {
    heroTitle = isAr ? (heroTitle.ar || heroTitle.en) : heroTitle.en;
  }

  let heroSubtitle = projectsHeader?.subtitle;
  if (!heroSubtitle || (typeof heroSubtitle === 'string' && heroSubtitle.startsWith('A showcase of'))) {
    heroSubtitle = isAr 
      ? 'عرض لأهم مساعينا وأكثرها تأثيراً في جميع أنحاء المملكة.' 
      : 'A showcase of our most prestigious and impactful endeavors across the Kingdom.';
  } else if (typeof heroSubtitle === 'object') {
    heroSubtitle = isAr ? (heroSubtitle.ar || heroSubtitle.en) : heroSubtitle.en;
  }
  
  const rawBg = projectsHeader?.media;
  const heroImage = rawBg?.url || (typeof rawBg === 'string' && rawBg !== '' ? rawBg : '/images/project-hero.png');

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
