'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GSAPRefresher() {
  useEffect(() => {
    // After full page hydration, refresh all ScrollTriggers so
    // pinned sections calculate correct spacer heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
