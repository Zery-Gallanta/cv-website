import React, { useEffect, useRef } from "react";

/* ── Drifting micro-particle canvas ──────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle pool — two layers: tiny drifting stars + medium energy nodes
    const makeParticle = (type) => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      if (type === "star") return {
        x, y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        r: 0.4 + Math.random() * 0.9,
        alpha: 0.12 + Math.random() * 0.45,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
        color: Math.random() > 0.72 ? [184, 115, 51] : [0, 229, 255],
        type: "star",
      };
      return {  // energy node
        x, y,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.05,
        r: 1.2 + Math.random() * 1.6,
        alpha: 0.06 + Math.random() * 0.12,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.2 + Math.random() * 0.6,
        color: Math.random() > 0.5 ? [0, 229, 255] : [184, 115, 51],
        type: "node",
      };
    };

    const particles = [
      ...Array.from({ length: 180 }, () => makeParticle("star")),
      ...Array.from({ length: 30  }, () => makeParticle("node")),
    ];

    let raf;
    let t = 0;

    const render = () => {
      raf = requestAnimationFrame(render);
      t += 0.016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        if (p.y < -4) p.y = canvas.height + 4;
        if (p.y > canvas.height + 4) p.y = -4;

        const tw = (Math.sin(t * p.twinkleSpeed + p.twinkle) + 1) / 2;
        const a  = p.alpha * (0.35 + tw * 0.65);
        const [r, g, b] = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        if (p.type === "node") {
          ctx.shadowColor = `rgba(${r},${g},${b},${a * 0.8})`;
          ctx.shadowBlur  = p.r * 6;
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-20 w-full h-full bg-[#050506] overflow-hidden">

      {/* Film grain noise texture */}
      <div className="film-grain" />

      {/* Drifting micro-particles (canvas layer) */}
      <ParticleCanvas />

      {/* Blueprint grid — fine lines */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.38]" />

      {/* Bronze tech dot pattern */}
      <div className="absolute inset-0 tech-grid opacity-40" />

      {/* Subtle diagonal slash lines — hex industrial feel */}
      <div className="absolute inset-0 diagonal-lines opacity-[0.022]" />

      {/* ── Ambient glow orbs ───────────────────────────────────────── */}

      {/* Top-left: hextech blue — slow drift */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top:    "-8%",
          left:   "-6%",
          width:  "52vw",
          height: "52vw",
          background: "radial-gradient(circle, rgba(0,229,255,0.055) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-a 18s ease-in-out infinite",
        }}
      />

      {/* Bottom-right: brass warmth */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "5%",
          right:  "-8%",
          width:  "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(184,115,51,0.045) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "orb-drift-b 22s ease-in-out infinite",
        }}
      />

      {/* Center subtle pulse — hextech */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top:    "38%",
          left:   "32%",
          width:  "36vw",
          height: "36vw",
          background: "radial-gradient(circle, rgba(0,229,255,0.022) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-c 14s ease-in-out infinite",
        }}
      />

      {/* Top-right accent — small brass spark */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top:   "12%",
          right: "10%",
          width:  "20vw",
          height: "20vw",
          background: "radial-gradient(circle, rgba(184,115,51,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb-drift-b 26s ease-in-out infinite reverse",
        }}
      />

      {/* Bottom-left cool node */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "18%",
          left:   "5%",
          width:  "22vw",
          height: "22vw",
          background: "radial-gradient(circle, rgba(0,229,255,0.025) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "orb-drift-a 20s ease-in-out infinite reverse",
        }}
      />

      {/* Vignette — darken edges for focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 85% at 50% 40%, transparent 40%, rgba(3,4,6,0.65) 100%)",
        }}
      />

      {/* Horizontal scan line — very subtle, barely visible */}
      <div className="absolute inset-0 pointer-events-none scan-lines opacity-[0.018]" />
    </div>
  );
}
