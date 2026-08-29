'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ProjectsFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  isAr?: boolean;
}

export function ProjectsFilter({ categories, activeCategory, onSelect, isAr }: ProjectsFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-12 mb-16 border-b border-slate-200">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className="relative py-4 text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-300"
            style={{ color: isActive ? '#0f172a' : '#94a3b8' }}
          >
            {category}
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-dazz-gold"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
