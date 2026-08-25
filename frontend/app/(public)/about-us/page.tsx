import { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { ImageTextSection } from '@/components/ImageTextSection';
import { CTASection } from '@/components/CTASection';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Dazz Tradelink, our mission, vision, and core values that drive our excellence across multiple industries.',
  alternates: {
    canonical: '/about-us',
  },
  openGraph: {
    title: 'About Us | Dazz Tradelink',
    description: 'Learn about Dazz Tradelink, our mission, vision, and core values that drive our excellence across multiple industries.',
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
        title="Our Story"
        subtitle="A heritage of industrial excellence and corporate integrity driving sustainable growth."
        backgroundImage="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
      />

      <ImageTextSection 
        title="Who We Are"
        subtitle="Introduction"
        imageUrl="https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg"
        imageAlt="Dazz Tradelink Corporate Headquarters"
        content={
          <>
            <p>
              Dazz Tradelink is a premier corporate conglomerate with established footprints in construction, food trading, logistics, and hospitality. For years, we have been setting industry benchmarks through our unwavering commitment to quality and innovation.
            </p>
            <p>
              We believe in creating synergies across our diverse divisions, enabling us to provide comprehensive, turnkey solutions that cater to the evolving needs of our global clientele.
            </p>
          </>
        }
      />

      <section className="py-24 bg-slate-950 text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm block mb-4">Vision</span>
              <h3 className="text-3xl font-bold mb-6">Pioneering the Future of Global Trade & Infrastructure</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                To be the world's most trusted partner in industrial development, continuously expanding our reach while maintaining the highest standards of sustainability and excellence.
              </p>
            </div>
            <div>
              <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm block mb-4">Mission</span>
              <h3 className="text-3xl font-bold mb-6">Delivering Unparalleled Value</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                We strive to exceed expectations by leveraging cutting-edge technology, cultivating top-tier talent, and fostering long-term partnerships built on transparency and mutual growth.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-100 shadow-sm rounded-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Integrity</h4>
              <p className="text-slate-600">We conduct our business with the highest ethical standards, ensuring transparency in every transaction.</p>
            </div>
            <div className="p-8 border border-slate-100 shadow-sm rounded-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Excellence</h4>
              <p className="text-slate-600">We pursue perfection in our operations, constantly seeking ways to improve and innovate.</p>
            </div>
            <div className="p-8 border border-slate-100 shadow-sm rounded-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Commitment</h4>
              <p className="text-slate-600">We are deeply committed to our clients, our employees, and the communities in which we operate.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">25+</div>
              <div className="text-slate-600 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">10k+</div>
              <div className="text-slate-600 font-medium">Global Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">5k+</div>
              <div className="text-slate-600 font-medium">Team Members</div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection 
        title="Join Our Growing Network" 
        description="Discover how our extensive expertise can benefit your next major initiative."
      >
        <Link href="/careers-contact">
          <Button variant="secondary">Get in Touch</Button>
        </Link>
      </CTASection>
    </>
  );
}