import { useEffect, useState } from 'react';
import { terminalScript } from '../data/profile';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Types each command out, then prints its output, like a real shell session.
export default function Terminal() {
  const [line, setLine] = useState(() => (prefersReducedMotion() ? terminalScript.length : 0));
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (line >= terminalScript.length) return;
    const cmd = terminalScript[line].cmd;
    const typing = chars < cmd.length;
    const delay = typing ? (line === 0 && chars === 0 ? 700 : 70) : 500;
    const t = setTimeout(() => {
      if (typing) setChars(chars + 1);
      else {
        setLine(line + 1);
        setChars(0);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [line, chars]);

  const prompt = <span className="text-teal">~ $</span>;
  const cursor = <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />;

  return (
    <figure className="terminal overflow-hidden rounded-2xl border border-ink/10 bg-[rgb(18_20_25)] text-[rgb(226_224_218)] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <figcaption className="ml-3 font-mono text-xs text-white/40">didulana@peradeniya: ~</figcaption>
      </div>

      <p className="sr-only">
        Didulana Lokugamage. BSc Computer Engineering, Year 3, University of Peradeniya, Sri Lanka. Open to internship opportunities.
      </p>

      <div aria-hidden="true" className="min-h-[12.5rem] space-y-1 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {terminalScript.map((s, i) => {
          if (i > line) return null;
          const done = i < line;
          return (
            <div key={s.cmd}>
              <p>
                {prompt} {done ? s.cmd : s.cmd.slice(0, chars)}
                {!done && cursor}
              </p>
              {done &&
                s.out.map((o) => (
                  <p key={o} className={o.includes('✓') ? 'text-[#7ee0c3]' : 'text-white/70'}>
                    {o}
                  </p>
                ))}
            </div>
          );
        })}
        {line >= terminalScript.length && (
          <p>
            {prompt} {cursor}
          </p>
        )}
      </div>
    </figure>
  );
}
