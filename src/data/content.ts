/**
 * content.ts — all typed data for the redesigned portfolio.
 * Keeping PROJECTS / SERVICE_CARDS / TESTIMONIALS arrays intact for legacy
 * reference; only the newly-exported types are used by the new components.
 */

/* ─── Nav ─────────────────────────────────────────────────────────────────── */
export interface NavItem { id: string; label: string; href: string }

export const NAV_ITEMS: NavItem[] = [
  { id: 'work',       label: 'Work',       href: '#work' },
  { id: 'approach',   label: 'Approach',   href: '#approach' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'about',      label: 'About',      href: '#about' },
  { id: 'contact',    label: 'Contact',    href: '#contact' },
];

/* ─── External links ──────────────────────────────────────────────────────── */
export const LINKS = {
  tally:     'https://tally.so/r/0QWL0B',
  whatsapp:  'https://wa.me/919555164552',
  linkedin:  'https://www.linkedin.com/in/paras-bhatnagar',
  email:     'mailto:parasuxdesign@gmail.com',
  resume:    '/Paras.Resume.pdf',
  dribbble:  'https://dribbble.com/ParasUXD',
  behance:   'https://www.behance.net/Paras_bhatnagra',
  medium:    'https://medium.com/@parasbhatnagar',
};

/* ─── Featured projects (selected work section) ───────────────────────────── */
export interface FeaturedProject {
  id: string;
  name: string;
  description: string;
  role: string;
  domain: string;
  src: string;
  alt: string;
  tags: string[];
  href: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'connectx',
    name: 'ConnectX',
    description:
      'Building a scalable product experience for modern banking — from product strategy to design system.',
    role: 'Lead product designer',
    domain: 'Fintech / Enterprise',
    src: '/images/hero-connectx.png',
    alt: 'NovaWorks (ConnectX) employee experience platform on laptop and mobile',
    tags: ['Product design', 'Design systems', 'Fintech', 'Leadership'],
    href: '#work',
  },
  {
    id: 'tol',
    name: 'TOL — Trading online',
    description:
      'Making European institutional investing easier to understand and easier to act on.',
    role: 'Product designer',
    domain: 'Investment / SaaS',
    src: '/images/work-09.png',
    alt: 'TOL trading platform interface',
    tags: ['Product design', 'Investment', 'European banking'],
    href: '#work',
  },
  {
    id: 'pangea',
    name: 'Pangea',
    description:
      'A more human way to communicate across languages — AI-powered and built for real people.',
    role: 'Product designer',
    domain: 'Consumer / AI',
    src: '/images/work-02.png',
    alt: 'Pangea communication app interface',
    tags: ['Product design', 'AI', 'Consumer'],
    href: '#work',
  },
];

/* ─── Credibility companies ───────────────────────────────────────────────── */
export const CREDIBILITY_COMPANIES = ['Pangea', 'ION', 'Punchh', 'Compunnel Digital'];

/* ─── Design approach principles ─────────────────────────────────────────── */
export interface ApproachPrinciple { icon: string; title: string; body: string }

export const APPROACH_PRINCIPLES: ApproachPrinciple[] = [
  {
    icon: 'hub',
    title: 'Make complexity feel simple',
    body: "The best product experiences don't hide complexity — they make it understandable. Clarity is a design outcome.",
  },
  {
    icon: 'grid_view',
    title: 'Design for the system',
    body: 'Good design scales beyond a single screen. I think in patterns, relationships and systems that hold up over time.',
  },
  {
    icon: 'groups',
    title: 'Bring people into the process',
    body: 'Strong products are built together. I work closely with product, engineering and researchers to create clarity and momentum.',
  },
  {
    icon: 'diamond',
    title: 'Raise the bar',
    body: "Whether it's a single interaction or a whole product, the quality of the final experience matters. Craft is not optional.",
  },
];

/* ─── Leadership capabilities ─────────────────────────────────────────────── */
export interface LeadershipCapability { icon: string; title: string; body: string }

export const LEADERSHIP_CAPABILITIES: LeadershipCapability[] = [
  {
    icon: 'north_star',
    title: 'Direction',
    body: 'Setting a clear design vision and rallying people around what we are solving and why.',
  },
  {
    icon: 'school',
    title: 'Mentorship',
    body: 'Helping designers grow their craft, product thinking and confidence.',
  },
  {
    icon: 'account_tree',
    title: 'Systems',
    body: 'Building frameworks and patterns that make quality repeatable at scale.',
  },
  {
    icon: 'handshake',
    title: 'Collaboration',
    body: 'Bringing product, engineering and design into genuine alignment around the user problem.',
  },
];

/* ─── Career experience ───────────────────────────────────────────────────── */
export interface ExperienceItem {
  period: string;
  company: string;
  role: string;
  description: string;
  active?: boolean;
  isEarlier?: boolean;
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: 'Apr 2026 — Present',
    company: 'Pangea',
    role: 'Principal product designer',
    description:
      'Leading product, UX and visual design at Pangea — a travel platform for exploring the world together. Working remotely across the full product lifecycle to shape the future of social travel.',
    active: true,
  },
  {
    period: '2024 — Mar 2026',
    company: 'ION',
    role: 'Lead product designer',
    description:
      'Led design for ConnectX, an internal tool to provide next-generation employee experience. Set the design vision, mentored the team, and worked closely with product and engineering to deliver at scale.',
  },
  {
    period: '2022 — 2024',
    company: 'ION',
    role: 'Senior product designer',
    description:
      'Owned end-to-end design across financial products — conducting research, designing and iterating on features, collaborating with cross-functional teams, and mentoring junior designers.',
  },
  {
    period: 'Earlier',
    company: 'ION · Punchh · Compunnel',
    role: '',
    description: '',
    isEarlier: true,
  },
];

/* ─── Footer socials ──────────────────────────────────────────────────────── */
export interface Social { label: string; href: string }

export const SOCIALS: Social[] = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Email',    href: LINKS.email },
  { label: 'Résumé',  href: LINKS.resume },
];

/* ─── Legacy: work gallery (kept so buildRows.ts still compiles) ───────────── */
export interface Project { id: string; ratio: number; src: string; alt: string }

export const PROJECTS: Project[] = [
  { id: 'work-01',  ratio: 1.3333, src: '/images/work-01.png',  alt: 'Project 1'  },
  { id: 'work-02',  ratio: 1.3333, src: '/images/work-02.png',  alt: 'Project 2'  },
  { id: 'work-03',  ratio: 1.3333, src: '/images/work-03.png',  alt: 'Aristotle — Case Library interface for University of Milan'  },
  { id: 'work-04',  ratio: 1.3312, src: '/images/work-04.png',  alt: 'Project 4'  },
  { id: 'work-05',  ratio: 1.3333, src: '/images/work-05.png',  alt: 'Project 5'  },
  { id: 'work-06',  ratio: 1.3333, src: '/images/work-06.png',  alt: 'Project 6'  },
  { id: 'work-07',  ratio: 1.3333, src: '/images/work-07.png',  alt: 'Project 7'  },
  { id: 'work-08',  ratio: 1.3333, src: '/images/work-08.png',  alt: 'Project 8'  },
  { id: 'work-09',  ratio: 1.3333, src: '/images/work-09.png',  alt: 'Project 9'  },
  { id: 'work-10',  ratio: 1.3312, src: '/images/work-10.png',  alt: 'Project 10' },
  { id: 'work-11',  ratio: 1.3333, src: '/images/work-11.png',  alt: 'Project 11' },
  { id: 'work-12',  ratio: 1.3333, src: '/images/work-12.png',  alt: 'Project 12' },
  { id: 'work-13',  ratio: 1.5,    src: '/images/work-13.png',  alt: 'Project 13' },
  { id: 'work-14',  ratio: 1.3333, src: '/images/work-14.png',  alt: 'Project 14' },
  { id: 'work-15',  ratio: 1.3333, src: '/images/work-15.png',  alt: 'Project 15' },
  { id: 'work-16',  ratio: 1.3333, src: '/images/work-16.png',  alt: 'Project 16' },
  { id: 'work-17',  ratio: 1.3333, src: '/images/work-17.png',  alt: 'Project 17' },
];

/* ─── Legacy: service cards / process steps / testimonials (kept intact) ─── */
export interface ServiceCard {
  icon: string; title: string; desc: string; tags: string[]
}
export const SERVICE_CARDS: ServiceCard[] = [
  { icon: 'palette', title: 'Brand & Identity', desc: 'Logos, visual systems and brand guidelines.', tags: ['Logo', 'Visual identity', 'Brand guidelines'] },
  { icon: 'devices', title: 'Product Design', desc: 'End-to-end UX/UI for web and mobile products.', tags: ['UX', 'UI', 'Mobile', 'Web'] },
  { icon: 'hub',     title: 'Design Systems', desc: 'Scalable component libraries and token frameworks.', tags: ['Components', 'Tokens', 'Figma'] },
  { icon: 'photo_camera', title: 'Social & Content', desc: 'Templates, motion and social-ready assets.', tags: ['Social', 'Motion', 'Templates'] },
  { icon: 'code',    title: 'No-Code Builds', desc: 'Webflow, Framer and other no-code platforms.', tags: ['Webflow', 'Framer'] },
];

export interface ProcessStep { number: string; title: string; desc: string }
export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Understand', desc: 'Deep dive into the problem, users and business context.' },
  { number: '02', title: 'Design',     desc: 'Explore, prototype and refine until the solution is clear.' },
  { number: '03', title: 'Deliver',    desc: 'Ship with precision: handoff, QA and iteration.' },
];

export interface Principle { icon: string; title: string; body: string }
export const PRINCIPLES: Principle[] = [
  { icon: 'memory',  title: 'Product mindset',        body: 'Design decisions grounded in real user needs and business outcomes.' },
  { icon: 'hub',     title: 'End-to-end ownership',   body: 'From early concepts through to polished, shipped experiences.' },
  { icon: 'grid_view', title: 'Design systems',       body: 'Scalable patterns and components that accelerate teams.' },
  { icon: 'groups',  title: 'Collaborative partner',  body: 'Working closely with product and engineering from day one.' },
];

export interface Testimonial {
  quote: string; name: string; title: string; company: string; avatar?: string
}
export const TESTIMONIALS: Testimonial[] = [
  { quote: "Paras is one of the most thoughtful designers I've worked with. He has a rare ability to understand complex product problems and translate them into elegant, intuitive solutions.", name: 'Matthew Tormey', title: 'Product Director', company: 'ION' },
  { quote: "Working with Paras was a game-changer for our product team. His ability to simplify complex workflows while maintaining a beautiful aesthetic is impressive.", name: 'Avni Agarwal', title: 'Product Manager', company: 'Bosh' },
  { quote: "Paras brings a perfect blend of strategic thinking and pixel-level craftsmanship. He elevated our entire design process.", name: 'Wei-Te Shyu', title: 'Senior UX Designer', company: 'American Express' },
  { quote: "His work on our design system alone saved us months of development time. Paras thinks in systems.", name: 'Kailash Singh', title: 'CTO', company: 'Numarah' },
  { quote: "Paras delivered not just designs, but a complete design language that our team could build upon for years.", name: 'Pankaj Dargan', title: 'Head of Product', company: 'InfoPro Digital' },
  { quote: "He has an exceptional eye for detail while never losing sight of the big picture. Truly a senior-level designer.", name: 'Nikita Sharma', title: 'Product Manager', company: 'PAR Technology' },
  { quote: "Paras transformed our product UX completely. User satisfaction scores improved dramatically after his redesign.", name: 'Daniel Atwood', title: 'VP of Product', company: 'Punchh' },
];

export const SOCIALS_LEGACY = [
  { label: 'LinkedIn', href: '#contact' },
  { label: 'Dribbble', href: '#contact' },
  { label: 'Behance',  href: '#contact' },
];

/* ─── Work widget entries (About section) ─────────────────────────────────── */
export interface WorkEntry {
  id: string;
  company: string;
  role: string;
  /** Display string, e.g. "Apr 2026 – Present" */
  period: string;
  /** Display string, e.g. "6 mos" */
  duration: string;
  /** Avatar placeholder color (hex) — replaced by logo once uploaded */
  color: string;
  /** Set to '/logos/<file>' once logos are added to public/ */
  logo?: string;
}

export const WORK_ENTRIES: WorkEntry[] = [
  {
    id: 'pangea',
    company: 'Pangea',
    logo: '/logos/pangea.jpg',
    role: 'Principal Product Designer',
    period: 'Apr 2026 – Present',
    duration: '6 mos',
    color: '#059669',
  },
  {
    id: 'ion',
    company: 'ION',
    logo: '/logos/ion.jpg',
    role: 'Lead Product Designer',
    period: 'Oct 2019 – Mar 2026',
    duration: '6 yrs 5 mos',
    color: '#D97706',
  },
  {
    id: 'punchh',
    company: 'Punchh',
    logo: '/logos/punchh.jpg',
    role: 'UX Designer',
    period: '2018 – 2022',
    duration: '4 yrs',
    color: '#DC2626',
  },
  {
    id: 'compunnel',
    company: 'Compunnel Digital',
    logo: '/logos/compunnel.jpg',
    role: 'UI/UX Designer',
    period: '2014 – 2018',
    duration: '4 yrs',
    color: '#2563EB',
  },
];

/* ─── About section social links ──────────────────────────────────────────── */
export type SocialIconType = 'x' | 'instagram' | 'linkedin' | 'youtube';

export interface AboutSocial {
  id: string;
  label: string;
  href: string;
  icon: SocialIconType;
}

export const ABOUT_SOCIALS: AboutSocial[] = [
  { id: 'x',         label: 'X (Twitter)', href: '#',                                           icon: 'x' },
  { id: 'instagram', label: 'Instagram',   href: 'https://www.instagram.com/panipanioriginals', icon: 'instagram' },
  { id: 'linkedin',  label: 'LinkedIn',    href: 'https://www.linkedin.com/in/paras-bhatnagar', icon: 'linkedin' },
  { id: 'youtube',   label: 'YouTube',     href: '#',                                           icon: 'youtube' },
];
