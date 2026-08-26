'use client';
import React, { useRef } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Container } from './Container';

const cities = [
  { name: 'RIYADH', ar: 'الرياض', x: 57, y: 53, isMain: true },
  { name: 'JEDDAH', ar: 'جدة', x: 30, y: 58 },
  { name: 'MAKKAH', ar: 'مكة المكرمة', x: 32, y: 63 },
  { name: 'MADINAH', ar: 'المدينة المنورة', x: 34, y: 44 },
  { name: 'DAMMAM', ar: 'الدمام', x: 74, y: 45 },
  { name: 'AL KHOBAR', ar: 'الخبر', x: 76, y: 49 },
  { name: 'TABUK', ar: 'تبوك', x: 26, y: 26 },
  { name: "HA'IL", ar: 'حائل', x: 48, y: 32 },
  { name: 'ABHA', ar: 'أبها', x: 38, y: 74 },
];

const stats = [
  { icon: '📍', label: 'Nationwide Presence', ar: 'حضور على مستوى المملكة' },
  { icon: '🌐', label: 'Local Expertise, Global Standards', ar: 'خبرات محلية بمعايير عالمية' },
  { icon: '🤝', label: 'Strong Partnerships', ar: 'شراكات قوية وعلاقات مستدامة' },
  { icon: '📈', label: 'Committed to Saudi Vision 2030', ar: 'ملتزمون برؤية السعودية 2030' },
];

const services = [
  { icon: '🏗️', en: 'CONSTRUCTION', ar: 'الإنشاءات' },
  { icon: '⚙️', en: 'INDUSTRIAL SOLUTIONS', ar: 'الحلول الصناعية' },
  { icon: '🚛', en: 'EQUIPMENT & MATERIALS SUPPLY', ar: 'توريد المعدات والمواد' },
  { icon: '💼', en: 'TRADING SERVICES', ar: 'الخدمات التجارية' },
];

export function SaudiMapSection() {
  return (
    <section className="relative bg-dazz-navy py-24 overflow-hidden" id="map">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(196,160,68,0.4) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-dazz-gold text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Presence</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2">
              WE ARE IN
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-dazz-gold tracking-tighter">
              SAUDI ARABIA
            </h3>
            <p className="text-slate-400 text-sm mt-4" dir="rtl">نحن في المملكة العربية السعودية</p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          {/* Left — Stats */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                Proudly operating across the Kingdom, delivering trusted solutions and building stronger communities with nationwide presence and local expertise meeting global standards.
              </p>
              {stats.map((stat, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-dazz-gold/30 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-dazz-gold/10 transition-colors">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{stat.label}</p>
                    <p className="text-slate-500 text-xs mt-0.5" dir="rtl">{stat.ar}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Center — Saudi Arabia SVG Map */}
          <ScrollReveal>
            <div className="relative w-full max-w-sm mx-auto aspect-square">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-dazz-gold/5 blur-3xl" />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 30px rgba(196,160,68,0.15))' }}
              >
                {/* Saudi Arabia shape (approximate polygon) */}
                <polygon
                  points="20,18 42,12 58,12 70,18 82,22 90,30 92,40 88,52 84,60 80,70 72,82 62,88 52,90 44,88 36,80 26,72 20,64 16,56 14,46 16,34"
                  fill="rgba(196,160,68,0.08)"
                  stroke="rgba(196,160,68,0.4)"
                  strokeWidth="0.5"
                />

                {/* City markers */}
                {cities.map((city) => (
                  <g key={city.name}>
                    {/* Pulse ring for main city */}
                    {city.isMain && (
                      <>
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r="4"
                          fill="none"
                          stroke="rgba(196,160,68,0.3)"
                          strokeWidth="0.5"
                          className="animate-ping"
                          style={{ transformOrigin: `${city.x}px ${city.y}px`, animationDuration: '2s' }}
                        />
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r="2.5"
                          fill="none"
                          stroke="rgba(196,160,68,0.5)"
                          strokeWidth="0.5"
                          className="animate-ping"
                          style={{ transformOrigin: `${city.x}px ${city.y}px`, animationDuration: '2.5s', animationDelay: '0.5s' }}
                        />
                      </>
                    )}
                    {/* Dot */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={city.isMain ? 2 : 1.2}
                      fill={city.isMain ? '#c4a044' : '#c4a04488'}
                    />
                    {/* City name */}
                    <text
                      x={city.x}
                      y={city.y - 3.5}
                      fontSize={city.isMain ? '2.8' : '2'}
                      fill={city.isMain ? '#c4a044' : '#ffffff88'}
                      textAnchor="middle"
                      fontWeight={city.isMain ? 'bold' : 'normal'}
                      letterSpacing="0.05"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </ScrollReveal>

          {/* Right — Where We Serve */}
          <ScrollReveal direction="left">
            <div>
              <div className="border border-dazz-gold/20 rounded-lg p-6 bg-white/5 backdrop-blur-sm mb-6">
                <h4 className="text-dazz-gold text-xs font-bold tracking-[0.2em] uppercase mb-5">
                  WHERE WE SERVE
                </h4>
                <div className="space-y-4">
                  {services.map((service, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                      <div className="text-2xl">{service.icon}</div>
                      <div>
                        <p className="text-white text-sm font-bold tracking-wide">{service.en}</p>
                        <p className="text-slate-500 text-xs mt-0.5" dir="rtl">{service.ar}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA tagline */}
              <div className="text-center border-t border-dazz-gold/10 pt-6">
                <p className="text-white font-bold text-lg tracking-wide">BUILDING TODAY</p>
                <p className="text-white font-bold text-lg tracking-wide">FOR A BETTER TOMORROW</p>
                <p className="text-slate-400 text-sm mt-1" dir="rtl">نبني اليوم من أجل غد أفضل</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </Container>
    </section>
  );
}
