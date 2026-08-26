'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/divisions-services' },
  { name: 'Contact With Us', href: '/careers-contact' },
  { name: 'Map', href: '/map' },
  { name: 'Others', href: '/others' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  
  // Scroll detection for Navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fullscreen Menu GSAP Animation
  const { contextSafe } = useGSAP({ scope: menuRef });
  
  const toggleMenu = contextSafe(() => {
    if (!isOpen) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      // Animate In
      gsap.to(menuRef.current, { clipPath: 'circle(150% at 95% 5%)', duration: 1, ease: 'power3.inOut' });
      gsap.fromTo('.menu-link', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', delay: 0.4 }
      );
    } else {
      // Animate Out
      gsap.to(menuRef.current, { 
        clipPath: 'circle(0% at 95% 5%)', 
        duration: 0.8, 
        ease: 'power3.inOut',
        onComplete: () => {
          setIsOpen(false);
          document.body.style.overflow = 'auto';
        }
      });
    }
  });

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-dazz-navy/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'}`}>
        <Container>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className={`transition-transform duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
              <Link href="/" className="flex flex-col justify-center">
                <span className="text-3xl font-serif font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-dazz-gold-light via-dazz-gold to-dazz-gold-dark">
                  DAZZ
                </span>
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-white mt-[-4px]">
                  TRADELINK INTERNATIONAL
                </span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold tracking-widest uppercase text-white/80 hover:text-dazz-gold transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-dazz-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <button
                onClick={toggleMenu}
                className="text-sm font-semibold tracking-widest uppercase text-white hover:text-dazz-gold transition-colors ml-4 flex items-center gap-2"
              >
                MENU
                <div className="w-6 flex flex-col gap-1.5 items-end">
                  <span className="w-full h-px bg-current"></span>
                  <span className="w-2/3 h-px bg-current"></span>
                </div>
              </button>
            </div>
            
            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-dazz-gold flex items-center gap-2 text-sm tracking-widest font-bold uppercase"
              >
                MENU
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-dazz-navy z-[60] flex flex-col justify-center items-center"
        style={{ clipPath: 'circle(0% at 95% 5%)', display: isOpen ? 'flex' : 'none' }}
      >
        <button 
          onClick={toggleMenu}
          className="absolute top-8 right-8 text-white hover:text-dazz-gold text-sm tracking-widest uppercase font-bold"
        >
          CLOSE [X]
        </button>
        
        <div ref={linksRef} className="flex flex-col items-center space-y-6">
          {navLinks.map((link, index) => (
            <div key={link.name} className="overflow-hidden">
              <Link
                href={link.href}
                className="menu-link block text-4xl md:text-6xl font-serif font-bold text-white hover:text-dazz-gold transition-colors"
                onClick={toggleMenu}
              >
                <span className="text-sm font-sans tracking-widest text-dazz-gold mr-4 opacity-50 block md:inline-block text-center mb-2 md:mb-0">
                  0{index + 1}
                </span>
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
