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

  // Build deck on mount (client-only randomness avoids hydration mismatch).
  // Random shuffling cannot happen during render (would desync server/client
  // output), so this deliberately synchronizes state from an external,
  // non-deterministic source on mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
