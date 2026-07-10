"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "Advance React",
    issuer: "Issued by Meta on Coursera",
    href: "https://coursera.org/share/16b4cdfa35e7ae0228d70a29fa73c331",
  },
  {
    title: "Web Design Certification",
    issuer: "Issued by Broadway Infosys",
    href: "https://broadwayinfosys.com/certificate-verification-code/eyJpdiI6InhkMDZJMWR0ZUtJRTJ4T3ptZ0pLMUE9PSIsInZhbHVlIjoiaEdZOFQ2eDBXL0I4bFFkZWRpd3ZYQT09IiwibWFjIjoiNTJjNDc4MzFkNTEzOTUzYjk3MTUwMzQ4ZDBmYThkZDJiMGNmOGI1NjE2NjE2ZjQ2YzUwM2QzOTcxZjVmOTM3YyIsInRhZyI6IiJ9",
  },
];

export default function Certifications() {
  return (
    <section className="px-6 py-20 md:px-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-[11px] font-medium tracking-[.18em] text-white/30 uppercase">
            Verified credentials
          </p>
          <h2 className="font-heading text-3xl font-bold text-white">
            Certifications
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer me"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-surface-1 border-l-crimson/60 hover:shadow-crimson/15 flex items-start justify-between gap-4 rounded-xl border border-l-2 border-white/8 p-6 transition-shadow duration-300 hover:shadow-[0_20px_60px_-24px]"
            >
              <div>
                <h3 className="font-medium text-white">{cert.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{cert.issuer}</p>
              </div>
              <ExternalLink
                size={16}
                className="group-hover:text-crimson mt-1 shrink-0 text-white/40 transition-colors"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
