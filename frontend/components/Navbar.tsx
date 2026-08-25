'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from './Container';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Divisions & Services', href: '/divisions-services' },
  { name: 'Construction', href: '/construction' },
  { name: 'Food Trading', href: '/food-trading' },
  { name: 'Logistics', href: '/logistics' },
  { name: 'Hospitality', href: '/hospitality' },
  { name: 'Project Gallery', href: '/projects' },
  { name: 'News & Blog', href: '/news' },
  { name: 'Careers & Contact', href: '/careers-contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              DAZZ<span className="text-amber-500">.</span>
            </Link>
          </div>
          <div className="hidden lg:flex space-x-6">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-slate-300 hover:text-white"
            >
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </Container>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
