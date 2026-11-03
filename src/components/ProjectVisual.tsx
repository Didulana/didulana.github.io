import { useReducedMotion } from 'framer-motion';
import type { Project } from '../data/projects';

// Small animated illustrations that hint at what each project does, in place of screenshots.
export default function ProjectVisual({ slug }: { slug: Project['slug'] }) {
  const animate = !useReducedMotion();
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-[0_24px_48px_-28px_rgb(0_0_0/0.45)]">
      {slug === 'kidsroute' && <RouteMap animate={animate} />}
      {slug === 'lexmed' && <CaseTimeline animate={animate} />}
      {slug === 'fabric' && <FabricScan animate={animate} />}
    </div>
  );
}

type VisualProps = { animate: boolean };

const ROUTE = 'M30 160 C 80 160, 80 80, 140 90 S 210 150, 250 110 S 280 50, 295 40';

// A van travels from home to school along the route.
function RouteMap({ animate }: VisualProps) {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
      <g stroke="rgb(var(--ink) / 0.08)" strokeWidth="1">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} />
        ))}
        {[64, 128, 192, 256].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="200" />
        ))}
      </g>
      <path id="kr-route" d={ROUTE} fill="none" stroke="rgb(var(--teal) / 0.35)" strokeWidth="3" />
      <path d={ROUTE} fill="none" stroke="rgb(var(--teal))" strokeWidth="3" strokeDasharray="6 6">
        {animate && <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.8s" repeatCount="indefinite" />}
      </path>
      <circle cx="30" cy="160" r="6" fill="rgb(var(--ink) / 0.6)" />
      <rect x="285" y="28" width="20" height="20" rx="4" fill="rgb(var(--ink) / 0.6)" />

      <g transform={animate ? undefined : 'translate(198 128)'}>
        {animate && (
          <animateMotion dur="7s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear">
            <mpath href="#kr-route" />
          </animateMotion>
        )}
        <circle r="12" fill="rgb(var(--accent) / 0.25)">
          {animate && <animate attributeName="r" values="7;16;7" dur="1.6s" repeatCount="indefinite" />}
        </circle>
        <circle r="7" fill="rgb(var(--accent))" />
        <text x="12" y="-10" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgb(var(--ink) / 0.7)">
          van · live
        </text>
      </g>

      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgb(var(--ink) / 0.55)">
        <text x="20" y="182">home</text>
        <text x="270" y="66">school</text>
      </g>
    </svg>
  );
}

// Records are added one after another, and an audit highlight sweeps through them.
function CaseTimeline({ animate }: VisualProps) {
  const rows = [
    { y: 44, label: 'MLEF filed', role: 'JMO' },
    { y: 88, label: 'Evidence logged', role: 'clerk' },
    { y: 132, label: 'PMR added', role: 'JMO' },
    { y: 176, label: 'Record audited', role: 'auditor' },
  ];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
      <line x1="48" y1="30" x2="48" y2="186" stroke="rgb(var(--ink) / 0.15)" strokeWidth="2" />
      <rect x="62" y="29" width="198" height="30" rx="8" fill="none" stroke="rgb(var(--accent))" strokeWidth="1.5">
        {animate && (
          <animate attributeName="y" values="29;73;117;161;29" keyTimes="0;0.25;0.5;0.75;1" dur="6s" calcMode="spline"
            keySplines="0.6 0 0.2 1;0.6 0 0.2 1;0.6 0 0.2 1;0.6 0 0.2 1" repeatCount="indefinite" />
        )}
      </rect>
      {rows.map((r, i) => (
        <g key={r.y}>
          {animate && <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${i * 0.35}s`} fill="freeze" />}
          <circle cx="48" cy={r.y} r="6" fill={i === rows.length - 1 ? 'rgb(var(--accent))' : 'rgb(var(--teal))'} />
          <rect x="66" y={r.y - 13} width="190" height="26" rx="6" fill="rgb(var(--surface))" stroke="rgb(var(--ink) / 0.1)" />
          <text x="78" y={r.y + 4} fontFamily="Inter, sans-serif" fontSize="10" fill="rgb(var(--ink) / 0.8)">
            {r.label}
          </text>
          <text x="244" y={r.y + 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgb(var(--ink) / 0.45)">
            {r.role}
          </text>
        </g>
      ))}
      <g transform="translate(272 84)">
        <g>
          {animate && (
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.4s" repeatCount="indefinite" />
          )}
          <rect x="0" y="12" width="28" height="22" rx="4" fill="rgb(var(--accent))" />
          <path d="M6 12 V6 a8 8 0 0 1 16 0 V12" fill="none" stroke="rgb(var(--accent))" strokeWidth="3" />
        </g>
        <text x="14" y="50" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="rgb(var(--ink) / 0.5)">
          AES-256
        </text>
      </g>
    </svg>
  );
}

// A scan line sweeps across the fabric and the defect is boxed when it passes.
function FabricScan({ animate }: VisualProps) {
  const cols = 32;
  const rowsN = 20;
  const cells = [];
  for (let r = 0; r < rowsN; r++) {
    for (let c = 0; c < cols; c++) {
      const defect = r >= 8 && r <= 11 && c >= 19 && c <= 23;
      const shade = ((r * 7 + c * 13) % 5) * 0.025 + 0.06;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={c * 10}
          y={r * 10}
          width="9"
          height="9"
          fill={defect ? 'rgb(var(--accent) / 0.55)' : `rgb(var(--ink) / ${shade})`}
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="scan-beam" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(var(--teal))" stopOpacity="0" />
          <stop offset="1" stopColor="rgb(var(--teal))" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      {cells}
      {animate && (
        <g>
          <rect x="-40" y="0" width="40" height="200" fill="url(#scan-beam)">
            <animate attributeName="x" values="-40;320" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="-2" y="0" width="2" height="200" fill="rgb(var(--teal))">
            <animate attributeName="x" values="-2;318" dur="4s" repeatCount="indefinite" />
          </rect>
        </g>
      )}
      <g>
        {animate && (
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.65;0.95;1" dur="4s" repeatCount="indefinite" />
        )}
        <rect x="185" y="75" width="54" height="44" fill="none" stroke="rgb(var(--accent))" strokeWidth="2" />
        <rect x="185" y="58" width="74" height="15" rx="2" fill="rgb(var(--accent))" />
        <text x="190" y="69" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgb(var(--paper))">
          defect found
        </text>
      </g>
    </svg>
  );
}
