export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Skill {
  name: string;
  icon?: string;
  color?: string;
  shadow?: string;
  glow?: string;
  accent?: string;
  pillBg?: string;
  pillBorder?: string;
  years?: number;
  category: "Frontend" | "Backend" | "Tools" | "Design" | "Creative";
}
