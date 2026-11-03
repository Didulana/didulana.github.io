import { motion } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { ArrowUpRight } from './Icons';
import { Magnetic, Tilt } from './motion';
import ProjectVisual from './ProjectVisual';
import Reveal from './Reveal';
import Section from './Section';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <Tilt className="rounded-3xl">
          <div className={`project-stage project-stage--${project.slug} rounded-3xl p-5 sm:p-8`}>
            <div style={{ transform: 'translateZ(40px)' }}>
              <ProjectVisual slug={project.slug} />
            </div>
          </div>
        </Tilt>
      </div>

      <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{project.category}</span>
          <span className="font-mono text-xs text-ink/50">{project.context}</span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">{project.title}</h3>
        <p className="mt-2 text-lg text-ink/80">{project.summary}</p>

        <div className="mt-6 rounded-2xl border-l-2 border-accent bg-ink/[0.03] px-5 py-4">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">The problem</h4>
          <p className="mt-1.5 leading-relaxed text-ink/75">{project.problem}</p>
        </div>

        <h4 className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ink/50">What I did</h4>
        <p className="mt-1 text-sm text-ink/60">{project.role}</p>
        <ul className="mt-3 space-y-2">
          {project.contributions.map((c, i) => (
            <motion.li
              key={c}
              className="flex gap-3 leading-relaxed text-ink/75"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{c}</span>
            </motion.li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((t) => (
            <li key={t} className="chip transition-colors hover:border-accent hover:text-accent">
              {t}
            </li>
          ))}
        </ul>

        {(project.githubUrl || project.demoUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <Magnetic>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary group/btn py-2.5">
                  View code{' '}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </a>
              </Magnetic>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary py-2.5">
                Live demo <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      number="01"
      eyebrow="Selected work"
      title="Things I’ve built, and the problems behind them."
      intro="Each project starts with a real situation: a worried parent, a department guarding evidence, a factory line checking fabric by eye."
    >
      <div className="grid gap-20 md:gap-28">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
