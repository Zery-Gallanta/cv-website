import React from "react";

export default function GridBackground() {
  return (
    <div className="absolute inset-0 -z-20 w-full h-full bg-[#050506] overflow-hidden">
      {/* Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Blueprint Grid Lines (cyan layout) */}
      <div className="absolute inset-0 blueprint-grid opacity-40" />

      {/* Repeating Tech Dot Grid (bronze layouts) */}
      <div className="absolute inset-0 tech-grid opacity-45" />

      {/* Grid masking to soften the lines toward margins for legibility */}
      <div 
        className="absolute inset-0 bg-[#050506] pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, transparent 25%, #050506 95%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent 25%, #050506 95%)",
          opacity: 0.8
        }}
      />

      {/* Ambient Pulsing Glow Fields */}
      {/* Hextech Blue Magic Field */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-hextech-blue/5 blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />
      
      {/* Antique Brass Mechanical Warmth */}
      <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brass/[0.04] blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
      
      {/* Minor center cyan node */}
      <div className="absolute top-[40%] left-[35%] w-[30vw] h-[30vw] rounded-full bg-hextech-blue/[0.02] blur-[100px] pointer-events-none" />
    </div>
  );
}
