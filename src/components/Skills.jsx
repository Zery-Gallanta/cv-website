import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Cpu, Settings, Sparkles, Terminal } from "lucide-react";

export default function Skills() {
  const categories = [
    {
      index: "01",
      title: "AI & Autonomous Tooling",
      icon: Sparkles,
      skills: ["Claude AI 3.7", "GitHub Copilot", "Antigravity", "Multi-Agent Systems", "Prompt Architecture", "Vibe Coding Workflow"]
    },
    {
      index: "02",
      title: "Mobile & Frontend",
      icon: Smartphone,
      skills: ["Flutter", "Dart", "React.js", "Vite", "Tailwind CSS", "BLoC Pattern", "State Management"]
    },
    {
      index: "03",
      title: "AI, Vision & Embedded IoT",
      icon: Cpu,
      skills: ["ESP32", "MQTT Protocol", "YOLOv9", "OpenCV", "PyTorch", "Python", "Data Annotation"]
    },
    {
      index: "04",
      title: "Backend & Systems",
      icon: Settings,
      skills: ["Node.js", "FastAPI", "RESTful APIs", "Firebase", "Git / GitHub", "Docker Basics", "Agile / Scrum"]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Precision Corner Crosshairs (+) */}
      <div className="absolute top-8 left-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute top-8 right-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>

      {/* Section Header */}
      <div className="mb-14 text-left border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue" />
          <span>04 // TAXONOMY & TOOLING</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
          Engineered <span className="font-serif italic font-normal text-zinc-300">Stack</span> Architecture
        </h2>
        <p className="text-zinc-400 font-sans mt-2.5 text-sm md:text-base max-w-2xl leading-relaxed">
          The verified taxonomy of languages, artificial intelligence agents, embedded protocols, and frameworks I leverage daily.
        </p>
      </div>

      {/* Categorized Boards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="border border-white/[0.08] bg-[#0c0c0e]/80 p-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-200 relative"
            >
              {/* Corner crosshairs */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-700 select-none">+</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 select-none">+</span>

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-300 group-hover:text-hextech-blue transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-600">{cat.index} //</span>
                </div>

                {/* Chips Container */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 border border-white/[0.06] bg-black/40 hover:bg-white hover:text-black hover:border-white transition-all duration-150 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-zinc-600">
                <span>STATUS: VERIFIED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
