import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Careers & Contact',
  description: 'Join our team of global professionals or get in touch with our corporate headquarters for business inquiries.',
  alternates: {
    canonical: '/careers-contact',
  },
  openGraph: {
    title: 'Careers & Contact | Dazz Tradelink',
    description: 'Join our team of global professionals or get in touch with our corporate headquarters for business inquiries.',
    url: '/careers-contact',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Careers & Contact | Dazz Tradelink',
      }
    ],
  },
};
export default function CareersContactPage() {
  return (
    <>
      <HeroSection 
        title="Connect With Us"
        subtitle="Explore career opportunities or reach out for global business inquiries."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Section */}
            <div>
              <SectionTitle title="Get in Touch" subtitle="Contact" />
              <div className="bg-slate-50 p-8 border border-slate-100 rounded-sm mb-8">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Corporate Headquarters</h4>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Corporate Avenue, Financial District,<br />Dubai, UAE</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+971 4 123 4567</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@dazztradelink.com</span>
                  </li>
                </ul>
              </div>
              
              {/* Note: This form is a visual placeholder. State and submission will be handled in a later phase via Client Component. */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input type="text" className="w-full border border-slate-300 rounded-sm px-4 py-2 focus:ring-amber-500 focus:border-amber-500" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input type="text" className="w-full border border-slate-300 rounded-sm px-4 py-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input type="email" className="w-full border border-slate-300 rounded-sm px-4 py-2 focus:ring-amber-500 focus:border-amber-500" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full border border-slate-300 rounded-sm px-4 py-2 focus:ring-amber-500 focus:border-amber-500" placeholder="How can we help you?"></textarea>
                </div>
                <Button variant="primary" type="button" className="w-full md:w-auto">Send Message</Button>
              </form>
            </div>

            {/* Careers Section */}
            <div>
              <SectionTitle title="Join Our Team" subtitle="Careers" />
              <p className="text-slate-600 mb-8 text-lg">
                We are always looking for passionate, driven professionals to join our diverse global workforce. Explore our current open positions below.
              </p>
              
              <div className="space-y-4">
                {/* Mock Job Postings */}
                <div className="p-6 border border-slate-200 hover:border-amber-500 transition-colors bg-white rounded-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Senior Civil Engineer</h3>
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold uppercase tracking-wider">Construction</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">Dubai, UAE • Full-time</p>
                  <Button variant="outline" size="sm">Apply Now</Button>
                </div>

                <div className="p-6 border border-slate-200 hover:border-amber-500 transition-colors bg-white rounded-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Logistics Operations Manager</h3>
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold uppercase tracking-wider">Logistics</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">Singapore • Full-time</p>
                  <Button variant="outline" size="sm">Apply Now</Button>
                </div>

                <div className="p-6 border border-slate-200 hover:border-amber-500 transition-colors bg-white rounded-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Commodity Trader</h3>
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold uppercase tracking-wider">Food Trading</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4">London, UK • Full-time</p>
                  <Button variant="outline" size="sm">Apply Now</Button>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
      
      {/* Mock Map Section */}
      <div className="w-full h-96 bg-slate-200 flex items-center justify-center relative">
         <div className="absolute inset-0 opacity-50 bg-[url('https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg')] bg-cover bg-center"></div>
         <div className="relative z-10 bg-white p-4 shadow-lg font-bold text-slate-900">Map Placeholder</div>
      </div>
    </>
  );
}