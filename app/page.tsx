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
          <Skill />
          <Experience />
          <div className="certification ">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl  text-white font-semibold mb-4">
                Certifications
              </h2>
              <div>
                <ul className="list-none list-inside text-white">
                  <li>
                    <a
                      href="https://coursera.org/share/16b4cdfa35e7ae0228d70a29fa73c331"
                      target="_blank"
                      rel="noopener noreferrer me"
                      className=" hover:text-gray-300 transition-colors"
                    >
                      Advance React - Issued by Meta on Coursera
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://broadwayinfosys.com/certificate-verification-code/eyJpdiI6InhkMDZJMWR0ZUtJRTJ4T3ptZ0pLMUE9PSIsInZhbHVlIjoiaEdZOFQ2eDBXL0I4bFFkZWRpd3ZYQT09IiwibWFjIjoiNTJjNDc4MzFkNTEzOTUzYjk3MTUwMzQ4ZDBmYThkZDJiMGNmOGI1NjE2NjE2ZjQ2YzUwM2QzOTcxZjVmOTM3YyIsInRhZyI6IiJ9"
                      target="_blank"
                      rel="noopener noreferrer me"
                      className=" hover:text-gray-300 transition-colors"
                    >
                      Web Design Certification - Issued by Broadway Infosys
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12  md:px-0">
            <ContactForm />
          </div>
        </main>
      </div>
    </>
  );
}
