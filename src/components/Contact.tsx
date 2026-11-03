import { useState } from 'react';
import { profile } from '../data/profile';
import { ArrowUpRight, GitHub, LinkedIn, Mail } from './Icons';
import { Magnetic } from './motion';
import Reveal from './Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 border-t border-ink/10 py-16 md:py-20">
      <div className="mx-auto max-w-page px-4 sm:px-6 md:px-10">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-12 text-paper sm:px-10 md:px-14 md:py-14">
            <div aria-hidden="true" className="contact-blob contact-blob-a" />
            <div aria-hidden="true" className="contact-blob contact-blob-b" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">Contact</p>
            <h2 className="relative mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
              Hiring an intern? I’d like to hear from you.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/70">
              I’m looking for a software engineering internship, and happy to walk through any
              project in detail.
              {profile.email && ' Email is the quickest way to reach me.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {profile.email && (
                <>
                  <Magnetic>
                    <a
                      href={`mailto:${profile.email}`}
                      className="btn bg-accent text-paper hover:bg-paper hover:text-ink"
                    >
                      <Mail className="h-4 w-4" /> {profile.email}
                    </a>
                  </Magnetic>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="btn border border-paper/25 hover:border-paper"
                    aria-live="polite"
                  >
                    {copied ? 'Copied!' : 'Copy email'}
                  </button>
                </>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-paper/25 hover:border-paper"
                >
                  <LinkedIn className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <Magnetic>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-paper/25 hover:border-paper"
                >
                  <GitHub className="h-4 w-4" /> GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
