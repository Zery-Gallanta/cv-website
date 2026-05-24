import React from "react";
import CustomCursor from "./components/CustomCursor";
import GridBackground from "./components/GridBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoSection from "./components/BentoSection";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-cyan-glow/20 selection:text-cyan-glow">
      {/* Background grid overlays and ambient lighting */}
      <GridBackground />
      
      {/* Hardware-accelerated mouse glow trackers */}
      <CustomCursor />

      {/* Glassmorphic scrolling top navbar */}
      <Navbar />

      {/* Full-width responsive section components */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <BentoSection />
        <Projects />
        <Gallery />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
