import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "projects", "gallery", "skills", "contact"];
      const scrollPos = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Overview", href: "#home", index: "00" },
    { id: "experience", label: "Experience", href: "#experience", index: "01" },
    { id: "projects", label: "Blueprints", href: "#projects", index: "02" },
    { id: "gallery", label: "Creative", href: "#gallery", index: "03" },
    { id: "skills", label: "Stack", href: "#skills", index: "04" },
    { id: "contact", label: "Contact", href: "#contact", index: "05" }
  ];

  return (
    <nav
      id="site-nav"
      className="sticky top-0 left-0 z-50 w-full border-b border-white/[0.08] bg-[#070709]/90 backdrop-blur-md transition-all duration-200"
    >
      <div className="flex h-12 items-stretch justify-between w-full">
        {/* Left: Brand Identity Block */}
        <div className="flex min-w-0 items-stretch">
          <a
            href="#home"
            className="flex items-center gap-2.5 border-r border-white/[0.08] px-4 sm:px-6 hover:bg-white/[0.03] transition-colors group"
          >
            {/* Geometric Crosshair Icon */}
            <div className="w-5 h-5 relative flex items-center justify-center">
              <span className="w-2 h-2 bg-hextech-blue group-hover:rotate-45 transition-transform duration-300" />
              <span className="absolute inset-0 border border-white/30 group-hover:border-hextech-blue transition-colors" />
            </div>
            <span className="font-display font-extrabold tracking-[0.16em] text-sm text-white group-hover:text-hextech-blue transition-colors">
              ZERY
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-widest text-zinc-500 border border-white/[0.06] px-1.5 py-0.5">
              SYS // 2026
            </span>
          </a>

          {/* Desktop Navigation Links (Hairline Grid Style) */}
          <div className="hidden lg:flex items-stretch">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`group flex h-full items-center px-3.5 hud-label whitespace-nowrap border-r border-white/[0.08] transition-colors duration-150 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex items-center gap-1.5 px-2 py-0.5 transition-all duration-150 ${
                      isActive
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "group-hover:bg-white group-hover:text-black"
                    }`}
                  >
                    <span className="text-[9px] opacity-60 font-mono">{item.index}</span>
                    <span>{item.label}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Action & Status Group */}
        <div className="flex shrink-0 items-stretch">
          {/* Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-4 border-l border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-zinc-300">AVAILABLE</span>
          </div>

          {/* Social Micro-links */}
          <div className="hidden sm:flex items-stretch">
            <a
              href="https://github.com/Zery-Gallanta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub Profile"
              className="flex w-12 items-center justify-center border-l border-white/[0.08] text-zinc-400 hover:bg-white hover:text-black transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/zery-gallanta-sasongko-249105288/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn Profile"
              className="flex w-12 items-center justify-center border-l border-white/[0.08] text-zinc-400 hover:bg-white hover:text-black transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Primary CTA (Inverted Hover Studio Button) */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap bg-white text-black hover:bg-hextech-blue hover:text-black transition-all px-5 h-full border-l border-white/[0.08]"
          >
            <span>Initiate</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-12 items-center justify-center border-l border-white/[0.08] text-zinc-400 hover:bg-white hover:text-black transition-colors lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Architectural Grid Lines */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#070709]/98 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex flex-col divide-y divide-white/[0.08]">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:bg-white hover:text-black transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-zinc-500 font-mono">{item.index} //</span>
              </a>
            ))}
            <div className="p-4 flex items-center justify-around bg-black/40">
              <a
                href="https://github.com/Zery-Gallanta"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-white"
              >
                GitHub ↗
              </a>
              <span className="text-zinc-700">|</span>
              <a
                href="https://www.linkedin.com/in/zery-gallanta-sasongko-249105288/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-white"
              >
                LinkedIn ↗
              </a>
              <span className="text-zinc-700">|</span>
              <a
                href="https://wa.me/6282266591472"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-white"
              >
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
