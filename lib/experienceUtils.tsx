import React from "react";

export const escapeRegExp = (s: string) =>
  s.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");

export const dedupeTech = (globalTech?: string[], localTech?: string[]) =>
  Array.from(
    new Set([...(globalTech || []), ...(localTech || [])].filter(Boolean)),
  );

export const highlightText = (
  text: string,
  techStack?: string[],
): React.ReactNode => {
  if (!techStack || techStack.length === 0) return text;
  const escaped = techStack.map(escapeRegExp).join("|");
  const re = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        const isTech = techStack.some(
          (t) => t.toLowerCase() === p.toLowerCase(),
        );
        return isTech ? (
          <mark
            key={i}
            className="bg-indigo-600/20 text-indigo-300 px-1 rounded"
          >
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        );
      })}
    </>
  );
};

const experienceUtils = { dedupeTech, highlightText };

export default experienceUtils;
