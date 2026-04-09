import ContactForm from "@/components/custom/ContactForm";
import CustomCursor from "@/components/custom/Cursor";
import Experience from "@/components/custom/Experience";
import Hero from "@/components/custom/Hero";
import IntroLoader from "@/components/custom/Intro";
import Project from "@/components/custom/Project";
import Skill from "@/components/custom/Skill";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frontend Engineer Portfolio",
  description:
    "Portfolio of Nirman Shrestha, a frontend engineer focused on performant React and Next.js experiences.",
  keywords: [
    "Nirman Shrestha",
    "NirmanShrestha",
    "ReactJS Developer",
    "NextJS Developer",
    "TypeScript Developer",
    "JavaScript Developer",
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
          <Hero />
          <Project />
          <Skill />
          <Experience />
          <div className="mt-12  md:px-0">
            <ContactForm />
          </div>
        </main>
      </div>
    </>
  );
}
