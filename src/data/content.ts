// All content data ported verbatim from the original DCLogic component.

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Project {
  id: string;
  ratio: number;
  src: string;
  alt: string;
}

export interface ServiceCard {
  icon: string; // /images/*.svg
  title: string;
  body: string;
  delay: number;
  gradient: string; // second gradient stop colour
}

export interface ProcessStep {
  icon: string; // Material Symbols ligature
  step: string;
  title: string;
  body: string;
}

export interface Principle {
  icon: string; // Material Symbols ligature
  title: string;
  body: string;
  delay: number;
}

export interface Testimonial {
  quote: string;
  quote2?: string;
  name: string;
  role?: string;
  photo?: string;
}

export interface Social {
  label: string;
  href: string;
}

/* Navigation (header + mobile menu) --------------------------------------- */
export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
];

/* External links used across the site ------------------------------------- */
export const LINKS = {
  tally: 'https://tally.so/r/0QWL0B',
  whatsapp: 'https://wa.me/919555164552',
  linkedin: 'www.linkedin.com/in/paras-bhatnagar',
};

/* Work gallery. ratio = shot width/height; card width derives from it. ---- */
export const PROJECTS: Project[] = [
  { id: 'work-01', ratio: 1.3333, src: '/images/work-01.png', alt: 'Project shot 1' },
  { id: 'work-02', ratio: 1.3333, src: '/images/work-02.png', alt: 'Project shot 2' },
  { id: 'work-03', ratio: 1.3333, src: '/images/work-03.png', alt: 'Project shot 3' },
  { id: 'work-04', ratio: 1.3312, src: '/images/work-04.png', alt: 'Project shot 4' },
  { id: 'work-05', ratio: 1.3333, src: '/images/work-05.png', alt: 'Project shot 5' },
  { id: 'work-06', ratio: 1.3333, src: '/images/work-06.png', alt: 'Project shot 6' },
  { id: 'work-07', ratio: 1.3333, src: '/images/work-07.png', alt: 'Project shot 7' },
  { id: 'work-08', ratio: 1.3333, src: '/images/work-08.png', alt: 'Project shot 8' },
  { id: 'work-09', ratio: 1.3333, src: '/images/work-09.png', alt: 'Project shot 9' },
  { id: 'work-10', ratio: 1.3312, src: '/images/work-10.png', alt: 'Project shot 10' },
  { id: 'work-11', ratio: 1.3333, src: '/images/work-11.png', alt: 'Project shot 11' },
  { id: 'work-12', ratio: 1.3333, src: '/images/work-12.png', alt: 'Project shot 12' },
  { id: 'work-13', ratio: 1.5, src: '/images/work-13.png', alt: 'Project shot 13' },
  { id: 'work-14', ratio: 1.3333, src: '/images/work-14.png', alt: 'Project shot 14' },
  { id: 'work-15', ratio: 1.3333, src: '/images/work-15.png', alt: 'Project shot 15' },
  { id: 'work-16', ratio: 1.3333, src: '/images/work-16.png', alt: 'Project shot 16' },
  { id: 'work-17', ratio: 1.3333, src: '/images/work-17.png', alt: 'Project shot 17' },
];

/* Services section cards (from the markup) -------------------------------- */
export const SERVICE_CARDS: ServiceCard[] = [
  {
    icon: '/images/svc-brand-family.svg',
    title: 'Branding & Logo',
    body: 'Build a distinct identity people remember.',
    delay: 80,
    gradient: 'rgb(169,65,145)',
  },
  {
    icon: '/images/svc-devices.svg',
    title: 'Product Design',
    body: 'End-to-end product design across web, mobile, and desktop.',
    delay: 150,
    gradient: 'rgb(65,169,79)',
  },
  {
    icon: '/images/svc-dashboard.svg',
    title: 'Design Systems',
    body: 'Create scalable systems that keep products consistent',
    delay: 220,
    gradient: 'rgb(169,147,65)',
  },
  {
    icon: '/images/svc-interests.svg',
    title: 'Social & Marketing Design',
    body: 'Engaging visuals for social media and marketing campaigns.',
    delay: 290,
    gradient: 'rgb(42,118,184)',
  },
  {
    icon: '/images/svc-code-blocks.svg',
    title: 'No Code Development',
    body: 'Turn designs into responsive, functional experiences',
    delay: 360,
    gradient: 'rgb(184,111,42)',
  },
];

/* Icon offset overrides so each SVG sits exactly as in the source ---------- */
export const SERVICE_ICON_STYLE: Record<string, React.CSSProperties> = {
  '/images/svc-brand-family.svg': { left: 2.667, top: 2.667, width: 26, height: 26.667 },
  '/images/svc-devices.svg': { left: 2.667, top: 5.333, width: 26.667, height: 21.333 },
  '/images/svc-dashboard.svg': { left: 4, top: 4, width: 24, height: 24 },
  '/images/svc-interests.svg': { left: 3.615, top: 3.333, width: 25.718, height: 24.667 },
  '/images/svc-code-blocks.svg': { left: 4, top: 4, width: 24, height: 24 },
};

/* Process steps ----------------------------------------------------------- */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: 'travel_explore',
    step: 'STEP 01',
    title: 'Understand',
    body: 'I start by deeply understanding your brand, audience and goals, uncovering the insights that guide every decision that follows.',
  },
  {
    icon: 'draw',
    step: 'STEP 02',
    title: 'Design',
    body: 'I craft purposeful work that balances beauty and function, whether it is product UI, a design system or a brand, always aligned to your vision.',
  },
  {
    icon: 'rocket_launch',
    step: 'STEP 03',
    title: 'Deliver',
    body: 'I ship high quality, documented outputs and refine through feedback loops so the final work holds up in the hands of your team.',
  },
];

/* About principles -------------------------------------------------------- */
export const PRINCIPLES: Principle[] = [
  { icon: 'psychology', title: 'Product Mindset', body: 'I think beyond the UI and focus on the bigger picture — user, business and technology.', delay: 0 },
  { icon: 'route', title: 'End to End Ownership', body: 'From research and wireframes to UI and handoff, I take full ownership.', delay: 80 },
  { icon: 'grid_view', title: 'Design Systems', body: 'I build scalable systems that help teams move faster and stay consistent.', delay: 160 },
  { icon: 'groups', title: 'Collaborative Partner', body: 'I work closely with product, engineering and stakeholders as a true design partner.', delay: 240 },
];

/* Testimonials ------------------------------------------------------------ */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Paras introduced design best practices to our team as Figma capabilities continued to evolve, and helped ensure consistency and scalability across our product. His work brought clarity and structure to how design was created, maintained, and shared within the team.',
    quote2:
      'I appreciated his thoughtful approach to building systems that support long-term product development and team efficiency.',
    name: 'Matthew Tormey',
    role: 'ION',
    photo: '/images/testimonial-01.jpg',
  },
  {
    quote:
      'Paras has a keen eye for UI design and brings a thoughtful, detail-oriented approach that elevates the overall product experience. Through our work together, he consistently contributed with clarity and intent\u2014whether it was defining visual patterns, aligning on market scenarios, or refining flows\u2014while also fostering open, collaborative discussions that helped shape strong design decisions. I also really appreciated how approachable and supportive he was, making it easy for me to adapt to a new work environment and patiently helping me navigate and resolve any doubts I had along the way.',
    quote2:
      'I\u2019ve really valued working with him and would highly recommend him to teams looking for a designer who brings strong intent, ownership, and a collaborative approach to their work.',
    name: 'Avni Agarwal',
    role: 'Bosh',
    photo: '/images/t-avni.jpg',
  },
  {
    quote:
      'Paras is very experienced and knowledgeable about product design. Even if there was any uncertainty in the design process, he would always take to initiative to research and find the answers and he was not afraid of taking risks to break barriers',
    quote2:
      'I would be glad to work with him again without hesitation and he would be a valuable asset to any organization that aims to elevate their design experience.',
    name: 'Wei-Te Shyu',
    role: 'American Express',
    photo: '/images/t-weite.jpg',
  },
  {
    quote:
      'One of the qualities that truly sets Paras apart is his ability to collaborate effectively with cross-functional teams. He have the skills, experience, and passion to make a significant impact on any design team and drive the success of any product. It has been a privilege to work with Paras, and I have no doubt that his future endeavours will be filled with continued success.',
    name: 'Kailash Singh',
    role: 'Numarah',
    photo: '/images/t-kailash.jpg',
  },
  {
    quote:
      'He handled numerous task streams independently, demonstrating excellent Design Thinking concepts, extensive research and analytical skills, and scenario-driven creative thinking. He provided a solutions-oriented approach, questioned project leadership\u2019s thinking, and created ideas, which he finally presented to stakeholders. I would work with him again without question, and I am confident that he will go on to lead and achieve great things in his profession',
    name: 'Pankaj Dargan',
    role: 'InfoPro',
    photo: '/images/t-pankaj.jpg',
  },
  {
    quote:
      'Paras is an exceptionally talented designer with a keen eye for detail and a passion for creating stunning visuals. They consistently delivered high-quality designs that exceeded client expectations. Their collaboration skills, work ethic, and positive attitude make him a true professional. I highly recommend Paras',
    name: 'Nikita Sharma',
    role: 'PAR Tech',
    photo: '/images/t-nikita.jpg',
  },
  {
    quote:
      'He is one of the most collaborative designers I have worked with throughout my entire career. I presented many complicated client use-cases to Paras which he handled flawlessly, always producing the best possible mock up in preparation for our next meeting together. I could always trust we would produce quality work and would appreciate the opportunity to chat with anyone who would like to learn more about Paras.',
    name: 'Daniel Atwood',
    role: 'Punchh',
    photo: '/images/t-daniel.jpg',
  },
];

/* Footer socials ---------------------------------------------------------- */
export const SOCIALS: Social[] = [
  { label: 'LinkedIn', href: '#contact' },
  { label: 'Dribbble', href: '#contact' },
  { label: 'Behance', href: '#contact' },
];
