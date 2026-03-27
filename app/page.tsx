import CustomCursor from "@/components/custom/Cursor";
import Hero from "@/components/custom/Hero";
import IntroLoader from "@/components/custom/Intro";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen ">
        <IntroLoader />
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
        </main>
      </div>
    </>
  );
}
