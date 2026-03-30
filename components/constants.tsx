import { Project, Experience, Skill } from "@/lib/types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Moury App",
    description:
      "A landing page for a cutting-edge with animations powered by Framer Motion  visualizations.",
    image: "./assets/moury.png",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://www.mouryapp.com",
  },
  {
    id: "2",
    title: "Ethereal Commerce",
    description:
      "Minimalist headless commerce platform focused on high-conversion speed and fluidity.",
    image: "./assets/tinybee.png",
    tags: [
      "React.js",
      "Ant Design",
      "Framer Motion",
      "chart.js",
      "redux toolkit",
    ],
    link: "#",
  },
  {
    id: "3",
    title: "Zen Workspace",
    description:
      "A productivity suite with native-feeling animations and offline-first architecture.",
    image: "https://picsum.photos/seed/zen/1200/800",
    tags: ["TypeScript", "Tailwind", "Supabase"],
    link: "#",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Nexus Tech",
    role: "Senior Frontend Engineer",
    period: "2022 - Present",
    description: [
      "Lead development of enterprise-scale React applications.",
      "Optimized Core Web Vitals resulting in 40% improvement in LCP.",
      "Mentored junior developers on animation best practices and component architecture.",
    ],
  },
  {
    company: "Aura Studio",
    role: "Frontend Developer",
    period: "2020 - 2022",
    description: [
      "Crafted pixel-perfect landing pages with complex Framer Motion interactions.",
      "Integrated CMS solutions for dynamic content management.",
      "Reduced bundle sizes by 30% through advanced code-splitting.",
    ],
  },
];

export const SKILLS: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Git", category: "Tools" },
  { name: "Figma", category: "Design" },
  { name: "Three.js", category: "Frontend" },
];
