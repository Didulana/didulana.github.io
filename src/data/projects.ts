export type Project = {
  slug: 'kidsroute' | 'lexmed' | 'fabric';
  title: string;
  category: string;
  context: string;
  summary: string;
  problem: string;
  role: string;
  contributions: string[];
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'kidsroute',
    title: 'KidsRoute',
    category: 'Real-time tracking',
    context: 'Team project · CO2060',
    summary: 'Live school-van tracking for parents.',
    problem:
      'Parents can’t tell where the school van is, or whether their child was picked up, without calling the driver.',
    role: 'Parent dashboard · real-time tracking · UI/UX lead · repo maintainer',
    contributions: [
      'Built the parent dashboard with a live map for following one or more children.',
      'Implemented real-time GPS updates and SOS alerts over WebSockets.',
      'Led UI/UX across the parent, driver and admin apps, and ran the team’s GitHub workflow and releases.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'Leaflet'],
    githubUrl: 'https://github.com/cepdnaclk/e22-co2060-School-Van-Management-System',
  },
  {
    slug: 'lexmed',
    title: 'LexMed',
    category: 'Secure records',
    context: 'Database systems project',
    summary: 'Secure case records for a forensic medicine department.',
    problem:
      'Medico-legal records are evidence: access must be controlled, and every change must be provable.',
    role: 'Database · backend API · frontend',
    contributions: [
      'Designed the MySQL schema with role-based access for JMOs, clerks and auditors, plus an append-only audit log.',
      'Secured the API with JWT and parameterized queries, and encrypted patient NIC numbers with AES-256.',
      'Built a unified case timeline (MLEFs, post-mortem reports, evidence) with reporting dashboards.',
    ],
    stack: ['MySQL', 'Node.js', 'Express', 'JWT', 'JavaScript', 'Bootstrap 5', 'Chart.js'],
    githubUrl: 'https://github.com/Didulana/LexMed-Forensic-Medicine-Department-Database-System',
  },
  {
    slug: 'fabric',
    title: 'Fabric Defect Detection',
    category: 'Computer vision',
    context: 'Kaggle competition',
    summary: 'Automated defect inspection for industrial fabric.',
    problem:
      'Manual inspection is slow and inconsistent, and labelled defect images are scarce.',
    role: 'Feature engineering · model training · evaluation',
    contributions: [
      'Engineered texture features (Gabor, LBP, GLCM) on the AITEX dataset and trained a LightGBM classifier.',
      'Benchmarked against a fine-tuned ResNet-18; the feature-based model did better on the small dataset.',
    ],
    stack: ['Python', 'LightGBM', 'PyTorch', 'OpenCV', 'Pandas', 'NumPy'],
  },
];
