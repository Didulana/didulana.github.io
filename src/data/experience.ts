export type Role = { title: string; org: string; period: string };

export const universityRoles: Role[] = [
  {
    title: 'Committee Member',
    org: 'Association of Computer Engineering Students, University of Peradeniya',
    period: '2025 – 2026',
  },
  {
    title: 'Co-Editor',
    org: 'Engineering Students’ Publication Society (GAUGE)',
    period: '2025 – Present',
  },
  {
    title: 'Team Member, IGT / People Management',
    org: 'AIESEC in Sri Lanka',
    period: '2024 – 2025',
  },
];

export const schoolRoles: Role[] = [
  { title: 'Deputy Head Prefect', org: 'Rajapaksa Central College, Weeraketiya', period: '2022' },
  { title: 'Head of the Technical Team', org: 'Radapasa Media Unit', period: '2022' },
  { title: 'Senior Member', org: 'Radapasa Astronomical Society', period: '2016 – 2022' },
];

export const awards = [
  { title: '5th Place', org: 'Kaggle competition — Fabric Defect Detection & Localisation' },
  { title: 'Silver Medal & Merit Award', org: 'Sri Lanka Junior Astronomy Olympiad' },
  { title: 'Merit Award', org: 'Sri Lanka Physics Olympiad' },
];

export const certifications = [
  { title: 'Google AI Essentials', issuer: 'Google' },
  { title: 'Python for Beginners', issuer: 'University of Moratuwa' },
  { title: 'Web Design for Beginners', issuer: 'University of Moratuwa' },
  { title: 'Leadership & People Management', issuer: 'Semrush Academy' },
];
