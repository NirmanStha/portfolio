"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const NAV_ITEMS = [
  "Home",
  "Projects",
  "Skills",
  "Experience",
  "Play",
  "Contact",
];

const Navbar: React.FC = () => {
  const [active, setActive] = useState("home");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.toLowerCase()),
    ).filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 right-4 z-50 w-12 max-w-5xl rounded-full border border-white/10 bg-night/70 py-3 shadow-xl shadow-crimson/5 backdrop-blur-md md:left-1/2 md:w-fit md:-translate-x-1/2 md:px-6 md:py-4"
    >
      <div className="flex items-center justify-between gap-6">
        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;
            return (
              <li key={item} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-sm tracking-widest uppercase transition ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-crimson"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <div className="flex w-full items-center justify-center md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger aria-label="Open navigation menu">
              <div className="text-white">
                <Menu size={22} />
              </div>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/10 bg-night px-6 [&>button]:text-white [&>button_svg]:stroke-white"
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-16 flex flex-col gap-8"
              >
                {NAV_ITEMS.map((item) => {
                  const id = item.toLowerCase();
                  return (
                    <motion.div key={item} variants={itemVariant}>
                      <Link
                        href={`#${id}`}
                        aria-current={active === id ? "true" : undefined}
                        onClick={() => setSheetOpen(false)}
                        className={`text-lg tracking-widest uppercase transition hover:translate-x-1 ${
                          active === id ? "text-crimson" : "text-white/90"
                        }`}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
