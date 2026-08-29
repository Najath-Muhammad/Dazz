'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';

interface LocalizedString {
  en?: string;
  ar?: string;
}

interface MissionVisionProps {
  isAr: boolean;
  mission?: { title?: LocalizedString; description?: LocalizedString };
  vision?: { title?: LocalizedString; description?: LocalizedString };
}

const defaultContent = {
  mission: {
    title: { en: 'OUR MISSION', ar: 'مهمتنا' },
    description: { 
      en: 'Our mission is to empower businesses and industries through innovative, reliable, and integrated solutions designed around real operational needs. We strive to understand the challenges of the industries we serve and address them through expertise, collaboration, and forward-thinking approaches. With a commitment to excellence and continuous improvement, we aim to create meaningful and lasting value for our clients and partners.',
      ar: 'تتمثل رسالتنا في تمكين الشركات والقطاعات من خلال حلول مبتكرة وموثوقة ومتكاملة مصممة لتلبية الاحتياجات التشغيلية الفعلية. نسعى إلى فهم التحديات التي تواجه القطاعات التي نخدمها ومعالجتها من خلال الخبرة والتعاون والأساليب المتطورة. ومن خلال التزامنا بالتميز والتحسين المستمر، نهدف إلى خلق قيمة حقيقية ومستدامة لعملائنا وشركائنا.'
    }
  },
  vision: {
    title: { en: 'OUR VISION', ar: 'رؤيتنا' },
    description: {
      en: 'Our vision is to establish Dazz as a trusted and forward-thinking partner across the industries we serve, recognized for excellence, innovation, and collaboration. We aspire to contribute to a future where industry expertise, innovative thinking, and collaborative solutions come together to address evolving operational challenges and create new possibilities.',
      ar: 'تتمثل رؤيتنا في ترسيخ مكانة داز كشريك موثوق ومتطلع إلى المستقبل في القطاعات التي نخدمها، وأن نكون معروفين بالتميز والابتكار والتعاون. نطمح إلى المساهمة في مستقبل تتكامل فيه الخبرة الصناعية والتفكير المبتكر والحلول التعاونية لمواجهة التحديات التشغيلية المتطورة وخلق إمكانات جديدة.'
    }
  }
};

export function MissionVision({ isAr, mission, vision }: MissionVisionProps) {
  const mTitle = mission?.title?.[isAr ? 'ar' : 'en'] || defaultContent.mission.title[isAr ? 'ar' : 'en'];
  const mDesc = mission?.description?.[isAr ? 'ar' : 'en'] || defaultContent.mission.description[isAr ? 'ar' : 'en'];
  const vTitle = vision?.title?.[isAr ? 'ar' : 'en'] || defaultContent.vision.title[isAr ? 'ar' : 'en'];
  const vDesc = vision?.description?.[isAr ? 'ar' : 'en'] || defaultContent.vision.description[isAr ? 'ar' : 'en'];

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const lineDraw = {
    hidden: { scaleY: 0, transformOrigin: 'top' },
    visible: { scaleY: 1, transition: { duration: 1.5, ease: 'easeInOut' } }
  };

  const hoverAnim = {
    rest: { y: 0, opacity: 0.4 },
    hover: { y: -5, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  return (
    <section className="relative bg-slate-950 text-slate-100 py-32 overflow-hidden border-t border-white/5">
      {/* Background Grid Pattern for Industrial Feel */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center'
        }}
      />

      <Container className="relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-24"
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-dazz-gold" />
            <span className="text-dazz-gold font-mono text-[10px] tracking-[0.3em] uppercase">
              {isAr ? 'اتجاهنا' : 'Our Direction'}
            </span>
            <div className="w-12 h-px bg-dazz-gold" />
          </motion.div>
          
          <motion.h2 
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white"
          >
            {isAr ? 'المهمة والرؤية' : 'Mission & Vision'}
          </motion.h2>
        </motion.div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative">
          
          {/* Architectural Line Divider (Desktop) */}
          <motion.div 
            variants={lineDraw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"
          />

          {/* Mission Block */}
          <motion.div 
            className="relative group cursor-default flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
          >
            <div className={`flex items-end mb-8 gap-6 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
              <motion.span 
                variants={hoverAnim}
                className="text-6xl md:text-8xl font-bold font-mono text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
              >
                01
              </motion.span>
              <div className="flex-1 pb-4">
                <motion.div 
                  className={`h-px bg-dazz-gold origin-left transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 ${isAr ? 'origin-right' : 'origin-left'}`} 
                />
              </div>
            </div>
            
            <motion.h3 variants={fadeUp} className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8">
              {mTitle}
            </motion.h3>
            
            <motion.p variants={fadeUp} className={`text-lg md:text-xl text-slate-400 font-light leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>
              {mDesc}
            </motion.p>
          </motion.div>

          {/* Vision Block */}
          <motion.div 
            className="relative group cursor-default flex flex-col lg:pt-32"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
          >
            <div className={`flex items-end mb-8 gap-6 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
              <motion.span 
                variants={hoverAnim}
                className="text-6xl md:text-8xl font-bold font-mono text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
              >
                02
              </motion.span>
              <div className="flex-1 pb-4">
                <motion.div 
                  className={`h-px bg-dazz-gold origin-left transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 ${isAr ? 'origin-right' : 'origin-left'}`} 
                />
              </div>
            </div>
            
            <motion.h3 variants={fadeUp} className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8">
              {vTitle}
            </motion.h3>
            
            <motion.p variants={fadeUp} className={`text-lg md:text-xl text-slate-400 font-light leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>
              {vDesc}
            </motion.p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
