export interface Project {
  id: string
  title: string
  subtitle?: string
  role: string
  tags: string[]
  description: string
  features: string[]
  /** Image paths inside /public, e.g. '/projects/auto-avenue-1.png'. The first one is the card cover. Missing files are hidden. */
  screenshots: string[]
  repoUrl: string
  /** If set, the project popup shows a LIVE preview of this site inside a browser window. */
  liveUrl?: string
}

export interface Skill {
  name: string
  /** 0-100 — your honest self-assessment, shown as an animated meter */
  level: number
}

export interface SkillGroup {
  title: string
  items: Skill[]
}

export interface RadarPoint {
  label: string
  value: number
}

export const profile = {
  name: 'Ludwig Rex Olarte',
  firstName: 'Ludwig',
  role: 'System Developer',
  school: 'BSIT · De La Salle Lipa',
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Auto Avenue IMS',
    role: 'Collaborator',
    tags: ['PHP', 'MySQL'],
    description:
      'An inventory management system for an auto parts business — product catalog, purchase orders, sales tracking, and reports, all behind a login-gated dashboard.',
    features: [
      'Product catalog and stock management',
      'Purchase order handling',
      'Sales tracking',
      'Reports for business decisions',
      'Login-protected dashboard',
    ],
    screenshots: ['/projects/auto-avenue-1.svg', '/projects/auto-avenue-2.svg'],
    repoUrl: 'https://github.com/shin486/auto-avenue-ims',
    // liveUrl: 'https://your-deployed-site.com',
  },
  {
    id: '02',
    title: 'PalengkeHub',
    subtitle: 'Thesis Project',
    role: 'Team Project',
    tags: ['React Native', 'Expo', 'Supabase'],
    description:
      'Our undergraduate thesis: a mobile app connecting local market (palengke) vendors and buyers, built on Expo with a Supabase backend for auth and real-time data.',
    features: [
      'Cross-platform mobile app built with React Native and Expo',
      'Supabase backend for data and authentication',
      'Designed around local market vendors and buyers',
    ],
    screenshots: ['/projects/palengkehub-1.png', '/projects/palengkehub-2.jpg'],
    repoUrl: 'https://github.com/shin486/PalengkeHubFinal',
    liveUrl: 'https://palengkehub.site',
  },
  {
    id: '03',
    title: 'Pharmacy Management System',
    role: 'Group Project',
    tags: ['C++'],
    description:
      'Final project for Integrative Programming — a console-based system for tracking medicines, prescriptions, and transactions with persistent file storage.',
    features: [
      'Medicine inventory records',
      'Prescription handling',
      'Transaction logging',
      'Persistent file-based storage',
    ],
    screenshots: ['/projects/pharmacy-1.svg'],
    repoUrl: 'https://github.com/Lordwig/final-project-group2-inteprog',
  },
  {
    id: '04',
    title: 'SipGo',
    subtitle: 'Digital Café Pre-Order & Management Platform',
    role: 'Course Project',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    description:
      'A full-stack digital pre-order and management platform designed to streamline customer ordering workflows and administrative inventory controls for café patrons and staff.',
    features: [
      'Designed and developed a full-stack digital pre-order and management platform using React, TypeScript, Node.js, Express, and MongoDB to streamline customer ordering workflows and administrative inventory controls for café patrons and staff.',
      'Integrated secure JWT authentication, backend request rate-limiting, and an automated AI-powered suggestion workflow to optimize item matching efficiency, accelerate transaction retrieval workflows, and enhance the overall checkout experience.',
      'Duration: July 2026 – October 2026',
    ],
    screenshots: ['/projects/sipgo-1.svg'],
    repoUrl: 'https://github.com/Lordwig/itelect4-project',
  },
]

/** Text shown in the fake browser address bar */
export function displayUrl(project: Project): string {
  const url = project.liveUrl ?? project.repoUrl
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML5 / CSS3', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'React.js', level: 75 },
      { name: 'TypeScript', level: 60 },
      { name: 'React Native / Expo', level: 65 },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', level: 70 },
      { name: 'Express.js', level: 65 },
      { name: 'PHP', level: 70 },
    ],
  },
  {
    title: 'Data',
    items: [
      { name: 'PostgreSQL', level: 65 },
      { name: 'Supabase', level: 65 },
    ],
  },
  {
    title: 'Tooling',
    items: [
      { name: 'Git & GitHub', level: 75 },
      { name: 'VS Code', level: 85 },
      { name: 'Postman', level: 70 },
      { name: 'Vercel', level: 70 },
    ],
  },
]

export const radarSkills: RadarPoint[] = [
  { label: 'Frontend', value: 80 },
  { label: 'Backend', value: 70 },
  { label: 'Database', value: 65 },
  { label: 'Mobile', value: 62 },
  { label: 'Tooling', value: 75 },
  { label: 'System Design', value: 68 },
]

export interface CertificateInfo {
  title?: string
  issuer?: string
  /** copy it from the certificate itself, e.g. 'Mar 2026' */
  date?: string
  /** e.g. 'Course completion', 'Seminar participation' */
  kind?: string
}

/**
 * Details shown under each certificate in src/assets/certs/.
 * The key is the image file name WITHOUT the extension.
 * Only write facts that are printed on the certificate itself.
 */
export const certificateInfo: Record<string, CertificateInfo> = {
  'CYBER THREAT MANAGEMENT': {
    title: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    date: 'Mar 2026',
    kind: 'Course completion',
  },
  'Innovative Research Horizons': {
    title: 'Innovative Research Horizons',
    issuer: 'DLSL ACES · IECEP-DLSL SC · JPCS',
    date: 'Feb 2026',
    kind: 'Seminar participation',
  },
  'SKILLS TO SUCCEED': {
    title: 'Skills to Succeed Academy',
    issuer: 'Accenture',
    date: 'Feb 2026',
    kind: '58 learning modules completed',
  },
  USAID: {
    title: 'AI Ethics and Governance',
    issuer: 'USAID · Asia Open RAN Academy',
    date: 'Oct 2024',
    kind: 'Webinar participation',
  },
  'python-1': {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
  'python-2': {
    title: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
  'pyhton-1': {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
  'pyhton-2': {
    title: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
  'phyton-1': {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
  'phyton-2': {
    title: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
  'Python 1': {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
  'Python 2': {
    title: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    kind: '30 learning modules completed',
  },
}

/** Same idea for the honor certificates you drop into src/assets/honors/ */
export const honorInfo: Record<string, CertificateInfo> = {
  'honor-1': { title: 'Academic Honors', issuer: 'De La Salle Lipa', date: '2024' },
  'honor-2': { title: 'Academic Honors', issuer: 'De La Salle Lipa', date: '2024' },
  'honor-3': { title: 'Academic Honors', issuer: 'De La Salle Lipa', date: '2024' },
}

/** Put your photo at public/profile.png (or profile.jpg) */
export const profilePhoto = '/profile.png'

export const contact = {
  email: 'ludwigolarte@gmail.com',
  resume: '/resume.pdf',
  github: 'https://github.com/Lordwig',
  linkedin: 'https://linkedin.com/in/ludwigrexolarte/',
}