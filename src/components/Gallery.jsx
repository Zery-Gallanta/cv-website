import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Sparkles, Sliders, Maximize2, X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Floral Rendezvous",
      category: "Portrait / Product",
      imgUrl: "/gallery_1.jpg",
      telemetry: { gear: "Nikon D750 // 50mm YongNuo", settings: "f/1.8  1/250s  ISO 200" },
      cols: "md:col-span-1"
    },
    {
      id: 2,
      title: "Fire & Flour",
      category: "Commercial / Culinary",
      imgUrl: "/gallery_2.jpg",
      telemetry: { gear: "Nikon D750 // 18-105mm Nikon", settings: "f/3.6  1/160s  ISO 1600" },
      cols: "md:col-span-1"
    },
    {
      id: 3,
      title: "Shaded Workspaces",
      category: "Lifestyle / Documentary",
      imgUrl: "/gallery_4.jpg",
      telemetry: { gear: "Nikon D750 // 50mm Yongnuo", settings: "f/1.8  1/400s  ISO 100" },
      cols: "md:col-span-1"
    },
    {
      id: 4,
      title: "Tabletop Chronicles",
      category: "Food / Editorial",
      imgUrl: "/gallery_3.jpg",
      telemetry: { gear: "Nikon D750 // 50mm YongNuo", settings: "f/2.8  1/125s  ISO 200" },
      cols: "md:col-span-2"
    },
    {
      id: 5,
      title: "Al Fresco Conversations",
      category: "Street / Documentary",
      imgUrl: "/gallery_5.jpg",
      telemetry: { gear: "Nikon D750 // 50mm YongNuo", settings: "f/1.8  1/400s  ISO 100" },
      cols: "md:col-span-1"
    }
  ];

  return (
    <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Background neon glows */}
      <div className="absolute bottom-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-brass/3 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-brass/25 bg-zinc-950/40 text-[10px] font-mono font-medium text-brass uppercase tracking-widest mb-4">
          <span>03 // Visuals</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-cinzel uppercase text-white tracking-widest">
          Creative Kinetics
        </h2>
        <p className="text-zinc-400 font-sans mt-3 text-sm md:text-base max-w-xl">
          Visual stories captured through composition, lighting, and cinematic grading.
        </p>
      </div>

      {/* Cross-Disciplinary Visual Edge Explain Block (Hextech styled) */}
      <div className="mb-12 hextech-card hextech-border p-6 md:p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-hextech-blue/5 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <h3 className="text-lg md:text-xl font-cinzel font-bold text-white uppercase flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-brass" />
              The Visual Architecture Advantage
            </h3>
            <p className="text-zinc-400 text-sm font-sans leading-relaxed max-w-3xl">
              As a freelance photographer and videographer, my eye for composition, lighting dynamics, and color theory translates directly into clean frontend development. Building responsive, pixel-perfect layouts, designing fluid animations, and configuring color tables is identical to crafting high-fidelity scenes in <strong className="text-white">DaVinci Resolve</strong> or framing portraits.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <div className="flex flex-col items-center justify-center p-4 rounded bg-zinc-900/50 border border-brass/20 w-24">
              <Camera className="w-5 h-5 text-brass mb-2" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Frames</span>
              <span className="text-xs font-mono font-bold text-zinc-200 mt-0.5">15K+</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded bg-zinc-900/50 border border-brass/20 w-24">
              <Film className="w-5 h-5 text-hextech-blue mb-2" />
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Grading</span>
              <span className="text-xs font-mono font-bold text-zinc-200 mt-0.5">Resolve</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className={`group relative rounded border border-brass/20 bg-zinc-900 overflow-hidden cursor-pointer ${item.cols} transition-all duration-300 hover:border-hextech-blue/30`}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-70 z-10 group-hover:opacity-85 transition-opacity" />

            {/* Visual tech crosshairs overlay (Decorative) */}
            <div className="absolute inset-4 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-hextech-blue" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-hextech-blue" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-hextech-blue" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-hextech-blue" />
              <Maximize2 className="w-5 h-5 text-white/50 group-hover:text-hextech-blue transition-colors" />
            </div>

            {/* Image Tag with custom DaVinci cinematic film-grade color filtering */}
            <img
              src={item.imgUrl}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.25] saturate-[0.72] group-hover:brightness-[0.9] group-hover:contrast-[1.1] group-hover:saturate-[0.95] transition-all duration-700 ease-out group-hover:scale-105"
            />

            {/* Info Overlay */}
            <div className="absolute bottom-5 left-5 right-5 z-20">
              <span className="text-[9px] font-mono font-bold uppercase text-brass tracking-widest block">
                {item.category}
              </span>
              <h4 className="text-base font-cinzel font-bold text-white uppercase mt-0.5 tracking-wider">
                {item.title}
              </h4>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 group-hover:text-zinc-400 transition-colors">
                {item.telemetry.gear}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-void/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-950/85 border border-brass/30 rounded overflow-hidden p-3 flex flex-col md:flex-row gap-6 shadow-[0_0_50px_rgba(0,0,0,0.85)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-zinc-900 border border-brass/20 text-zinc-400 hover:text-white rounded hover:border-hextech-blue transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/3 max-h-[50vh] md:max-h-[70vh] flex items-center justify-center bg-black rounded overflow-hidden">
                <img
                  src={selectedImage.imgUrl}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain filter brightness-[0.9] contrast-[1.1] saturate-[0.95]"
                />
              </div>

              <div className="w-full md:w-1/3 flex flex-col justify-between py-4 pr-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brass uppercase tracking-widest">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-cinzel font-bold text-white uppercase mt-1 tracking-wider">
                    {selectedImage.title}
                  </h3>
                  <div className="h-[1px] bg-brass/10 my-4" />
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 bg-zinc-900/60 rounded border border-brass/15">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Camera Gear</span>
                    <span className="text-xs font-mono text-zinc-300 font-semibold">{selectedImage.telemetry.gear}</span>
                  </div>

                  <div className="p-3.5 bg-zinc-900/60 rounded border border-brass/15">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Exposure Data</span>
                    <span className="text-xs font-mono text-zinc-300 font-semibold">{selectedImage.telemetry.settings}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="w-full py-2 bg-white/5 border border-brass/35 hover:border-hextech-blue/50 text-[10px] font-mono font-bold uppercase tracking-wider text-white rounded transition-all"
                  >
                    Close Screen
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
