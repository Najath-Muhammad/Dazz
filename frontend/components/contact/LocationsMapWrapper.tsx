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
      _id: 'loc_saudi',
      name: { en: 'DAZZ SAUDI ARABIA (HQ)', ar: 'داز المملكة العربية السعودية (المقر الرئيسي)' },
      city: { en: 'Jeddah', ar: 'جدة' },
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      address: { 
        en: '306, Commercial Business Centre – 4746, King Khalid Street, Al Baghdadiyah, Jeddah, Saudi Arabia', 
        ar: '٣٠٦، مركز الأعمال التجاري – ٤٧٤٦، شارع الملك خالد، البغدادية، جدة، المملكة العربية السعودية' 
      },
      phone: '+966 53 083 3855',
      email: 'info@dazztradlink.com',
      latitude: 21.5222,
      longitude: 39.1718,
      type: { en: 'Headquarters', ar: 'المقر الرئيسي' }
    },
    {
      _id: 'loc_uae',
      name: { en: 'DAZZ UNITED ARAB EMIRATES', ar: 'داز الإمارات العربية المتحدة' },
      city: { en: 'Sharjah', ar: 'الشارقة' },
      country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
      address: { 
        en: 'Business Centre, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates', 
        ar: 'مركز الأعمال، مدينة الشارقة للنشر المنطقة الحرة، الشارقة، الإمارات العربية المتحدة' 
      },
      phone: '+971 56 578 6797',
      email: 'info@dazztradlink.com',
      latitude: 25.3216,
      longitude: 55.4851,
      type: { en: 'Regional Office', ar: 'مكتب إقليمي' }
    },
    {
      _id: 'loc_india',
      name: { en: 'DAZZ INDIA', ar: 'داز الهند' },
      city: { en: 'Kerala', ar: 'كيرالا' },
      country: { en: 'India', ar: 'الهند' },
      address: { 
        en: 'No. IX/344, Uppidiyan House, Palunda, Chungathara, Nilambur, Malappuram – 679334, Kerala, India', 
        ar: 'رقم IX/344، منزل أوبيديان، بالوندا، تشونغاثارا، نيلامبور، مالابورام - ٦٧٩٣٣٤، كيرالا، الهند' 
      },
      phone: '+91 81118 84000',
      email: 'info@dazztradlink.com',
      latitude: 11.2721,
      longitude: 76.2421,
      type: { en: 'Regional Office', ar: 'مكتب إقليمي' }
    },
    {
      _id: 'loc_hk',
      name: { en: 'DAZZ HONG KONG', ar: 'داز هونج كونج' },
      city: { en: 'Central', ar: 'سنترال' },
      country: { en: 'Hong Kong', ar: 'هونج كونج' },
      address: { 
        en: 'Unit 2904–05, 29/F, Universal Trade Centre, 3 Arbuthnot Road, Central, Hong Kong', 
        ar: 'الوحدة ٢٩٠٤-٠٥، الطابق ٢٩، مركز التجارة العالمي، ٣ طريق أربوثنوت، سنترال، هونغ كونغ' 
      },
      email: 'info@dazztradlink.com',
      latitude: 22.2800,
      longitude: 114.1558,
      type: { en: 'Regional Office', ar: 'مكتب إقليمي' }
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-wider ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
          {isAr ? 'حضورنا الدولي' : 'INTERNATIONAL PRESENCE'}
        </h2>
        <h3 className={`text-xl md:text-2xl font-bold text-dazz-gold mb-3 ${isAr ? 'font-arabic' : ''}`}>
          {isAr ? 'مواقعنا' : 'OUR LOCATIONS'}
        </h3>
        <p className={`text-lg text-slate-500 max-w-2xl mx-auto ${isAr ? 'font-arabic' : ''}`}>
          {isAr 
            ? 'حضور عالمي مبني على الثقة، نقدم التميز عبر الحدود وفي مختلف الصناعات.' 
            : 'A global footprint built on trust, delivering excellence across borders and industries.'}
        </p>
      </div>
      <LocationsMap locations={hardcodedLocations} isAr={isAr} />
    </div>
  );
}
