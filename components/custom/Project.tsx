"use client";
import { motion } from "motion/react";
import { PROJECTS } from "../constants";
import ProjectCard from "./ProjectCard";

const Project = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-20 bg-slate-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              data-cursor="text"
              className="text-4xl md:text-6xl font-serif text-white"
            >
              Some <br /> recent works.
            </h2>
          </motion.div>
          <div className="hidden md:block text-slate-500 text-sm italic">
            (Scroll to explore)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
