"use client";
import React from "react";
import { SKILLS } from "../constants";
import { motion } from "motion/react";
const Skill = () => {
  return (
    <section className="py-32 overflow-hidden border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-20 items-center mx-10">
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="text-6xl md:text-8xl font-serif text-slate-800 hover:text-white transition-colors cursor-default"
              >
                {skill.name}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skill;
