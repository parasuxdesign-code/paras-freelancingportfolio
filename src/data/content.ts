// All content data ported verbatim from the original DCLogic component.

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  ratio: number;
  src?: string;
  alt?: string;
  slot: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface Principle {
  icon: string;
  title: string;
  body: string;
  delay: number;
}

export interface Service {
  icon: string;
  title: string;
  body: string;
  delay: number;
}

export interface Social {
  label: string;
  short: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const STATS: Stat[] = [
  { value: '12+', label: 'Years of experience', icon: '◷' },
  { value: '50+', label: 'Projects delivered', icon: '◧' },
  { value: '30+', label: 'Happy clients', icon: '◍' },
];

// ratio = the shot's own width/height. Card width is derived from it and images are
// letterboxed with object-fit:cover, so nothing is ever cropped.
export const PROJECTS: Project[] = [
  { id: 'connectx-dash', title: 'ConnectX', category: 'HR Tech Platform', tags: ['Product', 'Design Systems'], ratio: 1448 / 1086, src: '/images/hero-connectx.png', alt: 'ConnectX dashboard', slot: 'connectx — dashboard' },
  { id: 'connectx-people', title: 'ConnectX', category: 'People Directory', tags: ['Product', 'Design Systems'], ratio: 16 / 10, slot: 'connectx — directory' },
  { id: 'connectx-mobile', title: 'ConnectX', category: 'Mobile Companion', tags: ['Product'], ratio: 9 / 19.5, slot: 'connectx — mobile' },
  { id: 'trading-overview', title: 'Trading Platform', category: 'Market Overview', tags: ['Product', 'Web'], ratio: 16 / 10, slot: 'trading — overview' },
  { id: 'trading-orders', title: 'Trading Platform', category: 'Order Flow', tags: ['Product'], ratio: 16 / 10, slot: 'trading — orders' },
  { id: 'trading-mobile', title: 'Trading Platform', category: 'Portfolio on Mobile', tags: ['Product'], ratio: 9 / 19.5, slot: 'trading — mobile' },
  { id: 'pangea-feed', title: 'Pangea', category: 'Social Travel Feed', tags: ['Product'], ratio: 9 / 19.5, slot: 'pangea — feed' },
  { id: 'pangea-trip', title: 'Pangea', category: 'Trip Planner', tags: ['Product'], ratio: 9 / 19.5, slot: 'pangea — planner' },
  { id: 'pangea-web', title: 'Pangea', category: 'Marketing Site', tags: ['Web'], ratio: 16 / 9, slot: 'pangea — web' },
  { id: 'spectrum-portal', title: 'Spectrum FX', category: 'Corporate FX Portal', tags: ['Web', 'Design Systems'], ratio: 16 / 10, slot: 'spectrum — portal' },
  { id: 'spectrum-rates', title: 'Spectrum FX', category: 'Live Rates Board', tags: ['Web'], ratio: 16 / 9, slot: 'spectrum — rates' },
  { id: 'twinpixel-marks', title: 'Twinpixel', category: 'Brand Identity', tags: ['Brand'], ratio: 4 / 3, slot: 'twinpixel — marks' },
  { id: 'twinpixel-system', title: 'Twinpixel', category: 'Visual System', tags: ['Brand', 'Design Systems'], ratio: 4 / 3, slot: 'twinpixel — system' },
  { id: 'ds-foundations', title: 'Design System', category: 'Foundations', tags: ['Design Systems'], ratio: 16 / 10, slot: 'system — foundations' },
  { id: 'ds-components', title: 'Design System', category: 'Component Library', tags: ['Design Systems'], ratio: 9 / 19.5, slot: 'system — components' },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'Paras is an exceptional designer who thinks beyond aesthetics. His ability to understand the problem and translate it into simple, effective design is remarkable.', name: 'Anurag Singh', role: 'Head of Engineering, ION' },
  { quote: 'Working with Paras was a game changer for our product. He is professional, reliable and brings a lot of clarity to the design process.', name: 'Karin M.', role: 'Product Manager' },
  { quote: 'He has a rare combination of creativity and logic. The design system he built for us improved our productivity dramatically.', name: 'Sneha Shah', role: 'Design Lead' },
];

export const PRINCIPLES: Principle[] = [
  { icon: '◎', title: 'Product Mindset', body: 'I think beyond the UI and focus on the bigger picture — user, business and technology.', delay: 0 },
  { icon: '◈', title: 'End to End Ownership', body: 'From research and wireframes to UI and handoff, I take full ownership.', delay: 80 },
  { icon: '◫', title: 'Design Systems', body: 'I build scalable systems that help teams move faster and stay consistent.', delay: 160 },
  { icon: '◍', title: 'Collaborative Partner', body: 'I work closely with product, engineering and stakeholders as a true design partner.', delay: 240 },
];

export const SERVICES: Service[] = [
  { icon: '◇', title: 'Product Design', body: 'End to end product design from research and UX to UI and prototyping.', delay: 0 },
  { icon: '◐', title: 'UX / UI Design', body: 'Designing intuitive and engaging experiences that users love.', delay: 80 },
  { icon: '◫', title: 'Design Systems', body: 'Scalable components and guidelines that empower teams to build better products.', delay: 160 },
  { icon: '▤', title: 'Web Design', body: 'Modern, high-converting websites that make the right impression.', delay: 240 },
  { icon: '◈', title: 'Brand & Visual Design', body: 'Building strong visual identities that create lasting impact.', delay: 320 },
  { icon: '◍', title: 'Design Partnership', body: 'Ongoing design support for teams that need senior design expertise.', delay: 400 },
];

export const SOCIALS: Social[] = [
  { label: 'LinkedIn', short: 'in', href: '#contact' },
  { label: 'Dribbble', short: 'Dr', href: '#contact' },
  { label: 'Behance', short: 'Bē', href: '#contact' },
];
