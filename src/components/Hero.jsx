import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Terminal, 
  Sparkles, 
  Smartphone, 
  Cpu, 
  Code2, 
  Check, 
  Copy,
  Layers,
  Zap
} from "lucide-react";

const GithubIcon = ({ className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Hero() {
  const [activeTab, setActiveTab] = useState("ai");
  const [copied, setCopied] = useState(false);

  const capabilities = {
    ai: {
      tag: "WORKFLOW // 01",
      title: "AI-Native Vibe Coding",
      desc: "Architecting software via prompt engineering, multi-agent pairing, and autonomous coding loops using Copilot, Claude AI 3.7, and Google Antigravity.",
      spec: "Latency: Sub-second iteration • Precision: Production-ready • Stack: Antigravity / Claude / Copilot",
      command: "agy run --vibe-agent --model claude-3-7-sonnet",
      metrics: [
        { label: "Velocity", val: "4.2x Faster" },
        { label: "Code Quality", val: "Strict Lint" },
        { label: "Agents", val: "Autonomous" }
      ]
    },
    web: {
      tag: "ENGINE // 02",
      title: "Full-Stack Web Architect",
      desc: "Building low-latency responsive systems, interactive canvas experiences, RESTful microservices, and modern reactive frontends.",
      spec: "Performance: 98+ Lighthouse • Architecture: Modular Clean Arch • Tech: React / Vite / FastAPI",
      command: "npm run build && vite optimize --mode production",
      metrics: [
        { label: "Bundle", val: "Compressed" },
        { label: "Response", val: "< 120ms" },
        { label: "UI Vibe", val: "ArtCraft Grid" }
      ]
    },
    mobile: {
      tag: "CLIENT // 03",
      title: "Cross-Platform Mobile (Flutter)",
      desc: "Creating polished native mobile applications with offline-first synchronization, SQLite/Hive caching, and clean BLoC / Riverpod state architecture.",
      spec: "Platforms: Android / iOS • Engine: Flutter 3.x / Dart • State: BLoC Pattern",
      command: "flutter build apk --release --split-per-abi",
      metrics: [
        { label: "Frame Rate", val: "60-120 FPS" },
        { label: "Sync", val: "Offline First" },
        { label: "Security", val: "Biometric" }
      ]
    },
    iot: {
      tag: "HARDWARE // 04",
      title: "IoT & Embedded Integrations",
      desc: "Deploying microcontroller firmware, automated telemetry telemetry sensors, MQTT telemetry brokers, and hardware patented eco-monitoring systems.",
      spec: "Sensors: pH / Temp / Gas • MCU: ESP32 / Arduino • Protocol: MQTT / WebSocket",
      command: "platformio run --target upload --environment esp32dev",
      metrics: [
        { label: "Efficiency", val: "+80% Gain" },
        { label: "Patent", val: "Registered" },
        { label: "Telemetry", val: "Live Stream" }
      ]
    }
  };

  const current = capabilities[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Precision Corner Crosshairs (+) on Viewport Bounds */}
      <div className="absolute top-16 left-6 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute top-16 right-6 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute bottom-6 left-6 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute bottom-6 right-6 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>

      {/* Subtle Studio Radial Spotlight behind the headline */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0, 229, 255, 0.05), rgba(184, 115, 51, 0.02) 45%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl w-full flex flex-col items-center text-center space-y-8 z-10">
        
        {/* Top Studio HUD Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue animate-ping" />
            <span className="text-white font-semibold">SYS // 2026 ACTIVE</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-zinc-400">
            <span>JAKARTA (UTC+7)</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300">INDONESIA</span>
          </div>

          <div className="inline-flex items-center gap-1.5 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-zinc-400">
            <Sparkles className="w-3 h-3 text-hextech-blue" />
            <span className="text-zinc-300">AI-NATIVE CODER</span>
          </div>
        </motion.div>

        {/* Master Headline (ArtCraft Editorial Typography) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-white leading-[1.02]">
            Crafting <span className="font-serif italic font-normal text-zinc-300">Intelligent</span> Systems
            <br />
            <span className="text-zinc-400 font-sans font-light">&</span> Scalable <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-hextech-blue via-cyan-200 to-white">Software</span>.
          </h1>
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500 pt-2">
            ZERY GALLANTA SASONGKO — SOFTWARE ENGINEER & VIBE CODER
          </p>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl font-sans font-normal leading-relaxed text-balance"
        >
          Pairing modern software engineering with autonomous AI workflows — building high-performance 
          mobile applications, robust web services, and intelligent IoT systems with <span className="text-zinc-200 font-medium">Copilot</span>, <span className="text-zinc-200 font-medium">Claude AI</span>, and <span className="text-zinc-200 font-medium">Antigravity</span>.
        </motion.p>

        {/* Primary CTA Buttons (Inverted Hairline Style) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 border border-white bg-white text-black hover:bg-hextech-blue hover:border-hextech-blue hover:text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all duration-150"
          >
            <span>Explore Blueprints</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://github.com/Zery-Gallanta"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-white/[0.12] bg-[#0c0c0e]/90 text-zinc-200 hover:bg-white hover:text-black hover:border-white px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-all duration-150"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Connect GitHub</span>
          </a>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 border border-white/[0.12] bg-transparent text-zinc-400 hover:text-white hover:border-white/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-all duration-150"
          >
            <span>Get In Touch</span>
          </a>
        </motion.div>

        {/* Interactive Studio Workstation Dock (Inspired by ArtCraft) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-3xl mt-6 pt-4"
        >
          {/* Tabs Bar */}
          <div className="flex items-stretch border border-white/[0.08] bg-[#09090b]/90 backdrop-blur-md overflow-x-auto">
            <div className="hidden sm:flex items-center px-4 border-r border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-zinc-500 whitespace-nowrap">
              <Terminal className="w-3.5 h-3.5 mr-1.5 text-hextech-blue" />
              <span>STUDIO STACK</span>
            </div>

            <div className="flex items-stretch flex-1">
              {[
                { id: "ai", label: "AI Vibe Coding", icon: Sparkles },
                { id: "web", label: "Full-Stack Web", icon: Code2 },
                { id: "mobile", label: "Mobile Flutter", icon: Smartphone },
                { id: "iot", label: "IoT Hardware", icon: Cpu }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 font-mono text-[11px] uppercase tracking-[0.12em] border-r border-white/[0.08] last:border-r-0 transition-all duration-150 whitespace-nowrap ${
                      isSelected
                        ? "bg-white text-black font-semibold"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Telemetry Preview Card */}
          <div className="border-x border-b border-white/[0.08] bg-[#0c0c0e]/80 p-5 text-left transition-all duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-hextech-blue">
                  {current.tag}
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-0.5">
                  {current.title}
                </h3>
              </div>

              {/* Live Metric Pills */}
              <div className="flex items-center gap-2">
                {current.metrics.map((m, idx) => (
                  <div 
                    key={idx}
                    className="border border-white/[0.08] bg-black/40 px-2.5 py-1 font-mono text-[10px] text-zinc-300"
                  >
                    <span className="text-zinc-500 mr-1">{m.label}:</span>
                    <span className="text-white font-medium">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
              {current.desc}
            </p>

            {/* Terminal Command Bar */}
            <div className="mt-4 flex items-center justify-between gap-3 border border-white/[0.06] bg-black/60 px-3 py-2 font-mono text-[11px] text-zinc-300">
              <div className="flex items-center gap-2 truncate">
                <span className="text-hextech-blue">$</span>
                <span className="text-zinc-200 truncate">{current.command}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[10px] uppercase font-mono text-zinc-400 hover:text-white border border-white/[0.08] px-2 py-0.5 transition-colors shrink-0"
                title="Copy command"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Studio Meta Footer Info */}
        <div className="flex items-center gap-6 pt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          <span>COORDINATES: -7.155° N, 112.653° E</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">VERSION: 2026.10</span>
          <span>|</span>
          <span className="text-zinc-400">STATUS: READY FOR WORK</span>
        </div>

      </div>

      {/* Hairline Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.08]" />
    </section>
  );
}
