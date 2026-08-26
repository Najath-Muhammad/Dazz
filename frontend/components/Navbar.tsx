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
    <header className="bg-dazz-navy border-b border-dazz-navy-dark sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex flex-col justify-center">
              <span className="text-3xl font-serif font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-dazz-gold-light via-dazz-gold to-dazz-gold-dark">
                DAZZ
              </span>
              <span className="text-[0.6rem] font-bold tracking-[0.2em] text-dazz-gold mt-[-4px]">
                TRADELINK INTERNATIONAL
              </span>
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
        <div className="lg:hidden bg-dazz-navy border-b border-dazz-navy-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-dazz-navy-light"
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
