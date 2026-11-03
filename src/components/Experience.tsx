import { motion } from 'framer-motion';
import { awards, certifications, schoolRoles, universityRoles, type Role } from '../data/experience';
import { SpotlightCard } from './motion';
import Reveal from './Reveal';
import Section from './Section';

function Timeline({ heading, roles }: { heading: string; roles: Role[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink/50">{heading}</h3>
      <ol className="relative mt-5">
        {/* The line draws downward, then each role pops in along it */}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-accent via-ink/20 to-ink/5"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        {roles.map((r, i) => (
          <motion.li
            key={r.title + r.org}
            className="group relative pb-5 pl-6 last:pb-0"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ delay: 0.25 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent transition-transform duration-300 group-hover:scale-150"
            />
            <p className="font-mono text-xs text-ink/50">{r.period}</p>
            <p className="mt-1 font-semibold transition-colors group-hover:text-accent">{r.title}</p>
            <p className="text-ink/70">{r.org}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      number="04"
      eyebrow="Beyond the code"
      title="Leadership, awards and certifications."
      intro="Student societies, publications and competitions."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal className="grid gap-12">
          <Timeline heading="University" roles={universityRoles} />
          <Timeline heading="School" roles={schoolRoles} />
        </Reveal>

        <Reveal delay={100} className="grid content-start gap-6">
          <SpotlightCard className="p-6">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink/50">Awards</h3>
            <ul className="mt-4 divide-y divide-ink/10">
              {awards.map((a) => (
                <li key={a.title + a.org} className="py-3">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm text-ink/70">{a.org}</p>
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink/50">Certifications</h3>
            <ul className="mt-4 divide-y divide-ink/10">
              {certifications.map((c) => (
                <li key={c.title} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3">
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-sm text-ink/60">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
