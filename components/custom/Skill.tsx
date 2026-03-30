"use client";
import { useState } from "react";
import { SKILLS } from "../constants";
import { AnimatePresence, motion } from "motion/react";
import SkillCard from "./SkillCard";

const CATEGORIES = [
  "ALL",
  ...Array.from(new Set(SKILLS.map((skill) => skill.category))),
];

const Skill = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered =
    activeCategory === "ALL"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);
  return (
    <section className="relative py-28 overflow-hidden ">
      {/* ambient orbs */}
      <div
        className="pointer-events-none absolute -top-56 -right-28 w-125 h-125 rounded-full opacity-[0.11]"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 w-95 h-95 rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #0d9488, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] font-medium tracking-[.18em] uppercase text-white/30 mb-3">
            Technical arsenal
          </p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] font-normal text-white/90 leading-[1.1]">
            Built to ship. <em className="italic text-violet-400">Obsessed</em>{" "}
            with craft.
          </h2>
        </motion.div>

        {/* tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "px-4 py-1.5 rounded-full text-[12px] font-medium tracking-[.04em]",
                "border transition-all duration-200 cursor-pointer",
                activeCategory === cat
                  ? "bg-violet-500/10 border-violet-400/40 text-violet-300"
                  : "bg-white/3 border-white/[.07] text-white/50 hover:text-white/80 hover:border-white/20",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div
          layout
          className="grid gap-3"
          style={{
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 140px), 1fr))",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* cta */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[13px] text-white/30 mb-4">
            Impressed? Let's build something extraordinary together.
          </p>
          <a
            href="mailto:you@example.com"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[13px] font-medium text-violet-300 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(167,139,250,.1)",
              border: "0.5px solid rgba(167,139,250,.35)",
            }}
          >
            Start a conversation
            <svg
              width="14"
              height="14"
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
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Skill;
