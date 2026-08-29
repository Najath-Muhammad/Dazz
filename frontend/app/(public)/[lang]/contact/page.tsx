import { Metadata } from 'next';
import { CinematicHero } from '@/components/home/CinematicHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ArrowRight, MapPin, Phone, Mail, Globe } from 'lucide-react';
import Link from 'next/link';
import LocationsMapWrapper from '@/components/contact/LocationsMapWrapper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact Us | Dazz Tradelink',
  description: 'Get in touch with the Dazz team. We are here to help with your project, enquiry, or opportunity.',
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



export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'en';
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const settings = await getSiteSettings();

  const contactPageData = settings?.contactPage || {};
  const heroData = contactPageData.hero || {};
  const ctaData = contactPageData.cta || {};

  const heroTitle = settings?.pageHeaders?.contact?.title || (isAr ? 'اتصل بنا\nدعنا نتواصل' : 'CONTACT US\nLET\'S CONNECT');
  const heroSubtitle = settings?.pageHeaders?.contact?.subtitle || (isAr ? 'هل لديك مشروع، استفسار، أو فرصة؟ تواصل مع فريق داز.' : 'Have a project, enquiry, or opportunity?\nGet in touch with the Dazz team.');
  
  // Use Contact Hero image if it exists in legacy pageHeaders, otherwise use default
  const rawBg = settings?.pageHeaders?.contact?.media;
  const heroImage = rawBg?.url || (typeof rawBg === 'string' && rawBg !== '' ? rawBg : '/images/contact-hero.png');

  const address = settings?.address?.[lang] || (isAr ? '٤٧٦٤، شارع الملك خالد،\nالشرفية، جدة ٢٢٢٣٤' : '4764, King Khalid St,\nAsh Sharafiyah, Jeddah 22234');
  const phone = settings?.phoneNumber || '+966 59 222 8228';
  const email = settings?.contactEmail || 'info@dazztradlink.com';
  const website = settings?.websiteUrl || 'www.dazztradlink.com';

  const mapConfig = settings?.mapConfig || { latitude: 21.5222, longitude: 39.1718, zoom: 15 };

  return (
    <main dir={dir} className="min-h-screen bg-slate-50">
      <CinematicHero 
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage}
        hideExtras={true}
      />

      <section id="contact-form" className="py-24 px-6 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Information (Left Column) */}
            <div className="lg:col-span-5 space-y-12 bg-dazz-navy text-white p-10 md:p-14 rounded-lg shadow-2xl shadow-dazz-navy/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-dazz-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold relative z-10">
                {contactPageData.contactHeading?.[lang] || (isAr ? 'معلومات التواصل' : 'Contact Information')}
              </h2>
              
              <div className="space-y-10 relative z-10">
                <div className="group">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-dazz-gold mb-3 flex items-center gap-2">
                    <MapPin size={16} /> {isAr ? 'زورنا' : 'Visit Us'}
                  </h4>
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed group-hover:text-white transition-colors">
                    {address}
                  </p>
                </div>
                
                <div className="group">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-dazz-gold mb-3 flex items-center gap-2">
                    <Phone size={16} /> {isAr ? 'اتصل بنا' : 'Call Us'}
                  </h4>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} dir="ltr" className="inline-block text-xl md:text-2xl font-light text-slate-300 group-hover:text-white hover:underline transition-all">
                    {phone}
                  </a>
                </div>
                
                <div className="group">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-dazz-gold mb-3 flex items-center gap-2">
                    <Mail size={16} /> {isAr ? 'راسلنا' : 'Email Us'}
                  </h4>
                  <a href={`mailto:${email}`} className="inline-block text-lg md:text-xl font-light text-slate-300 group-hover:text-white hover:underline transition-all break-all">
                    {email}
                  </a>
                </div>
                
                <div className="group">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-dazz-gold mb-3 flex items-center gap-2">
                    <Globe size={16} /> {isAr ? 'الموقع الإلكتروني' : 'Website'}
                  </h4>
                  <a href={`https://${website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="inline-block text-lg font-light text-slate-300 group-hover:text-white hover:underline transition-all">
                    {website}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form (Right Column) */}
            <div className="lg:col-span-7">
              <ContactForm isAr={isAr} />
            </div>

          </div>
        </div>
      </section>

      {/* Location / Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <LocationsMapWrapper isAr={isAr} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dazz-navy opacity-50 mix-blend-multiply"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-dazz-gold/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            {ctaData.heading?.[lang] || (isAr ? 'هل لديك مشروع في بالك؟' : 'HAVE A PROJECT IN MIND?')}
          </h2>
          <p className="text-xl md:text-2xl font-light text-slate-300 mb-12">
            {ctaData.description?.[lang] || (isAr ? 'دعنا نبدأ محادثة.' : 'LET\'S START A CONVERSATION.')}
          </p>
          <a 
            href="#contact-form"
            className="group flex items-center gap-3 px-10 py-5 bg-dazz-gold text-dazz-navy font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-all shadow-lg shadow-dazz-gold/20"
          >
            {ctaData.buttonText?.[lang] || (isAr ? 'تواصل معنا' : 'CONTACT US')}
            <ArrowRight size={20} className={`group-hover:${isAr ? '-translate-x-1' : 'translate-x-1'} transition-transform`} />
          </a>
        </div>
      </section>
    </main>
  );
}
