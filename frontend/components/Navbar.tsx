'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const divisions = [
  { id: '01', name: 'CONSTRUCTION', href: '/en/services', desc: 'Infrastructure & Building' },
  { id: '02', name: 'FOOD TRADING', href: '/en/services', desc: 'Global Supply & Distribution' },
  { id: '03', name: 'LOGISTICS', href: '/en/services', desc: 'Fleet & Supply Chain' },
  { id: '04', name: 'HOSPITALITY', href: '/en/services', desc: 'Luxury Property Management' },
];

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT US', href: '/about-us' },
  { name: 'DIVISIONS', href: '#divisions', hasMega: true },
  { name: 'PROJECT GALLERY', href: '/projects' },
  { name: 'BLOG', href: '/news' },
  { name: 'CAREERS', href: '/careers' },
  { name: 'CONTACT US', href: '/contact' },
];

const allMenuLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT US', href: '/about-us' },
  { name: 'DIVISIONS', href: null, children: divisions },
  { name: 'PROJECT GALLERY', href: '/projects' },
  { name: 'BLOG', href: '/news' },
  { name: 'CAREERS', href: '/careers' },
  { name: 'CONTACT US', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileDivisionsOpen, setMobileDivisionsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isArabic = pathname.startsWith('/ar');

  const toggleLanguage = useCallback(() => {
    if (isArabic) {
      const newPath = pathname.replace(/^\/ar/, '/en');
      router.push(newPath === '/en' || newPath === '/en/' ? '/' : newPath);
    } else if (pathname.startsWith('/en')) {
      router.push(pathname.replace(/^\/en/, '/ar'));
    } else {
      router.push('/ar' + (pathname === '/' ? '' : pathname));
    }
  }, [pathname, isArabic, router]);

  const getLocalizedHref = useCallback((href: string | null) => {
    if (!href) return null;
    if (!isArabic) {
      // Return English equivalent
      if (href.startsWith('/ar/')) return href.replace(/^\/ar/, '/en');
      if (href === '/ar') return '/';
      return href;
    }
    // Return Arabic equivalent
    if (href.startsWith('/en/')) return href.replace(/^\/en/, '/ar');
    if (href === '/en') return '/ar';
    if (href === '/') return '/ar';
    if (href.startsWith('/') && !href.startsWith('/ar/')) return `/ar${href}`;
    return href;
  }, [isArabic]);

  // Localize division texts
  const localizedDivisions = divisions.map(div => ({
    ...div,
    href: getLocalizedHref(div.href) || div.href,
    name: isArabic ? (
      div.id === '01' ? 'المقاولات' : 
      div.id === '02' ? 'التجارة الغذائية' : 
      div.id === '03' ? 'الخدمات اللوجستية' : 'الضيافة'
    ) : div.name,
    desc: isArabic ? (
      div.id === '01' ? 'البنية التحتية والمباني' : 
      div.id === '02' ? 'التوريد والتوزيع العالمي' : 
      div.id === '03' ? 'الأساطيل وسلاسل الإمداد' : 'إدارة العقارات الفاخرة'
    ) : div.desc
  }));

  const localizedNavLinks = navLinks.map(link => ({
    ...link,
    href: getLocalizedHref(link.href) || link.href,
    name: isArabic ? (
      link.name === 'HOME' ? 'الرئيسية' :
      link.name === 'ABOUT US' ? 'من نحن' :
      link.name === 'DIVISIONS' ? 'أقسامنا' :
      link.name === 'PROJECT GALLERY' ? 'معرض المشاريع' :
      link.name === 'BLOG' ? 'المدونة' :
      link.name === 'CAREERS' ? 'الوظائف' : 'اتصل بنا'
    ) : link.name
  }));

  const localizedAllMenuLinks = allMenuLinks.map(link => ({
    ...link,
    href: getLocalizedHref(link.href),
    name: isArabic ? (
      link.name === 'HOME' ? 'الرئيسية' :
      link.name === 'ABOUT US' ? 'من نحن' :
      link.name === 'DIVISIONS' ? 'أقسامنا' :
      link.name === 'PROJECT GALLERY' ? 'معرض المشاريع' :
      link.name === 'BLOG' ? 'المدونة' :
      link.name === 'CAREERS' ? 'الوظائف' : 'اتصل بنا'
    ) : link.name,
    children: link.children ? localizedDivisions : undefined
  }));

  const isActive = useCallback((href: string | null | undefined) => {
    if (!href) return pathname.includes('/services');
    if (href === '/') return pathname === '/' || pathname === '/en' || pathname === '/ar';
    if (href === '#divisions') return pathname.includes('/services');
    return pathname.includes(href);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega on route change
  useEffect(() => {
    setMegaOpen(false);
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const openMega = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMegaOpen(true);
  }, []);

  const closeMegaDelayed = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  // Mega menu animation
  useEffect(() => {
    if (!megaRef.current) return;
    if (megaOpen) {
      gsap.fromTo(megaRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [megaOpen]);

  const { contextSafe } = useGSAP({ scope: menuRef });

  const toggleMenu = contextSafe(() => {
    if (!isOpen) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      gsap.set(menuRef.current, { display: 'flex' });
      gsap.to(menuRef.current, { clipPath: 'circle(150% at 95% 5%)', duration: 0.9, ease: 'power3.inOut' });
      gsap.fromTo('.menu-link-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 95% 5%)',
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          setIsOpen(false);
          setMobileDivisionsOpen(false);
          document.body.style.overflow = '';
        }
      });
    }
  });

  const handleDivisionsKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setMegaOpen(v => !v);
    }
    if (e.key === 'Escape') setMegaOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-dazz-navy/95 backdrop-blur-md py-4 shadow-xl shadow-black/20' : 'bg-transparent py-7'
        }`}
        role="banner"
      >
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href={isArabic ? '/ar' : '/'} aria-label="Dazz Tradlink — Home">
            <div className={`transition-transform duration-500 relative h-16 w-56 md:h-20 md:w-64 ${scrolled ? 'scale-90' : 'scale-100'}`}>
              <Image 
                src="/images/logo-transparent.png" 
                alt="DAZZ Tradlink" 
                fill
                priority
                loading="eager"
                sizes="250px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-8 ${isArabic ? 'font-arabic' : ''}`} aria-label="Main navigation">
            {localizedNavLinks.map((link) =>
              link.hasMega ? (
                <div key={link.name} className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMegaDelayed}
                >
                  <button
                    onMouseEnter={openMega}
                    onClick={() => setMegaOpen(v => !v)}
                    onKeyDown={handleDivisionsKey}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    className={`flex items-center gap-1.5 text-xs font-bold tracking-widest relative group cursor-pointer transition-colors ${isArabic ? 'uppercase-none text-base' : 'uppercase'} ${
                      isActive(link.href) ? 'text-dazz-gold' : 'text-white/80 hover:text-dazz-gold'
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={12} className={`transition-transform duration-300 ${megaOpen ? 'rotate-180 text-dazz-gold' : ''}`} />
                    <span className={`absolute -bottom-2 left-0 h-px bg-dazz-gold transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </button>

                  {/* Mega Menu — pt-3 bridges the gap so mouse doesn't leave the zone */}
                  {megaOpen && (
                    <div
                      ref={megaRef}
                      role="menu"
                      onMouseEnter={openMega}
                      onMouseLeave={closeMegaDelayed}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[420px]"
                    >
                      <div className="bg-dazz-navy border border-white/10 shadow-2xl shadow-black/50">
                        {/* Gold top border */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-dazz-gold to-transparent" />
                        <div className="p-4 flex flex-col gap-1">
                          {localizedDivisions.map((div) => (
                            <Link
                              key={div.id}
                              href={div.href}
                              role="menuitem"
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center gap-4 p-3.5 group hover:bg-white/5 rounded transition-colors duration-200"
                            >
                              <span className="text-xs font-mono text-dazz-gold/70 flex-shrink-0 font-bold">{div.id}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold tracking-widest text-white group-hover:text-dazz-gold transition-colors ${isArabic ? 'uppercase-none text-base' : 'uppercase'}`}>
                                  {div.name}
                                </p>
                                <p className="text-xs text-white/50 mt-0.5 font-light truncate">{div.desc}</p>
                              </div>
                              <ArrowUpRight size={14} className="text-white/20 group-hover:text-dazz-gold transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-200" />
                            </Link>
                          ))}
                        </div>
                        <div className="px-6 pb-4 pt-3 border-t border-white/5">
                          <Link
                            href={getLocalizedHref('/en/services') || '/services'}
                            onClick={() => setMegaOpen(false)}
                            className={`flex items-center justify-between text-xs font-bold tracking-widest text-white/50 hover:text-dazz-gold transition-colors ${isArabic ? 'uppercase-none' : 'uppercase'}`}
                          >
                            <span>{isArabic ? 'عرض جميع الخدمات' : 'VIEW ALL SERVICES'}</span>
                            <span className="w-8 h-px bg-current" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold tracking-widest relative group transition-colors ${isArabic ? 'uppercase-none text-base' : 'uppercase'} ${
                    isActive(link.href) ? 'text-dazz-gold' : 'text-white/80 hover:text-dazz-gold'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-px bg-dazz-gold transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            )}
          </nav>

          {/* Right Actions: Language + Mobile Toggle */}
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/80 hover:text-dazz-gold transition-colors"
              title={isArabic ? 'Switch to English' : 'Switch to Arabic'}
            >
              <Globe size={14} className="opacity-80" />
              <span className="uppercase">{isArabic ? 'EN' : 'عربي'}</span>
            </button>

            {/* Mobile Toggle */}
            <button
              suppressHydrationWarning
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-dazz-gold flex items-center gap-2.5 text-xs tracking-widest font-bold uppercase"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span>MENU</span>
              <div className="w-6 flex flex-col gap-1.5 items-end">
                <span className="w-full h-px bg-current block" />
                <span className="w-2/3 h-px bg-current block" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-dazz-navy z-[60] flex-col justify-center items-center overflow-y-auto"
        style={{ clipPath: 'circle(0% at 95% 5%)', display: isOpen ? 'flex' : 'none' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          onClick={toggleMenu}
          className="absolute top-7 right-6 text-white hover:text-dazz-gold text-xs tracking-widest uppercase font-bold flex items-center gap-2"
          aria-label="Close menu"
        >
          CLOSE <span className="text-base leading-none">[✕]</span>
        </button>

        <div className="flex flex-col items-start px-10 md:px-20 space-y-3 w-full max-w-lg py-20">
          {localizedAllMenuLinks.map((link, index) =>
            link.children ? (
              <div key={link.name} className="menu-link-item w-full">
                <button 
                  onClick={() => setMobileDivisionsOpen(!mobileDivisionsOpen)}
                  className={`flex items-center gap-4 text-3xl md:text-4xl font-serif font-bold transition-colors w-full text-left ${isArabic ? 'font-arabic text-right' : ''} ${
                    isActive(link.href!) ? 'text-dazz-gold' : 'text-white/80 hover:text-dazz-gold'
                  }`}
                >
                  <span className="text-sm font-mono text-dazz-gold/50 w-8 flex-shrink-0">0{index + 1}</span>
                  <span>{link.name}</span>
                  <ChevronDown size={20} className={`ml-auto transition-transform ${mobileDivisionsOpen ? 'rotate-180 text-dazz-gold' : 'text-white/30'}`} />
                </button>
                {mobileDivisionsOpen && (
                  <div className="ml-12 mt-3 space-y-2 border-l border-dazz-gold/20 pl-5">
                    {link.children.map((div) => (
                      <Link
                        key={div.id}
                        href={div.href}
                        onClick={toggleMenu}
                        className={`flex items-center gap-3 py-2 text-sm font-bold tracking-widest text-white/50 hover:text-dazz-gold transition-colors ${isArabic ? 'font-arabic uppercase-none' : 'uppercase'}`}
                      >
                        <span className="text-xs font-mono text-dazz-gold/40">{div.id}</span>
                        {div.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={link.name} className="menu-link-item w-full">
                <Link
                  href={link.href!}
                  onClick={toggleMenu}
                  className={`flex items-center gap-4 text-3xl md:text-4xl font-serif font-bold transition-colors ${isArabic ? 'font-arabic text-right' : ''} ${
                    isActive(link.href) ? 'text-dazz-gold' : 'text-white/80 hover:text-dazz-gold'
                  }`}
                >
                  <span className="text-sm font-mono text-dazz-gold/50 w-8 flex-shrink-0">0{index + 1}</span>
                  {link.name}
                </Link>
              </div>
            )
          )}
        </div>
        {/* Bottom line */}
        <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between opacity-30">
          <div className="h-px flex-1 bg-white/20" />
          <span className="px-4 text-xs tracking-widest text-white/40 uppercase font-mono">DAZZ TRADLINK INTERNATIONAL</span>
          <div className="h-px flex-1 bg-white/20" />
        </div>
      </div>
    </>
  );
}
