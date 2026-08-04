import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, X, RotateCcw, Maximize, ZoomIn, ZoomOut, MapPin, Eye, Play, Pause, Sparkles, ShieldCheck } from 'lucide-react';

export const Gym360TourModal = ({ isOpen, onClose }) => {
  const [activeZone, setActiveZone] = useState(0);
  const [panOffset, setPanOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const zones = [
    {
      id: 'main-arena',
      name: 'Main Strength & Olympic Arena',
      subtitle: 'Bio-Calibrated Racks & Eleiko Olympic Bumper Plates',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000',
      hotspots: [
        { id: 1, x: 25, y: 55, title: 'Custom Power Racks', desc: 'Bio-calibrated cables and laser-etched stainless steel racks.' },
        { id: 2, x: 55, y: 65, title: 'Free Weight Dumbbell Deck', desc: 'Custom urethane dumbbells up to 150 lbs with anti-slip knurling.' },
        { id: 3, x: 80, y: 45, title: 'Sprint Track & Sled Way', desc: '40-meter shock-absorbent turf track for sled pushes and sprinting.' }
      ]
    },
    {
      id: 'cardio-dexa',
      name: 'DEXA Cardio & Oxygen Suite',
      subtitle: 'Real-Time VO2 Max & Metabolic Oxygen Monitoring',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2000',
      hotspots: [
        { id: 4, x: 30, y: 50, title: 'Technogym Skillrun Treadmills', desc: 'Integrated heart-rate telemetry and live incline resistance.' },
        { id: 5, x: 70, y: 60, title: 'Concept2 Ergometer Station', desc: 'Rowing and SkiErg pods with real-time watt power telemetry.' }
      ]
    },
    {
      id: 'recovery-cryo',
      name: 'Recovery & Thermal Sauna Suite',
      subtitle: 'Full-Body Cryotherapy & Infrared Heat Recovery',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=2000',
      hotspots: [
        { id: 6, x: 35, y: 45, title: 'Sub-Zero Cryotherapy Chamber', desc: '-110°C nitrogen recovery chamber for immediate inflammation drop.' },
        { id: 7, x: 65, y: 55, title: 'Infrared Cedar Sauna', desc: 'Deep tissue detoxification and vascular circulation boost.' }
      ]
    }
  ];

  // Auto-rotate panorama effect
  useEffect(() => {
    if (!isOpen || !autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setPanOffset(prev => (prev + 0.15) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, [isOpen, autoRotate, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setAutoRotate(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setDragStartX(e.clientX);
    setPanOffset(prev => {
      let next = prev - (deltaX * 0.1);
      if (next < 0) next += 100;
      if (next > 100) next -= 100;
      return next;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  const currentZone = zones[activeZone];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-dark-surface border border-white/10 rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl relative flex flex-col h-[90vh] md:h-[85vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-base/80 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-500 tracking-widest">Interactive 360° Tour</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <h3 className="text-lg font-extrabold text-white font-display uppercase tracking-wide">
                {currentZone.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                autoRotate ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoRotate ? 'Auto Pan' : 'Paused'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 360 Viewport Arena */}
        <div
          className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none bg-black"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Panning Background Panorama */}
          <div
            className="absolute inset-0 w-[200%] h-full transition-transform duration-75 ease-out"
            style={{
              transform: `translateX(-${panOffset / 2}%) scale(${zoomLevel})`,
              backgroundImage: `url(${currentZone.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          {/* Dark Overlay Tint for Luxury Aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-black/40 pointer-events-none" />

          {/* Interactive Hotspot Nodes */}
          {currentZone.hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`
              }}
              onClick={() => setActiveHotspot(spot)}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-amber-500/40 animate-ping" />
                <div className="w-7 h-7 rounded-full bg-amber-500 text-black font-extrabold text-xs flex items-center justify-center shadow-crimson-glow group-hover:scale-125 transition-transform duration-300 border-2 border-black">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="absolute left-full ml-3 hidden group-hover:flex flex-col bg-dark-card border border-amber-500/40 p-3 rounded-2xl w-56 shadow-2xl z-40 pointer-events-none backdrop-blur-md">
                  <span className="text-xs font-black text-amber-500 uppercase tracking-wide">{spot.title}</span>
                  <span className="text-[11px] text-gray-300 leading-tight mt-1">{spot.desc}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Drag Overlay Hint */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-widest pointer-events-none flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            Drag or swipe horizontally for 360° panorama
          </div>

          {/* Hotspot Popup Detail Modal Overlay */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-6 right-6 max-w-md bg-dark-card/95 border border-amber-500/50 p-5 rounded-2xl shadow-2xl backdrop-blur-xl z-40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-500">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Zone Spec Highlight</span>
                  </div>
                  <button onClick={() => setActiveHotspot(null)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-base font-extrabold text-white uppercase font-display">{activeHotspot.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{activeHotspot.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Zone Selection Bar */}
        <div className="p-4 border-t border-white/10 bg-dark-base flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
          {/* Zone Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {zones.map((zone, idx) => (
              <button
                key={zone.id}
                onClick={() => {
                  setActiveZone(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeZone === idx
                    ? 'bg-amber-500 text-black font-extrabold shadow-crimson-sm'
                    : 'bg-dark-card border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.2))}
              className="p-2 rounded-xl bg-dark-card border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/40 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.min(1.6, prev + 0.2))}
              className="p-2 rounded-xl bg-dark-card border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/40 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setPanOffset(0);
                setZoomLevel(1);
              }}
              className="p-2 rounded-xl bg-dark-card border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/40 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
