import React from 'react';
import Link from 'next/link';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Divisions', href: '/en/services' },
  { name: 'Project Gallery', href: '/projects' },
  { name: 'Blog', href: '/news' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact Us', href: '/contact' },
];

const divisionLinks = [
  { name: 'Construction', href: '/en/services' },
  { name: 'Food Trading', href: '/en/services' },
  { name: 'Logistics', href: '/en/services' },
  { name: 'Hospitality', href: '/en/services' },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5" aria-label="Site footer">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 md:py-20">

          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" aria-label="Dazz Tradelink — Home" className="inline-block mb-6">
              <span className="block text-4xl font-serif font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 leading-none">
                DAZZ
              </span>
              <span className="block text-[0.55rem] font-bold tracking-[0.22em] text-white/40 mt-[-2px]">
                TRADELINK INTERNATIONAL
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs font-light">
              Delivering excellence across construction, food trading, logistics, and hospitality — with industrial precision and corporate integrity across the Kingdom of Saudi Arabia.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-8 bg-amber-500/50" />
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-slate-500">Integrated Solutions. Trusted Partner.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-amber-500" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-amber-500" />
              Divisions
            </h3>
            <ul className="space-y-3">
              {divisionLinks.map((link, i) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 font-light group"
                  >
                    <span className="text-[10px] font-mono text-amber-500/40 group-hover:text-amber-500/80 transition-colors">0{i + 1}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-3">
                <span className="w-4 h-px bg-amber-500" />
                Contact
              </h3>
              <ul className="space-y-2 text-sm font-light">
                <li className="text-slate-400">Kingdom of Saudi Arabia</li>
                <li>
                  <a href="mailto:info@dazztradelink.com" className="text-slate-400 hover:text-amber-400 transition-colors">
                    info@dazztradelink.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-light tracking-wide">
            &copy; {new Date().getFullYear()} Dazz Tradelink International. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="text-xs text-slate-600 hover:text-amber-400 transition-colors tracking-wide">Privacy Policy</Link>
            <Link href="/contact" className="text-xs text-slate-600 hover:text-amber-400 transition-colors tracking-wide">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
