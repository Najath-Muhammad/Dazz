'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Only run on desktop/devices with a fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    setIsVisible(true);

    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    // Follow mouse
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    // Interaction states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If hovering over a gallery card or image
      if (target.closest('.cursor-hover')) {
        gsap.to(cursor, { scale: 3, backgroundColor: 'rgba(255,255,255,0.9)', mixBlendMode: 'normal' });
        text.innerText = 'EXPLORE';
        gsap.to(text, { opacity: 1, scale: 0.33 }); // inverse scale to keep text readable
      } 
      // If hovering over a link or button
      else if (target.closest('a') || target.closest('button')) {
        gsap.to(cursor, { scale: 1.5, backgroundColor: 'transparent', border: '1px solid #C5A059', mixBlendMode: 'normal' });
        text.innerText = '';
        gsap.to(text, { opacity: 0 });
      }
      // Normal state
      else {
        gsap.to(cursor, { scale: 1, backgroundColor: '#C5A059', border: 'none', mixBlendMode: 'difference' });
        text.innerText = '';
        gsap.to(text, { opacity: 0 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-dazz-gold rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference shadow-sm transition-colors"
      style={{ willChange: 'transform' }}
    >
      <span ref={textRef} className="text-[10px] font-bold text-dazz-navy tracking-widest opacity-0 uppercase">
        EXPLORE
      </span>
    </div>
  );
}
