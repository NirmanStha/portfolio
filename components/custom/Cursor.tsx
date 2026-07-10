"use client";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";

function subscribePointerFine(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getPointerFineSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerFineServerSnapshot() {
  return false;
}

const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<
    "default" | "pointer" | "view" | "text"
  >("default");
  const [isPressed, setIsPressed] = useState(false);

  const enabled = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot,
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Buttery smooth spring physics
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactable = target.closest("a, button, [data-cursor]");

      if (interactable) {
        const type = interactable.getAttribute("data-cursor");
        if (type === "view") setCursorState("view");
        else if (type === "text") setCursorState("text");
        else setCursorState("pointer");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999">
      {/* Outer Ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-crimson/60 flex items-center justify-center overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width:
            cursorState === "view"
              ? 100
              : cursorState === "text"
                ? 4
                : isPressed
                  ? 30
                  : 40,
          height:
            cursorState === "view"
              ? 100
              : cursorState === "text"
                ? 40
                : isPressed
                  ? 30
                  : 40,
          borderRadius: cursorState === "text" ? "4px" : "50%",
        }}
        animate={{
          borderWidth: cursorState === "text" ? 0 : 1,
          backgroundColor:
            cursorState === "text"
              ? "rgba(224, 35, 78, 0.9)"
              : cursorState === "view"
                ? "rgba(224, 35, 78, 0.15)"
                : "rgba(224, 35, 78, 0)",
        }}
      >
        <AnimatePresence>
          {cursorState === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-bold tracking-[0.2em] text-white uppercase"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot - Precise */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-1 bg-crimson rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState === "default" ? 1 : 0,
          opacity: cursorState === "default" ? 1 : 0,
        }}
      />
    </div>
  );
};

export default CustomCursor;
