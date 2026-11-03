import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile, toolbelt } from '../data/profile';
import DotGrid from './DotGrid';
import { ArrowRight, GitHub, LinkedIn } from './Icons';
import { Magnetic } from './motion';
import Terminal from './Terminal';

const EASE = [0.16, 1, 0.3, 1] as const;
// Both phrases sit on one perfect ring and always read upright: the top phrase runs clockwise
// over the top, the bottom one counter-clockwise underneath (its baseline radius is larger
// because its letters hang inward). Each phrase is stretched to exactly the same arc length,
// so the gaps on both sides are equal. The dotted inner ring is what rotates.
const R_TOP = 45; // baseline radius of the top phrase (letters sit outside it)
const R_BOTTOM = 51.5; // baseline radius of the bottom phrase (letters sit inside it)
const SWEEP = (150 / 180) * Math.PI; // angle each phrase covers

const arc = (r: number, clockwise: boolean) => {
  const half = SWEEP / 2;
  const sx = 60 - r * Math.sin(half);
  const ex = 60 + r * Math.sin(half);
  const y = clockwise ? 60 - r * Math.cos(half) : 60 + r * Math.cos(half);
  return `M${sx.toFixed(2)},${y.toFixed(2)} A${r},${r} 0 0,${clockwise ? 1 : 0} ${ex.toFixed(2)},${y.toFixed(2)}`;
};

function CircleBadge() {
  return (
    <a href="#projects" aria-label="Scroll to my work" className="group relative grid h-32 w-32 place-items-center">
      <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <path id="badge-top" d={arc(R_TOP, true)} />
          <path id="badge-bottom" d={arc(R_BOTTOM, false)} />
        </defs>
        <g className="fill-ink/75 font-mono text-[8.5px] uppercase">
          <text>
            <textPath href="#badge-top" textLength={(R_TOP * SWEEP).toFixed(1)} lengthAdjust="spacing">
              Open to internships
            </textPath>
          </text>
          <text>
            <textPath href="#badge-bottom" textLength={(R_BOTTOM * SWEEP).toFixed(1)} lengthAdjust="spacing">
              Scroll to see my work
            </textPath>
          </text>
        </g>
        <circle cx={60 - 48.3} cy="60" r="1.7" className="fill-accent" />
        <circle cx={60 + 48.3} cy="60" r="1.7" className="fill-accent" />

        {/* Rotating dotted ring with a single bright marker orbiting on it */}
        <g className="animate-spin-slow motion-reduce:animate-none group-hover:[animation-duration:4s]" style={{ transformOrigin: '60px 60px' }}>
          <circle cx="60" cy="60" r="35" fill="none" className="stroke-ink/25" strokeWidth="1" strokeDasharray="1.2 4.2" strokeLinecap="round" />
          <circle cx="60" cy="25" r="2.4" className="fill-teal" />
        </g>
      </svg>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-paper transition-transform duration-300 group-hover:translate-y-1 group-hover:scale-110">
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

      <motion.div style={{ opacity: fade }} className="relative mx-auto max-w-page px-4 pb-12 pt-8 sm:px-6 md:px-10 md:pb-16 md:pt-10">
        <motion.p
          {...fadeUp(0.05)}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/70 px-3 py-1.5 font-mono text-xs text-ink/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Computer Engineering · {profile.university}
        </motion.p>

        <div className="mt-6 flex items-end justify-between gap-8">
          <div>
            <motion.p {...fadeUp(0.15)} className="font-mono text-sm text-ink/60 md:text-base">
              <span className="text-teal">const</span> engineer <span className="text-accent">=</span>
            </motion.p>
            {/* Static on purpose: no per-letter animation. The gradient word is an inline-block with
                bottom padding so its background (and so the clipped text) covers the descenders. */}
            <h1 className="mt-2 font-display text-[clamp(3rem,8vw,6.25rem)] font-bold leading-[1.02] tracking-[-0.035em]">
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
            <CircleBadge />
          </motion.div>
        </div>

        <motion.div style={{ y: bodyY }} className="mt-8 grid items-end gap-8 lg:grid-cols-12">
          <motion.div {...fadeUp(1)} className="lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">
              Third-year Computer Engineering undergraduate who turns{' '}
              <span className="marker">everyday problems</span> into systems people can rely on.
            </p>
            <p className="mt-3 max-w-xl leading-relaxed text-ink/60">
              From live school-van tracking to secure medico-legal records.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
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
