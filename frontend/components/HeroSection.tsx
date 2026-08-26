'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from './Container';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function HeroSection({ title, subtitle, backgroundImage, children }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] } 
    }
  };

  return (
    <section className="relative bg-dazz-navy pt-32 pb-40 flex items-center min-h-[80vh] overflow-hidden">
      {backgroundImage && (
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-dazz-navy-dark via-dazz-navy/80 to-transparent z-0" />
      <Container className="relative z-10">
        <motion.div 
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-dazz-gold-light via-dazz-gold to-dazz-gold-dark"
          >
            {title}
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
          {children && (
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
      
      {/* Decorative futuristic glow */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-dazz-gold/20 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
