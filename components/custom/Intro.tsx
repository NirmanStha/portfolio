"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const IntroLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(
      () => setIsVisible(false),
      reducedMotion ? 300 : 1200,
    );
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-night"
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              aria-hidden
              initial={{ scale: 0.6, opacity: 0.5 }}
              animate={
                reducedMotion
                  ? { opacity: 0 }
                  : { scale: [0.6, 1.2, 1.4], opacity: [0.5, 0.3, 0] }
              }
              transition={{
                duration: reducedMotion ? 0.2 : 1.1,
                ease: "easeOut",
              }}
              className="absolute h-40 w-40 rounded-full bg-crimson/40 blur-2xl"
            />
            <motion.h2
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading relative text-5xl font-bold text-white md:text-7xl"
            >
              NS<span className="text-crimson">.</span>
            </motion.h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
