export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
}

export interface ExperienceProps {
  experiences?: ExperienceEntry[];
  techStack?: string[];
  maxBullets?: number;
  compactOnMobile?: boolean;
}
