import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, Phone, ArrowUpRight, Check, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow Overlay */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-brass/3 blur-[150px] pointer-events-none" />

      {/* Section Title */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-brass/25 bg-zinc-950/40 text-[10px] font-mono font-medium text-brass uppercase tracking-widest mb-4">
          <span>05 // Communication</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-cinzel uppercase text-white tracking-widest">
          Initiate Collaboration
        </h2>
        <p className="text-zinc-400 font-sans mt-3 text-sm md:text-base max-w-xl mx-auto">
          Need custom software systems or production-grade visual assets? Ping my terminal gateways below.
        </p>
      </div>

      {/* Terminal Block (Hextech-styled) */}
      <div className="max-w-3xl mx-auto hextech-card hextech-border bg-zinc-950/70 overflow-hidden shadow-2xl relative">
        {/* Terminal Header */}
        <div className="px-5 py-3.5 bg-zinc-900 border-b border-brass/20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-brass" />
            <span className="text-xs font-mono font-semibold uppercase text-zinc-400 tracking-wider">
              gateway-terminal-node-01
            </span>
          </div>
          {/* Mock Window buttons */}
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
        </div>

        {/* Terminal Content (JetBrains Mono) */}
        <div className="p-6 md:p-8 space-y-6 font-mono text-sm">
          {/* Diagnostic Log */}
          <div className="space-y-1.5 text-zinc-500 text-xs md:text-sm">
            <p className="text-zinc-400">visitor@sasongko.io:~$ <span className="text-white">initiate-handshake --hextech</span></p>
            <p className="text-hextech-blue/80">✔ Connection routing established via secure endpoints</p>
            <p className="text-brass/80">✔ Secure channels active: SMTP Node // WhatsApp Gateway</p>
            <p className="text-emerald-400/80">✔ Buffer ready. Transmit details below...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-brass/10">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">Direct Nodes</h3>
              
              <a
                href="mailto:zery.sasongko@gmail.com"
                className="flex items-center justify-between p-4 rounded border border-brass/15 bg-zinc-900/40 hover:border-hextech-blue/30 hover:bg-hextech-blue/5 transition-all group"
              >
                <div className="flex items-center space-x-3.5">
                  <Mail className="w-5 h-5 text-brass group-hover:text-hextech-blue transition-colors" />
                  <div className="text-left">
                    <span className="text-[9px] text-zinc-500 block uppercase">SMTP Node</span>
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                      zery.sasongko@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-hextech-blue transition-all" />
              </a>

              <a
                href="https://wa.me/6282266591472"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded border border-brass/15 bg-zinc-900/40 hover:border-hextech-blue/30 hover:bg-hextech-blue/5 transition-all group"
              >
                <div className="flex items-center space-x-3.5">
                  <Phone className="w-5 h-5 text-brass group-hover:text-hextech-blue transition-colors" />
                  <div className="text-left">
                    <span className="text-[9px] text-zinc-500 block uppercase">Secure Chat Node</span>
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                      WhatsApp Session
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-hextech-blue transition-all" />
              </a>
            </div>

            {/* Form */}
            <div>
              <h3 className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">Transmit Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900/70 border border-brass/15 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-hextech-blue/50 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows="3"
                    required
                    placeholder="Describe collaboration request..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900/70 border border-brass/15 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-hextech-blue/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 border border-white/5 cursor-pointer ${
                    isSubmitted
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : "bg-zinc-100 text-zinc-950 hover:bg-hextech-blue hover:text-zinc-950 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Transmitting packet...</span>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Packet Received</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Signal</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <footer className="mt-24 pt-8 border-t border-brass/15 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-mono gap-4">
        <div>
          <span>© 2026 Zery Gallanta Sasongko. All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue animate-ping" />
          <span>Deployed via Vercel. Built with passion.</span>
        </div>
      </footer>
    </section>
  );
}
