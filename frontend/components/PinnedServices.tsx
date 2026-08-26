'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';
import { MediaRenderer } from './MediaRenderer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'CONSTRUCTION',
    description: 'Building the future with precision engineering and sustainable practices. Delivering excellence across the Kingdom.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    link: '/construction',
    tagline: 'Building...'
  },
  {
    id: '02',
    title: 'FOOD TRADING',
    description: 'Global sourcing and distribution of premium quality food products to ensure resilient supply chains.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    link: '/food-trading',
    tagline: 'Connecting...'
  },
  {
    id: '03',
    title: 'LOGISTICS',
    description: 'End-to-end supply chain solutions, advanced fleet management, and rapid distribution networks.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    link: '/logistics',
    tagline: 'Moving...'
  },
  {
    id: '04',
    title: 'HOSPITALITY',
    description: 'Delivering exceptional service and world-class guest experiences through premium property management.',
    image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg',
    link: '/hospitality',
    tagline: 'Creating...'
  }
];

export function PinnedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.service-panel');
    const images = gsap.utils.toArray<HTMLElement>('.service-image');
    
    // Set all images except first to opacity 0 and scale up
    gsap.set(images.slice(1), { opacity: 0, scale: 1.1, clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(images[0], { clipPath: 'inset(0% 0% 0% 0%)' });

    // Create the master scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${panels.length * 100}%`,
        pin: true,
        scrub: 1,
      }
    });

    // For each panel (except the first one, which is already visible)
    panels.forEach((panel: any, i) => {
      if (i === 0) return;

      // Animate text moving up
      tl.to(leftColRef.current, {
        yPercent: -100 * i,
        ease: 'none',
        duration: 1
      }, i * 1);

      // Animate next image revealing
      tl.to(images[i], {
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, i * 1 - 0.2);

      // Scale down previous image
      tl.to(images[i - 1], {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      }, i * 1 - 0.2);
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-black text-white h-screen overflow-hidden relative">
      <div className="absolute top-10 left-10 z-20">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-dazz-gold">Core Divisions</span>
      </div>

      <div className="flex h-full w-full">
        {/* Left Column (Text that scrolls) */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <div ref={leftColRef} className="w-full absolute top-0 left-0">
            {servicesData.map((service) => (
              <div key={service.id} className="service-panel h-screen w-full flex flex-col justify-center px-20">
                <div className="overflow-hidden mb-4">
                  <span className="block text-2xl font-serif text-dazz-gold">{service.id}</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter uppercase mb-6 leading-none">
                  {service.title}
                </h2>
                <p className="text-lg text-white/60 max-w-md mb-10 font-light leading-relaxed">
                  {service.description}
                </p>
                <div>
                  <Link 
                    href={service.link}
                    className="inline-flex items-center gap-4 text-sm font-bold tracking-widest uppercase hover:text-dazz-gold transition-colors group"
                  >
                    Explore Division
                    <span className="w-12 h-px bg-current group-hover:w-20 transition-all duration-300"></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Images that morph) */}
        <div ref={rightColRef} className="w-1/2 h-full relative">
          {servicesData.map((service, index) => (
            <div key={service.id} className="service-image absolute inset-0 w-full h-full p-10">
              <div className="w-full h-full relative overflow-hidden rounded-2xl">
                <MediaRenderer
                  media={service.image}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-10 left-10">
                  <span className="text-6xl font-serif text-white/90 italic tracking-wider opacity-20">
                    {service.tagline}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
