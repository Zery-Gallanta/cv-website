import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cpu, Eye, ArrowRight, ShieldCheck, Cog } from "lucide-react";

const GithubIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

// Vector schematic grid that fades in on hover, resembling draft blueprints
const BlueprintSketch = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-[0.22] transition-opacity duration-500 pointer-events-none stroke-hextech-blue/45 fill-none z-0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Grid subdivision meshes */}
    <path d="M 0,20 L 100,20 M 0,40 L 100,40 M 0,60 L 100,60 M 0,80 L 100,80" strokeWidth="0.1" />
    <path d="M 20,0 L 20,100 M 40,0 L 40,100 M 60,0 L 60,100 M 80,0 L 80,100" strokeWidth="0.1" />
    
    {/* Concentric crosshair circles (top right) */}
    <circle cx="85" cy="20" r="10" strokeWidth="0.15" strokeDasharray="1,1" />
    <circle cx="85" cy="20" r="5" strokeWidth="0.25" />
    <line x1="85" y1="5" x2="85" y2="35" strokeWidth="0.15" />
    <line x1="70" y1="20" x2="100" y2="20" strokeWidth="0.15" />

    {/* Technical circuit traces (bottom left) */}
    <path d="M 8,82 L 22,82 L 30,74 L 55,74 L 62,82 L 85,82" strokeWidth="0.25" strokeDasharray="1,0.5" />
    <circle cx="8" cy="82" r="1" strokeWidth="0.25" />
    <circle cx="85" cy="82" r="1" strokeWidth="0.25" />
    
    {/* Mechanical frame blueprint elements */}
    <path d="M 12,15 L 25,28 L 45,28 L 58,15" strokeWidth="0.2" />
    <rect x="22" y="25" width="8" height="6" strokeWidth="0.15" strokeDasharray="0.5,0.5" />
  </svg>
);

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor positions inside the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt degrees (max 6 degrees)
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 32;
    const rotateY = (x - xc) / 32;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hextech-card hextech-border p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative cursor-default transition-all duration-350 ease-out h-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Dynamic light tracking background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at var(--x, 0px) var(--y, 0px), rgba(0, 229, 255, 0.08), rgba(184, 115, 51, 0.05) 50%, transparent 100%)`,
        }}
      />

      {/* SVG Blueprint Technical Overlay */}
      <BlueprintSketch />

      <div style={{ transform: "translateZ(25px)" }} className="relative z-10">
        {/* Header Metadata */}
        <div className="flex justify-between items-center mb-6">
          <div className="p-3 bg-zinc-950 rounded border border-brass/20 group-hover:border-hextech-blue/35 transition-colors">
            {project.id === 1 ? (
              <Eye className="w-6 h-6 text-brass group-hover:text-hextech-blue transition-colors" />
            ) : project.id === 2 ? (
              <Cpu className="w-6 h-6 text-brass group-hover:text-hextech-blue transition-colors" />
            ) : (
              <Cog className="w-6 h-6 text-brass group-hover:text-hextech-blue transition-colors" />
            )}
          </div>
          <span className="text-[9px] font-mono font-medium tracking-widest uppercase text-zinc-500 border border-brass/10 px-2 py-0.5 rounded bg-zinc-950/40">
            {project.category}
          </span>
        </div>

        {/* Project Name (Cinzel headers) */}
        <h3 className="text-xl md:text-2xl font-cinzel font-bold text-zinc-100 uppercase tracking-wider mb-3 group-hover:text-hextech-blue transition-colors">
          {project.title}
        </h3>

        {/* Impact bullet */}
        <p className="text-zinc-400 text-sm font-sans leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Stack Badges (JetBrains Mono) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono font-semibold uppercase tracking-wider text-zinc-300 bg-zinc-950 border border-brass/15 px-2.5 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions & Footer (Interactive handles) */}
      <div 
        className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10"
        style={{ transform: "translateZ(10px)" }}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-xs font-mono text-zinc-500 hover:text-hextech-blue transition-colors"
        >
          <GithubIcon className="w-4 h-4" />
          <span>Source Schematic</span>
        </a>

        {project.cert ? (
          <a
            href="https://ieeexplore.ieee.org/document/11296086"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-xs font-mono text-brass hover:text-hextech-blue transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ICORISS Certified</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <div className="flex items-center space-x-1.5 text-xs font-mono text-hextech-blue">
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
      description: "Developed machine learning-driven (MLP Classifier) crypto bots and local LLM-validated (Qwen 3 via Ollama) Forex bots for MT5, achieving a 68.75% win rate in 6-month historical backtests with built-in risk management metrics and Telegram status commands.",
      tech: ["Python", "Scikit-Learn", "MetaTrader 5", "Ollama LLM", "CCXT"],
      github: "https://github.com/Zery-Gallanta",
      cert: false
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Ambient background lighting */}
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] rounded-full bg-hextech-blue/5 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-brass/25 bg-zinc-950/40 text-[10px] font-mono font-medium text-brass uppercase tracking-widest mb-4">
          <span>02 // Blueprints</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-cinzel uppercase text-white tracking-widest">
          Tech Projects
        </h2>
        <p className="text-zinc-400 font-sans mt-3 text-sm md:text-base max-w-xl">
          A showcase of systems engineering, combining computer vision models with automated Internet of Things architecture.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: project.id * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
