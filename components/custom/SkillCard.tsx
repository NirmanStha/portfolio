import { Skill } from "@/lib/types";
import { useState } from "react";

import { motion } from "motion/react";
import Image from "next/image";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{
        duration: 0.45,
        delay: index * 0.045,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-[18px] p-5 text-center cursor-pointer overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: hovered
          ? `0.5px solid ${skill.color}`
          : "0.5px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 20px 60px -12px ${skill.shadow}` : "none",
        transform: hovered
          ? "translateY(-8px) scale(1.04)"
          : "translateY(0) scale(1)",
        transition:
          "transform .4s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .4s",
      }}
    >
      {/* radial glow */}
      <div
        className="absolute inset-0 rounded-[18px] pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${skill.glow}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* spinning shine */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-60%",
          left: "-60%",
          width: "60%",
          height: "60%",
          background:
            "conic-gradient(transparent 0deg, rgba(255,255,255,0.06) 60deg, transparent 120deg)",
          borderRadius: "50%",
          transform: hovered ? "rotate(360deg)" : "rotate(0deg)",
          transition: hovered ? "transform 0.8s ease-out" : "none",
        }}
      />

      {/* logo */}
      <div
        className="w-13 h-13 mx-auto mb-3 flex items-center justify-center relative z-10"
        style={{
          width: 52,
          height: 52,
          transform: hovered
            ? "scale(1.18) translateY(-3px)"
            : "scale(1) translateY(0)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <Image
          src={skill.icon as string}
          alt={skill.name}
          width={52}
          height={52}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* name */}
      <p
        className="text-[13px] font-medium leading-tight mb-0.5 relative z-10 transition-colors duration-300"
        style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.92)" }}
      >
        {skill.name}
      </p>

      {/* category */}
      <p
        className="text-[10px] uppercase tracking-[.06em] relative z-10 transition-colors duration-300"
        style={{ color: hovered ? skill.accent : "rgba(255,255,255,0.28)" }}
      >
        {skill.category}
      </p>

      {/* years pill */}
      <span
        className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full relative z-10 transition-all duration-300"
        style={{
          background: hovered ? skill.pillBg : "rgba(255,255,255,0.05)",
          color: hovered ? skill.accent : "rgba(255,255,255,0.28)",
          border: hovered
            ? `0.5px solid ${skill.pillBorder}`
            : "0.5px solid rgba(255,255,255,0.07)",
        }}
      >
        {skill?.years}yr
      </span>
    </motion.div>
  );
}

export default SkillCard;
