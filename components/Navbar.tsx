"use client";

import React from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const Navbar: React.FC = () => {
  const navItems = ["Home", "Projects", "Experience", "Contact"];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="
  fixed top-6  md:left-1/2 md:-translate-x-1/2 right-4
  z-50
  w-12 md:w-fit max-w-5xl
   py-3 md:px-6 md:py-4
  rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-xl "
    >
      <div className="flex items-center justify-between gap-6">
        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm uppercase tracking-widest text-white/80 hover:text-white transition"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-center w-full">
          <Sheet>
            <SheetTrigger>
              <div className="text-white">
                <Menu size={22} />
              </div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-slate-900 border-white/10 px-6
  [&>button]:text-white [&>button_svg]:stroke-white"
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-8 mt-16"
              >
                {navItems.map((item) => (
                  <motion.div key={item} variants={itemVariant}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-lg uppercase tracking-widest text-white/90 hover:text-white transition hover:translate-x-1"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
