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

  // Client-only browser-API read at mount (localStorage/matchMedia); this
  // cannot run during render (would desync server/client output), so the
  // synchronous setState here is intentional and hydration-safe.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Persist best score. Runs only on the "over" transition (guarded by the
  // status/score comparison), syncing derived state from the just-finished
  // round rather than looping every render.
  useEffect(() => {
    if (status === "over" && score > best) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
