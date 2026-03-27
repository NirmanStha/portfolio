"use client";
import React from "react";
import { motion } from "motion/react";

const Navbar: React.FC = () => {
  const navItems = ["Home", "Projects", "Experience", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/5 shadow-2xl"
    >
      <ul className="flex gap-8 items-center">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium tracking-widest uppercase text-slate-400 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
