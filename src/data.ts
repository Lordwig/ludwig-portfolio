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
    screenshots: ['/projects/palengkehub-1.svg', '/projects/palengkehub-2.svg'],
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
    title: 'ITELECT4 Project',
    role: 'Solo',
    tags: ['TypeScript'],
    description:
      'A focused TypeScript exercise modeling an academic tracking system — users, courses, and submissions — built to master interfaces, generics, and utility types.',
    features: [
      'Typed models for users, courses, and submissions',
      'Interfaces and generics',
      'Utility types and enums',
    ],
    screenshots: ['/projects/itelect4-1.svg'],
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

export interface CertificateItem {
  key: string
  title: string
  issuer: string
  year: string
  credentialId?: string
  skills?: string[]
  accentColor?: string
  url?: string
}

export const defaultCertificates: CertificateItem[] = [
  {
    key: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    credentialId: 'AWS-CCP-8492041',
    skills: ['Cloud Architecture', 'AWS Core Services', 'Security'],
    accentColor: '#ff9900',
  },
  {
    key: 'meta-front-end-developer',
    title: 'Meta Front-End Developer',
    issuer: 'Meta / Coursera',
    year: '2024',
    credentialId: 'META-FE-7729108',
    skills: ['React.js', 'TypeScript', 'UI/UX Design'],
    accentColor: '#3b5bff',
  },
  {
    key: 'database-design-postgresql',
    title: 'Database Design & PostgreSQL',
    issuer: 'Oracle Academy',
    year: '2023',
    credentialId: 'DB-SQL-4091832',
    skills: ['PostgreSQL', 'Relational Schemas', 'SQL Tuning'],
    accentColor: '#5cc689',
  },
  {
    key: 'it-specialist-software-dev',
    title: 'IT Specialist: Software Dev',
    issuer: 'Certiport / Pearson VUE',
    year: '2023',
    credentialId: 'ITS-SD-5819024',
    skills: ['Software Design', 'OOP', 'Data Structures'],
    accentColor: '#ff6f4e',
  },
]

export const certificateInfo: Record<
  string,
  { title?: string; issuer?: string; year?: string; credentialId?: string; skills?: string[] }
> = {
  'CYBER THREAT MANAGEMENT': {
    title: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    credentialId: 'CSCO-CTM-VERIFIED',
    skills: ['Cyber Defense', 'Vulnerability Assessment', 'Incident Response'],
  },
  'Innovative Research Horizons': {
    title: 'Innovative Research Horizons',
    issuer: 'DLSL ACES · De La Salle Lipa',
    year: '2026',
    credentialId: 'DLSL-IRH-2026',
    skills: ['Academic Research', 'Technical Innovation', 'Systems Engineering'],
  },
  'SKILLS TO SUCCEED': {
    title: 'Skills to Succeed Academy',
    issuer: 'Accenture',
    year: '2026',
    credentialId: 'ACN-S2S-58MOD',
    skills: ['Professional Enablement', 'Career Readiness', 'Soft Skills'],
  },
  USAID: {
    title: 'AI Ethics and Governance',
    issuer: 'USAID · Asia Open RAN Academy',
    year: '2024',
    credentialId: 'USAID-IPOP-2024',
    skills: ['AI Ethics', 'AI Governance', 'Open RAN Architecture'],
  },
  usaid: {
    title: 'AI Ethics and Governance',
    issuer: 'USAID · Asia Open RAN Academy',
    year: '2024',
    credentialId: 'USAID-IPOP-2024',
    skills: ['AI Ethics', 'AI Governance', 'Open RAN Architecture'],
  },
}

export const contact = {
  email: 'ludwigolarte@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ludwig-rex-olarte-3bba72378/',
  github: 'https://github.com/lordwig',
  /** Put your resume PDF at public/resume.pdf — the button opens it in a new tab */
  resume: '/resume.pdf',
}

/** Put your photo at public/profile.jpg */
export const profilePhoto = '/profile.jpg'
