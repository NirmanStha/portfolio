"use client";

import { EXPERIENCES as DEFAULT_EXPERIENCES } from "@/components/constants";
import { ExperienceProps } from "@/lib/experienceTypes";
import TimelineCard from "@/components/custom/TimelineCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-[11px] font-medium tracking-[.18em] uppercase text-white/30 mb-3">
            Where I shipped
          </p>
          <h2 className="font-serif text-[clamp(1.75rem,4.5vw,2.5rem)] text-white/90">
            Selected experience
          </h2>
        </motion.div>

        {/* Tabs per company */}
        <Tabs defaultValue={`tab-0`} orientation="vertical" className="mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <TabsList
              className="w-full md:w-56 flex md:flex-col gap-2 overflow-auto"
              variant="line"
            >
              {experiences.map((exp, idx) => (
                <TabsTrigger
                  key={idx}
                  value={`tab-${idx}`}
                  className="whitespace-nowrap text-white/60 opacity-100 data-active:text-white data-active:opacity-100 text-left px-3 py-2 rounded-md data-active:bg-white/50 hover:bg-white/50 hover:text-white transition-colors duration-200"
                >
                  {exp.company}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1">
              {experiences.map((exp, idx) => (
                <TabsContent key={idx} value={`tab-${idx}`}>
                  <TimelineCard
                    entry={exp}
                    index={idx}
                    side="left"
                    expanded={!!expanded[idx]}
                    toggle={() => toggle(idx)}
                    globalTech={techStack}
                    maxBullets={maxBullets}
                    compactOnMobile={compactOnMobile}
                  />
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

// (old TimelineCard implementation removed)
