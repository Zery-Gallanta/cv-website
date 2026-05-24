import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Cpu, Smartphone, Code, ArrowUpRight } from "lucide-react";

const GithubIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  const socialLinks = [
    { icon: <GithubIcon className="w-4.5 h-4.5" />, href: "https://github.com/Zery-Gallanta", label: "GitHub" },
    { icon: <LinkedinIcon className="w-4.5 h-4.5" />, href: "https://www.linkedin.com/in/zery-gallanta-sasongko-249105288/", label: "LinkedIn" },
    { icon: <Mail className="w-4.5 h-4.5" />, href: "mailto:zery.sasongko@gmail.com", label: "Email" },
    { icon: <Phone className="w-4.5 h-4.5" />, href: "https://wa.me/6282266591472", label: "WhatsApp" },
  ];

  const badgeItems = [
    { icon: <Code className="w-3.5 h-3.5 text-hextech-blue" />, label: "Software Engineer" },
    { icon: <Smartphone className="w-3.5 h-3.5 text-brass" />, label: "Mobile Developer" },
    { icon: <Cpu className="w-3.5 h-3.5 text-hextech-blue" />, label: "IoT Integrator" },
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex flex-col justify-center items-center px-6 pt-28 pb-16 text-center overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full flex flex-col items-center space-y-8"
      >
        {/* Profile Photo Node */}
        <motion.div
          variants={itemVariants}
          className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1.5 border border-brass/35 bg-zinc-950/80 backdrop-blur-sm shadow-[0_0_20px_rgba(184,115,51,0.15)] group/profile"
        >
          <div className="absolute inset-0.5 rounded-full border border-dashed border-brass/30 animate-spin" style={{ animationDuration: "35s" }} />
          <div className="w-full h-full rounded-full overflow-hidden relative border border-brass/10 z-10">
            <img
              src="/profile.jpg"
              alt="Zery Gallanta Sasongko"
              className="w-full h-full object-cover object-top group-hover/profile:scale-105 transition-transform duration-500 filter brightness-[0.88] contrast-[1.05]"
            />
          </div>
        </motion.div>

        {/* Tactical Badge Hub (Brass frames, JetBrains Mono) */}
        <motion.div 
          variants={itemVariants} 
          className="flex flex-wrap justify-center gap-3"
        >
          {badgeItems.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded bg-zinc-950/70 border border-brass/30 backdrop-blur-sm text-[10px] md:text-xs font-mono font-medium uppercase tracking-widest text-zinc-300 shadow-[inset_0_0_8px_rgba(184,115,51,0.05)]"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Cinematic Title (Cinzel typography, metallic/brass gradient) */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-widest font-cinzel uppercase leading-none select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Zery Gallanta
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hextech-blue via-cyan-300 to-brass drop-shadow-[0_0_15px_rgba(0,229,255,0.25)]">
              Sasongko
            </span>
          </h1>
        </motion.div>

        {/* Industrial Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-400 font-sans text-base sm:text-lg md:text-xl max-w-2xl font-light tracking-wide leading-relaxed"
        >
          Engineering end-to-end digital solutions and immersive visual experiences.
        </motion.p>

        {/* Action Triggers */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:w-auto mt-4"
        >
          <a
            href="https://github.com/Zery-Gallanta"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-hextech-blue to-brass text-zinc-950 shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(184,115,51,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 border border-white/10"
          >
            <span>Connect & View GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-950" />
          </a>

          <a
            href="#projects"
            className="px-8 py-3.5 rounded text-xs font-mono font-bold uppercase tracking-widest border border-brass/40 hover:border-hextech-blue/50 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white transition-all duration-300 flex items-center justify-center shadow-md"
          >
            Explore Blueprints
          </a>
        </motion.div>

        {/* Hextech Social Dock */}
        <motion.div
          variants={itemVariants}
          className="hextech-card hextech-border p-2 rounded-xl flex items-center space-x-3.5 bg-zinc-950/65 shadow-2xl relative z-10"
        >
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded bg-zinc-900/60 border border-brass/25 hover:border-hextech-blue/40 hover:bg-hextech-blue/5 text-zinc-400 hover:text-hextech-blue transition-all duration-200 flex items-center justify-center shadow-lg"
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Runic divider line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[1px] bg-gradient-to-r from-transparent via-brass/20 to-transparent" />
    </section>
  );
}
