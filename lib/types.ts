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
  description: string[];
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools" | "Design";
}
