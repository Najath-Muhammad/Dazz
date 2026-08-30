'use client';

import { motion } from 'framer-motion';
import { Hexagon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing hexagon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute text-dazz-gold opacity-20"
        >
          <Hexagon size={120} strokeWidth={0.5} />
        </motion.div>
        
        {/* Inner reverse spinning hexagon */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute text-white opacity-80"
        >
          <Hexagon size={80} strokeWidth={1} />
        </motion.div>
        
        {/* Center pulse dot */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 bg-dazz-gold rounded-full" 
        />
      </div>
      
      <div className="mt-16 flex flex-col items-center">
        <motion.h2 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white font-bold tracking-[0.4em] uppercase text-xs mb-6"
        >
          Loading
        </motion.h2>
        
        {/* Progress Line */}
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-dazz-gold to-transparent" 
          />
        </div>
      </div>
    </div>
  );
}
