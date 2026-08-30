import { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import ApplicationForm from '@/components/careers/ApplicationForm';

export const metadata: Metadata = {
  title: 'General Application | Dazz Tradlink',
};

export default async function GeneralApplicationPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const title = isAr ? 'تقديم\nطلب عام' : 'GENERAL\nAPPLICATION';
  const subtitle = isAr ? 'لم تجد الوظيفة المناسبة؟ أرسل سيرتك الذاتية وسنتواصل معك عندما تتوفر الفرصة.' : 'Didn\'t find the right role? Submit your CV and we will contact you when an opportunity arises.';

  return (
    <main dir={dir} className="min-h-screen bg-slate-50 pb-24">
      <PageHero 
        variant="short"
        title={title}
        subtitle={subtitle}
        media="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        isAr={isAr}
      />
      
      <div className="max-w-4xl mx-auto -mt-24 relative z-20 bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-slate-100">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
            {isAr ? 'أرسل تفاصيلك' : 'Submit Your Details'}
          </h2>
          <p className="text-slate-600">
            {isAr ? 'يرجى ملء النموذج أدناه وإرفاق سيرتك الذاتية المحدثة.' : 'Please fill out the form below and attach your updated resume.'}
          </p>
        </div>
        
        <ApplicationForm lang={lang} isAr={isAr} />
      </div>
    </main>
  );
}
