import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { ImageTextSection } from '@/components/ImageTextSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Construction & Industrial Solutions',
  description: 'Delivering Quality Solutions Across Construction and Industry. Integrated Solutions... Trusted Partner.',
  alternates: {
    canonical: '/construction',
  },
  openGraph: {
    title: 'Construction & Industrial Solutions | Dazz Tradlink',
    description: 'Delivering Quality Solutions Across Construction and Industry. Integrated Solutions... Trusted Partner.',
    url: '/construction',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Construction | Dazz Tradlink',
      }
    ],
  },
};

export default function ConstructionPage() {
  return (
    <>
      <HeroSection 
        title="Construction & Industry"
        subtitle="Delivering Quality Solutions Across Construction and Industry. Integrated Solutions... Trusted Partner."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <ImageTextSection 
        title="Ready Mix Concrete"
        subtitle="Quality Concrete. Reliable Supply. Every Project."
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        imageAlt="Ready Mix Concrete Trucks"
        content={
          <>
            <p>
              DAZZ Tradlink International provides reliable ready mix concrete solutions for a wide range of construction and infrastructure projects across the Kingdom of Saudi Arabia.
            </p>
            <p>
              Our ready mix concrete operations are focused on delivering consistent-quality concrete, dependable supply, and efficient delivery to meet the demanding requirements of modern construction projects.
            </p>
            <p>
              From foundations and structural works to roads, commercial developments, industrial facilities, and infrastructure projects, we provide concrete solutions tailored to project requirements.
            </p>
            <div className="mt-6">
              <span className="font-bold text-slate-900 block mb-2">Our Capabilities Include:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <li>• Ready Mix Concrete Production</li>
                <li>• Customized Concrete Mixes</li>
                <li>• Concrete Supply & Delivery</li>
                <li>• Project-Based Concrete Solutions</li>
                <li>• Continuous Supply for Large Projects</li>
                <li>• Concrete Pumping Support</li>
                <li>• Scheduled & On-Demand Deliveries</li>
                <li>• Quality-Controlled Production</li>
              </ul>
            </div>
          </>
        }
      />

      <section className="py-24 bg-slate-50">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <SectionTitle title="Our Core Services" subtitle="Capabilities" alignment="center" />
            <p className="text-lg text-slate-600 mt-4">
              Delivering quality solutions in multiple specialized sectors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Ready Mix Concrete', desc: 'High quality ready mix concrete for all construction needs, delivered on time.' },
              { title: 'Piling & DTH Drilling', desc: 'Professional piling and DTH drilling services for strong and reliable foundations.' },
              { title: 'Equipment Supply', desc: 'Supply of a wide range of construction equipment to support your projects.' },
              { title: 'Raw Materials Supply', desc: 'Reliable supply of construction raw materials to meet diverse project requirements.' },
              { title: 'Cement Trading', desc: 'Trading and supply of high quality cement from trusted manufacturers.' },
              { title: 'DTH Machine Supply', desc: 'Supply of advanced DTH piling machines for efficient and reliable performance.' },
              { title: 'Waste Management', desc: 'Efficient and responsible waste management solutions for a cleaner environment.' }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white p-8 border border-slate-100 shadow-sm rounded-sm hover:shadow-md transition">
                <div className="text-amber-500 font-bold text-2xl mb-4">0{idx + 1}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h4>
                <p className="text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="bg-slate-950 text-white rounded-xl p-12 lg:p-16 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm block mb-4">Our Commitment</span>
                <h3 className="text-3xl font-bold mb-6">Sustainability & Responsible Business</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  At DAZZ Tradlink International, sustainability is integrated into the way we work, plan and grow. We are committed to protecting the environment, using resources responsibly, and creating long-term value for our people, partners and communities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-white mb-2">Resource Efficiency</h5>
                    <p className="text-sm text-slate-400">Optimizing the use of materials, energy and water in our operations.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-2">Responsible Waste</h5>
                    <p className="text-sm text-slate-400">Promoting waste reduction, recycling and safe disposal across our activities.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 p-8 rounded-lg border border-slate-800">
                <h4 className="text-xl font-bold text-white mb-6">Our Sustainability Promise</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">✓</div>
                    <div>
                      <strong className="block text-white">Comply</strong>
                      <span className="text-sm text-slate-400">We comply with environmental laws and regulations.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">✓</div>
                    <div>
                      <strong className="block text-white">Improve</strong>
                      <span className="text-sm text-slate-400">We continually improve our processes to reduce environmental impact.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">✓</div>
                    <div>
                      <strong className="block text-white">Engage</strong>
                      <span className="text-sm text-slate-400">We engage our people and partners in our sustainability journey.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection 
        title="Quality Is Our Promise. Excellence Is Our Standard." 
        description="Partner with DAZZ Tradlink International for reliable solutions with quality you can trust."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Request a Consultation</Button>
        </Link>
      </CTASection>
    </>
  );
}