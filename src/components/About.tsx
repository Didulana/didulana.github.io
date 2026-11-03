import { SpotlightCard } from './motion';
import Reveal from './Reveal';
import Section from './Section';

const principles = [
  {
    n: 'a',
    title: 'Start with the person',
    text: 'Before choosing a tool, I ask who will use the thing and what they are worried about. The design follows from that.',
  },
  {
    n: 'b',
    title: 'Make it trustworthy',
    text: 'Access rules, authentication and audit trails go in from the first commit, not after something goes wrong.',
  },
  {
    n: 'c',
    title: 'Question the obvious',
    text: 'The most popular approach isn’t always the right one. I test the alternatives and let the results decide.',
  },
  {
    n: 'd',
    title: 'Ship as a team',
    text: 'Clear branches, honest code reviews and careful releases matter as much as the code itself.',
  },
];

export default function About() {
  return (
    <Section id="about" number="02" eyebrow="About me" title="Curious about how things work, and how to make them work better.">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="space-y-5 text-lg leading-relaxed text-ink/75 lg:col-span-5">
          <p>
            I’m Didulana, a third-year Computer Engineering undergraduate at the University of
            Peradeniya, Sri Lanka.
          </p>
          <p>
            What I enjoy most is taking a messy, real-world situation and turning it into a system
            people can depend on: one that is clear to use, safe with their data, and still
            working the next day.
          </p>
          <p>
            Outside the lab, I serve on the committee of the Association of Computer Engineering
            Students and co-edit <em>GAUGE</em>, the engineering students’ publication.
          </p>

          <div className="shimmer relative mt-8 overflow-hidden rounded-2xl bg-accent p-6 text-paper">
            <span aria-hidden="true" className="absolute -right-4 -top-6 font-display text-[7rem] font-bold leading-none opacity-20">
              →
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-80">What I’m looking for</p>
            <p className="relative mt-3 text-base font-medium">
              An internship where I can learn from an experienced engineering team and contribute
              to real, production work.
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
