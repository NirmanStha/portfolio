"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Project } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.13,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor="view"
    >
      {/* Index label */}
      <span className="block text-[11px] font-medium tracking-widest text-muted-foreground mb-3 uppercase">
        {String(index + 1).padStart(2, "0")} —
      </span>

      {/* ── CARD ─────────────────────────────────────────────────────────── */}
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative overflow-hidden rounded-[20px] border-0 bg-[#0a0a0f] p-0 aspect-video cursor-pointer",
          "transition-shadow duration-500",
          hovered
            ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.13)]"
            : "shadow-[inset_0_0_0_1px_transparent]",
        )}
      >
        <CardContent className="relative w-full h-full p-0">
          {/* Image — all transitions declared once, no whileHover */}
          <img
            src={project.image}
            alt={project.title}
            className={cn(
              "w-full h-full object-cover block will-change-transform",
              "transition-[transform,opacity,filter] duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              hovered
                ? "scale-[1.08] opacity-[0.88] saturate-[1.15]"
                : "scale-100 opacity-[0.65] saturate-90",
            )}
          />

          {/* Gradient overlay */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none z-2",
              "transition-opacity duration-500",
              hovered ? "opacity-75" : "opacity-100",
            )}
            style={{
              background:
                "linear-gradient(to top, #020205 0%, rgba(2,2,5,0.42) 45%, transparent 100%)",
            }}
          />

          {/* Shimmer scan */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none z-3",
              "transition-transform duration-850 ease-[cubic-bezier(0.16,1,0.3,1)]",
              hovered ? "translate-x-[110%]" : "-translate-x-[110%]",
            )}
            style={{
              background:
                "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.045) 50%, transparent 70%)",
            }}
          />

          {/* Tags — driven by hovered state, not their own mouseenter */}
          <div
            className={cn(
              "absolute bottom-[5.2rem] left-7 right-7 flex flex-wrap gap-1.5 z-4 pointer-events-none",
              "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            )}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.09em] uppercase text-white/90"
                style={{
                  background: "rgba(255,255,255,0.09)",
                  border: "0.5px solid rgba(255,255,255,0.14)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description — 70ms delay so it trails the tags */}
          <p
            className={cn(
              "absolute bottom-6 left-7 right-7 text-[13px] leading-[1.55] text-white/62 z-4 pointer-events-none",
              "line-clamp-2",
              "transition-[opacity,transform] duration-550 delay-70 ease-[cubic-bezier(0.16,1,0.3,1)]",
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
          >
            {project.description}
          </p>
        </CardContent>
      </Card>

      {/* ── BOTTOM ROW ───────────────────────────────────────────────────── */}
      <CardFooter className="mt-5 px-0 pb-0 flex items-center justify-between gap-4">
        <h3
          className={cn(
            "font-serif text-[clamp(1.25rem,2.8vw,1.65rem)] font-normal leading-tight",
            "transition-[letter-spacing,font-style,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            hovered
              ? "italic tracking-[0.01em] translate-x-1.5"
              : "not-italic tracking-[-0.01em] translate-x-0",
          )}
        >
          {project.title}
        </h3>

        <div
          className={cn(
            "srink-0 w-10 h-10 rounded-full flex items-center justify-center",
            "transition-[transform,background-color,border-color,color] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
            hovered
              ? "translate-x-1 -translate-y-1 bg-foreground border-foreground text-background border"
              : "translate-x-0 translate-y-0 bg-secondary border-border/50 text-foreground border border-[0.5px]",
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </CardFooter>
    </motion.div>
  );
};

export default ProjectCard;
