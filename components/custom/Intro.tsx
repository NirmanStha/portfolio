"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const IntroLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 1, ease: [0.7, 0, 0.3, 1] },
          }}
          className="fixed inset-0 bg-white z-[200] flex items-center justify-center overflow-hidden"
        >
          <div className="relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-[2px] bg-black z-10"
            />
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl md:text-6xl font-serif text-black font-medium overflow-hidden px-4"
            >
              Nirman Shrestha.
            </motion.h2>
          </div>

          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-0 bg-black origin-top opacity-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
