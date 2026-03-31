import ContactForm from "@/components/custom/ContactForm";
import CustomCursor from "@/components/custom/Cursor";
import Experience from "@/components/custom/Experience";
import Hero from "@/components/custom/Hero";
import IntroLoader from "@/components/custom/Intro";
import Project from "@/components/custom/Project";
import Skill from "@/components/custom/Skill";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen ">
        <IntroLoader />
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <Project />
          <Skill />
          <Experience />
          <div className="mt-12 px-6 md:px-0">
            <ContactForm />
          </div>
        </main>
      </div>
    </>
  );
}
