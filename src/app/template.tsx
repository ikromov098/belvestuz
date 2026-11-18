'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Plain fade-in. An earlier version tilted the page (perspective + rotateX) as it entered; if
// the animation was caught mid-way the whole page looked skewed and its edges shrank inward.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}
