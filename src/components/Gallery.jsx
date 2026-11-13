import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Eye,
  Smartphone,
  Bot,
  Server,
  Maximize2,
  X,
  ArrowUpRight,
  Layers,
  Terminal,
  Activity
} from "lucide-react";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSystem, setSelectedSystem] = useState(null);

  const filters = [
    { id: "all", label: "All Systems" },
    { id: "ai", label: "AI & ML" },
    { id: "app", label: "Web & Mobile" },
    { id: "iot", label: "IoT & Backend" }
  ];

  const systems = [
    {
      id: 1,
      group: "ai",
      code: "SYS-01 // VISION",
      title: "YOLOv9 Real-Time Inference Pipeline",
      category: "Computer Vision & Edge Optimization",
      icon: Eye,
      metric: "92% mAP @ 30+ FPS",
      summary:
        "End-to-end object detection pipeline with model quantization and live bounding-box telemetry dashboard for traffic and defect analytics.",
      architecture: [
        "Input Stream -> OpenCV Frame Buffer",
        "Quantized YOLOv9 / PyTorch Inference",
        "WebSocket Telemetry -> React Analytics UI"
      ],
      stack: ["Python", "YOLOv9", "PyTorch", "OpenCV"],
      repo: "https://github.com/Zery-Gallanta/traffic-light-detection",
      cols: "md:col-span-1"
    },
    {
      id: 2,
      group: "iot",
      code: "SYS-02 // TELEMETRY",
      title: "IoT Eco-Enzyme Monitoring Platform",
      category: "Embedded Systems & Real-Time Dashboard",
      icon: Cpu,
      metric: "+80% Monitoring Efficiency",
      summary:
        "Automated ESP32 sensor node streaming pH, gas, and temperature telemetry over MQTT into a React.js dashboard with TensorFlow anomaly checks.",
      architecture: [
        "ESP32 Sensors (pH / Temp / Gas)",
        "MQTT Broker -> Real-Time Stream",
        "React.js Dashboard + TensorFlow Alerts"
      ],
      stack: ["ESP32", "MQTT", "React.js", "TensorFlow"],
      repo: "https://github.com/Zery-Gallanta",
      cols: "md:col-span-1"
    },
    {
      id: 3,
      group: "app",
      code: "SYS-03 // ENTERPRISE",
      title: "Enterprise Mobile & Web Dashboards",
      category: "PT Petrokimia Gresik // Clean Architecture",
      icon: Smartphone,
      metric: "60–120 FPS Client",
      summary:
        "Production-grade Flutter mobile and React.js web workflows engineered with modular Clean Architecture, REST API integration, and automated QA.",
      architecture: [
        "Presentation (Flutter BLoC / React)",
        "Domain & Use-Case Layer",
        "REST API + Offline Cache (SQLite / Hive)"
      ],
      stack: ["Flutter", "Dart", "React.js", "REST API"],
      repo: "https://github.com/Zery-Gallanta",
      cols: "md:col-span-1"
    },
    {
      id: 4,
      group: "ai",
      code: "SYS-04 // FINTECH ML",
      title: "Autonomous Quant & LLM Trading Engine",
      category: "Algorithmic Execution & Risk Guardrails",
      icon: Bot,
      metric: "68.75% Backtest Win Rate",
      summary:
        "Hybrid MLP Classifier and local Qwen LLM signal validator (via Ollama) integrated with MetaTrader 5, CCXT, and Telegram bot monitoring.",
      architecture: [
        "OHLCV Market Feed (CCXT / MT5)",
        "Scikit-Learn MLP + Ollama LLM Filter",
        "Risk Engine + Telegram Command Alerts"
      ],
      stack: ["Python", "Scikit-Learn", "Ollama LLM", "MT5", "CCXT"],
      repo: "https://github.com/Zery-Gallanta/trading-bot",
      cols: "md:col-span-2"
    },
    {
      id: 5,
      group: "iot",
      code: "SYS-05 // BACKEND",
      title: "Scalable REST & Microservice Stack",
      category: "Backend APIs & Containerized Deployment",
      icon: Server,
      metric: "<120ms API Response",
      summary:
        "FastAPI and Node.js backend services with structured SQL/Firebase persistence, input validation, Git workflows, and Dockerized environments.",
      architecture: [
        "Client -> FastAPI / Node.js Gateway",
        "Auth, Validation & Business Logic",
        "SQL / Firebase + Docker Container"
      ],
      stack: ["Node.js", "FastAPI", "SQL", "Firebase", "Docker"],
      repo: "https://github.com/Zery-Gallanta",
      cols: "md:col-span-1"
    }
  ];

  const visibleSystems =
    activeFilter === "all"
      ? systems
      : systems.filter((item) => item.group === activeFilter);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Precision Corner Crosshairs (+) */}
      <div className="absolute top-8 left-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute top-8 right-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>

      {/* Section Header */}
      <div className="mb-10 text-left border-b border-white/[0.08] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.14em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue" />
            <span>03 // SYSTEM ARCHITECTURE &amp; UI SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
            Engineering <span className="font-serif italic font-normal text-zinc-300">Systems</span> &amp; UI
          </h2>
          <p className="text-zinc-400 font-sans mt-2.5 text-sm md:text-base max-w-2xl leading-relaxed">
            Interactive breakdown of production architectures, AI inference pipelines, mobile clean-architecture clients, and real-time telemetry dashboards.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider border transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-black border-white font-bold"
                    : "bg-[#0c0c0e]/80 text-zinc-400 border-white/[0.08] hover:text-white hover:border-white/30"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visibleSystems.map((item) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className={`${activeFilter === "all" ? item.cols : "md:col-span-1"} group relative border border-white/[0.08] bg-[#0c0c0e]/85 p-6 flex flex-col justify-between cursor-pointer hover:border-hextech-blue/50 transition-all duration-200`}
              onClick={() => setSelectedSystem(item)}
            >
              {/* Corner Crosshairs */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-700 select-none">+</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 select-none">+</span>

              <div>
                {/* Top Bar */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-300 group-hover:text-hextech-blue group-hover:border-hextech-blue/40 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {item.code}
                    </span>
                  </div>

                  <span className="w-8 h-8 border border-white/[0.08] bg-black/50 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/30 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Title & Category */}
                <p className="font-mono text-[10px] uppercase tracking-wider text-hextech-blue mb-1.5">
                  {item.category}
                </p>
                <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-hextech-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed mb-5">
                  {item.summary}
                </p>

                {/* Mini Pipeline Blueprint Preview */}
                <div className="border border-white/[0.06] bg-black/50 p-3.5 mb-5 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wider border-b border-white/[0.06] pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-hextech-blue" />
                      Data Flow
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {item.metric}
                    </span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {item.architecture.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 font-mono text-[11px] text-zinc-300">
                        <span className="text-hextech-blue text-[10px]">0{idx + 1}</span>
                        <span className="truncate">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stack Footer */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                {item.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 border border-white/[0.06] bg-black/40 px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* System Inspector Modal */}
      <AnimatePresence>
        {selectedSystem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSystem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full border border-white/[0.12] bg-[#0c0c0e] overflow-hidden"
            >
              {/* Top Modal Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-black/60 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Terminal className="w-4 h-4 text-hextech-blue" />
                  <span className="uppercase tracking-widest">{selectedSystem.code}</span>
                </div>
                <button
                  onClick={() => setSelectedSystem(null)}
                  className="w-7 h-7 border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-hextech-blue">
                    {selectedSystem.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mt-1">
                    {selectedSystem.title}
                  </h3>
                  <p className="text-zinc-300 font-sans text-sm leading-relaxed mt-3">
                    {selectedSystem.summary}
                  </p>
                </div>

                <div className="border border-white/[0.08] bg-black/60 p-4 space-y-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    System Architecture Pipeline
                  </div>
                  {selectedSystem.architecture.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 font-mono text-xs text-zinc-200">
                      <span className="px-1.5 py-0.5 bg-hextech-blue/10 border border-hextech-blue/30 text-hextech-blue text-[10px]">
                        STEP 0{idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedSystem.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 border border-white/[0.08] bg-black/50 px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="p-4 sm:px-6 border-t border-white/[0.08] bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">BENCHMARK</span>
                  <span className="text-emerald-400 font-semibold">{selectedSystem.metric}</span>
                </div>
                <a
                  href={selectedSystem.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white text-black hover:bg-hextech-blue px-4 py-2 font-bold uppercase tracking-wider transition-colors"
                >
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
