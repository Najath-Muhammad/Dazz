import { Metadata } from 'next';
import { CinematicHero } from '@/components/home/CinematicHero';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { WhyWorkWithUsInteractive } from '@/components/careers/WhyWorkWithUsInteractive';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Careers | Dazz Tradlink',
  description: 'Join the team at Dazz Tradlink and build your future with us.',
};

async function getSiteSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
    const res = await fetch(`${apiUrl}/settings`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && Array.isArray(json.data) && json.data.length > 0 ? json.data[0] : null;
  } catch (error) {
    return null;
  }
}

async function getJobs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
    const res = await fetch(`${apiUrl}/jobs`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    // Filter to PUBLISHED only
    return (json?.data || []).filter((j: any) => j.status === 'PUBLISHED');
  } catch (error) {
    return [];
  }
}

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const [settings, jobs] = await Promise.all([
    getSiteSettings(),
    getJobs()
  ]);

  const careersSettings = settings?.careers || {};
  const heroData = careersSettings.hero || {};
  const whyData = careersSettings.whyWorkWithUs || { enabled: false };
  const cultureData = careersSettings.culture || { enabled: false };

  const heroTitle = heroData.title?.[lang] || (isAr ? 'وظائف\nابنِ مستقبلك معنا' : 'CAREERS\nBUILD YOUR FUTURE');
  const heroSubtitle = heroData.subtitle?.[lang] || (isAr ? 'اكتشف فرصًا لا حصر لها.' : 'Discover endless opportunities with Dazz Tradlink.');
  
  const rawBg = heroData.media;
  const heroImage = rawBg?.url || (typeof rawBg === 'string' && rawBg !== '' ? rawBg : '/images/careers-hero.png');

  return (
    <main dir={dir} className="min-h-screen bg-white">
      <CinematicHero 
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage}
      />

      {/* Why Work With Us */}
      {whyData.enabled && (
        <WhyWorkWithUsInteractive 
          title={whyData.title?.[lang] || (isAr ? 'لماذا تعمل معنا؟' : 'Why Work With Us')}
          description={
            whyData.description?.[lang] || 
            (isAr 
              ? 'نبني بهدف. ننمو بإمكانيات.\n\nفي داز، نؤمن بأن العمل العظيم يأتي من أشخاص عظماء يعملون معًا. نجمع بين مهارات ووجهات نظر وأفكار مختلفة لإنشاء حلول تحدث تأثيرًا ملموسًا عبر الصناعات التي نخدمها.\n\nتشجع بيئتنا الابتكار والتعاون والملكية والنمو المستمر. سواء كنت تبني أو تدير أو تبتكر أو تحل المشكلات، فستتاح لك الفرصة للمساهمة في عمل يتجاوز المألوف.\n\nانضم إلينا. أحضر أفكارك. ابنِ ما هو قادم.' 
              : 'Build with purpose. Grow with possibility.\n\nAt Dazz, we believe that great work comes from great people working together. We bring together different skills, perspectives, and ideas to create solutions that make a meaningful impact across the industries we serve.\n\nOur environment encourages innovation, collaboration, ownership, and continuous growth. Whether you\'re building, managing, creating, or solving, you\'ll have the opportunity to contribute to work that goes beyond the ordinary.\n\nJoin us. Bring your ideas. Build what\'s next.')
          }
          isAr={isAr}
          principles={(whyData.benefits || []).map((b: any) => ({
            title: b.title?.[lang] || '',
            description: b.description?.[lang] || '',
            image: b.image?.url || (typeof b.image === 'string' ? b.image : undefined)
          }))}
        />
      )}



      {/* Open Positions */}
      <section id="open-positions" className="py-24 px-6 bg-dazz-navy text-white relative">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-dazz-navy-light/10 transform skew-x-12 origin-top-right"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                {isAr ? 'الوظائف الشاغرة' : 'Open Positions'}
              </h2>
              <p className="text-slate-300 max-w-xl">
                {isAr ? 'اكتشف فرصك وابدأ رحلتك معنا.' : 'Explore your opportunities and start your journey with us.'}
              </p>
            </div>
            <Link 
              href={`/${lang}/careers/general-application`}
              className="group flex items-center gap-3 px-8 py-4 bg-dazz-gold text-dazz-navy font-bold rounded-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              {isAr ? 'تقديم طلب عام' : 'Submit General Application'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="p-12 border border-slate-700/50 rounded-lg text-center bg-slate-800/20 backdrop-blur-sm">
                <p className="text-xl text-slate-400 mb-6">
                  {isAr ? 'لا توجد وظائف شاغرة حالياً. يرجى مراجعتنا لاحقاً أو تقديم طلب عام.' : 'There are no open positions at the moment. Please check back later or submit a general application.'}
                </p>
              </div>
            ) : (
              jobs.map((job: any) => (
                <Link 
                  key={job._id}
                  href={`/${lang}/careers/${job.slug}`}
                  className="block group bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-dazz-gold/50 rounded-lg p-6 md:p-8 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-dazz-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-bold px-3 py-1 bg-dazz-gold/10 text-dazz-gold rounded-full uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {job.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {job.location}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-dazz-gold transition-colors">
                        {job.title?.[lang]}
                      </h3>
                      <p className="text-slate-400 line-clamp-2 max-w-3xl">
                        {job.description?.[lang]}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-slate-600 group-hover:border-dazz-gold group-hover:bg-dazz-gold/10 transition-colors">
                      <ArrowRight size={20} className={isAr ? 'rotate-180 text-slate-300 group-hover:text-dazz-gold' : 'text-slate-300 group-hover:text-dazz-gold'} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
