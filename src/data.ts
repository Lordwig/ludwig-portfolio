export interface Project {
  id: string
  title: string
  subtitle?: string
  role: string
  tags: string[]
  description: string
  repoUrl: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export const projects: Project[] = [
  
  {
    id: '01',
    title: 'PalengkeHub',
    subtitle: 'Thesis Project',
    role: 'Team Project',
    tags: ['React Native', 'Expo', 'Supabase'],
    description:
      'Our undergraduate thesis: a mobile app connecting local market (palengke) vendors and buyers, built on Expo with a Supabase backend for auth and real-time data.',
    repoUrl: 'https://github.com/shin486/PalengkeHubFinal',
  },
  {
    
    id: '02',
    title: 'Auto Avenue IMS',
    role: 'Collaborator',
    tags: ['PHP', 'MySQL'],
    description:
      'An inventory management system for an auto parts business — product catalog, purchase orders, sales tracking, and reports, all behind a login-gated dashboard.',
    repoUrl: 'https://github.com/shin486/auto-avenue-ims',
  },
  {
    id: '03',
    title: 'Pharmacy Management System',
    role: 'Group Project',
    tags: ['C++'],
    description:
      'Final project for Integrative Programming — a console-based system for tracking medicines, prescriptions, and transactions with persistent file storage.',
    repoUrl: 'https://github.com/Lordwig/final-project-group2-inteprog',
  },
  {
    id: '04',
    title: 'ITELECT4 Project',
    role: 'Solo',
    tags: ['TypeScript'],
    description:
      'A focused TypeScript exercise modeling an academic tracking system — users, courses, and submissions — built to master interfaces, generics, and utility types.',
    repoUrl: 'https://github.com/Lordwig/itelect4-project',
  },
]

export const skillGroups: SkillGroup[] = [
  { title: 'Frontend', items: ['JavaScript', 'HTML5 / CSS3', 'React.js', 'React Native / Expo'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'PHP'] },
  { title: 'Data', items: ['PostgreSQL', 'Supabase'] },
  { title: 'Tooling', items: ['Git & GitHub', 'VS Code', 'Postman', 'Vercel'] },
]

export const contact = {
  email: 'ludwigrexolarte1002@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ludwigrexolarte/?skipRedirect=true',
  github: 'https://github.com/lordwig',
}
