import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import ScrambleText from './ScrambleText';

type Props = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export default function Section({ id, number, eyebrow, title, intro, children }: Props) {
  return (
    <section id={id} className="relative scroll-mt-20 py-16 md:py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 md:px-10">
        <div className="relative flex items-end gap-4 pb-6">
          <motion.span
            aria-hidden="true"
            className="text-outline font-display text-5xl font-bold leading-none md:text-7xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {number}
          </motion.span>
          <ScrambleText text={eyebrow} className="eyebrow pb-1 md:pb-2" />
          {/* Divider draws itself from left to right */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-ink/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </div>
        <Reveal delay={150}>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-[2.75rem] md:leading-[1.1]">{title}</h2>
          {intro && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/70">{intro}</p>}
        </Reveal>
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
