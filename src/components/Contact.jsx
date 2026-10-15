import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, Phone, ArrowUpRight, Check, Send, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Precision Corner Crosshairs (+) */}
      <div className="absolute top-8 left-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute top-8 right-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>

      {/* Section Header */}
      <div className="mb-14 text-left border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue" />
          <span>05 // DIRECT GATEWAYS</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
          Initiate <span className="font-serif italic font-normal text-zinc-300">Collaboration</span> & Inquiries
        </h2>
        <p className="text-zinc-400 font-sans mt-2.5 text-sm md:text-base max-w-2xl leading-relaxed">
          Open for software engineering roles, mobile development contracts, and autonomous AI system integration.
        </p>
      </div>

      {/* Terminal Block (ArtCraft Studio Workstation Style) */}
      <div className="max-w-4xl mx-auto border border-white/[0.08] bg-[#0c0c0e]/90 overflow-hidden relative">
        {/* Corner Crosshairs */}
        <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-700 select-none">+</span>
        <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 select-none">+</span>

        {/* Terminal Header */}
        <div className="px-5 py-3 border-b border-white/[0.08] bg-black/60 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2.5 text-zinc-400">
            <Terminal className="w-4 h-4 text-hextech-blue" />
            <span className="uppercase tracking-widest text-zinc-300">GATEWAY // ZGS-STUDIO-NODE</span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">SECURE BUFFER READY</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 md:p-8 space-y-6 font-mono text-sm">
          {/* Diagnostic Log */}
          <div className="space-y-1 text-zinc-500 text-xs border-b border-white/[0.06] pb-4">
            <p className="text-zinc-400">guest@zery-portfolio:~$ <span className="text-white">init --handshake</span></p>
            <p className="text-hextech-blue">✔ Routing established to primary endpoints</p>
            <p className="text-zinc-400">✔ SMTP Gateway // WhatsApp Protocol active</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Quick Direct Links */}
            <div className="space-y-4">
              <h3 className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest font-semibold mb-3">
                DIRECT CHANNELS
              </h3>
              
              <a
                href="mailto:zery.sasongko@gmail.com"
                className="flex items-center justify-between p-4 border border-white/[0.08] bg-black/40 hover:border-white/30 hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-400 group-hover:text-hextech-blue transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-wider">SMTP INBOX</span>
                    <span className="font-mono text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      zery.sasongko@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://wa.me/6282266591472"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-white/[0.08] bg-black/40 hover:border-white/30 hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 border border-white/[0.08] bg-black/60 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-wider">SECURE INSTANT CHAT</span>
                    <span className="font-mono text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      +62 822-6659-1472
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <div className="border border-white/[0.06] bg-black/30 p-3 font-mono text-[10px] text-zinc-500 leading-relaxed">
                Response SLA: Typically within 2 to 6 hours during UTC+7 working windows.
              </div>
            </div>

            {/* Inverted Interactive Message Form */}
            <div>
              <h3 className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest font-semibold mb-3">
                TRANSMIT MESSAGE
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3 font-sans">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your email address (e.g. name@company.com)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/[0.08] font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows="4"
                    required
                    placeholder="Project specs, architectural needs, or role opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/[0.08] font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                    isSubmitted
                      ? "bg-emerald-500 text-black"
                      : "bg-white text-black hover:bg-hextech-blue hover:text-black"
                  }`}
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING PACKET...</span>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>PACKET TRANSMITTED</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT SIGNAL</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Studio Footer */}
      <footer className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-mono gap-4">
        <div>
          <span>© 2026 ZERY GALLANTA SASONGKO. ARCHITECTED AS AN AI-NATIVE PORTFOLIO.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ALL SYSTEMS NOMINAL</span>
          <span className="text-zinc-700">|</span>
          <a href="#home" className="hover:text-white transition-colors">TOP ↑</a>
        </div>
      </footer>
    </section>
  );
}
