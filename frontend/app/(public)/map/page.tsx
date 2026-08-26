import { Metadata } from 'next';
import { SaudiMapSection } from '@/components/SaudiMapSection';

export const metadata: Metadata = {
  title: 'Map',
  description: 'Dazz Tradelink operates nationwide across Saudi Arabia — serving Riyadh, Jeddah, Dammam, Madinah, Makkah and more.',
};

export default function MapPage() {
  return (
    <main className="min-h-screen bg-dazz-navy pt-20">
      <SaudiMapSection />
    </main>
  );
}
