import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { Close, Download, Menu, Moon, Sun } from './Icons';

const links = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark');

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setDark(!dark);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}

const ids = links.map((l) => l.id);

export default function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-ink/10 bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 sm:px-6 md:px-10">
        <a href="#top" className="font-semibold tracking-tight" onClick={() => setOpen(false)}>
          Didulana<span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
              className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                active === l.id ? 'text-ink' : 'text-ink/60 hover:text-ink'
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink/[0.08]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} className="btn-primary hidden py-2 sm:inline-flex" download>
              <Download className="h-4 w-4" /> CV
            </a>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-ink/10 px-4 pb-6 pt-2 sm:px-6 md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {links.map((l, i) => (
            <motion.a
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i }}
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`block border-b border-ink/10 py-4 text-lg font-medium ${
                active === l.id ? 'text-accent' : ''
              }`}
            >
              {l.label}
            </motion.a>
          ))}
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} className="btn-primary mt-6 w-full" download>
              <Download className="h-4 w-4" /> Download CV
            </a>
          )}
        </motion.nav>
      )}
    </header>
  );
}
