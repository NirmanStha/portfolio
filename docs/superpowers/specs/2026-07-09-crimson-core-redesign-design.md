# Crimson Core — NestJS-Inspired Portfolio Redesign

**Date:** 2026-07-09
**Status:** Approved direction (Option B: "NestJS DNA, portfolio-first" + 2 embedded games)

## Goal

Full visual redesign of the existing single-page portfolio, inspired by nestjs.com's
design language (near-black navy, bold red `#e0234e`, crimson glows, angled section
dividers), while keeping all existing content. Two lightweight games are woven into
the page so the portfolio stands out from typical animated developer sites. Fully
responsive from 360px phones to 4K desktops.

## Non-Goals

- No new content (projects, experience bullets, certifications stay as-is).
- No new dependencies. Pure React + Motion + Tailwind v4; no canvas/game libraries.
- No multi-page routing; the site remains a single page.
- No CMS, blog, or backend changes (contact API route untouched).

## Visual Language

| Token | Value | Use |
|---|---|---|
| `--background` | `#0a0a12` | Page base (near-black navy) |
| `--surface` | `#12121d` | Cards, form fields, navbar glass |
| `--accent` | `#e0234e` | The single accent: CTAs, links, glows, timeline nodes, cursor |
| `--accent-glow` | crimson radial gradients, blurred | Behind hero, section headers, hover states |
| Text | white headings, slate-400 body | Unchanged hierarchy |

- **Typography:** bold modern sans via `next/font` for hero + section headings
  (replacing the current serif). Clean sans body.
- **Angled dividers:** subtle diagonal cuts (clip-path or SVG) between major sections —
  the NestJS signature.
- **Accent discipline:** red replaces every current indigo usage. Skill icons keep
  their own brand colors; everything else is monochrome + red.

## Sections (existing content, rebuilt)

1. **Intro loader** — shortened to ~1.2s: initials/wordmark reveal with a red pulse,
   then hero animates in. (Current 2.5s hero delay removed.)
2. **Navbar** — dark glass bar, red underline indicator on active section.
3. **Hero** — massive sans name + craft statement, one word in red, red glowing
   "View Works" CTA, faint grid pattern + crimson glow blob background.
4. **Projects** — cards with red border-glow on hover, lift effect, tag pills,
   image zoom on hover.
5. **Skills = Memory Match game** (see Games below).
6. **Experience** — vertical timeline, red nodes + connecting line, cards slide in
   on scroll.
7. **Certifications** — upgraded from bullet list to cards with red accent borders
   and external-link icons.
8. **Bug Squash game section** — between Experience/Certifications and Contact
   (see Games below).
9. **Contact** — dark fields with red focus rings, glowing red submit button.
   New matching footer.
10. **Custom cursor** — red ring, flares/expands over links and interactive text.
    Desktop only.

## Games

### Skill Memory Match (replaces the static Skills section)

- Face-down cards in the dark surface style; flip animation reveals real tech logos
  from the existing `SKILLS` constant.
- Match all pairs → section "completes": cards settle into a classic skill display
  with a stats line (e.g., "Matched in 42s — my stack, now yours").
- **Skip affordance:** a visible "just show me the skills" button instantly reveals
  the full skill display for recruiters in a hurry.
- Grid: 4×3 desktop → 3×4 phone. Tap to flip on touch devices.
- Uses a curated subset of skills for pairs (12 cards = 6 pairs); the completed
  state shows the full skill list.

### Bug Squash ("Break My Site" section)

- Bounded arena; animated bug critters crawl across it. Click/tap squashes with a
  red splat + pop feedback.
- 30-second timed run, live score counter, best score persisted in `localStorage`.
- Sits behind a "Start" button — never interrupts normal scrolling.
- Playful copy: "I squash bugs for a living — beat me."
- Mobile: larger bugs, tap targets ≥ 44px.

### Shared game rules

- Pure React + Motion. No canvas libraries, no new deps.
- `prefers-reduced-motion`: bugs walk instead of skitter; cards fade instead of flip.
- Games never block content: memory match is skippable, bug squash is opt-in.

## Technical Approach

- **Stack unchanged:** Next.js 16.2.1, React 19, Tailwind v4, Motion, existing
  shadcn-style `components/ui` primitives.
- Theme tokens defined in `app/globals.css` via Tailwind v4 `@theme`.
- Existing component structure preserved — each `components/custom/*` component is
  restyled/rebuilt in place. New components: game components and an angled divider.
- **Repo rule:** read `node_modules/next/dist/docs/` guides before writing any code
  (this Next.js version has breaking changes vs. training data).
- SEO/metadata, sitemap, robots, OG images untouched except where colors/fonts appear.

## Responsiveness

- Every section verified at 360px, 768px, 1024px, 1440px+ widths.
- Custom cursor and hover-glow effects are desktop-only; touch devices get tap
  feedback instead.
- Hero type scales fluidly (clamp-based sizing) so it never overflows on small
  screens.

## Accessibility & Performance

- All animations gated behind `prefers-reduced-motion`.
- Games fully keyboard-accessible where applicable (memory cards focusable/flippable
  via Enter); bug squash offers score parity via larger targets rather than
  precision requirements.
- Skip-to-content and `sr-only` h1 preserved.
- Intro loader shortened; hero content visible ≤ ~1.5s after load.

## Testing

- Manual verification at each breakpoint (dev server + browser).
- Lint + build must pass (`npm run lint`, `npm run build`).
- Game logic (match detection, timer, scoring) written as small pure functions so
  they can be unit-tested if a test runner is added later; correctness verified
  manually in-browser for now.
