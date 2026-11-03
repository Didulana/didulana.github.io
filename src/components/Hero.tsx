import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile, toolbelt } from '../data/profile';
import DotGrid from './DotGrid';
import { ArrowRight, GitHub, LinkedIn } from './Icons';
import { Magnetic } from './motion';
import Terminal from './Terminal';

const EASE = [0.16, 1, 0.3, 1] as const;
function RotatingBadge() {
  return (
    <a href="#projects" aria-label="Scroll to my work" className="group relative grid h-32 w-32 place-items-center">
      <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none">
        <defs>
          <path id="badge-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text className="fill-ink/70 font-mono text-[9px] uppercase" letterSpacing="2.3">
          <textPath href="#badge-circle">Open to internships · See my work ·</textPath>
        </text>
      </svg>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-paper transition-transform duration-300 group-hover:scale-110">
        <ArrowRight className="h-5 w-5 rotate-90" />
      </span>
    </a>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { delay, duration: 0.9, ease: EASE },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bodyY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      {/* Background: drifting colour fields under an interactive dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="aurora aurora-c" />
        <div className="dots-mask absolute inset-0">
          <DotGrid />
        </div>
      </div>

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-page px-4 pb-16 pt-10 sm:px-6 md:px-10 md:pb-24 md:pt-16">
        <motion.p
          {...fadeUp(0.05)}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/70 px-3 py-1.5 font-mono text-xs text-ink/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Computer Engineering · {profile.university}
        </motion.p>

        <div className="mt-8 flex items-end justify-between gap-8">
          <div>
            <motion.p {...fadeUp(0.15)} className="font-mono text-sm text-ink/60 md:text-base">
              <span className="text-teal">const</span> engineer <span className="text-accent">=</span>
            </motion.p>
            {/* Static on purpose: no per-letter animation. The gradient word is an inline-block with
                bottom padding so its background (and so the clipped text) covers the descenders. */}
            <h1 className="mt-2 font-display text-[clamp(3rem,9.5vw,7.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              <span className="block">Didulana</span>
              <span className="block">
                <span className="name-gradient inline-block pb-[0.14em]">Lokugamage</span>
                <span aria-hidden="true" className="ml-1 inline-block h-[0.12em] w-[0.42em] bg-teal align-baseline" />
              </span>
            </h1>
          </div>

          <motion.div
            className="mb-4 hidden shrink-0 lg:block"
            initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.1, duration: 1.1, ease: EASE }}
          >
            <RotatingBadge />
          </motion.div>
        </div>

        <motion.div style={{ y: bodyY }} className="mt-12 grid items-end gap-10 lg:grid-cols-12">
          <motion.div {...fadeUp(1)} className="lg:col-span-6">
            <p className="max-w-xl text-xl leading-relaxed text-ink/80 md:text-2xl">
              Third-year Computer Engineering undergraduate who turns{' '}
              <span className="marker">everyday problems</span> into systems people can rely on.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/60">
              From tracking school vans in real time to protecting medico-legal records, I like
              work where the engineering matters to someone on the other end.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#projects" className="btn-primary group">
                  See my work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn-secondary bg-paper/60 backdrop-blur">
                  Get in touch
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="grid h-11 w-11 place-items-center rounded-full text-ink/60 transition-colors hover:text-accent"
                >
                  <GitHub />
                </a>
              </Magnetic>
              {profile.linkedin && (
                <Magnetic strength={0.5}>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="grid h-11 w-11 place-items-center rounded-full text-ink/60 transition-colors hover:text-accent"
                  >
                    <LinkedIn />
                  </a>
                </Magnetic>
              )}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: 40, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: EASE }}
            style={{ transformPerspective: 900 }}
          >
            <Terminal />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="marquee relative border-y border-ink/10 bg-paper/60 py-4 backdrop-blur" aria-label="Tools I work with">
        <ul className="marquee-track flex w-max gap-10 font-mono text-sm text-ink/50">
          {[...toolbelt, ...toolbelt].map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= toolbelt.length ? true : undefined}
              className="flex items-center gap-10 whitespace-nowrap transition-colors hover:text-accent"
            >
              {t}
              <span className="text-accent">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
