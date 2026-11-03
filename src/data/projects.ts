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
    summary: 'A school transport platform that shows parents where their child’s van is, live.',
    problem:
      'Parents usually have no way of knowing where a school van is, or whether their child has been picked up, without calling the driver.',
    role: 'Parent dashboard, real-time tracking, UI/UX lead, repository maintainer',
    contributions: [
      'Built the Parent Dashboard with a live map and support for following several children at once.',
      'Implemented real-time GPS tracking over WebSockets, so location updates and SOS alerts reach parents instantly.',
      'Led the UI/UX for the parent, driver and admin apps, and ran the team’s GitHub workflow: branching, pull request reviews, merge conflicts, testing and deployment.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'Leaflet'],
    githubUrl: 'https://github.com/cepdnaclk/e22-co2060-School-Van-Management-System',
  },
  {
    slug: 'lexmed',
    title: 'LexMed',
    category: 'Secure records',
    context: 'Database systems project',
    summary: 'A case-records system for a forensic medicine department, where every change leaves a trace.',
    problem:
      'Medico-legal records are evidence. The department needs to control exactly who can see each record, and prove that nothing was changed after the fact.',
    role: 'Database design, backend API and frontend',
    contributions: [
      'Designed the database with separate access levels for JMOs, department clerks and auditors.',
      'Added an append-only audit log, so every change to a record is permanently traceable.',
      'Secured the API with JWT authentication and parameterized queries, and encrypted sensitive identifiers such as patient NIC numbers with AES-256.',
      'Built a single case timeline that brings together MLEFs, post-mortem reports and evidence, with dashboards for case reporting.',
    ],
    stack: ['MySQL', 'Node.js', 'Express', 'JWT', 'JavaScript', 'Bootstrap 5', 'Chart.js'],
    githubUrl: 'https://github.com/Didulana/LexMed-Forensic-Medicine-Department-Database-System',
  },
  {
    slug: 'fabric',
    title: 'Fabric Defect Detection',
    category: 'Computer vision',
    context: 'Kaggle competition',
    summary: 'An automated inspection system that spots defects in industrial fabric images.',
    problem:
      'Manual fabric inspection is slow and inconsistent, and real factory datasets have very few labelled defect images to learn from.',
    role: 'Feature engineering, model training and evaluation',
    contributions: [
      'Worked with the industrial AITEX fabric dataset of high-resolution textile scans.',
      'Designed texture features suited to fabric (Gabor wavelets, LBP and GLCM) and trained a LightGBM classifier on them.',
      'Compared it against a fine-tuned ResNet-18 and found the simpler, feature-based approach worked better on a small dataset.',
    ],
    stack: ['Python', 'LightGBM', 'PyTorch', 'OpenCV', 'Pandas', 'NumPy'],
  },
];
