"use client";
import React from "react";
import { motion, Variants } from "motion/react";

const Hero: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 1.2, staggerChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="bg-grid-faint relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-20"
    >
      {/* crimson glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(224,35,78,0.55), transparent 65%)",
        }}
      />
      {/* fade grid toward bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, #0a0a12 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.p
            variants={item}
            className="text-crimson text-sm font-medium tracking-widest uppercase md:text-base"
          >
            Nirman Shrestha | React.js | Next.js | TypeScript | JavaScript
          </motion.p>

          <motion.h1
            variants={item}
            data-cursor="text"
            className="font-heading text-[clamp(3rem,10vw,8.5rem)] leading-[0.95] font-bold text-white"
          >
            Crafting <br />
            <span className="text-crimson">Digital</span> <br />
            Experiences.
          </motion.h1>

          <motion.div
            variants={item}
            className="flex flex-col justify-between gap-10 pt-10 md:flex-row md:items-end"
          >
            <p className="max-w-md text-lg leading-relaxed text-slate-400">
              I design and build performant web products as a frontend
              engineer, with deep focus on React.js, Next.js, TypeScript,
              JavaScript, and fluid interaction design.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex"
            >
              <a
                href="#projects"
                data-cursor="pointer"
                className="bg-crimson rounded-full px-8 py-4 text-sm font-medium tracking-widest text-white uppercase transition-transform"
              >
                View Works
              </a>
              <div className="bg-crimson/40 absolute inset-0 -z-10 scale-100 rounded-full blur-xl transition-transform duration-500 group-hover:scale-150" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-crimson/50 absolute right-0 bottom-0 hidden h-32 w-px origin-top md:block"
      />
    </section>
  );
};

export default Hero;
