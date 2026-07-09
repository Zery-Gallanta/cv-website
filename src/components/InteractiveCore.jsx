import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Shield, Zap, Play, RotateCcw } from "lucide-react";

export default function InteractiveCore() {
  const [activeSubsystem, setActiveSubsystem] = useState(null);
  const [ignitionPhase, setIgnitionPhase] = useState(0); // 0: Idle, 1: Runic Alignment, 2: Confinement, 3: Extraction, 4: Active
  const [terminalLogs, setTerminalLogs] = useState([
    "visitor@sasongko.io:~$ hextech-core --status",
    ">> CORE STATUS: STANDBY (IDLE)",
    ">> WAITING FOR IGNITION SEQUENCE..."
  ]);
  const [rotation, setRotation] = useState({ x: -15, y: 15 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Subsystems data
  const subsystems = [
    {
      id: "aetheric-engine",
      title: "Aetheric Engine",
      discipline: "Software Engineering",
      glowColor: "border-hextech-blue/50 text-hextech-blue bg-hextech-blue/5",
      metrics: [
        { label: "BUILD RATE", value: "100%" },
        { label: "ROUTING LOSS", value: "<0.01%" },
        { label: "PLATFORMS", value: "React & Flutter" }
      ],
      description: "Directs visual layouts, responsive state structures, and modular client architectures."
    },
    {
      id: "confinement",
      title: "Core Confinement",
      discipline: "AI & Computer Vision",
      glowColor: "border-emerald-500/50 text-emerald-400 bg-emerald-500/5",
      metrics: [
        { label: "MAP ACCURACY", value: "92%" },
        { label: "INFERENCE", value: "40ms" },
        { label: "MODELS", value: "YOLOv9 & PyTorch" }
      ],
      description: "Processes live video streams, tracking coordinates, and performing automated pattern recognition."
    },
    {
      id: "sol-converter",
      title: "Sol Converter",
      discipline: "IoT & Embedded Systems",
      glowColor: "border-brass/50 text-brass bg-brass/5",
      metrics: [
        { label: "MANUAL REDUX", value: "80%" },
        { label: "THERMAL LEAK", value: "0K" },
        { label: "HARDWARE", value: "ESP32 & MQTT" }
      ],
      description: "Bridges mechanical sensors with cloud databases using efficient low-latency communication networks."
    }
  ];

  // Drag-to-rotate handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    
    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.4
    }));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    
    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.4
    }));
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Stepper Ignition Sequence
  const runIgnitionStep = (step) => {
    if (step <= ignitionPhase && step !== 0) return; // Prevent repeating unless reset
    
    if (step === 0) {
      setIgnitionPhase(0);
      setTerminalLogs([
        "visitor@sasongko.io:~$ hextech-core --reset",
        ">> SYSTEM RESET COMPLETED.",
        ">> STANDBY (IDLE)..."
      ]);
      return;
    }

    setIgnitionPhase(step);
    
    let newLogs = [];
    if (step === 1) {
      newLogs = [
        "visitor@sasongko.io:~$ hextech-core --ignite --phase-1",
        ">> RUNIC ALIGNMENT: INITIALIZING MICROWAVE EMITTERS...",
        ">> HEATING FUEL CORE PAST 100 MILLION KELVIN...",
        ">> STATUS: CORE TEMPERATURE STABILIZING AT 105M K..."
      ];
    } else if (step === 2) {
      newLogs = [
        "visitor@sasongko.io:~$ hextech-core --confinement --phase-2",
        ">> CONFINEMENT ACTIVE: CHARGING SUPERCONDUCTING FILAMENTS...",
        ">> AETHER LATTICE STABILIZED AT 99.9% COHESION...",
        ">> STATUS: CORE PLASMA SAFELY CONTAINED."
      ];
    } else if (step === 3) {
      newLogs = [
        "visitor@sasongko.io:~$ hextech-core --extract --phase-3",
        ">> THERMAL EXTRACTION: ACTIVATING CERAMIC SOL CONVERTER...",
        ">> CAPTURING NEUTRON KINETIC YIELD (4.2 GW)...",
        ">> STATUS: FUSION ENERGY HARVESTING ACTIVE."
      ];
    } else if (step === 4) {
      newLogs = [
        "visitor@sasongko.io:~$ hextech-core --distribute --phase-4",
        ">> GRID SYNC: SYNCHRONIZING OUTPUT GRID RELAYS...",
        ">> ROUTING POWER TO FRONTEND & IoT NODES...",
        ">> STATUS: CORE IS ONLINE. SYSTEM HANDSHAKE READY."
      ];
    }

    setTerminalLogs((prev) => [...prev, ...newLogs]);
  };

  // Canvas 3D particle orbit system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    const numParticles = 45;

    // Initialize particles in 3D spherical orbits
    for (let i = 0; i < numParticles; i++) {
      const radius = 60 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const speed = 0.015 + Math.random() * 0.02;
      particles.push({ radius, theta, phi, speed, size: 1.2 + Math.random() * 2 });
    }

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Project rotation
      const radX = (rotation.x * Math.PI) / 180;
      const radY = (rotation.y * Math.PI) / 180;

      // Sort particles by Z depth for realistic rendering overlap
      const projected = particles.map((p) => {
        // Orbit update
        p.theta += p.speed * (activeSubsystem ? 1.8 : 1 + ignitionPhase * 0.4);

        // 3D coordinates relative to center
        let x = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
        let y = p.radius * Math.cos(p.phi);
        let z = p.radius * Math.sin(p.phi) * Math.sin(p.theta);

        // Rotation around X axis
        let y1 = y * Math.cos(radX) - z * Math.sin(radX);
        let z1 = y * Math.sin(radX) + z * Math.cos(radX);

        // Rotation around Y axis
        let x2 = x * Math.cos(radY) + z1 * Math.sin(radY);
        let z2 = -x * Math.sin(radY) + z1 * Math.cos(radY);

        // Perspective projection
        const dist = 300;
        const scale = dist / (dist + z2);
        const projX = cx + x2 * scale;
        const projY = cy + y1 * scale;

        return { x: projX, y: projY, z: z2, scale, size: p.size * scale };
      });

      // Draw particle trails
      projected.sort((a, b) => b.z - a.z); // Render back particles first

      projected.forEach((p) => {
        const glowFactor = activeSubsystem ? 0.8 : 0.4 + ignitionPhase * 0.15;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Color based on active subsystem
        if (activeSubsystem === "confinement") {
          ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + (p.z + 150) / 300 * glowFactor})`;
          ctx.shadowColor = "#10b981";
        } else if (activeSubsystem === "sol-converter") {
          ctx.fillStyle = `rgba(184, 115, 51, ${0.4 + (p.z + 150) / 300 * glowFactor})`;
          ctx.shadowColor = "#b87333";
        } else {
          ctx.fillStyle = `rgba(0, 229, 255, ${0.4 + (p.z + 150) / 300 * glowFactor})`;
          ctx.shadowColor = "#00e5ff";
        }
        
        ctx.shadowBlur = p.scale * (activeSubsystem ? 10 : 5);
        ctx.fill();
      });

      ctx.shadowBlur = 0; // Reset
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotation, activeSubsystem, ignitionPhase]);

  return (
    <section id="hextech-core" className="py-24 px-6 max-w-7xl mx-auto relative select-none">
      {/* Background neon glows */}
      <div className="absolute top-[30%] left-[-15%] w-[450px] h-[450px] rounded-full bg-hextech-blue/3 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-15%] w-[450px] h-[450px] rounded-full bg-brass/3 blur-[180px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-brass/25 bg-zinc-950/40 text-[10px] font-mono font-medium text-brass uppercase tracking-widest mb-4">
          <span>02 // Core Technology</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-cinzel uppercase text-white tracking-widest">
          Aetheric Hextech Core
        </h2>
        <p className="text-zinc-400 font-sans mt-3 text-sm md:text-base max-w-2xl mx-auto">
          An interactive, multi-layered diagnostic model of Zery's engineering pillars. Hover subsystems to trace metrics, and drag the core to rotate the lattice rings.
        </p>
      </div>

      {/* Main Grid: Control Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Left Column: Subsystem Cards */}
        <div className="space-y-6 flex flex-col justify-center order-2 lg:order-1">
          {subsystems.map((sys) => (
            <div
              key={sys.id}
              onMouseEnter={() => setActiveSubsystem(sys.id)}
              onMouseLeave={() => setActiveSubsystem(null)}
              className={`hextech-card hextech-border p-6 bg-zinc-950/50 hover:bg-zinc-950/70 border-brass/10 hover:border-hextech-blue/30 transition-all duration-300 relative group cursor-pointer ${
                activeSubsystem === sys.id ? "ring-1 ring-hextech-blue/30" : ""
              }`}
            >
              {/* Corner mini brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brass/25 group-hover:border-hextech-blue/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brass/25 group-hover:border-hextech-blue/50" />

              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{sys.discipline}</span>
                <h3 className="text-base font-cinzel font-bold text-white uppercase mt-0.5 tracking-wider group-hover:text-hextech-blue transition-colors">
                  {sys.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">{sys.description}</p>
              </div>

              {/* Metrics Readout */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5 font-mono text-[9px]">
                {sys.metrics.map((m, idx) => (
                  <div key={idx} className="bg-zinc-900/60 p-2 rounded border border-brass/10 text-center">
                    <span className="text-zinc-500 block uppercase scale-[0.9]">{m.label}</span>
                    <span className="text-zinc-200 font-bold block mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Center Column: Drag-to-Rotate visual Core */}
        <div 
          className="relative min-h-[350px] lg:min-h-[450px] bg-zinc-950/40 rounded border border-brass/15 overflow-hidden flex flex-col items-center justify-center cursor-grab active:cursor-grabbing order-1 lg:order-2"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Subtle blueprint markings */}
          <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-600 space-y-0.5">
            <p>CORE_LAT: {rotation.x.toFixed(1)}°</p>
            <p>CORE_LON: {rotation.y.toFixed(1)}°</p>
            <p>RPM: {activeSubsystem ? 120 : 30 + ignitionPhase * 15}</p>
          </div>
          <div className="absolute top-4 right-4 font-mono text-[8px] text-zinc-600">
            <p>IGN_PULSE: {ignitionPhase * 25}%</p>
          </div>

          {/* Core Graphic container (Perspective frame) */}
          <div 
            className="w-72 h-72 relative flex items-center justify-center select-none"
            style={{
              perspective: "800px",
              transformStyle: "preserve-3d"
            }}
          >
            {/* 3D Orbiting Spark Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />

            {/* Concentric Gears & Circles */}
            <div
              className="absolute w-full h-full flex items-center justify-center transition-transform duration-100"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Outer Brass Geared Ring */}
              <div 
                className={`absolute w-64 h-64 rounded-full border border-brass/25 border-dashed flex items-center justify-center transition-colors duration-500`}
                style={{
                  transform: "translateZ(-40px)",
                  animation: `spin ${activeSubsystem ? '5s' : '15s'} linear infinite`,
                  borderColor: activeSubsystem === "sol-converter" ? "#b87333" : ""
                }}
              >
                <div className="absolute inset-2 rounded-full border border-brass/10" />
                <div className="absolute top-0 w-1 h-3 bg-brass/40" />
                <div className="absolute bottom-0 w-1 h-3 bg-brass/40" />
                <div className="absolute left-0 w-3 h-1 bg-brass/40" />
                <div className="absolute right-0 w-3 h-1 bg-brass/40" />
              </div>

              {/* Runic Ring (Middle) */}
              <div 
                className={`absolute w-48 h-48 rounded-full border flex items-center justify-center transition-all duration-500`}
                style={{
                  transform: "translateZ(0px)",
                  animation: `spin-reverse ${activeSubsystem ? '3s' : '10s'} linear infinite`,
                  borderColor: activeSubsystem === "confinement" ? "#10b981" : "rgba(0, 229, 255, 0.2)"
                }}
              >
                <div className="absolute inset-2 border border-dotted border-hextech-blue/15" />
                {/* Runic glyph markers */}
                <span className="absolute top-1 text-[8px] font-mono text-hextech-blue/50">ᚨ</span>
                <span className="absolute bottom-1 text-[8px] font-mono text-hextech-blue/50">ᛟ</span>
                <span className="absolute left-1 text-[8px] font-mono text-hextech-blue/50">ᚲ</span>
                <span className="absolute right-1 text-[8px] font-mono text-hextech-blue/50">ᚦ</span>
              </div>

              {/* Core Energy Conduit (Inner) */}
              <div 
                className={`absolute w-32 h-32 rounded-full border border-hextech-blue/30 flex items-center justify-center transition-colors duration-500`}
                style={{
                  transform: "translateZ(40px)",
                  animation: `spin ${activeSubsystem ? '2s' : '6s'} linear infinite`,
                  borderColor: activeSubsystem === "aetheric-engine" ? "#00e5ff" : ""
                }}
              >
                <div className="absolute inset-4 rounded-full border-t-2 border-b-2 border-hextech-blue/40" />
              </div>

              {/* Core Singularity (Center) */}
              <div 
                className={`absolute w-14 h-14 rounded-full bg-radial transition-all duration-500 z-10`}
                style={{
                  transform: "translateZ(60px)",
                  background: activeSubsystem === "confinement"
                    ? "radial-gradient(circle, #10b981 0%, rgba(16, 185, 129, 0.2) 70%, transparent 100%)"
                    : activeSubsystem === "sol-converter"
                    ? "radial-gradient(circle, #b87333 0%, rgba(184, 115, 51, 0.2) 70%, transparent 100%)"
                    : "radial-gradient(circle, #00e5ff 0%, rgba(0, 229, 255, 0.25) 70%, transparent 100%)",
                  boxShadow: activeSubsystem === "confinement"
                    ? "0 0 35px #10b981"
                    : activeSubsystem === "sol-converter"
                    ? "0 0 35px #b87333"
                    : "0 0 35px #00e5ff",
                  scale: activeSubsystem ? 1.25 : 1 + ignitionPhase * 0.1
                }}
              />
            </div>
          </div>

          {/* Help Overlay */}
          <div className="absolute bottom-4 font-mono text-[9px] text-zinc-500 animate-pulse pointer-events-none">
            DRAG TO ROTATE MATRIX
          </div>
        </div>

        {/* Right Column: Stepper Ignition Panel */}
        <div className="flex flex-col justify-between order-3">
          
          {/* Stepper Node */}
          <div className="hextech-card hextech-border p-6 bg-zinc-950/50 border-brass/10 flex-grow mb-6 relative">
            <h3 className="text-xs font-cinzel font-bold text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-brass" /> Core Ignition Sequencer
            </h3>
            
            <div className="space-y-4">
              {[
                { step: 1, label: "Runic Alignment", desc: "Heat fuel cells to 105M K." },
                { step: 2, label: "Harmonic Confinement", desc: "Stabilize magnetic lattice." },
                { step: 3, label: "Aetheric Extraction", desc: "Harvest 4.2 GW thermal energy." },
                { step: 4, label: "Grid Distribution", desc: "Sync network power relays." }
              ].map((s) => (
                <div
                  key={s.step}
                  onClick={() => runIgnitionStep(s.step)}
                  className={`p-3 rounded border text-left cursor-pointer transition-all ${
                    ignitionPhase >= s.step
                      ? "bg-hextech-blue/5 border-hextech-blue/30 text-white"
                      : "bg-zinc-900/35 border-white/5 text-zinc-500 hover:border-brass/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      PHASE 0{s.step} // {s.label}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${ignitionPhase >= s.step ? "bg-hextech-blue shadow-[0_0_6px_#00E5FF]" : "bg-zinc-800"}`} />
                  </div>
                  <p className="text-[10px] font-sans text-zinc-400 mt-1 leading-normal">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => runIgnitionStep(0)}
              className="mt-4 w-full py-2 border border-brass/20 rounded font-mono text-[9px] font-bold uppercase tracking-widest text-brass hover:border-hextech-blue hover:text-hextech-blue bg-zinc-900/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Core System
            </button>
          </div>

          {/* Stepper Live Console */}
          <div className="hextech-card hextech-border p-4 bg-zinc-950/80 border-brass/10 h-44 flex flex-col justify-between relative">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <Terminal className="w-3.5 h-3.5 text-brass" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                Core System Console
              </span>
            </div>

            <div className="flex-grow font-mono text-[9px] text-zinc-400 overflow-y-auto space-y-1 my-2 scrollbar-none text-left">
              {terminalLogs.slice(-7).map((log, idx) => (
                <p 
                  key={idx} 
                  className={
                    log.startsWith("visitor") 
                      ? "text-zinc-300" 
                      : log.startsWith(">> CORE STATUS") || log.startsWith(">> SYSTEM RESET")
                      ? "text-zinc-500" 
                      : "text-hextech-blue/90"
                  }
                >
                  {log}
                </p>
              ))}
            </div>
            
            <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[9px] font-mono text-zinc-600 uppercase">
              <span>Status: {ignitionPhase === 4 ? "Core Active" : "Standby"}</span>
              <span>Yield: {ignitionPhase * 25}%</span>
            </div>
          </div>

        </div>

      </div>

      {/* Runic divider line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[1px] bg-gradient-to-r from-transparent via-brass/20 to-transparent" />
    </section>
  );
}
