'use client';
import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  { id: '01', name: 'Construction & Infrastructure', href: '/en/services?category=construction' },
  { id: '02', name: 'Real Estate & Hospitality', href: '/en/services?category=hospitality' },
  { id: '03', name: 'Trading & Distribution', href: '/en/services?category=food-trading' },
  { id: '04', name: 'Logistics & Environmental Solutions', href: '/en/services?category=logistics' },
];

export function Footer() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');

  const getLocalizedHref = useCallback((href: string | null) => {
    if (!href) return null;
    if (!isArabic) {
      if (href.startsWith('/ar/')) return href.replace(/^\/ar/, '/en');
      if (href === '/ar') return '/';
      return href;
    }
    if (href.startsWith('/en/')) return href.replace(/^\/en/, '/ar');
    if (href === '/en') return '/ar';
    if (href === '/') return '/ar';
    if (href.startsWith('/') && !href.startsWith('/ar/')) return `/ar${href}`;
    return href;
  }, [isArabic]);

  const localizedQuickLinks = quickLinks.map(link => ({
    ...link,
    href: getLocalizedHref(link.href) || link.href,
    name: isArabic ? (
      link.name === 'Home' ? 'الرئيسية' :
      link.name === 'About Us' ? 'من نحن' :
      link.name === 'Divisions' ? 'أقسامنا' :
      link.name === 'Project Gallery' ? 'معرض المشاريع' :
      link.name === 'Blog' ? 'المدونة' :
      link.name === 'Careers' ? 'الوظائف' : 'اتصل بنا'
    ) : link.name
  }));

  const localizedDivisionLinks = divisionLinks.map(link => ({
    ...link,
    href: getLocalizedHref(link.href) || link.href,
    name: isArabic ? (
      link.id === '01' ? 'المقاولات والبنية التحتية' :
      link.id === '02' ? 'العقارات والضيافة' :
      link.id === '03' ? 'التجارة والتوزيع' : 'الخدمات اللوجستية والحلول البيئية'
    ) : link.name
  }));

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5" aria-label="Site footer">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 md:py-20">

          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href={isArabic ? '/ar' : '/'} aria-label="Dazz Tradlink — Home" className="inline-block mb-6 relative h-16 w-56 md:h-20 md:w-64 hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/logo-transparent.png" 
                alt="DAZZ Tradlink" 
                fill
                sizes="250px"
                className={`object-contain ${isArabic ? 'object-right' : 'object-left'}`}
              />
            </Link>
            <p className={`text-sm leading-relaxed text-slate-400 max-w-xs font-light ${isArabic ? 'font-arabic' : ''}`}>
              {isArabic 
                ? 'نقدم التميز في المقاولات، التجارة الغذائية، الخدمات اللوجستية، والضيافة — بدقة صناعية ونزاهة مؤسسية في جميع أنحاء المملكة العربية السعودية.' 
                : 'Delivering excellence across construction, food trading, logistics, and hospitality — with industrial precision and corporate integrity across the Kingdom of Saudi Arabia.'}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-8 bg-amber-500/50" />
              <span className={`text-[10px] tracking-[0.25em] font-bold uppercase text-slate-500 ${isArabic ? 'font-arabic uppercase-none text-xs tracking-wider' : ''}`}>
                {isArabic ? 'حلول متكاملة. شريك موثوق.' : 'Integrated Solutions. Trusted Partner.'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className={`text-xs font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3 ${isArabic ? 'font-arabic uppercase-none text-sm tracking-wider' : ''}`}>
              <span className="w-4 h-px bg-amber-500" />
              {isArabic ? 'التنقل' : 'Navigation'}
            </h3>
            <ul className="space-y-3">
              {localizedQuickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 font-light ${isArabic ? 'font-arabic' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions Links */}
          <div className="md:col-span-3">
            <h3 className={`text-xs font-bold uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3 ${isArabic ? 'font-arabic uppercase-none text-sm tracking-wider' : ''}`}>
              <span className="w-4 h-px bg-amber-500" />
              {isArabic ? 'الأقسام' : 'Divisions'}
            </h3>
            <ul className="space-y-3">
              {localizedDivisionLinks.map((link, i) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 font-light group ${isArabic ? 'font-arabic' : ''}`}
                  >
                    <span className="text-[10px] font-mono text-amber-500/40 group-hover:text-amber-500/80 transition-colors">0{i + 1}</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-3 ${isArabic ? 'font-arabic uppercase-none text-sm tracking-wider' : ''}`}>
                <span className="w-4 h-px bg-amber-500" />
                {isArabic ? 'اتصل بنا' : 'Contact'}
              </h3>
              <ul className={`space-y-2 text-sm font-light ${isArabic ? 'font-arabic' : ''}`}>
                <li className="text-slate-400">{isArabic ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}</li>
                <li>
                  <a href="mailto:info@dazztradlink.com" className="text-slate-400 hover:text-amber-400 transition-colors">
                    info@dazztradlink.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-xs text-slate-600 font-light tracking-wide ${isArabic ? 'font-arabic' : ''}`}>
            &copy; {new Date().getFullYear()} {isArabic ? 'داز تريدلينك العالمية. جميع الحقوق محفوظة.' : 'Dazz Tradlink International. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <Link href={getLocalizedHref('/contact') || '/contact'} className={`text-xs text-slate-600 hover:text-amber-400 transition-colors tracking-wide ${isArabic ? 'font-arabic' : ''}`}>{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
            <Link href={getLocalizedHref('/contact') || '/contact'} className={`text-xs text-slate-600 hover:text-amber-400 transition-colors tracking-wide ${isArabic ? 'font-arabic' : ''}`}>{isArabic ? 'شروط الاستخدام' : 'Terms of Use'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
