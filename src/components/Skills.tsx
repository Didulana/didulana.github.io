import { skills } from '../data/skills';
import { SpotlightCard } from './motion';
import Reveal from './Reveal';
import Section from './Section';

export default function Skills() {
  return (
    <Section
      id="skills"
      number="03"
      eyebrow="Skills"
      title="The toolkit."
      intro="Grouped by where I’ve actually used them."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 80} className="h-full">
            <SpotlightCard className="p-6">
              <h3 className="font-display text-lg font-bold">{s.group}</h3>
              <p className="mt-1 font-mono text-xs text-teal">Used in: {s.usedIn}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li key={item} className="chip transition-colors hover:border-accent hover:text-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
