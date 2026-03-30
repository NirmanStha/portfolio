"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ExperienceEntry } from "@/lib/experienceTypes";
import { dedupeTech, highlightText } from "@/lib/experienceUtils";

type TimelineCardProps = {
  entry: ExperienceEntry;
  index: number;
  side: "left" | "right";
  expanded: boolean;
  toggle: () => void;
  globalTech: string[];
  maxBullets: number;
  compactOnMobile: boolean;
};

export default function TimelineCard({
  entry,
  index,
  side,
  expanded,
  toggle,
  globalTech,
  maxBullets,
  compactOnMobile,
}: TimelineCardProps) {
  const mergedTech = dedupeTech(globalTech, entry.tech);
  const visible =
    expanded || !compactOnMobile
      ? entry.bullets
      : entry.bullets.slice(0, maxBullets);
  const hasMore = entry.bullets.length > maxBullets;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.05 }}
      className="relative"
    >
      {/* timeline removed (connector dot eliminated) */}

      <Card className="rounded-2xl p-6 bg-gradient-to-tr from-[#07070a] to-[#0b0b11] border border-white/6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-32px_rgba(99,102,241,0.08)]">
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg md:text-xl text-white">
                {entry.company}
              </h3>
              <div className="text-sm text-white/60 mt-1">
                {entry.role} ·{" "}
                <span className="text-white/40">{entry.period}</span>
              </div>
              {entry.location && (
                <div className="text-sm text-muted-foreground mt-1">
                  {entry.location}
                </div>
              )}
            </div>

            <div className="shrink-0">
              <div className="text-[11px] px-3 py-1 rounded-full bg-white/4 text-white/70">
                {index === 0 ? "Most recent" : `Role ${index + 1}`}
              </div>
            </div>
          </div>

          {mergedTech.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {mergedTech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full bg-white/3 border border-white/6 text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <ul className="mt-4 space-y-3 text-[14px] text-slate-300">
            {visible.map((b, i) => (
              <li key={i} className="flex gap-3">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="mt-1 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="5" cy="5" r="5" fill="#a78bfa" />
                </svg>
                <span>{highlightText(b, globalTech)}</span>
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="mt-3">
              <button
                onClick={toggle}
                aria-expanded={expanded}
                className="text-sm text-indigo-300 hover:underline focus:outline-none"
              >
                {expanded
                  ? "Show less"
                  : `Show more (${entry.bullets.length - maxBullets})`}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
