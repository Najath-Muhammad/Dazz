import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ready Mix Concrete',
  description: 'Quality Concrete. Reliable Supply. Every Project. DAZZ Tradelink provides ready mix concrete solutions across Saudi Arabia.',
  alternates: { canonical: '/ready-mix-concrete' },
  openGraph: {
    title: 'Ready Mix Concrete | Dazz Tradelink',
    description: 'Quality Concrete. Reliable Supply. Every Project.',
    url: '/ready-mix-concrete',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Ready Mix Concrete | Dazz Tradelink' }],
  },
};

const capabilities = [
  { icon: '🏭', title: 'Ready Mix Concrete Production', desc: 'State-of-the-art batching plants producing high-grade concrete for every project scale.' },
  { icon: '⚗️', title: 'Customized Concrete Mixes', desc: 'Engineered mixes tailored to specific structural, durability, and environmental requirements.' },
  { icon: '🚛', title: 'Concrete Supply & Delivery', desc: 'Fleet of transit mixer trucks ensuring on-time delivery to sites across the Kingdom.' },
  { icon: '📐', title: 'Project-Based Concrete Solutions', desc: 'Dedicated supply planning and logistics for large-scale and long-duration projects.' },
  { icon: '🔄', title: 'Continuous Supply for Large Projects', desc: 'Uninterrupted concrete supply with 24/7 operational capability when required.' },
  { icon: '💧', title: 'Concrete Pumping Support', desc: 'High-reach concrete pumps for complex structures, elevated works, and tight access areas.' },
  { icon: '📅', title: 'Scheduled & On-Demand Deliveries', desc: 'Flexible delivery scheduling with rapid response for emergency and urgent requirements.' },
  { icon: '✅', title: 'Quality-Controlled Production', desc: 'Rigorous QA/QC processes from raw material sourcing to final delivery certification.' },
];

const applications = [
  { label: 'RESIDENTIAL', ar: 'السكني', icon: '🏠' },
  { label: 'COMMERCIAL', ar: 'التجاري', icon: '🏢' },
  { label: 'INDUSTRIAL', ar: 'الصناعي', icon: '🏭' },
  { label: 'INFRASTRUCTURE', ar: 'البنية التحتية', icon: '🌉' },
  { label: 'ROADS', ar: 'الطرق', icon: '🛣️' },
  { label: 'FOUNDATIONS', ar: 'الأساسات', icon: '⚓' },
  { label: 'STRUCTURAL WORKS', ar: 'الأعمال الإنشائية', icon: '🏗️' },
  { label: 'UTILITY PROJECTS', ar: 'مشاريع المرافق', icon: '⚙️' },
];

const stats = [
  { value: 'QUALITY', sub: 'Consistent Production', ar: 'جودة عالية — إنتاج متناسق', icon: '🏅' },
  { value: 'CAPACITY', sub: 'Project-Scale Supply', ar: 'قدرات إنتاجية — تلبية احتياجات المشاريع', icon: '📊' },
  { value: 'DELIVERY', sub: 'Reliable Logistics', ar: 'تسليم موثوق — خدمات لوجستية موثوقة', icon: '🚛' },
  { value: 'CONTROL', sub: 'Quality-Focused Operations', ar: 'رقابة صارمة — عمليات تركز على الجودة', icon: '🎯' },
];

export default function ReadyMixConcretePage() {
  return (
    <>
      <HeroSection
        title="READY MIX CONCRETE"
        subtitle="Quality Concrete. Reliable Supply. Every Project."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      {/* About Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div>
                <p className="text-dazz-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">About Our Division</p>
                <SectionTitle title="Ready Mix Concrete Division" subtitle="DAZZ Tradlink International" />
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed mt-6">
                  <p>
                    DAZZ Tradelink International provides reliable ready mix concrete solutions for a wide range of construction and infrastructure projects across the Kingdom of Saudi Arabia.
                  </p>
                  <p>
                    Our ready mix concrete operations are focused on delivering consistent-quality concrete, dependable supply, and efficient delivery to meet the demanding requirements of modern construction projects.
                  </p>
                  <p>
                    From foundations and structural works to roads, commercial developments, industrial facilities, and infrastructure projects, we provide concrete solutions tailored to project requirements.
                  </p>
                </div>
                <p className="mt-6 text-slate-400 italic text-base" dir="rtl">
                  خرسانة عالية الجودة. توريد موثوق لكل مشروع.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div className="relative h-[480px] rounded-xl overflow-hidden bg-dazz-navy shadow-2xl">
                {/* Placeholder for actual project image */}
                <div className="absolute inset-0 bg-gradient-to-br from-dazz-navy via-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center text-white/20">
                    <div className="text-8xl mb-4">🏭</div>
                    <p className="text-sm tracking-widest uppercase">Ready Mix Plant</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dazz-navy to-transparent">
                  <span className="text-dazz-gold text-xs tracking-[0.2em] uppercase font-bold">DAZZ Tradelink International</span>
                  <p className="text-white font-bold text-xl mt-1">Ready Mix Concrete</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-slate-50">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <SectionTitle title="Our Capabilities" subtitle="What We Deliver" alignment="center" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md hover:border-dazz-gold/30 transition-all duration-300 group">
                  <div className="text-3xl mb-4">{cap.icon}</div>
                  <h4 className="text-base font-bold text-dazz-navy mb-2 group-hover:text-dazz-gold transition-colors">{cap.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-24 bg-dazz-navy text-white">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-dazz-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Where We Apply It</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Our Applications</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {applications.map((app, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="group border border-dazz-gold/10 rounded-lg p-6 text-center hover:bg-dazz-gold/10 hover:border-dazz-gold/40 transition-all duration-300 cursor-default">
                  <div className="text-4xl mb-4">{app.icon}</div>
                  <p className="text-white font-bold text-sm tracking-widest mb-1">{app.label}</p>
                  <p className="text-slate-400 text-xs" dir="rtl">{app.ar}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-slate-950">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <p className="text-dazz-gold font-bold text-lg tracking-widest mb-1">{stat.value}</p>
                  <p className="text-white text-sm font-medium mb-1">{stat.sub}</p>
                  <p className="text-slate-500 text-xs" dir="rtl">{stat.ar}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Commitment Quote */}
      <section className="py-16 bg-slate-900">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-dazz-gold text-6xl font-serif leading-none block mb-4">"</span>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed italic">
                We are committed to delivering high-quality ready mix concrete solutions that build stronger structures and better communities.
              </p>
              <p className="text-slate-400 text-base mt-4 leading-relaxed" dir="rtl">
                نلتزم بتقديم حلول خرسانة جاهزة عالية الجودة تساهم في بناء منشآت أكثر متانة ومجتمعات أفضل.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <CTASection
        title="Ready to Build With Confidence?"
        description="Contact our Ready Mix Concrete team to discuss your project requirements and get a tailored supply plan."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Request a Quote</Button>
        </Link>
      </CTASection>
    </>
  );
}
