import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Cpu, Settings } from "lucide-react";

export default function Skills() {
  const categories = [
    {
      title: "Mobile & Web",
      icon: <Smartphone className="w-5 h-5 text-brass" />,
      skills: ["Flutter", "React.js", "Node.js", "Firebase", "REST APIs"]
    },
    {
      title: "AI & IoT",
      icon: <Cpu className="w-5 h-5 text-brass" />,
      skills: ["ESP32", "MQTT", "YOLOv9", "PyTorch", "OpenCV", "Data Annotation"]
    },
    {
      title: "System & Tools",
      icon: <Settings className="w-5 h-5 text-brass" />,
      skills: ["Git", "System Design", "API Flow", "UI Slicing", "Agile/Jira"]
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
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Background radial glow */}
      <div className="absolute top-[40%] left-[-10%] w-[350px] h-[350px] rounded-full bg-hextech-blue/5 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-brass/25 bg-zinc-950/40 text-[10px] font-mono font-medium text-brass uppercase tracking-widest mb-4">
          <span>04 // Arsenal</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-cinzel uppercase text-white tracking-widest">
          Tech Stack Hub
        </h2>
        <p className="text-zinc-400 font-sans mt-3 text-sm md:text-base max-w-xl">
          A taxonomy of tools, frameworks, and protocols I utilize to build end-to-end intelligent systems.
        </p>
      </div>

      {/* Categorized Boards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="hextech-card hextech-border p-6 md:p-8 bg-zinc-950/45 relative overflow-hidden group"
          >
            {/* Header */}
            <div className="flex items-center space-x-3.5 mb-6 pb-4 border-b border-white/5">
              <div className="p-2.5 bg-zinc-950 rounded border border-brass/15 group-hover:border-hextech-blue/30 transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-sm font-cinzel font-bold text-white uppercase tracking-wider">
                {cat.title}
              </h3>
            </div>

            {/* Chips Container */}
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3.5 py-2 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900/60 border border-brass/20 hover:border-hextech-blue/35 hover:text-hextech-blue transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Ambient Background Grid Detail */}
            <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none -z-10" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
