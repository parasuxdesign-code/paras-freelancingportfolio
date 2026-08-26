# Paras Bhatnagar — Portfolio

A dark, editorial single-page portfolio for Paras Bhatnagar (Product Designer &
Design Partner), built with **React + TypeScript + Vite**.

This project is a faithful conversion of an exported Claude Design component
(`Paras Bhatnagar - Portfolio.dc.html`). The Claude Design runtime
(`support.js`) and its template dialect (`<x-dc>`, `{{ }}`, `<sc-if>`,
`<sc-for>`, `style-hover/focus/active`) have been removed entirely and replaced
with standard React components, hooks, and CSS. The visual design, content, and
interactions are preserved.

## Getting started

```bash
npm install
npm run dev        # start the dev server (Vite)
```

## Production build

```bash
npm run build      # type-check (tsc -b) + bundle to /dist
npm run preview    # serve the built /dist locally
```

The output in `dist/` is a static bundle that can be deployed to any static host
(Netlify, Vercel, GitHub Pages, S3, etc.).

## Structure

```
src/
  App.tsx                 App shell: container, ambient glows, skip link,
                          hook orchestration, section composition
  main.tsx                React entry point
  components/             One component per section
    Nav.tsx               Floating glass navigation (desktop + compact)
    MobileMenu.tsx        Slide-down mobile menu panel
    Hero.tsx              Headline, CTAs, stat chips
    Work.tsx              Auto-scrolling "A few things I'm proud of" gallery
    About.tsx             Bio + principles
    Services.tsx          Services grid
    Testimonials.tsx      Horizontal snap carousel
    Contact.tsx           Info + validated contact form
    ExploreCTA.tsx        Exploration-call CTA band
    Footer.tsx            Identity, nav, socials, back-to-top
  data/
    content.ts            All static content (projects, testimonials, nav, …)
    buildRows.ts          Splits projects into two seamless marquee rows
  hooks/
    useReducedMotion.ts   Live prefers-reduced-motion tracking
    useViewportWidth.ts   Responsive desktop/compact switch
    useReveal.ts          Entrance reveals (IntersectionObserver + sweep)
    useMarquee.ts         Seamless rAF gallery loop with hover-pause
    useScrollSpy.ts       Nav surface change + active-link glow dot
    useCursor.ts          Desktop hover-label cursor
    useSmoothScroll.ts    Smooth in-page navigation
  styles/
    global.css            Design tokens, base styles, keyframes, hover/focus
                          states, reduced-motion handling
public/
  images/hero-connectx.png
```

## How the original maps to this project

| Original (`.dc.html` / `DCLogic`) | Here |
| --- | --- |
| `<x-dc>` markup + `{{ }}` bindings | JSX in `src/components/*` |
| `<sc-for>` / `<sc-if>` | `.map()` / conditional rendering |
| `style-hover` / `style-focus` / `style-active` | CSS classes in `global.css` |
| `PROJECTS`, `TESTIMONIALS`, `principles`, `services`, … | `src/data/content.ts` |
| `buildRows()` | `src/data/buildRows.ts` |
| `startMarquee()` | `useMarquee` |
| `observe()` / `reveal()` / `sweep()` | `useReveal` |
| `onScroll()` scroll-spy + nav paint | `useScrollSpy` |
| `initCursor()` | `useCursor` |
| `onNavClick()` / `scrollTo()` / `toTop()` | `useSmoothScroll` |
| `submit()` form validation | `Contact.tsx` |

## Design notes

- **Font:** Plus Jakarta Sans (loaded in `index.html`), matching the source of
  truth. Swap the `<link>` and the `font-family` in `global.css` to change it.
- **Accent:** a single restrained green (`--accent: #79d208`) with brighter
  variants for hover/glow.
- **Radius system:** 8 / 12 / 16 / 20 / 24 / 32 px, exposed as CSS variables.
- **Motion:** subtle opacity + translateY entrances, staggered reveals,
  200–600ms transitions, ~1.02 hover scale, arrow nudges. All animation and
  smooth scrolling is disabled under `prefers-reduced-motion`.
- **Work gallery:** 14 of the 15 project tiles are intentional hatched
  placeholders (no image), exactly as in the original. Only `connectx-dash`
  has a real screenshot. To add a real image, drop it in `public/images/` and
  set `src` on the matching project in `content.ts`.

## Contact form

The form validates name/email/message client-side and currently simulates a
successful submit with a timeout. To wire it to a real backend, replace the
`setTimeout(...)` in `src/components/Contact.tsx` with a `fetch()` POST to your
form endpoint.
