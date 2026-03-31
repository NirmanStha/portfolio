"use client";

import { EXPERIENCES as DEFAULT_EXPERIENCES } from "@/components/constants";
import { ExperienceProps } from "@/lib/experienceTypes";
import TimelineCard from "@/components/custom/TimelineCard";
import { motion } from "motion/react";
import { useState } from "react";

export default function Experience({
  experiences = DEFAULT_EXPERIENCES,
  techStack = [],
  maxBullets = 4,
  compactOnMobile = true,
}: ExperienceProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setExpanded((s) => ({ ...s, [i]: !s[i] }));

  return (
    <section id="experience" className="py-28 px-6 md:px-20 relative">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-[11px] font-medium tracking-[.18em] uppercase text-white/30 mb-3">
            Where I shipped
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,4.5vw,2.5rem)] text-white/90">
            Selected experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 pl-6 space-y-12">
          {experiences.map((exp, idx) => {
            const isOpen = expanded[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Header (clickable) */}
                <button
                  onClick={() => toggle(idx)}
                  className="text-left w-full group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-lg md:text-xl font-semibold">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-white/50">
                        {exp.role} · {exp.period}
                      </p>
                    </div>

                    {/* indicator */}
                    <span className="text-white/40 group-hover:text-white transition">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                </button>

                {/* Expandable content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6">
                    <TimelineCard
                      entry={exp}
                      index={idx}
                      side="left"
                      expanded={true}
                      toggle={() => toggle(idx)}
                      globalTech={techStack}
                      maxBullets={maxBullets}
                      compactOnMobile={compactOnMobile}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
