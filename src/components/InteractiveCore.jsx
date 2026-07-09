import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SUBSYSTEMS = [
  {
    id: "aetheric-engine",
    tag: "01 // Software",
    title: "Aetheric Engine",
    subtitle: "Frontend & Mobile Architecture",
    color: "#00E5FF",
    shadowColor: "rgba(0,229,255,0.35)",
    ringIndex: 0,
    metrics: [
      { label: "Build Rate",   value: "100%",       unit: "" },
      { label: "Latency Loss", value: "<0.01",       unit: "%" },
      { label: "Frameworks",   value: "React/Flutter",unit: "" },
    ],
    description:
      "Directs pixel-perfect UI systems, responsive state machines, and modular client architectures across web and native mobile platforms.",
  },
  {
    id: "confinement",
    tag: "02 // AI & Vision",
    title: "Core Confinement",
    subtitle: "Computer Vision & ML Systems",
    color: "#10b981",
    shadowColor: "rgba(16,185,129,0.35)",
    ringIndex: 1,
    metrics: [
      { label: "mAP Accuracy", value: "92",   unit: "%" },
      { label: "Inference",    value: "40",   unit: "ms" },
      { label: "Engine",       value: "YOLOv9 / PyTorch", unit: "" },
    ],
    description:
      "Processes real-time video streams, classifies object trajectories, and delivers detection outputs for production-grade AI pipelines.",
  },
  {
    id: "sol-converter",
    tag: "03 // IoT",
    title: "Sol Converter",
    subtitle: "Embedded Systems & Edge Computing",
    color: "#B87333",
    shadowColor: "rgba(184,115,51,0.35)",
    ringIndex: 2,
    metrics: [
      { label: "Manual Redux", value: "80",   unit: "%" },
      { label: "Thermal Leak", value: "0",    unit: "K" },
      { label: "Hardware",     value: "ESP32 / MQTT", unit: "" },
    ],
    description:
      "Bridges physical sensor networks with cloud databases over low-latency MQTT pipelines, enabling autonomous eco-system monitoring.",
  },
];

const IGNITION_STEPS = [
  { phase: 1, label: "Runic Alignment",      desc: "Initialise microwave emitters — heat fuel past 100M K." },
  { phase: 2, label: "Harmonic Confinement", desc: "Charge superconducting filaments — stabilise plasma lattice." },
  { phase: 3, label: "Aetheric Extraction",  desc: "Activate Sol Converter — harvest 4.2 GW thermal yield." },
  { phase: 4, label: "Grid Distribution",    desc: "Sync relays — route clean current to all system nodes." },
];

const PHASE_LOGS = {
  0: [">> SYSTEM RESET // CORE STANDBY.", ">> AWAITING IGNITION SEQUENCE INPUT..."],
  1: [
    "$ hextech-core --ignite --phase 01",
    ">> RUNIC EMITTERS: ONLINE",
    ">> FUEL TEMP: 104.8M K — RISING",
    ">> PLASMA SEED INITIATED.",
  ],
  2: [
    "$ hextech-core --confinement --phase 02",
    ">> FILAMENT COHESION: 99.9%",
    ">> MAGNETIC BOTTLE: SEALED",
    ">> PLASMA CONTAINED — ZERO WALL CONTACT.",
  ],
  3: [
    "$ hextech-core --extract --phase 03",
    ">> SOL CONVERTER: SPINNING UP",
    ">> NEUTRON YIELD: 4.2 GW CAPTURED",
    ">> EFFICIENCY: 94%",
  ],
  4: [
    "$ hextech-core --distribute --phase 04",
    ">> GRID RELAY: SYNCHRONISED",
    ">> POWER ROUTING: FRONTEND & IoT NODES",
    ">> ✔  CORE ONLINE — SYSTEM HANDSHAKE READY.",
  ],
};

/* ─────────────────────────────────────────
   CANVAS PARTICLE SYSTEM
───────────────────────────────────────── */
class Particle {
  constructor(radius) {
    this.radius = radius * (0.6 + Math.random() * 0.8);
    this.theta  = Math.random() * Math.PI * 2;
    this.phi    = Math.acos(2 * Math.random() - 1);
    this.speed  = (0.004 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1);
    this.size   = 0.8 + Math.random() * 1.8;
    this.alpha  = 0.4 + Math.random() * 0.6;
    this.trail  = [];
    this.maxTrail = 14;
  }
  update(dt, speedMult) {
    this.theta += this.speed * speedMult * dt;
    const x = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    const y = this.radius * Math.cos(this.phi);
    const z = this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    this.trail.push({ x, y, z });
    if (this.trail.length > this.maxTrail) this.trail.shift();
  }
}

function project(p3d, rotX, rotY, cx, cy, fov) {
  let { x, y, z } = p3d;
  // rotate X
  const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
  const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
  // rotate Y
  const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
  const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
  const y2 = y1;
  const scale = fov / (fov + z2);
  return { px: cx + x2 * scale, py: cy + y2 * scale, z: z2, scale };
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function InteractiveCore() {
  const [activeId,      setActiveId]      = useState(null);
  const [ignitionPhase, setIgnitionPhase] = useState(0);
  const [logs,          setLogs]          = useState(PHASE_LOGS[0]);
  const [hoveredStep,   setHoveredStep]   = useState(null);

  // Spring-based 3-D rotation (no jarring jumps)
  const rotX = useSpring(-14, { stiffness: 60, damping: 22 });
  const rotY = useSpring(18,  { stiffness: 60, damping: 22 });

  const isDragging   = useRef(false);
  const lastMouse    = useRef({ x: 0, y: 0 });
  const canvasRef    = useRef(null);
  const sectionRef   = useRef(null);
  const particlesRef = useRef([]);
  const frameRef     = useRef(null);
  const lastTime     = useRef(performance.now());

  // ── initialise particles ──────────────────────────────
  useEffect(() => {
    const n = 60;
    particlesRef.current = Array.from({ length: n }, () => new Particle(110));
  }, []);

  // ── canvas render loop ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const active = SUBSYSTEMS.find(s => s.id === activeId);

    const render = (now) => {
      frameRef.current = requestAnimationFrame(render);
      const dt = Math.min((now - lastTime.current) / 16.67, 3);
      lastTime.current = now;

      const speedMult = activeId ? 2.6 : 1 + ignitionPhase * 0.35;
      const radX = rotX.get() * (Math.PI / 180);
      const radY = rotY.get() * (Math.PI / 180);
      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      const fov = 340;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // colour palette
      const baseColor = active ? active.color : "#00E5FF";
      const [r, g, b] = baseColor === "#00E5FF"
        ? [0, 229, 255]
        : baseColor === "#10b981"
        ? [16, 185, 129]
        : [184, 115, 51];

      // update & collect projected positions
      const projected = particlesRef.current.map(p => {
        p.update(dt, speedMult);
        const last = p.trail[p.trail.length - 1];
        if (!last) return null;
        return { p, ...project(last, radX, radY, cx, cy, fov) };
      }).filter(Boolean);

      // sort back-to-front
      projected.sort((a, b) => a.z - b.z);

      projected.forEach(({ p, px, py, z, scale }) => {
        const depth  = (z + 160) / 320;           // 0=back 1=front
        const radius = p.size * scale * 1.1;
        const alpha  = p.alpha * (0.25 + depth * 0.75);

        // draw trail
        if (p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const { px: x1, py: y1 } = project(p.trail[i - 1], radX, radY, cx, cy, fov);
            const { px: x2, py: y2 } = project(p.trail[i],     radX, radY, cx, cy, fov);
            const t = i / p.trail.length;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * t * 0.45})`;
            ctx.lineWidth   = radius * t * 0.6;
            ctx.stroke();
          }
        }

        // dot
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.4, radius), 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${r},${g},${b},${alpha})`;
        ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.8})`;
        ctx.shadowBlur  = scale * (activeId ? 18 : 8);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
    };

    frameRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [activeId, ignitionPhase, rotX, rotY]);

  // ── drag handlers ─────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    lastMouse.current  = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    rotY.set(rotY.get() + dx * 0.5);
    rotX.set(Math.max(-50, Math.min(50, rotX.get() - dy * 0.5)));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, [rotX, rotY]);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  // touch equivalents
  const onTouchStart = useCallback((e) => {
    isDragging.current = true;
    lastMouse.current  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastMouse.current.x;
    const dy = e.touches[0].clientY - lastMouse.current.y;
    rotY.set(rotY.get() + dx * 0.5);
    rotX.set(Math.max(-50, Math.min(50, rotX.get() - dy * 0.5)));
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, [rotX, rotY]);

  // ── ignition ─────────────────────────────────────────
  const ignite = (step) => {
    if (step !== 0 && step <= ignitionPhase) return;
    setIgnitionPhase(step);
    setLogs(PHASE_LOGS[step]);
  };

  const active = SUBSYSTEMS.find(s => s.id === activeId);

  // css-friendly rotation style for ring divs
  const ringStyle = (baseAnim, zTranslate) => ({
    transform: `translateZ(${zTranslate}px)`,
    animation: baseAnim,
  });

  return (
    <section
      ref={sectionRef}
      id="hextech-core"
      className="relative overflow-hidden py-0"
      style={{ minHeight: "100vh" }}
    >
      {/* ── BLEEDING BACKGROUND LAYER ─────────────────── */}
      {/* Large ambient glow that bleeds into surrounding sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.04) 0%, rgba(184,115,51,0.025) 45%, transparent 75%)",
        }}
      />
      {/* Top bleed */}
      <div
        className="absolute -top-32 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,229,255,0.025) 60%, transparent)",
        }}
      />
      {/* Bottom bleed */}
      <div
        className="absolute -bottom-32 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, transparent, rgba(184,115,51,0.02) 60%, transparent)",
        }}
      />

      {/* Blueprint crosshair lines (very subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035]">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-hextech-blue" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-hextech-blue" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 z-10">

        {/* ── SECTION HEADER ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-brass/25 bg-zinc-950/40 text-[10px] font-mono font-medium text-brass uppercase tracking-widest mb-5">
            <span className="w-1 h-1 rounded-full bg-brass animate-pulse" />
            <span>02 // Engineered Subsystems</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-cinzel uppercase text-white tracking-widest leading-none">
            Aetheric
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #00E5FF, #B87333)" }}
            >
              Hextech Core
            </span>
          </h2>
          <p className="text-zinc-400 font-sans mt-4 text-sm md:text-base max-w-xl leading-relaxed">
            Hover a subsystem to trace live telemetry. Drag the core to rotate the lattice rings.
            Trigger the ignition sequence to boot the engineering stack.
          </p>
        </motion.div>

        {/* ── THREE-COLUMN LAYOUT ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px_1fr] gap-10 items-center">

          {/* ── LEFT: SUBSYSTEM CARDS ─────────────────── */}
          <div className="space-y-4 order-2 lg:order-1">
            {SUBSYSTEMS.map((sys, idx) => (
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveId(sys.id)}
                onMouseLeave={() => setActiveId(null)}
                className={`relative p-5 rounded border transition-all duration-400 cursor-default group overflow-hidden ${
                  activeId === sys.id
                    ? "border-opacity-60 bg-zinc-950/80"
                    : "border-brass/12 bg-zinc-950/40 hover:bg-zinc-950/60"
                }`}
                style={{
                  borderColor: activeId === sys.id ? sys.color + "55" : undefined,
                  boxShadow: activeId === sys.id
                    ? `0 0 24px ${sys.shadowColor}, inset 0 0 20px ${sys.shadowColor.replace("0.35", "0.04")}`
                    : "none",
                }}
              >
                {/* Hover corner accent */}
                <div
                  className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-all duration-300"
                  style={{ borderColor: activeId === sys.id ? sys.color : "rgba(184,115,51,0.3)" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-all duration-300"
                  style={{ borderColor: activeId === sys.id ? sys.color : "rgba(184,115,51,0.3)" }}
                />

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                      {sys.tag}
                    </span>
                    <h3
                      className="text-sm font-cinzel font-bold uppercase tracking-wider transition-colors duration-300"
                      style={{ color: activeId === sys.id ? sys.color : "#e4e4e7" }}
                    >
                      {sys.title}
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{sys.subtitle}</p>
                  </div>
                  <ArrowRight
                    className="w-3.5 h-3.5 mt-1 transition-all duration-300"
                    style={{
                      color: activeId === sys.id ? sys.color : "#52525b",
                      transform: activeId === sys.id ? "translateX(2px)" : "none",
                    }}
                  />
                </div>

                {/* Description — slides in on hover */}
                <AnimatePresence>
                  {activeId === sys.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="text-[11px] text-zinc-400 font-sans leading-relaxed mb-3 overflow-hidden"
                    >
                      {sys.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Metric chips */}
                <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-white/5">
                  {sys.metrics.map((m, i) => (
                    <div key={i} className="bg-zinc-900/70 rounded p-2 border border-white/5">
                      <span className="text-[8px] font-mono text-zinc-500 block uppercase leading-none mb-0.5">
                        {m.label}
                      </span>
                      <span
                        className="text-[11px] font-mono font-bold block transition-colors duration-300"
                        style={{ color: activeId === sys.id ? sys.color : "#a1a1aa" }}
                      >
                        {m.value}{m.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── CENTER: INTERACTIVE 3-D CORE ─────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex flex-col items-center gap-6"
          >
            {/* Drag canvas area */}
            <div
              className="relative w-full aspect-square max-w-[480px] rounded-lg border border-brass/10 bg-zinc-950/30 overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                boxShadow: active
                  ? `0 0 60px ${active.shadowColor}, inset 0 0 40px rgba(0,0,0,0.6)`
                  : "0 0 40px rgba(0,0,0,0.6)",
                transition: "box-shadow 0.5s ease",
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            >
              {/* Canvas particle layer */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

              {/* CSS 3-D rings — hardware accelerated */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}
              >
                <motion.div
                  className="relative w-72 h-72 flex items-center justify-center"
                  style={{
                    rotateX: rotX,
                    rotateY: rotY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Ring 1 — outer brass dashed */}
                  <div
                    className="absolute w-64 h-64 rounded-full border-2 border-dashed"
                    style={{
                      ...ringStyle(`spin ${activeId ? "6s" : "20s"} linear infinite`, -50),
                      borderColor: activeId === "sol-converter" ? "#B87333" : "rgba(184,115,51,0.35)",
                      transition: "border-color 0.5s, animation-duration 0.4s",
                    }}
                  />
                  {/* Ring 2 — mid runic cyan */}
                  <div
                    className="absolute w-48 h-48 rounded-full border"
                    style={{
                      ...ringStyle(`spin-reverse ${activeId ? "4s" : "13s"} linear infinite`, 0),
                      borderColor: activeId === "confinement" ? "#10b981" : "rgba(0,229,255,0.25)",
                      boxShadow: activeId === "confinement" ? "0 0 18px #10b981" : "none",
                      transition: "border-color 0.4s, box-shadow 0.4s, animation-duration 0.4s",
                    }}
                  >
                    {/* Runic glyphs at cardinal points */}
                    {["top-0 left-1/2 -translate-x-1/2 -translate-y-2","bottom-0 left-1/2 -translate-x-1/2 translate-y-2","left-0 top-1/2 -translate-y-1/2 -translate-x-2","right-0 top-1/2 -translate-y-1/2 translate-x-2"].map((pos, i) => (
                      <span key={i} className={`absolute ${pos} text-[9px] font-mono text-hextech-blue/40`}>
                        {["ᚨ","ᛟ","ᚲ","ᚦ"][i]}
                      </span>
                    ))}
                  </div>
                  {/* Ring 3 — inner conduit */}
                  <div
                    className="absolute w-32 h-32 rounded-full border"
                    style={{
                      ...ringStyle(`spin ${activeId ? "2.5s" : "8s"} linear infinite`, 40),
                      borderColor: activeId === "aetheric-engine" ? "#00E5FF" : "rgba(0,229,255,0.2)",
                      boxShadow: activeId === "aetheric-engine" ? "0 0 12px #00E5FF" : "none",
                      transition: "border-color 0.4s, box-shadow 0.4s, animation-duration 0.4s",
                    }}
                  >
                    <div className="absolute inset-4 rounded-full border-t-2 border-b-2 border-hextech-blue/30" />
                  </div>
                  {/* Core singularity */}
                  <div
                    className="absolute w-16 h-16 rounded-full transition-all duration-500 z-10"
                    style={{
                      transform: "translateZ(65px)",
                      background: active
                        ? `radial-gradient(circle, ${active.color} 0%, ${active.color}55 55%, transparent 100%)`
                        : `radial-gradient(circle, #00E5FF 0%, rgba(0,229,255,0.3) 55%, transparent 100%)`,
                      boxShadow: active
                        ? `0 0 40px ${active.color}, 0 0 80px ${active.shadowColor}`
                        : `0 0 30px #00E5FF, 0 0 60px rgba(0,229,255,0.25)`,
                    }}
                  />
                </motion.div>
              </div>

              {/* Telemetry overlay — top-left */}
              <div className="absolute top-3 left-4 font-mono text-[8px] text-zinc-600 space-y-0.5 pointer-events-none select-none">
                <p>LAT {Math.round(rotX.get())}°</p>
                <p>LON {Math.round(rotY.get())}°</p>
                <p>PWR {(ignitionPhase * 25).toString().padStart(3,"0")}%</p>
              </div>

              {/* Drag hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest animate-pulse">
                  — Drag to rotate —
                </p>
              </div>

              {/* Blueprint corner marks */}
              {[["top-3 left-3","border-t border-l"],["top-3 right-3","border-t border-r"],["bottom-3 left-3","border-b border-l"],["bottom-3 right-3","border-b border-r"]].map(([pos, borders], i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-4 h-4 ${borders} transition-colors duration-500`}
                  style={{ borderColor: active ? active.color + "88" : "rgba(184,115,51,0.3)" }}
                />
              ))}
            </div>

            {/* ── IGNITION STEPPER ─────────────────────── */}
            <div className="w-full max-w-[480px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  Core Ignition Sequence
                </span>
                <button
                  onClick={() => ignite(0)}
                  className="flex items-center gap-1 text-[9px] font-mono text-zinc-600 hover:text-brass uppercase tracking-widest transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Reset
                </button>
              </div>

              {/* Progress track */}
              <div className="relative h-1 bg-zinc-800 rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ backgroundImage: "linear-gradient(90deg, #00E5FF, #B87333)" }}
                  animate={{ width: `${(ignitionPhase / 4) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {IGNITION_STEPS.map(({ phase, label, desc }) => (
                  <div
                    key={phase}
                    onMouseEnter={() => setHoveredStep(phase)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => ignite(phase)}
                    className={`relative p-2 rounded border text-left cursor-pointer transition-all duration-300 ${
                      ignitionPhase >= phase
                        ? "border-hextech-blue/40 bg-hextech-blue/5"
                        : "border-white/5 bg-zinc-900/30 hover:border-brass/30"
                    }`}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mb-1.5 transition-all duration-300"
                      style={{
                        background: ignitionPhase >= phase ? "#00E5FF" : "#27272a",
                        boxShadow: ignitionPhase >= phase ? "0 0 6px #00E5FF" : "none",
                      }}
                    />
                    <p className="text-[8px] font-mono font-bold uppercase text-zinc-300 leading-tight">
                      {`0${phase}`}
                    </p>
                    <p className="text-[8px] font-mono text-zinc-500 mt-0.5 leading-tight line-clamp-1">
                      {label}
                    </p>

                    {/* Tooltip on hover */}
                    <AnimatePresence>
                      {hoveredStep === phase && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 z-30"
                        >
                          <div className="bg-zinc-950 border border-brass/20 rounded p-2 shadow-lg">
                            <p className="text-[9px] font-mono text-zinc-300 leading-snug">{desc}</p>
                          </div>
                          <div className="w-2 h-2 bg-zinc-950 border-r border-b border-brass/20 rotate-45 mx-auto -mt-1" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: LIVE CONSOLE ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-3 flex flex-col gap-5 justify-center"
          >
            {/* Console panel */}
            <div className="bg-zinc-950/80 rounded border border-brass/10 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/60">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
                  GATEWAY-CORE-CONSOLE-01
                </span>
              </div>

              {/* Log lines */}
              <div className="p-4 font-mono text-[10px] space-y-1 min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ignitionPhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-1"
                  >
                    {logs.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className={
                          line.startsWith("$")
                            ? "text-zinc-300"
                            : line.includes("✔")
                            ? "text-emerald-400"
                            : "text-hextech-blue/80"
                        }
                      >
                        {line}
                      </motion.p>
                    ))}
                    {/* Blinking cursor */}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1.1 }}
                      className="inline-block w-1.5 h-3 bg-hextech-blue/70 align-middle"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Status bar */}
              <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-zinc-600 bg-zinc-950/60">
                <span>
                  STATUS:{" "}
                  <span className={ignitionPhase === 4 ? "text-emerald-400" : "text-zinc-500"}>
                    {ignitionPhase === 4 ? "CORE ONLINE" : "STANDBY"}
                  </span>
                </span>
                <span>YIELD: {ignitionPhase * 25}%</span>
              </div>
            </div>

            {/* Active subsystem inspector */}
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="rounded border p-4"
                  style={{
                    borderColor: active.color + "40",
                    background: `linear-gradient(135deg, ${active.color}05 0%, transparent 60%)`,
                  }}
                >
                  <p
                    className="text-[9px] font-mono uppercase tracking-widest mb-1"
                    style={{ color: active.color }}
                  >
                    {active.tag} — Live Telemetry
                  </p>
                  <h4 className="text-sm font-cinzel font-bold text-white uppercase tracking-wide">
                    {active.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-sans mt-2 leading-relaxed">
                    {active.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>{/* end 3-col grid */}

      </div>{/* end max-w container */}

      {/* Bottom blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050506)" }}
      />
    </section>
  );
}
