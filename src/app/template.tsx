'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <div style={{ perspective: '1000px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: 4, y: 12 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
