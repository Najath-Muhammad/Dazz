'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from './Container';

gsap.registerPlugin(ScrollTrigger);

const sampleProjects = [
  { id: '01', title: 'Riyadh Metro Extension', location: 'Riyadh', category: 'Construction', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg', slug: 'riyadh-metro' },
  { id: '02', title: 'Jeddah Port Hub', location: 'Jeddah', category: 'Logistics', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg', slug: 'jeddah-port' },
  { id: '03', title: 'NEOM Supply Chain', location: 'NEOM', category: 'Trading', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg', slug: 'neom-supply' },
  { id: '04', title: 'Luxury Hotel Group', location: 'Riyadh', category: 'Hospitality', image: 'https://res.cloudinary.com/demo/image/upload/v1652343206/docs/models.jpg', slug: 'luxury-hotel' },
];

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // The distance to translate is the total width of the wrapper minus the viewport width
    const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

    const tween = gsap.to(wrapper, {
      x: getScrollAmount,
      ease: 'none'
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true
    });

    // Parallax effect on images within the horizontal scroll
    const images = gsap.utils.toArray<HTMLElement>('.gallery-img-inner');
    images.forEach((img) => {
      gsap.to(img, {
        xPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          scrub: 1
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-slate-50 h-screen overflow-hidden flex flex-col justify-center relative">
      <div className="absolute top-10 w-full z-10 px-10 flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-dazz-navy">FEATURED PROJECTS</h2>
        <Link href="/projects" className="text-sm font-bold uppercase tracking-widest text-dazz-gold hover:text-dazz-navy transition-colors">
          View All &rarr;
        </Link>
      </div>

      <div ref={wrapperRef} className="flex h-[70vh] w-max items-center px-10 gap-20">
        {sampleProjects.map((project, i) => (
          <div key={project.id} className="w-[80vw] md:w-[50vw] lg:w-[40vw] h-full flex flex-col justify-between flex-shrink-0 cursor-hover group">
            <div className="flex-1 w-full relative overflow-hidden rounded-md mb-6">
              <div className="gallery-img-inner absolute inset-0 w-[115%] h-full -left-[15%]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-dazz-navy/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            <div className="flex justify-between items-end border-t border-slate-300 pt-4">
              <div>
                <span className="text-dazz-gold text-xs font-bold tracking-[0.2em] mb-1 block">
                  {project.id} — {project.category}
                </span>
                <h3 className="text-3xl font-serif text-dazz-navy font-bold">{project.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-slate-500 text-sm block uppercase tracking-widest">{project.location}</span>
                <Link href={`/projects/${project.slug}`} className="text-sm font-bold text-dazz-navy hover:text-dazz-gold transition-colors mt-2 block">
                  Explore Project
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Extra spacing at the end so the last card doesn't hug the right edge */}
        <div className="w-[10vw] flex-shrink-0"></div>
      </div>
    </section>
  );
}
