import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const SUBSYSTEMS = [
  {
    id: "aetheric",
    num: "01",
    title: "Aetheric Engine",
    subtitle: "Software Engineering",
    color: [0, 229, 255],
    hex: "#00E5FF",
    stats: [{ l: "BUILD RATE", v: "100%" }, { l: "LATENCY", v: "<12ms" }, { l: "STACK", v: "React / Flutter" }],
    desc: "Modular client architectures, pixel-precise UI systems, and reactive state machines across web and native mobile.",
  },
  {
    id: "confinement",
    num: "02",
    title: "Core Confinement",
    subtitle: "AI & Computer Vision",
    color: [16, 185, 129],
    hex: "#10b981",
    stats: [{ l: "mAP", v: "92%" }, { l: "INFERENCE", v: "40ms" }, { l: "ENGINE", v: "YOLOv9 / PyTorch" }],
    desc: "Real-time object detection pipelines, coordinate tracking, and automated pattern recognition at scale.",
  },
  {
    id: "sol",
    num: "03",
    title: "Sol Converter",
    subtitle: "IoT & Embedded Systems",
    color: [184, 115, 51],
    hex: "#B87333",
    stats: [{ l: "AUTOMATION", v: "80%" }, { l: "THERMAL", v: "0K" }, { l: "HARDWARE", v: "ESP32 / MQTT" }],
    desc: "Sensor networks bridged to cloud databases over low-latency MQTT, enabling autonomous eco monitoring.",
  },
];

const PHASE_DATA = [
  { temp: "20°C",    output: "0 GW",   containment: "0%",       status: "STANDBY",    statusColor: "#52525b" },
  { temp: "2.1M K",  output: "0.8 GW", containment: "22%",      status: "IGNITING",   statusColor: "#f59e0b" },
  { temp: "48M K",   output: "1.9 GW", containment: "66%",      status: "CONTAINING", statusColor: "#f59e0b" },
  { temp: "104M K",  output: "3.4 GW", containment: "89%",      status: "EXTRACTING", statusColor: "#f59e0b" },
  { temp: "148M K",  output: "4.2 GW", containment: "100.089%", status: "STABLE",     statusColor: "#00E5FF" },
];

const PHASE_LOGS = {
  0: [">> HEXTECH CORE: STANDBY.", ">> AWAITING IGNITION SEQUENCE..."],
  1: ["$ hextech-core --ignite phase=01", ">> RUNIC EMITTERS: ONLINE", ">> FUEL TEMP: 2.1M K — RISING", ">> PLASMA SEED INITIATED."],
  2: ["$ hextech-core --confinement phase=02", ">> MAGNETIC LATTICE: CHARGED", ">> PLASMA CONTAINED — ZERO WALL CONTACT."],
  3: ["$ hextech-core --extract phase=03", ">> SOL CONVERTER: ONLINE", ">> NEUTRON YIELD: 3.4 GW CAPTURED", ">> EFFICIENCY: 94%"],
  4: ["$ hextech-core --distribute phase=04", ">> GRID RELAY: SYNCHRONISED", ">> ✔  CORE STABLE — ALL SYSTEMS NOMINAL."],
};

/* ═══════════════════════════════════════════════════
   CANVAS HELPERS (module-level for performance)
═══════════════════════════════════════════════════ */
function project3D(x, y, z, rx, ry, cx, cy) {
  const fov = 500;
  const x1 =  x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  const y2 =  y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 =  y * Math.sin(rx) + z1 * Math.cos(rx);
  const sc = fov / (fov + z2);
  return { px: cx + x1 * sc, py: cy + y2 * sc, depth: z2, sc };
}

function drawBackground(ctx, w, h, t, blobs, color) {
  const [cr, cg, cb] = color;
  ctx.fillStyle = "#030508";
  ctx.fillRect(0, 0, w, h);

  // Animated nebula blobs — the organic swirling pattern
  blobs.forEach(b => {
    const bx = (b.x + Math.sin(t * b.sp + b.ph) * 0.07) * w;
    const by = (b.y + Math.cos(t * b.sp * 0.8 + b.ph + 1.2) * 0.07) * h;
    const br = b.r * Math.min(w, h);
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    if (b.isTeal) {
      g.addColorStop(0, `rgba(${cr},${cg},${cb},0.055)`);
      g.addColorStop(0.5, `rgba(0,80,110,0.022)`);
    } else {
      g.addColorStop(0, `rgba(184,115,51,0.038)`);
      g.addColorStop(0.5, `rgba(60,28,8,0.012)`);
    }
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  // Central ambient glow
  const cx = w / 2, cy = h / 2;
  const ag = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.72);
  ag.addColorStop(0,   `rgba(${cr},${cg},${cb},0.055)`);
  ag.addColorStop(0.45,`rgba(${cr},${cg},${cb},0.016)`);
  ag.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = ag;
  ctx.fillRect(0, 0, w, h);
}

function drawStars(ctx, w, h, t, stars) {
  stars.forEach(s => {
    const tw = (Math.sin(t * s.ts + s.tp) + 1) / 2;
    const a = s.a * (0.3 + tw * 0.7);
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,215,255,${a})`;
    ctx.fill();
  });
}

function drawHextechSphere(ctx, cx, cy, r, color, ignP, t) {
  const [cr, cg, cb] = color;

  // Outer atmospheric halo
  const atm = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.55);
  atm.addColorStop(0, "rgba(0,0,0,0)");
  atm.addColorStop(0.55, `rgba(${cr},${cg},${cb},${0.04 + ignP * 0.022})`);
  atm.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath(); ctx.arc(cx, cy, r * 1.55, 0, Math.PI * 2);
  ctx.fillStyle = atm; ctx.fill();

  // Dark sphere body — Fresnel-style: dark center, slightly lit edges
  const body = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.22, r * 0.01, cx, cy, r);
  body.addColorStop(0,    "rgba(16, 22, 38, 1)");
  body.addColorStop(0.42, "rgba(6,  9,  16, 1)");
  body.addColorStop(0.80, "rgba(3,  5,  10, 0.98)");
  body.addColorStop(1,    `rgba(${cr},${cg},${cb},0.06)`);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body; ctx.fill();

  // Hexagonal crystal grid clipped to sphere
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2); ctx.clip();
  const hexSz = r * 0.125;
  const colW = Math.sqrt(3) * hexSz;
  const rowH = hexSz * 1.5;
  const cols = Math.ceil(r / colW) + 2;
  const rows = Math.ceil(r / rowH) + 2;
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},${0.055 + ignP * 0.03})`;
  ctx.lineWidth = 0.5;
  for (let row = -rows; row <= rows; row++) {
    for (let col = -cols; col <= cols; col++) {
      const hx = cx + col * colW + (row % 2 !== 0 ? colW / 2 : 0);
      const hy = cy + row * rowH;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * 60 - 30) * (Math.PI / 180);
        const px = hx + hexSz * Math.cos(a);
        const py = hy + hexSz * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.stroke();
    }
  }
  ctx.restore();

  // Rim lighting — the glowing edge (Fresnel effect)
  const rim = ctx.createRadialGradient(cx, cy, r * 0.78, cx, cy, r);
  rim.addColorStop(0,   `rgba(${cr},${cg},${cb},0)`);
  rim.addColorStop(0.68,`rgba(${cr},${cg},${cb},${0.14 + ignP * 0.08})`);
  rim.addColorStop(1,   `rgba(${cr},${cg},${cb},${0.45 + ignP * 0.15})`);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = rim; ctx.fill();

  // Specular highlight (top-left corner)
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
  const spec = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.24, 0, cx - r * 0.3, cy - r * 0.24, r * 0.42);
  spec.addColorStop(0, `rgba(210,245,255,${0.22 + ignP * 0.08})`);
  spec.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = spec; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.restore();

  // Pulsing inner crystal glow when ignited
  if (ignP > 0) {
    const pulse = (Math.sin(t * 2.4) + 1) / 2;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.5);
    core.addColorStop(0, `rgba(${cr},${cg},${cb},${0.28 + pulse * 0.18 + ignP * 0.1})`);
    core.addColorStop(0.6, `rgba(${cr},${cg},${cb},${0.04 + ignP * 0.025})`);
    core.addColorStop(1, "rgba(0,0,0,0)");
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = core; ctx.fill();
  }
}

function drawRingHalf(ctx, cx, cy, R, tilt, angle, isFront, color, ignP) {
  const [cr, cg, cb] = color;
  const ry = R * tilt;
  const startAngle = isFront ? 0       : Math.PI;
  const endAngle   = isFront ? Math.PI : Math.PI * 2;

  if (isFront) {
    // Layered bloom glow for the bright front arc
    const intensity = 1 + ignP * 0.35;
    const layers = [
      { lw: 32, a: 0.012 * intensity },
      { lw: 20, a: 0.032 * intensity },
      { lw: 12, a: 0.09  * intensity },
      { lw:  7, a: 0.22  * intensity },
      { lw:  3, a: 0.55  * intensity },
      { lw:  1.2, a: 0.88 * intensity },
    ];
    layers.forEach(({ lw, a }) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, R, ry, angle, startAngle, endAngle);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${Math.min(a, 1)})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    });
    // White-hot core line
    ctx.beginPath();
    ctx.ellipse(cx, cy, R, ry, angle, startAngle, endAngle);
    ctx.strokeStyle = `rgba(255,255,255,${0.38 + ignP * 0.08})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    // Brass outer accent edge
    ctx.beginPath();
    ctx.ellipse(cx, cy, R + 5, ry + 5 * tilt, angle, startAngle, endAngle);
    ctx.strokeStyle = `rgba(184,115,51,${0.10 * intensity})`;
    ctx.lineWidth = 6;
    ctx.stroke();
  } else {
    // Dim back arc (behind sphere)
    ctx.beginPath();
    ctx.ellipse(cx, cy, R, ry, angle, startAngle, endAngle);
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.065)`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawParticleWithTrail(ctx, p, px, py, depth, sc, rx, ry, cx, cy) {
  const [cr, cg, cb] = p.col;
  const dfrac = Math.max(0, Math.min(1, (200 - depth) / 400));
  const alpha = 0.18 + dfrac * 0.78;
  const radius = Math.max(0.4, p.sz * sc * 0.85);

  // Trail
  if (p.trail.length > 1) {
    for (let i = 1; i < p.trail.length; i++) {
      const t0 = p.trail[i - 1], t1 = p.trail[i];
      const p0 = project3D(t0.x, t0.y, t0.z, rx, ry, cx, cy);
      const p1 = project3D(t1.x, t1.y, t1.z, rx, ry, cx, cy);
      const frac = i / p.trail.length;
      ctx.beginPath();
      ctx.moveTo(p0.px, p0.py);
      ctx.lineTo(p1.px, p1.py);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * frac * 0.38})`;
      ctx.lineWidth = radius * frac * 0.65;
      ctx.stroke();
    }
  }

  // Dot with glow
  ctx.beginPath();
  ctx.arc(px, py, radius, 0, Math.PI * 2);
  ctx.shadowColor = `rgba(${cr},${cg},${cb},${alpha * 0.85})`;
  ctx.shadowBlur = radius * 9;
  ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
  ctx.fill();
  ctx.shadowBlur = 0;
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function InteractiveCore() {
  const canvasRef   = useRef(null);
  const mouseRef    = useRef({ x: 0.5, y: 0.5 });
  const rotRef      = useRef({ x: -12, y: 20 });
  const isDragRef   = useRef(false);
  const lastPosRef  = useRef({ x: 0, y: 0 });
  const rafRef      = useRef(null);
  const t0Ref       = useRef(performance.now());
  const ringAngle   = useRef(0);
  const activeIdRef = useRef(null);
  const ignRef      = useRef(0);

  const starsRef    = useRef([]);
  const blobsRef    = useRef([]);
  const partsRef    = useRef([]);
  const runicsRef   = useRef([]);

  const [activeId,      setActiveId]      = useState(null);
  const [ignitionPhase, setIgnitionPhase] = useState(0);
  const [logs,          setLogs]          = useState(PHASE_LOGS[0]);
  const [cursor,        setCursor]        = useState("default");

  // Keep refs in sync with state
  useEffect(() => { activeIdRef.current = activeId; },      [activeId]);
  useEffect(() => { ignRef.current = ignitionPhase; },      [ignitionPhase]);

  // ── Initialise particle systems ─────────────────────
  useEffect(() => {
    starsRef.current = Array.from({ length: 260 }, () => ({
      x:  Math.random(),
      y:  Math.random(),
      sz: 0.3 + Math.random() * 1.4,
      a:  0.18 + Math.random() * 0.75,
      ts: 0.35 + Math.random() * 1.9,
      tp: Math.random() * Math.PI * 2,
    }));

    blobsRef.current = Array.from({ length: 22 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     0.05 + Math.random() * 0.22,
      ph:    Math.random() * Math.PI * 2,
      sp:    0.00004 + Math.random() * 0.00011,
      isTeal: Math.random() > 0.38,
    }));

    partsRef.current = Array.from({ length: 115 }, () => {
      const rc = Math.random();
      return {
        theta: Math.random() * Math.PI * 2,
        phi:   Math.acos(2 * Math.random() - 1),
        r:     118 + Math.random() * 92,
        spd:   (0.003 + Math.random() * 0.007) * (Math.random() > 0.5 ? 1 : -1),
        sz:    0.6 + Math.random() * 1.9,
        trail: [],
        maxT:  8 + Math.floor(Math.random() * 16),
        col:   rc < 0.54 ? [0, 229, 255] : rc < 0.82 ? [184, 115, 51] : [150, 60, 220],
      };
    });

    const RUNE_GLYPHS = ["ᚨ", "ᛟ", "ᚲ", "ᚦ", "ᚱ", "ᛇ", "ᛏ", "ᛋ"];
    runicsRef.current = Array.from({ length: 8 }, (_, i) => ({
      theta: (i / 8) * Math.PI * 2 + Math.random() * 0.9,
      phi:   Math.PI / 3 + Math.random() * Math.PI / 3,
      r:     188 + Math.random() * 55,
      glyph: RUNE_GLYPHS[i],
      a:     0.11 + Math.random() * 0.22,
      spd:   (0.0007 + Math.random() * 0.0014) * (Math.random() > 0.5 ? 1 : -1),
      sz:    10 + Math.random() * 8,
    }));
  }, []);

  // ── Canvas render loop ───────────────────────────────
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

    const render = () => {
      rafRef.current = requestAnimationFrame(render);
      const t  = (performance.now() - t0Ref.current) * 0.001;
      const w  = canvas.width, h = canvas.height;
      const cx = w / 2, cy = h / 2;
      const ignP = ignRef.current;
      const speedMult = 1 + ignP * 0.6;

      // Smooth parallax rotation toward mouse (when not dragging)
      if (!isDragRef.current) {
        const tx = -15 + (mouseRef.current.y - 0.5) * 28;
        const ty =  20 + (mouseRef.current.x - 0.5) * 55;
        rotRef.current.x += (tx - rotRef.current.x) * 0.022;
        rotRef.current.y += (ty - rotRef.current.y) * 0.022;
      }

      const rx = rotRef.current.x * (Math.PI / 180);
      const ry = rotRef.current.y * (Math.PI / 180);

      ringAngle.current += 0.0048 * speedMult;
      const rAngle = ringAngle.current;

      // Active subsystem color
      const activeSys = SUBSYSTEMS.find(s => s.id === activeIdRef.current);
      const color = activeSys ? activeSys.color : [0, 229, 255];
      const [cr, cg, cb] = color;

      // Adaptive sphere size
      const sphereR = Math.min(w, h) * 0.21 + ignP * 5;
      const ringR   = sphereR * 1.78;
      const TILT    = 0.50; // cos(60°) — how flat the ring appears

      // ─── 1. BACKGROUND + NEBULA ──────────────────
      drawBackground(ctx, w, h, t, blobsRef.current, color);

      // ─── 2. STARFIELD ────────────────────────────
      drawStars(ctx, w, h, t, starsRef.current);

      // ─── 3. UPDATE PARTICLES ─────────────────────
      partsRef.current.forEach(p => {
        p.theta += p.spd * speedMult;
        const x3 = p.r * Math.sin(p.phi) * Math.cos(p.theta);
        const y3 = p.r * Math.cos(p.phi);
        const z3 = p.r * Math.sin(p.phi) * Math.sin(p.theta);
        p.trail.push({ x: x3, y: y3, z: z3 });
        if (p.trail.length > p.maxT) p.trail.shift();
      });

      // Collect and sort projected particles (back-to-front)
      const projected = partsRef.current
        .map(p => {
          const pos = p.trail[p.trail.length - 1];
          if (!pos) return null;
          const pr = project3D(pos.x, pos.y, pos.z, rx, ry, cx, cy);
          return { p, ...pr };
        })
        .filter(Boolean)
        .sort((a, b) => b.depth - a.depth);

      const backParts  = projected.filter(pp => pp.depth > 40);
      const frontParts = projected.filter(pp => pp.depth <= 40);

      // ─── 4. BACK PARTICLES ───────────────────────
      backParts.forEach(({ p, px, py, depth, sc }) => {
        drawParticleWithTrail(ctx, p, px, py, depth, sc, rx, ry, cx, cy);
      });

      // ─── 5. BACK RING (behind sphere) ────────────
      drawRingHalf(ctx, cx, cy, ringR, TILT, rAngle, false, color, ignP);

      // ─── 6. SPHERE ───────────────────────────────
      drawHextechSphere(ctx, cx, cy, sphereR, color, ignP, t);

      // ─── 7. FRONT RING (in front of sphere) ──────
      drawRingHalf(ctx, cx, cy, ringR, TILT, rAngle, true, color, ignP);

      // ─── 8. FRONT PARTICLES ──────────────────────
      frontParts.forEach(({ p, px, py, depth, sc }) => {
        drawParticleWithTrail(ctx, p, px, py, depth, sc, rx, ry, cx, cy);
      });

      // ─── 9. FLOATING RUNIC GLYPHS ────────────────
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      runicsRef.current.forEach(rune => {
        rune.theta += rune.spd * speedMult;
        const x3 = rune.r * Math.sin(rune.phi) * Math.cos(rune.theta);
        const y3 = rune.r * Math.cos(rune.phi);
        const z3 = rune.r * Math.sin(rune.phi) * Math.sin(rune.theta);
        const { px, py, sc } = project3D(x3, y3, z3, rx, ry, cx, cy);
        const size = Math.max(7, rune.sz * sc * 0.95);
        const a = rune.a * Math.max(0.1, sc);
        ctx.font = `${size}px "Courier New", monospace`;
        ctx.shadowColor = `rgba(${cr},${cg},${cb},${a * 0.55})`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.fillText(rune.glyph, px, py);
      });
      ctx.shadowBlur = 0;

      // ─── 10. IGNITION ENERGY BURST ───────────────
      if (ignP > 0) {
        const pulse = (Math.sin(t * 2.3) + 1) / 2;
        const burst = ctx.createRadialGradient(cx, cy, sphereR * 0.45, cx, cy, sphereR * 2.8 + ignP * 25);
        burst.addColorStop(0, `rgba(${cr},${cg},${cb},${ignP * 0.032 + pulse * 0.016})`);
        burst.addColorStop(0.5, `rgba(${cr},${cg},${cb},${ignP * 0.008})`);
        burst.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = burst;
        ctx.fillRect(0, 0, w, h);
      }
    };

    rafRef.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  // ── Mouse / Touch handlers ───────────────────────────
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    };
    if (isDragRef.current) {
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      rotRef.current.y += dx * 0.38;
      rotRef.current.x  = Math.max(-55, Math.min(55, rotRef.current.x - dy * 0.38));
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const onMouseDown = useCallback((e) => {
    isDragRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setCursor("grabbing");
  }, []);

  const onMouseUp   = useCallback(() => { isDragRef.current = false; setCursor("default"); }, []);

  const onTouchStart = useCallback((e) => {
    isDragRef.current = true;
    lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect  = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (touch.clientX - rect.left) / rect.width,
      y: (touch.clientY - rect.top)  / rect.height,
    };
    if (isDragRef.current) {
      const dx = touch.clientX - lastPosRef.current.x;
      const dy = touch.clientY - lastPosRef.current.y;
      rotRef.current.y += dx * 0.38;
      rotRef.current.x  = Math.max(-55, Math.min(55, rotRef.current.x - dy * 0.38));
      lastPosRef.current = { x: touch.clientX, y: touch.clientY };
    }
  }, []);

  // ── Ignition ─────────────────────────────────────────
  const ignite = (phase) => {
    if (phase !== 0 && phase <= ignitionPhase) return;
    setIgnitionPhase(phase);
    ignRef.current = phase;
    setLogs(PHASE_LOGS[phase]);
  };

  const phaseData = PHASE_DATA[ignitionPhase];
  const activeSys = SUBSYSTEMS.find(s => s.id === activeId);

  /* ══════════════════════════════════════════════
     JSX — HUD Overlays on top of full-screen canvas
  ══════════════════════════════════════════════ */
  return (
    <section
      id="hextech-core"
      className="relative overflow-hidden select-none"
      style={{ minHeight: "100vh", cursor }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      {/* ── Canvas fills entire section ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* ── Top gradient bleed upward ── */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, #050506 0%, transparent 100%)" }}
      />

      {/* ── HUD container ── */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "100vh" }}>

        {/* TOP BAR */}
        <div className="flex items-start justify-between px-8 pt-6 pb-0">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{
                color: "#00E5FF",
                border: "1px solid rgba(0,229,255,0.28)",
                padding: "4px 12px",
                background: "rgba(0,229,255,0.04)",
                backdropFilter: "blur(8px)",
                display: "inline-block",
              }}
            >
              [ SYS // HEXTECH CORE ONLINE ]
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-right font-mono text-[9px] leading-relaxed"
            style={{ color: "#3f3f46" }}
          >
            <div>LAT 55.8082 // LON 37.6017</div>
            <div>REACTOR SITE — PILTOVER-1</div>
          </motion.div>
        </div>

        {/* MIDDLE CONTENT — grows to push telemetry to bottom */}
        <div className="flex-1 flex items-center justify-between px-8 pointer-events-none">

          {/* LEFT: heading + subsystem cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-[270px] pointer-events-auto"
          >
            <p
              className="font-mono text-[9px] uppercase tracking-[0.22em] mb-3"
              style={{ color: "#B87333" }}
            >
              02 // Engineered Core
            </p>
            <h2
              className="font-cinzel font-bold uppercase leading-tight mb-8"
              style={{ fontSize: "clamp(26px, 2.8vw, 44px)", letterSpacing: "0.08em" }}
            >
              <span className="text-white">Aetheric</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #00E5FF 0%, #B87333 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hextech Core
              </span>
            </h2>

            {/* Subsystem cards */}
            <div className="space-y-2">
              {SUBSYSTEMS.map((sys, i) => (
                <motion.div
                  key={sys.id}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  onMouseEnter={() => setActiveId(sys.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="p-3 rounded border transition-all duration-300 cursor-default"
                  style={{
                    background: activeId === sys.id
                      ? `${sys.hex}0a`
                      : "rgba(5,8,14,0.7)",
                    border: `1px solid ${activeId === sys.id ? sys.hex + "50" : "rgba(255,255,255,0.06)"}`,
                    backdropFilter: "blur(12px)",
                    boxShadow: activeId === sys.id
                      ? `0 0 22px ${sys.hex}22, inset 0 0 12px ${sys.hex}06`
                      : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="font-mono text-[8px] uppercase tracking-[0.14em] mb-1 transition-colors duration-300"
                        style={{ color: activeId === sys.id ? sys.hex : "#3f3f46" }}
                      >
                        {sys.num} // {sys.subtitle}
                      </p>
                      <p
                        className="font-cinzel text-[12px] font-semibold uppercase tracking-wider transition-colors duration-300"
                        style={{ color: activeId === sys.id ? sys.hex : "#d4d4d8" }}
                      >
                        {sys.title}
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-300 ml-3 flex-shrink-0"
                      style={{
                        background: activeId === sys.id ? sys.hex : "#27272a",
                        boxShadow: activeId === sys.id ? `0 0 10px ${sys.hex}` : "none",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: terminal + inspector + ignition */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="max-w-[280px] flex flex-col gap-3 pointer-events-auto"
          >
            {/* Terminal console */}
            <div
              className="rounded border overflow-hidden"
              style={{
                background: "rgba(3,5,8,0.88)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(18px)",
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-1.5 px-4 py-2.5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.45)" }}
              >
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-zinc-700" />
                ))}
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-600 ml-2">
                  HEXTECH-CONSOLE-01
                </span>
              </div>
              {/* Logs */}
              <div className="p-4" style={{ minHeight: "108px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ignitionPhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-0.5"
                  >
                    {logs.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.22 }}
                        className="font-mono leading-relaxed m-0"
                        style={{
                          fontSize: "9px",
                          color: line.startsWith("$") ? "#d4d4d8"
                               : line.includes("✔")   ? "#10b981"
                               : "rgba(0,229,255,0.75)",
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1.05 }}
                      style={{
                        display: "inline-block",
                        width: "6px", height: "10px",
                        background: "rgba(0,229,255,0.62)",
                        verticalAlign: "middle",
                        marginTop: "2px",
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Active subsystem inspector panel */}
            <AnimatePresence mode="wait">
              {activeSys && (
                <motion.div
                  key={activeSys.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded border p-3.5"
                  style={{
                    background: `linear-gradient(135deg, ${activeSys.hex}10 0%, rgba(3,5,8,0.92) 60%)`,
                    border: `1px solid ${activeSys.hex}40`,
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <p
                    className="font-mono text-[8px] uppercase tracking-[0.16em] mb-1.5"
                    style={{ color: activeSys.hex }}
                  >
                    {activeSys.num} // Live Telemetry
                  </p>
                  <p
                    className="font-cinzel text-[12px] font-semibold uppercase tracking-wide mb-2.5"
                    style={{ color: "#f4f4f5" }}
                  >
                    {activeSys.title}
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {activeSys.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="rounded p-1.5 border"
                        style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <p className="font-mono text-[7px] uppercase tracking-wider text-zinc-600 m-0">{stat.l}</p>
                        <p
                          className="font-mono text-[10px] font-bold m-0 mt-0.5"
                          style={{ color: activeSys.hex }}
                        >
                          {stat.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ignition button */}
            {ignitionPhase < 4 ? (
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                onClick={() => ignite(ignitionPhase + 1)}
                className="w-full rounded font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300"
                style={{
                  padding: "12px 18px",
                  border: "1px solid rgba(0,229,255,0.38)",
                  background: "rgba(0,229,255,0.07)",
                  color: "#00E5FF",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(0,229,255,0.14)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(0,229,255,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(0,229,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {ignitionPhase === 0 ? "Initialize Core" : `Continue → Phase 0${ignitionPhase + 1}`}
              </motion.button>
            ) : (
              <div className="flex gap-2">
                <div
                  className="flex-1 rounded font-mono text-[10px] uppercase tracking-[0.18em] text-center"
                  style={{
                    padding: "12px 10px",
                    border: "1px solid rgba(0,229,255,0.35)",
                    background: "rgba(0,229,255,0.05)",
                    color: "#00E5FF",
                  }}
                >
                  Core Stable ✔
                </div>
                <button
                  onClick={() => ignite(0)}
                  className="rounded font-mono text-[9px] text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                  style={{
                    padding: "10px 14px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(0,0,0,0.5)",
                    cursor: "pointer",
                  }}
                >
                  ↺ Reset
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* BOTTOM TELEMETRY BAR — exactly like Helios Drive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-end gap-12 px-10 py-7 pointer-events-none"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            background: "linear-gradient(to top, rgba(3,5,8,0.85) 0%, transparent 100%)",
          }}
        >
          {[
            { label: "REACTOR TEMP", value: phaseData.temp },
            { label: "NET OUTPUT",   value: phaseData.output },
            { label: "CONTAINMENT",  value: phaseData.containment },
          ].map(item => (
            <motion.div key={item.label} layout transition={{ duration: 0.4 }}>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600 mb-1">
                {item.label}
              </p>
              <p
                className="font-cinzel font-bold text-zinc-200"
                style={{ fontSize: "clamp(16px, 1.8vw, 24px)", letterSpacing: "0.04em" }}
              >
                {item.value}
              </p>
            </motion.div>
          ))}

          {/* Core status — glows when stable */}
          <motion.div layout transition={{ duration: 0.4 }}>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600 mb-1">
              CORE STATUS
            </p>
            <p
              className="font-cinzel font-bold transition-all duration-600"
              style={{
                fontSize: "clamp(16px, 1.8vw, 24px)",
                letterSpacing: "0.06em",
                color: phaseData.statusColor,
                textShadow: ignitionPhase === 4
                  ? `0 0 24px ${phaseData.statusColor}, 0 0 48px ${phaseData.statusColor}55`
                  : "none",
              }}
            >
              {phaseData.status}
            </p>
          </motion.div>

          {/* Drag hint (far right) */}
          <div className="ml-auto text-right">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-700">
              Drag to rotate
            </p>
            <p className="font-mono text-[8px] tracking-[0.08em] text-zinc-700 mt-0.5">
              Hover subsystem to inspect
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom gradient bleed into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, #050506 0%, transparent 100%)" }}
      />
    </section>
  );
}
