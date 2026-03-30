"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

type Exp = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
};

function ExperienceCard({ exp, idx }: { exp: Exp; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, delay: idx * 0.08 }}
      data-cursor="view"
    >
      <Card className="rounded-[18px] p-6 bg-[#0a0a0f] border-0">
        <CardContent className="p-0">
          <div className="mb-4">
            <h3 className="font-serif text-lg md:text-xl text-white">
              {exp.company}
            </h3>
            <div className="text-sm text-white/60 mt-1">
              {exp.role} · <span className="text-white/40">{exp.period}</span>
            </div>
            {exp.location && (
              <div className="text-sm text-muted-foreground mt-1">
                {exp.location}
              </div>
            )}
          </div>

          <ul className="mt-4 space-y-3 text-[14px] text-slate-300">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1 w-2 h-2 rounded-full bg-violet-400/90 shrink-0"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
export default ExperienceCard;
