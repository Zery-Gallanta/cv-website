import React, { useState, useEffect } from "react";

const sections = [
  { id: "home", label: "OVERVIEW", short: "00" },
  { id: "experience", label: "EXPERIENCE", short: "01" },
  { id: "projects", label: "BLUEPRINTS", short: "02" },
  { id: "gallery", label: "VISUALS", short: "03" },
  { id: "skills", label: "STACK", short: "04" },
  { id: "contact", label: "CONTACT", short: "05" }
];

export default function ScrollRail() {
  const [activeId, setActiveId] = useState("home");
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollPercent(percent);

      // Determine active section based on scroll offset
      const triggerOffset = window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerOffset) {
            setActiveId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 48;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Section Navigator"
      className="hidden lg:flex fixed top-12 right-0 bottom-0 w-32 xl:w-40 border-l border-white/[0.08] bg-[#070709]/80 backdrop-blur-md z-30 flex-col justify-between p-6 select-none pointer-events-auto"
    >
      {/* Top Header of the Rail */}
      <div className="border-b border-white/[0.06] pb-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 block">
          INDEX //
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-hextech-blue font-semibold">
          {Math.round(scrollPercent)}% DEPTH
        </span>
      </div>

      {/* Vertical Section Item Stack (ArtCraft exact right-rail) */}
      <nav className="flex flex-col space-y-6 my-auto">
        {sections.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="group text-right flex flex-col items-end transition-all duration-200 cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2">
                {/* Active Indicator Notch */}
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-hextech-blue shadow-[0_0_8px_#00E5FF] animate-pulse" />
                )}
                
                {/* Section Title (ArtCraft Large bold active vs small muted inactive) */}
                <span
                  className={`font-display tracking-[0.14em] uppercase transition-all duration-200 ${
                    isActive
                      ? "text-white font-black text-sm xl:text-base translate-x-0"
                      : "text-zinc-600 hover:text-zinc-300 font-semibold text-[11px] xl:text-xs"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Sub-label short index */}
              <span
                className={`font-mono text-[9px] tracking-widest transition-opacity duration-200 ${
                  isActive ? "text-hextech-blue opacity-100" : "text-zinc-700 opacity-60 group-hover:opacity-100"
                }`}
              >
                {item.short} //
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Progress Bar Gauge */}
      <div className="border-t border-white/[0.06] pt-3 flex flex-col gap-1.5">
        <div className="w-full h-[2px] bg-white/[0.08] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-hextech-blue to-white transition-all duration-75"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[9px] text-zinc-600 tracking-wider">
          <span>00</span>
          <span>05</span>
        </div>
      </div>
    </aside>
  );
}
