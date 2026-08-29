import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Briefcase, Clock, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ApplicationForm from '@/components/careers/ApplicationForm';

async function getJob(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
    const res = await fetch(`${apiUrl}/jobs/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    return null;
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const job = await getJob(resolvedParams.slug);
  
  if (!job) {
    return { title: 'Job Not Found | Dazz Tradelink' };
  }
  
  return {
    title: `${job.title?.en || 'Career'} | Dazz Tradelink`,
    description: job.description?.en || 'Join our team.',
  };
}

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const resolvedParams = await params;
  const { slug, lang = 'en' } = resolvedParams;
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const job = await getJob(slug);

  if (!job || job.status !== 'PUBLISHED') {
    notFound();
  }

  const renderList = (items: any[]) => {
    if (!items || items.length === 0) return null;
    const validItems = items.filter(item => item && item[lang] && item[lang].trim() !== '');
    if (validItems.length === 0) return null;

    return (
      <ul className="space-y-4 mt-6">
        {validItems.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4 text-slate-600 group">
            <div className="w-6 h-6 flex items-center justify-center border border-dazz-gold/30 bg-dazz-gold/5 flex-shrink-0 mt-0.5 rounded-sm group-hover:bg-dazz-gold group-hover:border-dazz-gold transition-colors">
              <ChevronRight size={14} className={`text-dazz-gold group-hover:text-dazz-navy transition-colors ${isAr ? 'rotate-180' : ''}`} />
            </div>
            <span className="leading-relaxed text-lg">{item[lang]}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main dir={dir} className="min-h-screen bg-[#F8F9FA] pb-32">
      
      {/* Editorial Dark Hero */}
      <div className="bg-[#0A0F1A] text-white pt-40 pb-28 relative overflow-hidden">
        {/* Architectural Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute w-full h-px bg-slate-700 top-1/3"></div>
          <div className="absolute w-full h-px bg-slate-700 top-2/3"></div>
          <div className={`absolute h-full w-px bg-slate-700 ${isAr ? 'right-[20%]' : 'left-[20%]'}`}></div>
        </div>
        
        {/* Glow & Texture */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-dazz-navy-light/10 transform skew-x-12 origin-top-right mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-dazz-gold/10 blur-[100px] rounded-full"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link 
            href={`/${lang}/careers`} 
            className={`inline-flex items-center gap-3 text-dazz-gold hover:text-white transition-colors mb-12 font-mono text-xs tracking-[0.2em] uppercase`}
          >
            <ArrowLeft size={16} className={isAr ? 'rotate-180' : ''} />
            <span>{isAr ? 'العودة للوظائف' : 'Back to Careers'}</span>
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-8 text-white leading-tight">
              {job.title?.[lang]}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-300 border-t border-slate-700/50 pt-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{isAr ? 'القسم' : 'Department'}</span>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-dazz-gold" />
                  <span className="font-bold text-sm tracking-wide text-white">{job.department}</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-700/50 hidden md:block"></div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{isAr ? 'الموقع' : 'Location'}</span>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-dazz-gold" />
                  <span className="font-bold text-sm tracking-wide text-white">{job.location}</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-700/50 hidden md:block"></div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{isAr ? 'نوع الوظيفة' : 'Type'}</span>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-dazz-gold" />
                  <span className="font-bold text-sm tracking-wide text-white">{job.type}</span>
                </div>
              </div>

              {job.publishedAt && (
                <>
                  <div className="h-8 w-px bg-slate-700/50 hidden md:block"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{isAr ? 'تاريخ النشر' : 'Published'}</span>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-dazz-gold" />
                      <span className="font-bold text-sm tracking-wide text-white">{new Date(job.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-14 border border-slate-200 shadow-sm relative">
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-dazz-gold"></div>

              <div className="space-y-16">
                <div>
                  <h2 className="text-sm font-mono text-dazz-gold tracking-widest uppercase mb-4">{isAr ? 'عن الوظيفة' : 'About the Role'}</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-light">
                    {job.description?.[lang]}
                  </p>
                </div>

                {job.responsibilities && job.responsibilities.length > 0 && renderList(job.responsibilities) && (
                  <div>
                    <h2 className="text-sm font-mono text-dazz-gold tracking-widest uppercase mb-4">{isAr ? 'المسؤوليات' : 'Key Responsibilities'}</h2>
                    {renderList(job.responsibilities)}
                  </div>
                )}

                {job.requirements && job.requirements.length > 0 && renderList(job.requirements) && (
                  <div>
                    <h2 className="text-sm font-mono text-dazz-gold tracking-widest uppercase mb-4">{isAr ? 'المتطلبات' : 'Requirements'}</h2>
                    {renderList(job.requirements)}
                  </div>
                )}

                {job.qualifications && job.qualifications.length > 0 && renderList(job.qualifications) && (
                  <div>
                    <h2 className="text-sm font-mono text-dazz-gold tracking-widest uppercase mb-4">{isAr ? 'المؤهلات' : 'Qualifications'}</h2>
                    {renderList(job.qualifications)}
                  </div>
                )}
                
                {job.skills && job.skills.length > 0 && renderList(job.skills) && (
                  <div>
                    <h2 className="text-sm font-mono text-dazz-gold tracking-widest uppercase mb-4">{isAr ? 'المهارات' : 'Skills'}</h2>
                    {renderList(job.skills)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              <div className="bg-[#0A0F1A] text-white p-8 relative overflow-hidden border border-slate-800">
                {/* Abstract corner */}
                <div className={`absolute -top-12 ${isAr ? '-left-12' : '-right-12'} w-24 h-24 bg-dazz-gold/10 rotate-45`}></div>
                
                <h3 className="text-xs font-mono text-dazz-gold tracking-widest uppercase mb-8 pb-4 border-b border-slate-800">
                  {isAr ? 'ملخص الوظيفة' : 'Job Overview'}
                </h3>
                
                <div className="space-y-6">
                  {(job.salary || (job.experience && job.experience[lang])) && (
                    <div className="flex flex-col gap-6">
                      {job.experience?.[lang] && (
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">{isAr ? 'الخبرة' : 'Experience'}</span>
                          <p className="font-bold text-lg text-white">{job.experience[lang]}</p>
                        </div>
                      )}
                      {job.salary && (
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">{isAr ? 'الراتب' : 'Salary'}</span>
                          <p className="font-bold text-lg text-white">{job.salary}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {job.benefits && (
                    <div className="pt-6 border-t border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">{isAr ? 'المزايا' : 'Benefits'}</span>
                      <p className="font-bold text-white leading-relaxed">{job.benefits}</p>
                    </div>
                  )}
                  
                  {job.deadline && (
                    <div className="pt-6 border-t border-slate-800">
                      <span className="text-[10px] font-mono text-red-400/80 uppercase tracking-widest block mb-1">{isAr ? 'الموعد النهائي' : 'Deadline'}</span>
                      <p className="font-bold text-white">{new Date(job.deadline).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Application Form anchor */}
              <div id="apply" className="bg-white p-8 border border-slate-200 shadow-sm relative">
                {/* Side Accent */}
                <div className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} w-1 h-full bg-dazz-gold`}></div>

                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">
                  {isAr ? 'قدم الآن' : 'Apply Now'}
                </h3>
                <p className="text-slate-500 text-sm mb-8 font-light leading-relaxed">
                  {isAr ? 'أرسل تفاصيلك وسيرتك الذاتية لهذه الوظيفة. نتطلع إلى التعرف عليك.' : 'Submit your details and resume for this position. We look forward to reviewing your application.'}
                </p>
                <ApplicationForm lang={lang} isAr={isAr} jobId={job._id} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
