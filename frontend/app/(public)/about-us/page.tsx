import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { ImageTextSection } from '@/components/ImageTextSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'DAZZ Contracting Company is a diversified Saudi-based company delivering integrated solutions across the construction, infrastructure, and industrial sectors.',
  alternates: {
    canonical: '/about-us',
  },
  openGraph: {
    title: 'About Us | Dazz Tradelink',
    description: 'DAZZ Contracting Company is a diversified Saudi-based company delivering integrated solutions across the construction, infrastructure, and industrial sectors.',
    url: '/about-us',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About Us | Dazz Tradelink',
      }
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <HeroSection 
        title="About Our Company"
        subtitle="A diversified Saudi-based company delivering integrated solutions across the construction, infrastructure, and industrial sectors."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <ImageTextSection 
        title="Who We Are"
        subtitle="Introduction"
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        imageAlt="Dazz Tradelink Corporate Overview"
        content={
          <>
            <p>
              DAZZ Contracting Company is a diversified Saudi-based company delivering integrated solutions across the construction, infrastructure, industrial, materials, equipment, environmental, and real estate sectors.
            </p>
            <p>
              We are committed to supporting the Kingdom's growing construction and infrastructure requirements by providing reliable products, specialized services, modern equipment, and efficient supply solutions. 
            </p>
            <p>
              Our diversified capabilities allow us to serve contractors, developers, industrial companies, infrastructure projects, and other organizations through a single, dependable business partner.
            </p>
          </>
        }
      />

      <section className="py-24 bg-slate-950 text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm block mb-4">Vision</span>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-4">
                To be a leading and trusted partner in construction and industrial solutions across Saudi Arabia and the region.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                We envision a future where we contribute to sustainable development by delivering quality products, reliable services, and innovative solutions that build stronger communities and a better tomorrow.
              </p>
            </div>
            <div>
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm block mb-4">Mission</span>
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-4">
                To deliver comprehensive and reliable solutions in construction, equipment, materials, and related services through a commitment to quality, safety, innovation, and customer satisfaction.
              </p>
              <div className="mt-8 pt-8 border-t border-slate-800">
                <p className="text-amber-500 font-bold italic">Building Solutions, Building Trust.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Values</h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto mb-6" />
            <p className="text-slate-600 text-lg">
              Our core values guide our decisions, shape our culture, and define the way we work. They are the foundation of how we work, how we serve our clients, and how we build our future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Integrity', desc: 'We conduct our business with honesty, transparency, and strong ethical principles.' },
              { title: 'Safety', desc: 'We place the safety and well-being of our people, clients, and communities at the highest priority.' },
              { title: 'Quality', desc: 'We are committed to delivering high-quality products and services that meet or exceed client expectations.' },
              { title: 'Innovation', desc: 'We embrace new ideas, technologies, and smarter ways of working to create better solutions.' },
              { title: 'Customer Service', desc: 'We are committed to understanding our customers and delivering solutions that exceed their expectations.' },
              { title: 'Accountability', desc: 'We take responsibility for our commitments, decisions, actions, and results.' },
            ].map((val, idx) => (
              <div key={idx} className="p-8 border border-slate-100 shadow-sm rounded-sm hover:border-amber-500 transition duration-300">
                <h4 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h4>
                <p className="text-slate-600">{val.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">9</div>
              <div className="text-slate-600 font-medium">Major Kingdom Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Committed to Vision 2030</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">8+</div>
              <div className="text-slate-600 font-medium">Core Activities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">1</div>
              <div className="text-slate-600 font-medium">Dependable Partner</div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection 
        title="Building Today For A Stronger Tomorrow" 
        description="Discover how our extensive expertise can benefit your next major initiative."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Get in Touch</Button>
        </Link>
      </CTASection>
    </>
  );
}