# Crimson Core Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page portfolio in the NestJS-inspired "Crimson Core" style (near-black navy + red `#e0234e`, angled dividers, crimson glows) with two embedded games: a Skill Memory Match and a Bug Squash arena.

**Architecture:** Restyle/rebuild each existing `components/custom/*` component in place; add pure game-logic modules in `lib/` consumed by new client game components; compose everything in `app/page.tsx`. Theme tokens live in Tailwind v4 `@theme` in `app/globals.css`.

**Tech Stack:** Next.js 16.2.1 (App Router, Turbopack), React 19, Tailwind CSS v4, Motion (`motion/react`), lucide-react, existing shadcn-style `components/ui` primitives.

## Global Constraints

- **No new dependencies.** Pure React + Motion + Tailwind v4; no canvas/game libraries. Do not edit `package.json` dependencies.
- **Accent color is exactly `#e0234e`** (`--cc-crimson`). It replaces every indigo/violet accent. Skill icons keep their own brand colors; everything else is monochrome + red.
- **Backgrounds:** page base `#0a0a12` (`night`), raised surfaces `#12121d` (`surface-1`).
- **Fully responsive 360px → 4K.** Hero type uses `clamp()`. Custom cursor & hover glows are pointer-fine/desktop only.
- **`prefers-reduced-motion` respected everywhere** (use `useReducedMotion()` from `motion/react`): bugs walk instead of skitter, cards fade instead of flip, loader shortens.
- **Games never block content:** memory match has a visible skip button; bug squash starts only after an explicit Start click.
- **Intro loader ≤ ~1.2s; hero content visible ≤ ~1.5s after load.** All animation delays that referenced the old 2.5s loader (2.2s, 2.5s, 3s) must shrink accordingly.
- **Content is frozen:** project/experience/certification/skill data in `components/constants.tsx` must not be reworded (moving data between files is fine).
- **This repo's Next.js has breaking changes** vs. training data. Relevant, already-verified facts: Turbopack is the default; `next lint` is removed (use `npm run lint` which runs `eslint`); `next/font/google` API is unchanged; `Image` default quality list is `[75]`.
- **Verification gates for every task:** `npm run lint` passes; the dev server renders without console errors. Final task additionally requires `npm run build` to pass and a manual responsive sweep (360 / 768 / 1024 / 1440 px).
- **Section ids** (navbar anchors depend on them): `home`, `projects`, `skills`, `experience`, `play`, `contact`.
- Commit after every task with the message given in the task.

**Dev server:** run `npm run dev` once in the background and keep it running across tasks; check pages at `http://localhost:3000`.

---

### Task 1: Theme foundation — tokens, fonts, utilities

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces Tailwind classes used by ALL later tasks: `bg-night`, `bg-surface-1`, `text-crimson`, `bg-crimson`, `border-crimson`, `font-heading`, and utilities `angled`, `angled-top`, `bg-grid-faint`. Angled sections apply `angled`/`angled-top` directly — there is no separate divider component.

- [ ] **Step 1: Add theme tokens and utilities to `app/globals.css`**

In the existing `@theme inline` block, change the line `--font-heading: var(--font-sans);` to `--font-heading: var(--font-heading);` and add these three lines inside the same block:

```css
  --color-night: var(--cc-night);
  --color-surface-1: var(--cc-surface);
  --color-crimson: var(--cc-crimson);
```

In the existing `:root` block, add at the top:

```css
  --cc-night: #0a0a12;
  --cc-surface: #12121d;
  --cc-crimson: #e0234e;
```

At the end of the file (after the `@layer base` block), append:

```css
@utility angled {
  clip-path: polygon(
    0 clamp(1.5rem, 4vw, 3rem),
    100% 0,
    100% calc(100% - clamp(1.5rem, 4vw, 3rem)),
    0 100%
  );
}

@utility angled-top {
  clip-path: polygon(0 clamp(1.5rem, 4vw, 3rem), 100% 0, 100% 100%, 0 100%);
}

@utility bg-grid-faint {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
}
```

- [ ] **Step 2: Register the heading font and new base background in `app/layout.tsx`**

Change the font imports/definitions at the top:

```tsx
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});
```

Change the `<body>` element to:

```tsx
      <body
        className={cn(
          "min-h-screen bg-night font-sans antialiased",
          inter.variable,
          spaceGrotesk.variable,
        )}
      >
```

(Only the `bg-slate-950` → `bg-night` class and the added `spaceGrotesk.variable` change; everything else in the file stays.)

- [ ] **Step 3: Verify**

Run: `npm run lint` — Expected: no errors.
Start `npm run dev` (background) and load `http://localhost:3000` — Expected: page renders (still mostly old design; base background is now `#0a0a12`), no console errors, no Tailwind unknown-class warnings in terminal.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: crimson core theme tokens, heading font, angled utilities"
```

---

### Task 2: Intro loader — red pulse wordmark, ~1.2s

**Files:**
- Modify: `components/custom/Intro.tsx` (full rewrite)

**Interfaces:**
- Consumes: `bg-night`, `text-crimson`, `font-heading` from Task 1.
- Produces: loader hides itself after 1.2s (0.3s under reduced motion). Later tasks assume hero/nav delays of ~1.2s.

- [ ] **Step 1: Rewrite `components/custom/Intro.tsx`**

```tsx
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const IntroLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(
      () => setIsVisible(false),
      reducedMotion ? 300 : 1200,
    );
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-night"
        >
          <div className="relative flex items-center justify-center">
            {!reducedMotion && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0.5 }}
                animate={{ scale: [0.6, 1.2, 1.4], opacity: [0.5, 0.3, 0] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute h-40 w-40 rounded-full bg-crimson/40 blur-2xl"
              />
            )}
            <motion.h2
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading relative text-5xl font-bold text-white md:text-7xl"
            >
              NS<span className="text-crimson">.</span>
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
```

- [ ] **Step 2: Verify**

Run: `npm run lint` — Expected: pass.
Reload `http://localhost:3000` — Expected: dark loader with "NS." and a red pulse, gone in ~1.2s.

- [ ] **Step 3: Commit**

```bash
git add components/custom/Intro.tsx
git commit -m "feat: rebuild intro loader as 1.2s crimson wordmark pulse"
```

---

### Task 3: Custom cursor — crimson ring, pointer-fine only

**Files:**
- Modify: `components/custom/Cursor.tsx`

**Interfaces:**
- Consumes: nothing new. Keeps reacting to `a`, `button`, `[data-cursor]` (values `view` | `text` | anything else = pointer).

- [ ] **Step 1: Restyle and gate the cursor**

Apply these changes to `components/custom/Cursor.tsx`:

1. Add a mount guard so it only renders for precise pointers. Add state + effect after the existing `useState` calls:

```tsx
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);
```

   And immediately before the `return`, add:

```tsx
  if (!enabled) return null;
```

2. Outer ring div: replace `border border-white/40` with `border border-crimson/60` and remove `mix-blend-difference`.
3. In the ring's `animate` prop, replace the `backgroundColor` values:

```tsx
        animate={{
          borderWidth: cursorState === "text" ? 0 : 1,
          backgroundColor:
            cursorState === "text"
              ? "rgba(224, 35, 78, 0.9)"
              : cursorState === "view"
                ? "rgba(224, 35, 78, 0.15)"
                : "rgba(224, 35, 78, 0)",
        }}
```

4. Inner dot div: replace `bg-white mix-blend-difference` with `bg-crimson`.
5. The "View" label span: keep as is (white text reads fine over the red-tinted ring).

- [ ] **Step 2: Verify**

Run: `npm run lint` — Expected: pass.
On `http://localhost:3000`: red dot + red ring follow the mouse; ring flares/tints red over links and buttons. In devtools device emulation (touch), cursor does not render.

- [ ] **Step 3: Commit**

```bash
git add components/custom/Cursor.tsx
git commit -m "feat: crimson custom cursor, pointer-fine devices only"
```

---

### Task 4: Navbar — dark glass, scroll-spy red underline

**Files:**
- Modify: `components/Navbar.tsx` (full rewrite)

**Interfaces:**
- Consumes: section ids `home`, `projects`, `skills`, `experience`, `play`, `contact` (Tasks 5–11 must set these ids).
- Produces: fixed navbar; appears after 1.2s.

- [ ] **Step 1: Rewrite `components/Navbar.tsx`**

```tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const NAV_ITEMS = [
  "Home",
  "Projects",
  "Skills",
  "Experience",
  "Play",
  "Contact",
];

const Navbar: React.FC = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.toLowerCase()),
    ).filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 right-4 z-50 w-12 max-w-5xl rounded-full border border-white/10 bg-night/70 py-3 shadow-xl shadow-crimson/5 backdrop-blur-md md:left-1/2 md:w-fit md:-translate-x-1/2 md:px-6 md:py-4"
    >
      <div className="flex items-center justify-between gap-6">
        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;
            return (
              <li key={item} className="relative">
                <a
                  href={`#${id}`}
                  className={`text-sm tracking-widest uppercase transition ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-crimson"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <div className="flex w-full items-center justify-center md:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="text-white">
                <Menu size={22} />
              </div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/10 bg-night px-6 [&>button]:text-white [&>button_svg]:stroke-white"
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-16 flex flex-col gap-8"
              >
                {NAV_ITEMS.map((item) => {
                  const id = item.toLowerCase();
                  return (
                    <motion.div key={item} variants={itemVariant}>
                      <Link
                        href={`#${id}`}
                        className={`text-lg tracking-widest uppercase transition hover:translate-x-1 ${
                          active === id ? "text-crimson" : "text-white/90"
                        }`}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: Verify**

Run: `npm run lint` — Expected: pass.
On the page: navbar fades in ~1.2s; red underline sits under "Home"; (Skills/Play links will 404-scroll until Tasks 7/10 add those ids — that's expected for now). Mobile sheet opens with dark background.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: dark glass navbar with crimson scroll-spy underline"
```

---

### Task 5: Hero — massive heading, red accent word, glow + grid

**Files:**
- Modify: `components/custom/Hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `font-heading`, `bg-grid-faint`, `text-crimson`, `bg-crimson` from Task 1.
- Produces: section `id="home"`.

- [ ] **Step 1: Rewrite `components/custom/Hero.tsx`**

```tsx
"use client";
import React from "react";
import { motion, Variants } from "motion/react";

const Hero: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 1.2, staggerChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="bg-grid-faint relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-20"
    >
      {/* crimson glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(224,35,78,0.55), transparent 65%)",
        }}
      />
      {/* fade grid toward bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, #0a0a12 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.p
            variants={item}
            className="text-crimson text-sm font-medium tracking-widest uppercase md:text-base"
          >
            Nirman Shrestha | React.js | Next.js | TypeScript | JavaScript
          </motion.p>

          <motion.h1
            variants={item}
            data-cursor="text"
            className="font-heading text-[clamp(3rem,10vw,8.5rem)] leading-[0.95] font-bold text-white"
          >
            Crafting <br />
            <span className="text-crimson">Digital</span> <br />
            Experiences.
          </motion.h1>

          <motion.div
            variants={item}
            className="flex flex-col justify-between gap-10 pt-10 md:flex-row md:items-end"
          >
            <p className="max-w-md text-lg leading-relaxed text-slate-400">
              I design and build performant web products as a frontend
              engineer, with deep focus on React.js, Next.js, TypeScript,
              JavaScript, and fluid interaction design.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex"
            >
              <a
                href="#projects"
                data-cursor="pointer"
                className="bg-crimson rounded-full px-8 py-4 text-sm font-medium tracking-widest text-white uppercase transition-transform"
              >
                View Works
              </a>
              <div className="bg-crimson/40 absolute inset-0 -z-10 scale-100 rounded-full blur-xl transition-transform duration-500 group-hover:scale-150" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-crimson/50 absolute right-0 bottom-0 hidden h-32 w-px origin-top md:block"
      />
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Verify**

Run: `npm run lint` — Expected: pass.
On the page: hero text appears ~1.2s after load in bold Space Grotesk, "Digital" in red, red glowing CTA, faint grid + red blob behind. At 360px width the h1 does not overflow horizontally.

- [ ] **Step 3: Commit**

```bash
git add components/custom/Hero.tsx
git commit -m "feat: crimson hero with glow blob, grid backdrop, red CTA"
```

---

### Task 6: Projects — red glow cards

**Files:**
- Modify: `components/custom/Project.tsx`
- Modify: `components/custom/ProjectCard.tsx`

**Interfaces:**
- Consumes: `font-heading`, crimson classes.
- Produces: section keeps `id="projects"`.

- [ ] **Step 1: Restyle the section header in `components/custom/Project.tsx`**

Replace the `<section ...>` opening tag with:

```tsx
    <section id="projects" className="bg-surface-1 angled px-6 py-32 md:px-20">
```

Replace the `<h2 ...>` element with:

```tsx
            <h2
              data-cursor="text"
              className="font-heading text-4xl font-bold text-white md:text-6xl"
            >
              Some <br /> recent <span className="text-crimson">works.</span>
            </h2>
```

- [ ] **Step 2: Restyle `components/custom/ProjectCard.tsx`**

1. Index label span: change className to

```tsx
      <span className="text-crimson mb-3 block text-[11px] font-medium tracking-widest uppercase">
```

2. `Card` hover shadow — replace the `hovered ? ... : ...` shadow classes with:

```tsx
          hovered
            ? "shadow-[inset_0_0_0_1px_rgba(224,35,78,0.45),0_24px_80px_-24px_rgba(224,35,78,0.35)]"
            : "shadow-[inset_0_0_0_1px_transparent]",
```

3. Title `<h3>`: replace `font-serif` with `font-heading` (keep the rest of its classes).
4. Arrow circle div — replace its hovered/idle classes with:

```tsx
            hovered
              ? "bg-crimson border-crimson -translate-y-1 translate-x-1 border text-white"
              : "bg-secondary border-border/50 text-foreground translate-x-0 translate-y-0 border",
```

- [ ] **Step 3: Verify**

Run: `npm run lint` — Expected: pass.
On the page: projects section sits on the lighter surface with diagonal top/bottom edges; hovering a card shows a red inner ring + red outer glow, and the arrow chip turns red.

- [ ] **Step 4: Commit**

```bash
git add components/custom/Project.tsx components/custom/ProjectCard.tsx
git commit -m "feat: angled projects section with crimson glow cards"
```

---

### Task 7: Skill Memory Match — logic + game section

**Files:**
- Create: `lib/memoryGame.ts`
- Create: `components/custom/SkillMemoryGame.tsx`
- Modify: `components/custom/Skill.tsx` (accent restyle + remove its own `<section>` wrapper duplication — see below)
- Modify: `app/page.tsx` (swap `<Skill />` for `<SkillMemoryGame />`)

**Interfaces:**
- Consumes: `SKILLS` from `components/constants.tsx`; `Skill` component (revealed display).
- Produces:
  - `buildDeck(skillNames: string[], random?: () => number): MemoryCard[]` and `isMatch(a: MemoryCard, b: MemoryCard): boolean` from `lib/memoryGame.ts`, where `MemoryCard = { key: string; skillName: string }`.
  - `<SkillMemoryGame />` renders section `id="skills"`.

- [ ] **Step 1: Create `lib/memoryGame.ts` (pure logic)**

```ts
export interface MemoryCard {
  key: string;
  skillName: string;
}

export function buildDeck(
  skillNames: string[],
  random: () => number = Math.random,
): MemoryCard[] {
  const cards: MemoryCard[] = skillNames.flatMap((name) => [
    { key: `${name}-a`, skillName: name },
    { key: `${name}-b`, skillName: name },
  ]);
  // Fisher–Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function isMatch(a: MemoryCard, b: MemoryCard): boolean {
  return a.skillName === b.skillName && a.key !== b.key;
}
```

- [ ] **Step 2: Restyle `components/custom/Skill.tsx` accents**

Three small changes (the component keeps its own `<section>`; the game renders it only after completion, outside its own wrapper — see Step 3 for how they compose):

1. Both ambient orb `radial-gradient` colors (`#7c3aed`, `#0d9488`) become `#e0234e`.
2. The `<h2>`: replace `font-serif` with `font-heading font-bold`, and `<em className="italic text-violet-400">` with `<em className="italic text-crimson">`.
3. Category tab active classes: replace
   `"bg-violet-500/10 border-violet-400/40 text-violet-300"` with
   `"bg-crimson/10 border-crimson/40 text-crimson"`.
4. Remove `<section className=...>` wrapper? **No** — instead change the section tag from `<section className="relative py-28 overflow-hidden ">` to `<div className="relative py-28 overflow-hidden">` (and its closing tag), because `SkillMemoryGame` provides the `<section id="skills">` wrapper.

- [ ] **Step 3: Create `components/custom/SkillMemoryGame.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { SKILLS } from "../constants";
import { buildDeck, isMatch, MemoryCard } from "@/lib/memoryGame";
import Skill from "./Skill";

const PAIR_NAMES = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Redux Toolkit",
];

const iconFor = (name: string) =>
  SKILLS.find((s) => s.name === name)?.icon as string;

export default function SkillMemoryGame() {
  const [deck, setDeck] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<MemoryCard[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  // Build deck on mount (client-only randomness avoids hydration mismatch)
  useEffect(() => {
    setDeck(buildDeck(PAIR_NAMES));
  }, []);

  // Timer runs from first flip until completion
  const complete = matched.size === PAIR_NAMES.length;
  useEffect(() => {
    if (!started || complete || revealed) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [started, complete, revealed]);

  const flip = (card: MemoryCard) => {
    if (revealed || complete) return;
    if (flipped.length === 2) return;
    if (flipped.some((c) => c.key === card.key)) return;
    if (matched.has(card.skillName)) return;
    if (!started) setStarted(true);

    const next = [...flipped, card];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      if (isMatch(next[0], next[1])) {
        setMatched((prev) => new Set(prev).add(card.skillName));
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  const done = complete || revealed;

  return (
    <section id="skills" className="relative px-6 py-4 md:py-10">
      <div className="mx-auto max-w-5xl">
        {!done && (
          <div className="py-24 text-center">
            <p className="mb-3 text-[11px] font-medium tracking-[.18em] text-white/30 uppercase">
              Technical arsenal — playable edition
            </p>
            <h2 className="font-heading text-[clamp(2rem,5vw,3rem)] font-bold text-white/90">
              Match my <span className="text-crimson">stack.</span>
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Flip cards, find the pairs, learn what I work with.
            </p>

            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-4">
              {deck.map((card) => {
                const isUp =
                  flipped.some((c) => c.key === card.key) ||
                  matched.has(card.skillName);
                return (
                  <button
                    key={card.key}
                    onClick={() => flip(card)}
                    aria-label={isUp ? card.skillName : "Hidden card"}
                    className="perspective-[600px] aspect-square cursor-pointer"
                  >
                    <motion.div
                      animate={
                        reducedMotion
                          ? { opacity: 1 }
                          : { rotateY: isUp ? 180 : 0 }
                      }
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative h-full w-full"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* back */}
                      <div
                        className="bg-surface-1 border-crimson/20 absolute inset-0 flex items-center justify-center rounded-xl border"
                        style={{
                          backfaceVisibility: "hidden",
                          opacity: reducedMotion && isUp ? 0 : 1,
                        }}
                      >
                        <span className="text-crimson/60 font-heading text-xl font-bold">
                          ?
                        </span>
                      </div>
                      {/* face */}
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: reducedMotion ? "none" : "rotateY(180deg)",
                          opacity: reducedMotion && !isUp ? 0 : 1,
                        }}
                      >
                        <Image
                          src={iconFor(card.skillName)}
                          alt={card.skillName}
                          width={36}
                          height={36}
                          className="object-contain"
                          unoptimized
                        />
                        <span className="text-[10px] leading-tight text-white/80">
                          {card.skillName}
                        </span>
                      </div>
                    </motion.div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
              <span>Moves: {moves}</span>
              <span>Time: {seconds}s</span>
              <button
                onClick={() => setRevealed(true)}
                className="text-crimson cursor-pointer underline-offset-4 hover:underline"
              >
                Just show me the skills
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {complete && (
                <p className="pt-16 text-center text-sm text-slate-400">
                  Matched in {seconds}s and {moves} moves —{" "}
                  <span className="text-crimson">my stack, now yours.</span>
                </p>
              )}
              <Skill />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Swap into `app/page.tsx`**

Replace the import `import Skill from "@/components/custom/Skill";` with `import SkillMemoryGame from "@/components/custom/SkillMemoryGame";` and replace `<Skill />` with `<SkillMemoryGame />`.

- [ ] **Step 5: Verify**

Run: `npm run lint` — Expected: pass.
On the page: a 3/4-column grid of face-down cards with red "?"; clicking two mismatched cards flips them back after ~0.7s; matching all 6 pairs (or clicking "Just show me the skills") reveals the full skill grid with red-accented tabs; stats line shows time and moves after a genuine win. Keyboard: Tab reaches cards, Enter flips.

- [ ] **Step 6: Commit**

```bash
git add lib/memoryGame.ts components/custom/SkillMemoryGame.tsx components/custom/Skill.tsx app/page.tsx
git commit -m "feat: skill memory match game with skip reveal"
```

---

### Task 8: Experience timeline — crimson nodes and accents

**Files:**
- Modify: `components/custom/Experience.tsx`
- Modify: `components/custom/TimelineCard.tsx`

- [ ] **Step 1: Restyle `components/custom/Experience.tsx`**

1. `<h2>`: replace `font-serif` with `font-heading font-bold`.
2. Timeline wrapper div: change `className="relative border-l border-white/10 pl-6 space-y-12"` to `className="relative border-l border-crimson/30 pl-6 space-y-12"`.
3. Inside each entry's `<motion.div ... className="relative">`, add a red node dot as the first child (before the `<Button>`):

```tsx
                <span
                  aria-hidden
                  className="bg-crimson shadow-crimson/50 absolute top-2 -left-[31px] h-2.5 w-2.5 rounded-full shadow-[0_0_10px]"
                />
```

- [ ] **Step 2: Restyle `components/custom/TimelineCard.tsx`**

1. Card hover shadow: replace `hover:shadow-[0_28px_80px_-32px_rgba(99,102,241,0.08)]` with `hover:shadow-[0_28px_80px_-32px_rgba(224,35,78,0.15)]`.
2. `<h3>`: replace `font-serif` with `font-heading`.
3. Bullet circle SVG: change `fill="#a78bfa"` to `fill="#e0234e"`.
4. "Show more" button: replace `text-indigo-300` with `text-crimson`.

- [ ] **Step 3: Verify**

Run: `npm run lint` — Expected: pass.
On the page: timeline rail is red-tinted with glowing red dots per role; bullets and "Show more" are red; expanding/collapsing still works.

- [ ] **Step 4: Commit**

```bash
git add components/custom/Experience.tsx components/custom/TimelineCard.tsx
git commit -m "feat: crimson experience timeline"
```

---

### Task 9: Certifications — card component

**Files:**
- Create: `components/custom/Certifications.tsx`
- Modify: `app/page.tsx` (replace the inline certification block)

**Interfaces:**
- Produces: `<Certifications />`, self-contained (data inside the file, copied verbatim from `app/page.tsx`).

- [ ] **Step 1: Create `components/custom/Certifications.tsx`**

```tsx
"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Advance React",
    issuer: "Issued by Meta on Coursera",
    href: "https://coursera.org/share/16b4cdfa35e7ae0228d70a29fa73c331",
  },
  {
    title: "Web Design Certification",
    issuer: "Issued by Broadway Infosys",
    href: "https://broadwayinfosys.com/certificate-verification-code/eyJpdiI6InhkMDZJMWR0ZUtJRTJ4T3ptZ0pLMUE9PSIsInZhbHVlIjoiaEdZOFQ2eDBXL0I4bFFkZWRpd3ZYQT09IiwibWFjIjoiNTJjNDc4MzFkNTEzOTUzYjk3MTUwMzQ4ZDBmYThkZDJiMGNmOGI1NjE2NjE2ZjQ2YzUwM2QzOTcxZjVmOTM3YyIsInRhZyI6IiJ9",
  },
];

export default function Certifications() {
  return (
    <section className="px-6 py-20 md:px-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-[11px] font-medium tracking-[.18em] text-white/30 uppercase">
            Verified credentials
          </p>
          <h2 className="font-heading text-3xl font-bold text-white">
            Certifications
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer me"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-surface-1 border-crimson/60 hover:shadow-crimson/15 flex items-start justify-between gap-4 rounded-xl border border-l-2 border-white/8 p-6 transition-shadow duration-300 hover:shadow-[0_20px_60px_-24px]"
            >
              <div>
                <h3 className="font-medium text-white">{cert.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{cert.issuer}</p>
              </div>
              <ExternalLink
                size={16}
                className="group-hover:text-crimson mt-1 shrink-0 text-white/40 transition-colors"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace the inline block in `app/page.tsx`**

Delete the entire `<div className="certification ">...</div>` block and render `<Certifications />` in its place. Add `import Certifications from "@/components/custom/Certifications";`.

- [ ] **Step 3: Verify**

Run: `npm run lint` — Expected: pass.
On the page: two certification cards with red left borders; hover shows red-tinted shadow and the external-link icon turns red; both links open in a new tab.

- [ ] **Step 4: Commit**

```bash
git add components/custom/Certifications.tsx app/page.tsx
git commit -m "feat: certification cards with crimson accents"
```

---

### Task 10: Bug Squash — logic + arena section

**Files:**
- Create: `lib/bugSquash.ts`
- Create: `components/custom/BugSquash.tsx`
- Modify: `app/page.tsx` (add `<BugSquash />` between `<Certifications />` and the contact block)

**Interfaces:**
- Produces:
  - From `lib/bugSquash.ts`: `GAME_DURATION_S = 30`; `interface BugEntity { id: number; x: number; y: number; angle: number; speed: number }`; `createBug(id: number, w: number, h: number, size: number, random?: () => number): BugEntity`; `stepBug(bug: BugEntity, w: number, h: number, size: number, dt: number): BugEntity`.
  - `<BugSquash />` renders section `id="play"`.

- [ ] **Step 1: Create `lib/bugSquash.ts` (pure logic)**

```ts
export const GAME_DURATION_S = 30;

export interface BugEntity {
  id: number;
  x: number;
  y: number;
  angle: number; // radians
  speed: number; // px per second
}

export function createBug(
  id: number,
  w: number,
  h: number,
  size: number,
  random: () => number = Math.random,
): BugEntity {
  return {
    id,
    x: random() * Math.max(1, w - size),
    y: random() * Math.max(1, h - size),
    angle: random() * Math.PI * 2,
    speed: 60 + random() * 80,
  };
}

export function stepBug(
  bug: BugEntity,
  w: number,
  h: number,
  size: number,
  dt: number,
): BugEntity {
  let x = bug.x + Math.cos(bug.angle) * bug.speed * dt;
  let y = bug.y + Math.sin(bug.angle) * bug.speed * dt;
  let angle = bug.angle;

  const maxX = Math.max(0, w - size);
  const maxY = Math.max(0, h - size);

  if (x < 0 || x > maxX) {
    angle = Math.PI - angle;
    x = Math.min(Math.max(x, 0), maxX);
  }
  if (y < 0 || y > maxY) {
    angle = -angle;
    y = Math.min(Math.max(y, 0), maxY);
  }

  return { ...bug, x, y, angle };
}
```

- [ ] **Step 2: Create `components/custom/BugSquash.tsx`**

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bug as BugIcon } from "lucide-react";

import {
  BugEntity,
  createBug,
  GAME_DURATION_S,
  stepBug,
} from "@/lib/bugSquash";

const MAX_BUGS = 6;
const SPAWN_MS = 900;
const BEST_KEY = "bugsquash-best";

interface Splat {
  id: number;
  x: number;
  y: number;
}

export default function BugSquash() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [bugs, setBugs] = useState<BugEntity[]>([]);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_S);
  const [best, setBest] = useState(0);
  const idRef = useRef(0);
  const reducedMotion = useReducedMotion();
  // Touch devices get larger, easier targets
  const [bugSize, setBugSize] = useState(44);

  useEffect(() => {
    setBest(Number(localStorage.getItem(BEST_KEY) ?? 0));
    setBugSize(window.matchMedia("(pointer: coarse)").matches ? 56 : 44);
  }, []);

  const spawn = useCallback(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    setBugs((prev) => {
      if (prev.length >= MAX_BUGS) return prev;
      idRef.current += 1;
      return [
        ...prev,
        createBug(
          idRef.current,
          arena.clientWidth,
          arena.clientHeight,
          bugSize,
        ),
      ];
    });
  }, [bugSize]);

  // Game clock
  useEffect(() => {
    if (status !== "running") return;
    const clock = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setStatus("over");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(clock);
  }, [status]);

  // Spawner
  useEffect(() => {
    if (status !== "running") return;
    spawn();
    const spawner = setInterval(spawn, SPAWN_MS);
    return () => clearInterval(spawner);
  }, [status, spawn]);

  // Movement loop
  useEffect(() => {
    if (status !== "running") return;
    const arena = arenaRef.current;
    if (!arena) return;
    // Reduced motion slows bugs by scaling the time step, NOT by mutating
    // bug.speed (which would compound every tick and freeze them).
    const dt = 0.05 * (reducedMotion ? 0.35 : 1);
    const mover = setInterval(() => {
      setBugs((prev) =>
        prev.map((b) =>
          stepBug(b, arena.clientWidth, arena.clientHeight, bugSize, dt),
        ),
      );
    }, 50);
    return () => clearInterval(mover);
  }, [status, reducedMotion, bugSize]);

  // Persist best score
  useEffect(() => {
    if (status === "over" && score > best) {
      setBest(score);
      localStorage.setItem(BEST_KEY, String(score));
    }
  }, [status, score, best]);

  const start = () => {
    setBugs([]);
    setSplats([]);
    setScore(0);
    setTimeLeft(GAME_DURATION_S);
    setStatus("running");
  };

  const squash = (bug: BugEntity) => {
    setBugs((prev) => prev.filter((b) => b.id !== bug.id));
    setScore((s) => s + 1);
    setSplats((prev) => [...prev, { id: bug.id, x: bug.x, y: bug.y }]);
    setTimeout(
      () => setSplats((prev) => prev.filter((s) => s.id !== bug.id)),
      500,
    );
  };

  return (
    <section id="play" className="bg-surface-1 angled px-6 py-24 md:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-medium tracking-[.18em] text-white/30 uppercase">
              Interlude
            </p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              I squash bugs for a living —{" "}
              <span className="text-crimson">beat me.</span>
            </h2>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <span>
              Score: <span className="text-white">{score}</span>
            </span>
            <span>
              Best: <span className="text-crimson">{best}</span>
            </span>
            {status === "running" && (
              <span>
                Time: <span className="text-white">{timeLeft}s</span>
              </span>
            )}
          </div>
        </div>

        <div
          ref={arenaRef}
          className="border-crimson/20 bg-night relative h-80 overflow-hidden rounded-2xl border md:h-96"
        >
          {status !== "running" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
              {status === "over" && (
                <p className="font-heading text-2xl font-bold text-white">
                  {score} bugs squashed
                  {score >= best && score > 0 && (
                    <span className="text-crimson"> — new best!</span>
                  )}
                </p>
              )}
              <button
                onClick={start}
                data-cursor="pointer"
                className="bg-crimson shadow-crimson/40 cursor-pointer rounded-full px-8 py-4 text-sm font-medium tracking-widest text-white uppercase shadow-[0_0_30px] transition-transform hover:scale-105 active:scale-95"
              >
                {status === "over" ? "Play again" : "Start squashing"}
              </button>
              <p className="text-xs text-slate-500">
                {GAME_DURATION_S}s on the clock. Tap or click the bugs.
              </p>
            </div>
          )}

          {bugs.map((bug) => (
            <button
              key={bug.id}
              onClick={() => squash(bug)}
              aria-label="Squash bug"
              className="absolute cursor-pointer"
              style={{
                left: bug.x,
                top: bug.y,
                width: bugSize,
                height: bugSize,
              }}
            >
              <BugIcon
                className="text-crimson h-full w-full"
                strokeWidth={1.5}
                style={{
                  transform: `rotate(${bug.angle + Math.PI / 2}rad)`,
                }}
              />
            </button>
          ))}

          <AnimatePresence>
            {splats.map((splat) => (
              <motion.div
                key={splat.id}
                initial={{ scale: 0.4, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="bg-crimson/60 pointer-events-none absolute rounded-full blur-sm"
                style={{
                  left: splat.x,
                  top: splat.y,
                  width: bugSize,
                  height: bugSize,
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to `app/page.tsx`**

Add `import BugSquash from "@/components/custom/BugSquash";` and render `<BugSquash />` immediately after `<Certifications />`.

- [ ] **Step 4: Verify**

Run: `npm run lint` — Expected: pass.
On the page: "Play" section shows an empty arena with a glowing red Start button; starting spawns crawling red bugs that bounce off walls; clicking one pops a red splat and increments score; at 0s the overlay returns with the final score; best score survives a page reload. In responsive mode (touch), bugs are visibly larger.

- [ ] **Step 5: Commit**

```bash
git add lib/bugSquash.ts components/custom/BugSquash.tsx app/page.tsx
git commit -m "feat: bug squash arena game with best-score persistence"
```

---

### Task 11: Contact + Footer — dark crimson finale

**Files:**
- Modify: `components/custom/ContactForm.tsx`
- Create: `components/custom/Footer.tsx`
- Modify: `app/page.tsx` (add `<Footer />` after the contact block, inside `<main>`'s parent div)

- [ ] **Step 1: Restyle `components/custom/ContactForm.tsx`**

All logic/state stays identical. Apply these presentation changes:

1. Section tag becomes:

```tsx
    <section
      id="contact"
      className="angled-top bg-surface-1 px-6 py-32 md:px-20"
    >
```

2. Heading `<motion.h2>` className becomes `"font-heading mb-8 text-5xl leading-tight font-bold text-white md:text-7xl"`, and the accent span becomes `<span className="text-crimson">great</span>`.
3. The email `<p>` becomes `className="text-xl font-medium text-white"`.
4. Social links `<a>`: add `text-white/70 hover:text-crimson` and remove `hover:opacity-50` (keep the rest).
5. Form card `<motion.div>`: replace `bg-black text-white p-10 rounded-[40px] shadow-2xl` with `bg-night border border-white/10 text-white p-8 md:p-10 rounded-3xl shadow-[0_40px_120px_-40px_rgba(224,35,78,0.25)]`.
6. Every `<input>` and the `<textarea>`: replace `focus:border-white` with `focus:border-crimson`.
7. Submit button className becomes:

```tsx
                className="bg-crimson hover:bg-crimson/90 hover:shadow-crimson/40 w-full cursor-pointer rounded-full py-5 font-bold tracking-widest text-white uppercase transition-all hover:shadow-[0_0_40px] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
```

- [ ] **Step 2: Create `components/custom/Footer.tsx`**

```tsx
const Footer = () => (
  <footer className="bg-surface-1 border-t border-white/5 px-6 py-8 md:px-20">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
      <p>
        © {new Date().getFullYear()} Nirman Shrestha
        <span className="text-crimson">.</span>
      </p>
      <p>
        Built with Next.js — and a few{" "}
        <a href="#play" className="text-crimson underline-offset-4 hover:underline">
          bugs left to squash
        </a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
```

- [ ] **Step 3: Wire footer into `app/page.tsx`**

Add `import Footer from "@/components/custom/Footer";` and render `<Footer />` immediately after `</main>` (inside the outer `<div className="relative min-h-screen">`). Also remove the now-redundant wrapper around the contact form: replace

```tsx
          <div className="mt-12  md:px-0">
            <ContactForm />
          </div>
```

with

```tsx
          <ContactForm />
```

- [ ] **Step 4: Verify**

Run: `npm run lint` — Expected: pass.
On the page: contact section is dark surface with an angled top (no more white section); inputs get red bottom borders on focus; submit button is red with a glow on hover; footer shows below with the "bugs left to squash" link scrolling to the arena. Submit an empty form — validation error still appears.

- [ ] **Step 5: Commit**

```bash
git add components/custom/ContactForm.tsx components/custom/Footer.tsx app/page.tsx
git commit -m "feat: dark crimson contact section and footer"
```

---

### Task 12: Final composition, responsive sweep, build gate

**Files:**
- Modify: `app/page.tsx` (final order check)
- Possibly touched: any file failing the sweep

- [ ] **Step 1: Confirm final `app/page.tsx` composition**

The `<main id="main-content">` children must be, in order: `sr-only h1` → `<Hero />` → `<Project />` → `<SkillMemoryGame />` → `<Experience />` → `<Certifications />` → `<BugSquash />` → `<ContactForm />`, with `<Footer />` after `</main>`. `IntroLoader`, `CustomCursor`, `Navbar` stay above `<main>`. No leftover imports of `Skill` in `page.tsx`.

- [ ] **Step 2: Responsive + reduced-motion sweep (manual, dev server)**

At widths 360, 768, 1024, 1440 (browser devtools):
- No horizontal scrollbar at any width.
- Hero h1 wraps without overflow at 360px.
- Memory grid is 3 columns below `sm`, 4 above.
- Bug arena fills width; bugs stay in bounds after resizing.
- Navbar: pill menu on desktop, sheet on mobile; red underline tracks scrolling through home → contact.

With "Emulate CSS prefers-reduced-motion: reduce" enabled: loader exits ~0.3s, memory cards fade instead of 3D-flip, bugs move slowly.

Fix anything that fails before proceeding.

- [ ] **Step 3: Lint and build gates**

Run: `npm run lint` — Expected: exit 0, no warnings introduced by this work.
Run: `npm run build` — Expected: compiles successfully with Turbopack, all routes generated.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: crimson core final composition and responsive polish"
```
