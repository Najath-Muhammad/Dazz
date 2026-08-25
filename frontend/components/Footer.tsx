import React from 'react';
import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
              DAZZ<span className="text-amber-500">.</span>
            </Link>
            <p className="text-sm max-w-sm">
              Delivering excellence across construction, food trading, logistics, and hospitality with industrial precision and corporate integrity.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about-us" className="hover:text-amber-500 transition">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-amber-500 transition">Project Gallery</Link></li>
              <li><Link href="/news" className="hover:text-amber-500 transition">News & Blog</Link></li>
              <li><Link href="/careers-contact" className="hover:text-amber-500 transition">Careers & Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Divisions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/construction" className="hover:text-amber-500 transition">Construction</Link></li>
              <li><Link href="/food-trading" className="hover:text-amber-500 transition">Food Trading</Link></li>
              <li><Link href="/logistics" className="hover:text-amber-500 transition">Logistics</Link></li>
              <li><Link href="/hospitality" className="hover:text-amber-500 transition">Hospitality</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Dazz Tradelink. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
