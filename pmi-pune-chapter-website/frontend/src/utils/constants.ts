export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:1337';

export const ROUTES = {
  HOME: '/',
  EVENTS: '/events',
  RESOURCES: '/resources',
  CERTIFICATIONS: '/certifications',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DASHBOARD_PDUS: '/dashboard/pdus',
  DASHBOARD_EVENTS: '/dashboard/events',
  DASHBOARD_PROFILE: '/dashboard/profile',
  ADMIN: '/admin',
} as const;

export const PMI_CERTIFICATIONS = [
  {
    id: 'pmp',
    name: 'Project Management Professional (PMP)',
    description: 'The world\'s leading project management certification',
    requirements: 'Secondary degree, 7500 hours leading projects, 35 hours project management education',
    examDuration: '4 hours',
    questions: 180,
    passingScore: '61%',
  },
  {
    id: 'capm',
    name: 'Certified Associate in Project Management (CAPM)',
    description: 'Entry-level certification for project practitioners',
    requirements: 'Secondary degree, 23 hours of project management education',
    examDuration: '3 hours',
    questions: 150,
    passingScore: '65%',
  },
  {
    id: 'acp',
    name: 'PMI Agile Certified Practitioner (PMI-ACP)',
    description: 'Validates knowledge of agile principles and practices',
    requirements: '2000 hours of general project experience, 1500 hours of agile project experience',
    examDuration: '3 hours',
    questions: 120,
    passingScore: '65%',
  },
  // Add more certifications...
];

export const EVENT_CATEGORIES = [
  'Workshop',
  'Webinar',
  'Conference',
  'Networking',
  'Training',
  'Certification Prep',
] as const;

export const PDU_CATEGORIES = [
  { value: 'EDUCATION', label: 'Education', maxHours: 35, color: '#3B82F6' },
  { value: 'GIVING_BACK', label: 'Giving Back', maxHours: 25, color: '#10B981' },
  { value: 'WORKING', label: 'Working', maxHours: 8, color: '#F59E0B' },
] as const;