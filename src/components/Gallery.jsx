import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Film, Sparkles, Sliders, Maximize2, X, ArrowUpRight } from "lucide-react";

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
      title: "Maxis Resto Campaign",
      category: "Social Campaign / Commercial",
      imgUrl: "/gallery_2.jpg",
      telemetry: { gear: "Nikon D750 // 18-105mm Nikon", settings: "f/3.6  1/160s  ISO 1600" },
      cols: "md:col-span-1"
    },
    {
      id: 3,
      title: "Panorama Hills Cikole",
      category: "Venue & Architectural",
      imgUrl: "/gallery_4.jpg",
      telemetry: { gear: "Nikon D750 // 50mm Yongnuo", settings: "f/1.8  1/400s  ISO 100" },
      cols: "md:col-span-1"
    },
    {
      id: 4,
      title: "LSD Coffee Editorial",
      category: "Culinary & Brand Photography",
      imgUrl: "/gallery_3.jpg",
      telemetry: { gear: "Nikon D750 // 50mm YongNuo", settings: "f/2.8  1/125s  ISO 200" },
      cols: "md:col-span-2"
    },
    {
      id: 5,
      title: "YATC.id Creative Outreach",
      category: "NGO Creative Direction",
      imgUrl: "/gallery_5.jpg",
      telemetry: { gear: "Nikon D750 // 50mm YongNuo", settings: "f/1.8  1/400s  ISO 100" },
      cols: "md:col-span-1"
    }
  ];

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Precision Corner Crosshairs (+) */}
      <div className="absolute top-8 left-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>
      <div className="absolute top-8 right-4 text-zinc-700 font-mono text-xs select-none pointer-events-none hidden md:block">+</div>

      {/* Section Header */}
      <div className="mb-14 text-left border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 border border-white/[0.08] bg-[#0c0c0e]/80 px-3 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.14em] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-hextech-blue" />
          <span>03 // STUDIO PORTFOLIO</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white leading-tight">
          Visual Direction <span className="font-serif italic font-normal text-zinc-300">&</span> Photography
        </h2>
        <p className="text-zinc-400 font-sans mt-2.5 text-sm md:text-base max-w-2xl leading-relaxed">
          High-end commercial framing, editorial visual narratives, and calibrated color grading with the Nikon D750.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: item.id * 0.08 }}
            className={`${item.cols} group relative border border-white/[0.08] bg-[#0c0c0e]/80 overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-200`}
            onClick={() => setSelectedImage(item)}
          >
            {/* Corner Crosshairs */}
            <span className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600 select-none z-20">+</span>
            <span className="absolute top-2 right-2 text-[10px] font-mono text-zinc-600 select-none z-20">+</span>

            {/* Image Canvas Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black/60">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-[0.92] contrast-[1.05]"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-8 h-8 border border-white/40 bg-black/80 backdrop-blur-sm flex items-center justify-center text-white">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Frame Metadata Bar */}
              <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-hextech-blue font-semibold">
                    {item.category}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 bg-black/60 px-2 py-0.5 border border-white/[0.08]">
                    {item.telemetry.gear.split("//")[0]}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight group-hover:text-hextech-blue transition-colors">
                  {item.title}
                </h3>

                <p className="font-mono text-[10px] text-zinc-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.telemetry.settings}
                </p>
              </div>
            </div>
          </motion.div>
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full border border-white/[0.12] bg-[#0c0c0e] overflow-hidden"
            >
              {/* Top Modal Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-black/60 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Camera className="w-4 h-4 text-hextech-blue" />
                  <span className="uppercase tracking-widest">{selectedImage.title}</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="w-7 h-7 border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview */}
              <div className="max-h-[70vh] flex items-center justify-center bg-black">
                <img
                  src={selectedImage.imgUrl}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              {/* Bottom Metadata Inspector */}
              <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-zinc-400">
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">EQUIPMENT</span>
                  <span className="text-white">{selectedImage.telemetry.gear}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">EXPOSURE TELEMETRY</span>
                  <span className="text-hextech-blue font-semibold">{selectedImage.telemetry.settings}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
