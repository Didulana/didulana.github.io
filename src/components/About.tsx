import { SpotlightCard } from './motion';
import Reveal from './Reveal';
import Section from './Section';

const principles = [
  { n: 'a', title: 'Start with the person', text: 'Who will use it, and what worries them? The design follows from that.' },
  { n: 'b', title: 'Make it trustworthy', text: 'Access rules, authentication and audit trails from the first commit.' },
  { n: 'c', title: 'Question the obvious', text: 'Test the alternatives and let the results decide, not the hype.' },
  { n: 'd', title: 'Ship as a team', text: 'Clean branches, honest reviews and careful releases.' },
];

export default function About() {
  return (
    <Section id="about" number="02" eyebrow="About me" title="Curious by default.">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="space-y-4 text-lg leading-relaxed text-ink/75 lg:col-span-5">
          <p>
            I’m a third-year Computer Engineering undergraduate at the University of Peradeniya. I
            enjoy turning messy, real-world situations into systems people can depend on.
          </p>
          <p>
            Outside the lab, I’m on the ACES committee and co-edit <em>GAUGE</em>, the engineering
            students’ publication.
          </p>

          <div className="shimmer relative mt-6 overflow-hidden rounded-2xl bg-accent p-6 text-paper">
            <span aria-hidden="true" className="absolute -right-4 -top-6 font-display text-[7rem] font-bold leading-none opacity-20">
              →
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-80">What I’m looking for</p>
            <p className="relative mt-3 text-base font-medium">
              An internship with an experienced team, working on real production code.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <SpotlightCard className="p-6">
                <span className="font-mono text-xs text-accent">({p.n})</span>
                <h3 className="mt-3 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{p.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
