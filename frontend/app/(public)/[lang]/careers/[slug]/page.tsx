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
    return { title: 'Job Not Found | Dazz Tradlink' };
  }
  
  return {
    title: `${job.title?.en || 'Career'} | Dazz Tradlink`,
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
          <li key={idx} className="flex items-start gap-4 text-slate-700 group hover:bg-slate-50 p-3 rounded-lg transition-colors border border-transparent hover:border-slate-100">
            <div className="w-6 h-6 flex items-center justify-center border border-dazz-gold/40 bg-dazz-gold/10 flex-shrink-0 mt-0.5 rounded-full shadow-sm group-hover:bg-dazz-gold group-hover:scale-110 transition-all duration-300">
              <CheckCircle2 size={14} className="text-dazz-gold group-hover:text-white transition-colors" />
            </div>
            <span className={`leading-relaxed text-base font-light ${isAr ? 'font-arabic text-right' : ''}`}>{item[lang]}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main dir={dir} className="min-h-screen bg-[#F8F9FA] pb-32">
      
      {/* Premium Editorial Dark Hero */}
      <div className="bg-[#050B14] text-white pt-40 pb-32 relative overflow-hidden border-b border-slate-800">
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute w-full h-[1px] bg-white top-1/4"></div>
          <div className="absolute w-full h-[1px] bg-white top-2/4"></div>
          <div className="absolute w-full h-[1px] bg-white top-3/4"></div>
          <div className={`absolute h-full w-[1px] bg-white ${isAr ? 'right-[25%]' : 'left-[25%]'}`}></div>
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-dazz-navy-light/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[30%] h-[50%] bg-dazz-gold/15 blur-[130px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link 
            href={`/${lang}/careers`} 
            className={`inline-flex items-center gap-3 text-dazz-gold hover:text-white transition-colors mb-12 font-mono text-xs tracking-[0.2em] ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}
          >
            <ArrowLeft size={16} className={isAr ? 'rotate-180' : ''} />
            <span>{isAr ? 'العودة للوظائف' : 'Back to Careers'}</span>
          </Link>
          
          <div className="max-w-4xl backdrop-blur-sm bg-[#0A0F1A]/40 p-8 rounded-2xl border border-white/5 shadow-2xl">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 text-white leading-tight ${isAr ? 'font-arabic text-right' : ''}`}>
              {job.title?.[lang]}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 text-slate-300 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-2">
                <span className={`text-[10px] font-mono text-slate-400 tracking-[0.2em] ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'القسم' : 'Department'}</span>
                <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Briefcase size={16} className="text-dazz-gold" />
                  <span className={`font-bold text-sm tracking-wide text-white ${isAr ? 'font-arabic' : ''}`}>{job.department}</span>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block"></div>
              
              <div className="flex flex-col gap-2">
                <span className={`text-[10px] font-mono text-slate-400 tracking-[0.2em] ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'الموقع' : 'Location'}</span>
                <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <MapPin size={16} className="text-dazz-gold" />
                  <span className={`font-bold text-sm tracking-wide text-white ${isAr ? 'font-arabic' : ''}`}>{job.location}</span>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block"></div>

              <div className="flex flex-col gap-2">
                <span className={`text-[10px] font-mono text-slate-400 tracking-[0.2em] ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'نوع الوظيفة' : 'Type'}</span>
                <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Clock size={16} className="text-dazz-gold" />
                  <span className={`font-bold text-sm tracking-wide text-white ${isAr ? 'font-arabic' : ''}`}>{job.type}</span>
                </div>
              </div>

              {job.publishedAt && (
                <>
                  <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                  <div className="flex flex-col gap-2">
                    <span className={`text-[10px] font-mono text-slate-400 tracking-[0.2em] ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'تاريخ النشر' : 'Published'}</span>
                    <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
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
            <div className="bg-white p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/40 rounded-xl relative">
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-dazz-navy to-dazz-gold rounded-t-xl"></div>

              <div className="space-y-16 mt-2">
                <div>
                  <h2 className={`text-sm font-mono text-dazz-gold tracking-widest mb-4 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>{isAr ? 'عن الوظيفة' : 'About the Role'}</h2>
                  <p className={`text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-light ${isAr ? 'font-arabic text-right' : ''}`}>
                    {job.description?.[lang]}
                  </p>
                </div>

                {job.responsibilities && job.responsibilities.length > 0 && renderList(job.responsibilities) && (
                  <div>
                    <h2 className={`text-sm font-mono text-dazz-gold tracking-widest mb-4 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>{isAr ? 'المسؤوليات' : 'Key Responsibilities'}</h2>
                    {renderList(job.responsibilities)}
                  </div>
                )}

                {job.requirements && job.requirements.length > 0 && renderList(job.requirements) && (
                  <div>
                    <h2 className={`text-sm font-mono text-dazz-gold tracking-widest mb-4 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>{isAr ? 'المتطلبات' : 'Requirements'}</h2>
                    {renderList(job.requirements)}
                  </div>
                )}

                {job.qualifications && job.qualifications.length > 0 && renderList(job.qualifications) && (
                  <div>
                    <h2 className={`text-sm font-mono text-dazz-gold tracking-widest mb-4 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>{isAr ? 'المؤهلات' : 'Qualifications'}</h2>
                    {renderList(job.qualifications)}
                  </div>
                )}
                
                {job.skills && job.skills.length > 0 && renderList(job.skills) && (
                  <div>
                    <h2 className={`text-sm font-mono text-dazz-gold tracking-widest mb-4 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>{isAr ? 'المهارات' : 'Skills'}</h2>
                    {renderList(job.skills)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              <div className="bg-white rounded-xl p-8 relative overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/40">
                {/* Abstract corner */}
                <div className={`absolute -top-12 ${isAr ? '-left-12' : '-right-12'} w-24 h-24 bg-dazz-gold/10 rotate-45`}></div>
                
                <h3 className={`text-xs font-mono text-slate-500 tracking-[0.2em] mb-8 pb-4 border-b border-slate-100 ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>
                  {isAr ? 'ملخص الوظيفة' : 'Job Overview'}
                </h3>
                
                <div className="space-y-6">
                  {(job.salary || (job.experience && job.experience[lang])) && (
                    <div className="flex flex-col gap-6">
                      {job.experience?.[lang] && (
                        <div className={isAr ? 'text-right' : ''}>
                          <span className={`text-[10px] font-mono text-slate-400 tracking-widest block mb-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'الخبرة' : 'Experience'}</span>
                          <p className={`font-bold text-lg text-slate-900 ${isAr ? 'font-arabic' : ''}`}>{job.experience[lang]}</p>
                        </div>
                      )}
                      {job.salary && (
                        <div className={isAr ? 'text-right' : ''}>
                          <span className={`text-[10px] font-mono text-slate-400 tracking-widest block mb-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'الراتب' : 'Salary'}</span>
                          <p className={`font-bold text-lg text-slate-900 ${isAr ? 'font-arabic' : ''}`}>{job.salary}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {job.benefits && (
                    <div className={`pt-6 border-t border-slate-100 ${isAr ? 'text-right' : ''}`}>
                      <span className={`text-[10px] font-mono text-slate-400 tracking-widest block mb-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'المزايا' : 'Benefits'}</span>
                      <p className={`font-bold text-slate-900 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>{job.benefits}</p>
                    </div>
                  )}
                  
                  {job.deadline && (
                    <div className={`pt-6 border-t border-slate-100 ${isAr ? 'text-right' : ''}`}>
                      <span className={`text-[10px] font-mono text-red-500 tracking-widest block mb-1 ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'الموعد النهائي' : 'Deadline'}</span>
                      <p className={`font-bold text-slate-900 ${isAr ? 'font-arabic' : ''}`}>{new Date(job.deadline).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <a 
                    href="#apply"
                    className={`block w-full text-center px-6 py-4 bg-dazz-navy text-white font-bold rounded-lg hover:bg-dazz-gold transition-colors duration-300 ${isAr ? 'font-arabic' : ''}`}
                  >
                    {isAr ? 'قدم الآن' : 'Apply Now'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacious Application Form Section */}
        <div id="apply" className="mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-serif font-bold text-slate-900 mb-4 ${isAr ? 'font-arabic' : ''}`}>
              {isAr ? 'قدم على هذه الوظيفة' : 'Apply for this Role'}
            </h2>
            <p className={`text-slate-500 text-lg ${isAr ? 'font-arabic' : ''}`}>
              {isAr ? 'أرسل تفاصيلك وسيرتك الذاتية. نتطلع إلى التعرف عليك.' : 'Submit your details and resume below. We look forward to reviewing your application.'}
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/40 rounded-xl relative">
            {/* Side Accent */}
            <div className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} w-2 h-full bg-gradient-to-b from-dazz-gold to-dazz-navy rounded-l-xl`}></div>
            <ApplicationForm lang={lang} isAr={isAr} jobId={job.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
