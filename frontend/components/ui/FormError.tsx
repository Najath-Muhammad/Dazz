import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
  isAr?: boolean;
}

export function FormError({ message, isAr = false }: FormErrorProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          className="overflow-hidden mt-1.5"
        >
          <div className={`flex items-start gap-1.5 text-red-500 text-xs font-semibold ${isAr ? 'flex-row-reverse text-right' : ''}`}>
            <AlertCircle size={14} className="shrink-0 mt-[1px]" />
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
