"use client";
import React from "react";
import { motion, Variants } from "motion/react";

const Hero: React.FC = () => {
  // Explicitly typing variants to avoid inference issues with cubic-bezier array (Easing)
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2.5,
        staggerChildren: 0.1,
      },
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
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.p
            variants={item}
            className="text-indigo-400 font-medium tracking-widest uppercase text-sm md:text-base"
          >
            Frontend Engineer • 3 Years of Craft
          </motion.p>

          <motion.h1
            variants={item}
            data-cursor="text"
            className="text-5xl text-white md:text-8xl lg:text-9xl font-serif leading-[0.9] font-medium"
          >
            Crafting <br />
            <span className="italic text-slate-400">Digital</span> <br />
            Experiences.
          </motion.h1>

          <motion.div
            variants={item}
            className="pt-10 flex flex-col md:flex-row md:items-end justify-between gap-10"
          >
            <p className="max-w-md text-slate-400 text-lg leading-relaxed">
              Based in the intersection of design and code. Specializing in
              high-performance React applications with a focus on fluid
              interactions.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex"
            >
              <a
                href="#projects"
                data-cursor="pointer"
                className="px-8 py-4 bg-white text-black font-medium text-sm tracking-widest uppercase rounded-full transition-transform"
              >
                View Works
              </a>
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 bottom-0 w-px h-32 bg-indigo-500/50 origin-top hidden md:block"
      />
    </section>
  );
};

export default Hero;
