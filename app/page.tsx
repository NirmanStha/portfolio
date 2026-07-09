import BugSquash from "@/components/custom/BugSquash";
import ContactForm from "@/components/custom/ContactForm";
import Certifications from "@/components/custom/Certifications";
import CustomCursor from "@/components/custom/Cursor";
import Experience from "@/components/custom/Experience";
import Hero from "@/components/custom/Hero";
import IntroLoader from "@/components/custom/Intro";
import Project from "@/components/custom/Project";
import SkillMemoryGame from "@/components/custom/SkillMemoryGame";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frontend Engineer Portfolio",
  description:
    "Portfolio of Nirman Shrestha, a frontend engineer focused on performant React and Next.js experiences with verified certifications in Advanced React and Web Design.",
  keywords: [
    "Nirman Shrestha",
    "NirmanShrestha",
    "ReactJS Developer",
    "NextJS Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Nirman",
    "Frontend Certifications",
    "Advanced React Certification",
    "Web Design Certification",
    "Coursera Meta Certificate",
    "Shrestha",
    "Frontend Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Web Developer Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen ">
        <IntroLoader />
        <CustomCursor />
        <Navbar />

        <main id="main-content">
          <h1 className="sr-only">
            Nirman Shrestha - React.js, Next.js, TypeScript and JavaScript
            Frontend Engineer Portfolio
          </h1>
          <Hero />
          <Project />
          <SkillMemoryGame />
          <Experience />
          <Certifications />
          <BugSquash />
          <div className="mt-12  md:px-0">
            <ContactForm />
          </div>
        </main>
      </div>
    </>
  );
}
