import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cpu, Eye, ArrowUpRight, ShieldCheck, Terminal, Bot } from "lucide-react";

const GithubIcon = ({ className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

function ProjectCard({ project }) {
  return (
    <div className="border border-white/[0.08] bg-[#0c0c0e]/80 p-6 md:p-8 flex flex-col justify-between group hover:border-white/25 transition-all duration-200 relative h-full">
      {/* Precision Corner Crosshair Marks */}
      <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-700 select-none">+</span>
      <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 select-none">+</span>

      <div>
        {/* Header Metadata */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-10 h-10 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-300 group-hover:text-hextech-blue group-hover:border-hextech-blue/40 transition-colors">
            {project.id === 1 ? (
              <Eye className="w-5 h-5" />
            ) : project.id === 2 ? (
              <Cpu className="w-5 h-5" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 border border-white/[0.08] bg-black/40 px-2.5 py-1">
            {project.category}
          </span>
        </div>

        {/* Project Name (ArtCraft Clean Display Header) */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-tight mb-3 group-hover:text-hextech-blue transition-colors">
          {project.title}
        </h3>

        {/* Impact Description */}
        <p className="text-zinc-400 text-sm font-sans leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Badges (Geist / JetBrains Mono) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 border border-white/[0.06] bg-black/40 px-2.5 py-1 group-hover:border-white/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors group/link"
        >
          <GithubIcon className="w-4 h-4" />
          <span>Source Code</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>

        {project.cert ? (
          <a
            href="https://ieeexplore.ieee.org/document/11296086"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-amber-400 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>IEEE ICORISS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <div className="flex items-center gap-1.5 font-mono text-xs text-hextech-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue animate-pulse" />
            <span>Active Pipeline</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const projects = [
    {
      id: 1,
      category: "Computer Vision // AI",
      title: "Real-Time Vehicle Detection System",
      description: "Engineered an end-to-end computer vision pipeline achieving 92% mAP at 30+ FPS. Integrated model quantization for embedded efficiency and deployed an interactive real-time dashboard for traffic analytics.",
      tech: ["Python", "YOLOv9", "OpenCV", "PyTorch"],
      github: "https://github.com/Zery-Gallanta/traffic-light-detection",
      cert: false
    },
    {
      id: 2,
      category: "IoT // Embedded AI",
      title: "IoT Eco-Enzyme Monitoring System",
      description: "Designed and engineered an automated sensor-integrated microcontroller node for real-time pH and temperature monitoring. Sliced manual monitoring overhead by 80%. Certified and published by ICORISS 2025.",
      tech: ["ESP32", "MQTT", "React.js", "TensorFlow"],
      github: "https://github.com/Zery-Gallanta",
      cert: true
    },
    {
      id: 3,
      category: "Machine Learning // FinTech",
      title: "Autonomous Trading Bot System",
      description: "Developed machine learning-driven (MLP Classifier) crypto bots and local LLM-validated (Qwen 3.5 via Ollama) Forex bots for MT5, achieving a 68.75% win rate in 6-month historical backtests with built-in risk management metrics and Telegram status commands.",
      tech: ["Python", "Scikit-Learn", "MetaTrader 5", "Ollama LLM", "CCXT"],
      github: "https://github.com/Zery-Gallanta/trading-bot",
      cert: false
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="mb-14 text-left border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue" />
          <span>02 // SELECTED BLUEPRINTS</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
          Featured <span className="font-serif italic font-normal text-zinc-300">Engineering</span> Works
        </h2>
        <p className="text-zinc-400 font-sans mt-2.5 text-sm md:text-base max-w-2xl leading-relaxed">
          Production systems, embedded sensor telemetry, and algorithmic intelligence architected with precision.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: project.id * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
