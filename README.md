# Paras Bhatnagar — Portfolio

A dark, editorial single-page portfolio for Paras Bhatnagar (Product Designer &
Design Partner), built with **React + TypeScript + Vite**.

This project is a faithful conversion of a Claude Design export
(`Paras Bhatnagar - Portfolio.dc.html`). The Design Code runtime — `support.js`,
`<x-dc>`, `DCLogic`, and the template dialect (`{{ }}`, `<sc-if>`, `<sc-for>`,
`style-hover/focus/active`) — has been fully removed and replaced with standard
React components, hooks, and CSS. Visual design, layout, copy, typography,
colors, interactions, animations, and responsive behavior are preserved.

## Run locally

```bash
npm install
npm run dev        # start the Vite dev server
```

## Production build

```bash
npm run build      # type-check (tsc -b) + bundle to /dist
npm run preview    # serve the built /dist locally
```

The output in `dist/` is a static bundle deployable to any static host.

## Deploy to Cloudflare (later — not done here)

`wrangler.jsonc` is prepared and points at `./dist`. After a build:

```bash
npx wrangler deploy
```

This repository does not deploy anything or modify any production Cloudflare
configuration.

## Structure

```
src/
  App.tsx                 App shell: glows, skip link, hook orchestration,
                          section composition
  main.tsx                React entry point
  components/
    Nav.tsx               Floating glass navigation (desktop + compact)
    MobileMenu.tsx        Slide-down mobile menu
    Hero.tsx              Availability pulse, headline, CTAs, stats
    Work.tsx              Auto-scrolling project gallery (marquee)
    Services.tsx          Gradient service cards
    Process.tsx           Scroll-driven "How I work" stepper
    About.tsx             Portrait, bio, LinkedIn, principles
    Testimonials.tsx      CSS marquee of testimonials
    ClosingCTA.tsx        Closing call-to-action + footer
    Icon.tsx              Material Symbols glyph helper
  data/
    content.ts            All static content (nav, projects, services, process,
                          principles, testimonials, socials, links)
    buildRows.ts          Splits the gallery into two seamless marquee rows
  hooks/
    useReducedMotion.ts   Live prefers-reduced-motion tracking
    useViewportWidth.ts   Responsive desktop/compact switch
    useReveal.ts          Entrance reveals (IntersectionObserver + sweep)
    useMarquee.ts         Seamless rAF gallery loop with hover-pause
    useScrollSpy.ts       Nav surface change + active-link dot
    useProcessParallax.ts Scroll-linked process steps + watermark drift
    useSmoothScroll.ts    Smooth in-page navigation
  styles/
    global.css            Tokens, keyframes, base styles, hover/focus states,
                          reduced-motion handling, @font-face declarations
public/
  images/                 All site images (work shots, avatars, icons, portrait)
```

## How the original maps to this project

| Original (`.dc.html` / `DCLogic`)             | Here                          |
| --------------------------------------------- | ----------------------------- |
| `<x-dc>` markup + `{{ }}` bindings            | JSX in `src/components/*`      |
| `<sc-for>` / `<sc-if>`                        | `.map()` / conditionals       |
| `style-hover` / `style-focus` / `style-active`| CSS classes in `global.css`   |
| `PROJECTS`, `TESTIMONIALS`, `principles`, …   | `src/data/content.ts`         |
| `buildRows()`                                 | `src/data/buildRows.ts`       |
| `startMarquee()`                              | `useMarquee`                  |
| `observe()` / `reveal()` / `sweep()`          | `useReveal`                   |
| `onScroll()` scroll-spy + `paintDot()`        | `useScrollSpy`                |
| `processParallax()`                           | `useProcessParallax`          |
| `onNavClick()` / `scrollTo()` / `toTop()`     | `useSmoothScroll`             |
| `mountShots()` (deferred `<img>` injection)   | images rendered directly in `Work.tsx` |

## Fonts

The source references two custom faces — **Metropolis** (body) and
**The Seasons** (serif display) — loaded from `./fonts/*.woff2`. **The export
ships no font files**, so the site falls back to the web fonts declared in the
source: **Plus Jakarta Sans** (body) and **Playfair Display** (headings), plus
**Material Symbols Rounded** for icons — all loaded from Google Fonts in
`index.html`. This matches exactly how the original `.dc.html` renders.

To use the real faces, drop the `.woff2`/`.otf` files into `public/fonts/`; the
`@font-face` rules in `src/styles/global.css` already point at them and will pick
them up automatically.

## Links

External CTAs point to the same destinations as the source: the Tally form
(`Book a Free Call` / `Let's Talk` / `Let's Connect`), WhatsApp, and LinkedIn.
There is no contact form in the source markup — the closing section is a
call-to-action, reproduced as-is (no backend invented).
