'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LocationsMap = dynamic(() => import('./LocationsMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-slate-200 animate-pulse flex items-center justify-center">Loading Map...</div> 
});

interface LocationsMapWrapperProps {
  isAr: boolean;
}

export default function LocationsMapWrapper({ isAr }: LocationsMapWrapperProps) {
  const hardcodedLocations = [
    {
      _id: 'loc_riyadh',
      name: { en: 'DAZZ RIYADH', ar: 'داز الرياض' },
      city: { en: 'Riyadh', ar: 'الرياض' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Riyadh Office', ar: 'مكتب الرياض' },
      latitude: 24.7136,
      longitude: 46.6753,
    },
    {
      _id: 'loc_jeddah',
      name: { en: 'DAZZ JEDDAH', ar: 'داز جدة' },
      city: { en: 'Jeddah', ar: 'جدة' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: '4764, King Khalid St, Ash Sharafiyah, Jeddah 22234', ar: '٤٧٦٤، شارع الملك خالد، الشرفية، جدة ٢٢٢٣٤' },
      phone: '+966 59 222 8228',
      email: 'info@dazztradlink.com',
      latitude: 21.5222,
      longitude: 39.1718,
    },
    {
      _id: 'loc_makkah',
      name: { en: 'DAZZ MAKKAH', ar: 'داز مكة المكرمة' },
      city: { en: 'Makkah', ar: 'مكة المكرمة' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Makkah Office', ar: 'مكتب مكة المكرمة' },
      latitude: 21.3891,
      longitude: 39.8579,
    },
    {
      _id: 'loc_madinah',
      name: { en: 'DAZZ MADINAH', ar: 'داز المدينة المنورة' },
      city: { en: 'Madinah', ar: 'المدينة المنورة' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Madinah Office', ar: 'مكتب المدينة المنورة' },
      latitude: 24.5247,
      longitude: 39.5692,
    },
    {
      _id: 'loc_dammam',
      name: { en: 'DAZZ DAMMAM', ar: 'داز الدمام' },
      city: { en: 'Dammam', ar: 'الدمام' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Dammam Office', ar: 'مكتب الدمام' },
      latitude: 26.4207,
      longitude: 50.0888,
    },
    {
      _id: 'loc_alkhobar',
      name: { en: 'DAZZ AL KHOBAR', ar: 'داز الخبر' },
      city: { en: 'Al Khobar', ar: 'الخبر' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Al Khobar Office', ar: 'مكتب الخبر' },
      latitude: 26.2172,
      longitude: 50.1971,
    },
    {
      _id: 'loc_tabuk',
      name: { en: 'DAZZ TABUK', ar: 'داز تبوك' },
      city: { en: 'Tabuk', ar: 'تبوك' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Tabuk Office', ar: 'مكتب تبوك' },
      latitude: 28.3835,
      longitude: 36.5662,
    },
    {
      _id: 'loc_hail',
      name: { en: 'DAZZ HA\'IL', ar: 'داز حائل' },
      city: { en: 'Ha\'il', ar: 'حائل' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Ha\'il Office', ar: 'مكتب حائل' },
      latitude: 27.5219,
      longitude: 41.6907,
    },
    {
      _id: 'loc_abha',
      name: { en: 'DAZZ ABHA', ar: 'داز أبها' },
      city: { en: 'Abha', ar: 'أبها' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { en: 'Abha Office', ar: 'مكتب أبها' },
      latitude: 18.2164,
      longitude: 42.5053,
    },
    {
      _id: 'loc_uae',
      name: { en: 'DAZZ UAE', ar: 'داز الإمارات العربية المتحدة' },
      city: { en: 'Dubai', ar: 'دبي' },
      country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
      address: { en: 'UAE Branch', ar: 'فرع الإمارات العربية المتحدة' },
      latitude: 25.2048,
      longitude: 55.2708,
    },
    {
      _id: 'loc_india',
      name: { en: 'DAZZ INDIA', ar: 'داز الهند' },
      city: { en: 'Mumbai', ar: 'مومباي' },
      country: { en: 'India', ar: 'الهند' },
      address: { en: 'India Branch', ar: 'فرع الهند' },
      latitude: 19.0760,
      longitude: 72.8777,
    },
    {
      _id: 'loc_hk',
      name: { en: 'DAZZ HONG KONG', ar: 'داز هونج كونج' },
      city: { en: 'Hong Kong', ar: 'هونج كونج' },
      country: { en: 'Hong Kong', ar: 'هونج كونج' },
      address: { en: 'Hong Kong Branch', ar: 'فرع هونج كونج' },
      latitude: 22.3193,
      longitude: 114.1694,
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wider">
          {isAr ? 'حضورنا الدولي' : 'INTERNATIONAL PRESENCE'}
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-dazz-gold mb-3">
          {isAr ? 'مواقعنا' : 'OUR LOCATIONS'}
        </h3>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {isAr 
            ? 'حضور عالمي مبني على الثقة، نقدم التميز عبر الحدود وفي مختلف الصناعات.' 
            : 'A global footprint built on trust, delivering excellence across borders and industries.'}
        </p>
      </div>
      <LocationsMap locations={hardcodedLocations} isAr={isAr} />
    </div>
  );
}
