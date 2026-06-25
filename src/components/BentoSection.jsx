import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Cpu, Eye, CheckCircle, ArrowRight, Cog, Sparkles } from "lucide-react";

export default function BentoSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  const stats = [
    { 
      value: "92%", 
      label: "mAP AI Accuracy", 
      desc: "YOLOv9 pipeline detection rate",
      icon: <Eye className="w-5 h-5 text-hextech-blue" />,
      glowColor: "from-hextech-blue/10 to-transparent" 
    },
    { 
      value: "80%", 
      label: "IoT Efficiency", 
      desc: "Manual eco-enzyme monitoring reduction",
      icon: <Cpu className="w-5 h-5 text-brass" />,
      glowColor: "from-brass/10 to-transparent"
    },
    { 
      value: "68.75%", 
      label: "Bot Win Rate", 
      desc: "BTC/USDT 6-month backtested win rate",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      glowColor: "from-emerald-400/10 to-transparent"
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brass/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-hextech-blue/5 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-brass/25 bg-zinc-950/40 text-[10px] font-mono font-medium text-brass uppercase tracking-widest mb-4">
          <span>01 // History</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-cinzel uppercase text-white tracking-widest">
          Experience & Creds
        </h2>
        <p className="text-zinc-400 font-sans mt-3 text-sm md:text-base max-w-xl">
          An archive of academic achievements, corporate enterprise integrations, and core system telemetry.
        </p>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Card A: IT Intern Petrokimia (Spans 2 columns) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 hextech-card hextech-border p-6 md:p-8 flex flex-col justify-between group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-hextech-blue/5 to-transparent rounded-tr-lg opacity-40 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3.5">
                <div className="p-3 bg-zinc-950 rounded border border-brass/20 group-hover:border-hextech-blue/40 transition-colors">
                  <Briefcase className="w-6 h-6 text-brass group-hover:text-hextech-blue transition-colors" />
                </div>
                <div>
                  <h3 className="text-base font-cinzel font-bold text-white uppercase tracking-wider">PT Petrokimia Gresik</h3>
                  <p className="text-xs text-zinc-500 font-mono">IT Engineering Intern // 2024 - Present</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded border border-hextech-blue/30 text-hextech-blue bg-hextech-blue/5 uppercase font-semibold">
                Active
              </span>
            </div>

            <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed mb-6">
              Overhauled the user interface and restructured core application workflows using <strong className="text-white font-medium">Flutter</strong> and <strong className="text-white font-medium">React.js</strong>, significantly reducing data processing times and optimizing operational dashboards for cross-divisional teams.
            </p>

            {/* JetBrains Mono Tags for Best Practices */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {["Modular Code", "Automated Testing", "API Integration"].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-zinc-950/80 border border-brass/20 text-[10px] font-mono font-semibold uppercase text-zinc-400 tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="space-y-3.5 border-t border-white/5 pt-4">
              <li className="flex items-start space-x-3 text-xs md:text-sm text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue mt-1.5 flex-shrink-0 shadow-[0_0_6px_#00E5FF]" />
                <span>Collaborated with cross-functional divisions to assemble system requirements and document engineering diagrams.</span>
              </li>
              <li className="flex items-start space-x-3 text-xs md:text-sm text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue mt-1.5 flex-shrink-0 shadow-[0_0_6px_#00E5FF]" />
                <span>Applied professional software design parameters: modular folder structures, code quality reviews, and robust system validation.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-hextech-blue transition-colors">
            <span>Enterprise Integration Node</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </motion.div>

        {/* Card B: Education track at BINUS (Spans 1 column) */}
        <motion.div
          variants={cardVariants}
          className="hextech-card hextech-border p-6 md:p-8 flex flex-col justify-between group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brass/5 to-transparent rounded-tr-lg opacity-40 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

          <div>
            <div className="flex items-center space-x-3.5 mb-6">
              <div className="p-3 bg-zinc-950 rounded border border-brass/20 group-hover:border-hextech-blue/40 transition-colors">
                <GraduationCap className="w-6 h-6 text-brass group-hover:text-hextech-blue transition-colors" />
              </div>
              <div>
                <h3 className="text-base font-cinzel font-bold text-white uppercase tracking-wider">Education</h3>
                <p className="text-xs text-zinc-500 font-mono">Academic Track</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-cinzel font-bold text-zinc-200 tracking-wide">BINUS UNIVERSITY</h4>
                <p className="text-xs text-brass font-mono mt-0.5">B.S. in Computer Science</p>
                <p className="text-xs text-zinc-500 font-sans mt-1">Expected Graduation: 2027</p>
              </div>

              {/* Clickable ICORISS Paper Link */}
              <a
                href="https://ieeexplore.ieee.org/document/11296086"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded border border-brass/20 bg-zinc-950/70 hover:border-hextech-blue/30 hover:bg-hextech-blue/5 transition-all block group/paper"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2 text-white font-mono text-xs font-bold">
                    <Award className="w-4 h-4 text-brass group-hover/paper:text-hextech-blue transition-colors" />
                    <span className="tracking-wide">ICORISS 2025</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover/paper:text-hextech-blue group-hover/paper:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans group-hover/paper:text-zinc-300 transition-colors">
                  Published research contribution and system certification for the IoT Eco-Enzyme project.
                </p>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-brass transition-colors">
            <span>Global Academic Register</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </div>
        </motion.div>

        {/* Card C: Tech Stats (Distributed across 3 cards) */}
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="hextech-card hextech-border p-6 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Hover Glow Light Beam */}
            <div className={`absolute -bottom-8 left-0 right-0 h-16 bg-gradient-to-t ${stat.glowColor} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-zinc-950 rounded border border-brass/15 group-hover:border-hextech-blue/30 transition-colors">
                {stat.icon}
              </div>
              <span className="text-2xl font-mono font-bold tracking-tight text-white group-hover:text-glow-hextech transition-all">
                {stat.value}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                {stat.label}
              </h4>
              <p className="text-[11px] text-zinc-500 font-sans mt-1">
                {stat.desc}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Card D: AI-Native Vibe Coding (Spans 3 columns) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-3 hextech-card hextech-border p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-hextech-blue/5 to-transparent rounded-tr-lg opacity-40 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <div className="space-y-4 max-w-4xl text-left">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 bg-zinc-950 rounded border border-brass/20 group-hover:border-hextech-blue/40 transition-colors">
                <Sparkles className="w-6 h-6 text-hextech-blue animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-cinzel font-bold text-white uppercase tracking-wider">AI-Native Engineering // Vibe Coding</h3>
                <p className="text-xs text-zinc-500 font-mono">Cognitive Tech Stack Paradigm</p>
              </div>
            </div>
            
            <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed">
              I practice <strong className="text-white font-medium">Vibe Coding</strong>—a next-generation development paradigm where I act as the system architect and creative director, orchestrating AI systems to write, refactor, and compile high-fidelity code. By pairing my software engineering foundations with <strong className="text-hextech-blue font-semibold">GitHub Copilot</strong>, <strong className="text-hextech-blue font-semibold">Claude AI</strong>, and <strong className="text-hextech-blue font-semibold">Antigravity</strong>, I design production-ready platforms at 10x velocity.
            </p>
            
            <div className="flex flex-wrap gap-2.5">
              {["GitHub Copilot", "Claude AI", "Antigravity Agent", "Prompt Architecting", "AI-Pair Programming"].map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-zinc-950/80 border border-hextech-blue/20 text-[10px] font-mono font-semibold uppercase text-hextech-blue tracking-wider"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center justify-center p-4 rounded bg-zinc-950/60 border border-brass/20 group-hover:border-hextech-blue/30 w-full md:w-36 text-center">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Velocity Mult
              <strong className="text-white text-sm block mt-1">10X // ACTIVE</strong>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
