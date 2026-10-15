import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Cpu, Eye, CheckCircle, ArrowUpRight, Sparkles, Terminal } from "lucide-react";

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
      desc: "YOLOv9 pipeline detection rate for defect analysis",
      icon: Eye,
      accent: "text-hextech-blue"
    },
    { 
      value: "80%", 
      label: "IoT Efficiency Gain", 
      desc: "Reduction in manual eco-enzyme monitoring checks",
      icon: Cpu,
      accent: "text-amber-400"
    },
    { 
      value: "68.75%", 
      label: "Algorithmic Win Rate", 
      desc: "BTC/USDT automated trading backtested 6-month metric",
      icon: CheckCircle,
      accent: "text-emerald-400"
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Precision Corner Crosshairs (+) */}
      <div className="absolute top-8 left-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute top-8 right-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>

      {/* Section Header */}
      <div className="mb-14 text-left border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue" />
          <span>01 // ARCHIVE & TELEMETRY</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
          Experience <span className="font-serif italic font-normal text-zinc-300">&</span> Credentials
        </h2>
        <p className="text-zinc-400 font-sans mt-2.5 text-sm md:text-base max-w-2xl leading-relaxed">
          Corporate engineering deployments, academic milestones, certified research publications, and measurable AI telemetry.
        </p>
      </div>

      {/* Bento Architectural Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {/* Card A: IT Intern Petrokimia (Spans 2 columns) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 border border-white/[0.08] bg-[#0c0c0e]/80 p-6 md:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-200 relative"
        >
          {/* Card Corner Marks */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-700 select-none">+</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 select-none">+</span>

          <div>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-300 group-hover:text-hextech-blue group-hover:border-hextech-blue/40 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                    PT Petrokimia Gresik
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    IT Engineering Intern // 2024 - Present
                  </p>
                </div>
              </div>

              <span className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 font-medium shrink-0">
                ACTIVE
              </span>
            </div>

            <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed mb-6">
              Overhauled enterprise frontend workflows and restructured internal engineering dashboards using <strong className="text-white font-medium">Flutter</strong> and <strong className="text-white font-medium">React.js</strong>, significantly cutting operational latency and standardizing data processing across cross-divisional corporate teams.
            </p>

            {/* Spec Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Modular Clean Architecture", "Automated QA Testing", "REST API Integration", "Flutter Engine"].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 border border-white/[0.08] bg-black/40 font-mono text-[10px] uppercase text-zinc-400 tracking-wider hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="space-y-3 border-t border-white/[0.06] pt-4">
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue mt-1.5 shrink-0" />
                <span>Collaborated directly with enterprise divisions to model system requirements and formulate technical architecture diagrams.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue mt-1.5 shrink-0" />
                <span>Enforced strict engineering discipline: structured folder conventions, code-reviews, and end-to-end integration tests.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-hextech-blue transition-colors">
            <span>ENTERPRISE NODE // PETROKIMIA</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </motion.div>

        {/* Card B: Education track at BINUS */}
        <motion.div
          variants={cardVariants}
          className="border border-white/[0.08] bg-[#0c0c0e]/80 p-6 md:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-200 relative"
        >
          <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-700 select-none">+</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 select-none">+</span>

          <div>
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-300 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Education
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">Academic Track</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-display text-sm font-bold text-white tracking-wide">
                  BINUS UNIVERSITY
                </h4>
                <p className="text-xs text-amber-400 font-mono mt-0.5">B.S. in Computer Science</p>
                <p className="text-xs text-zinc-500 font-sans mt-1">Expected Graduation: 2027</p>
              </div>

              {/* Clickable ICORISS Paper Link */}
              <a
                href="https://ieeexplore.ieee.org/document/11296086"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 border border-white/[0.08] bg-black/40 hover:border-hextech-blue/40 hover:bg-hextech-blue/[0.03] transition-all block group/paper"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
                    <Award className="w-4 h-4 text-amber-400 group-hover/paper:text-hextech-blue transition-colors" />
                    <span>ICORISS 2025 (IEEE)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/paper:text-hextech-blue transition-transform" />
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans group-hover/paper:text-zinc-300 transition-colors">
                  Published research contribution and system architecture patent for the IoT Eco-Enzyme automated telemetry system.
                </p>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
            <span>IEEE XPLORE VERIFIED</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </motion.div>

        {/* Card C: Tech Stats Metrics (3 cards) */}
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="border border-white/[0.08] bg-[#0c0c0e]/80 p-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-200 relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-300 group-hover:border-white/30 transition-colors">
                  <Icon className={`w-4 h-4 ${stat.accent}`} />
                </div>
                <span className="text-3xl font-mono font-bold tracking-tight text-white group-hover:text-hextech-blue transition-colors">
                  {stat.value}
                </span>
              </div>

              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 group-hover:text-white transition-colors">
                  {stat.label}
                </h4>
                <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Card D: AI-Native Vibe Coding (Spans full width) */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-3 border border-white/[0.08] bg-[#0c0c0e]/80 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-white/20 transition-all duration-200 relative"
        >
          <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-700 select-none">+</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 select-none">+</span>

          <div className="space-y-4 max-w-4xl text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white/[0.08] bg-black/60 flex items-center justify-center text-hextech-blue">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  AI-Native Engineering <span className="font-serif italic font-normal text-zinc-400 lowercase">// vibe coding</span>
                </h3>
                <p className="text-xs text-zinc-500 font-mono">Cognitive Paradigm & Autonomous Agents</p>
              </div>
            </div>
            
            <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed">
              I operate as an <strong className="text-white font-medium">AI-Native Vibe Coder</strong>—orchestrating multiple autonomous LLM agents to write, test, and refactor codebases with extreme velocity. By combining fundamental software architecture principles with <strong className="text-hextech-blue font-semibold">GitHub Copilot</strong>, <strong className="text-hextech-blue font-semibold">Claude AI 3.7</strong>, and <strong className="text-hextech-blue font-semibold">Antigravity</strong>, I deliver verified production-ready solutions at 10x iteration speed.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {["GitHub Copilot", "Claude AI 3.7", "Google Antigravity", "Multi-Agent Workflows", "Prompt Architecture", "Strict Verification"].map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 border border-hextech-blue/20 bg-hextech-blue/[0.04] text-[10px] font-mono font-semibold uppercase text-hextech-blue tracking-wider"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          <div className="shrink-0 flex items-center justify-center p-4 border border-white/[0.08] bg-black/60 w-full md:w-40 text-center">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              VELOCITY MULT
              <strong className="text-white text-lg font-bold block mt-1 font-mono">10X // ACTIVE</strong>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
