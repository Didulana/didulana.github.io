import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = { children: ReactNode; delay?: number; className?: string };

// Fades, lifts and un-blurs its children the first time they scroll into view.
export default function Reveal({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
