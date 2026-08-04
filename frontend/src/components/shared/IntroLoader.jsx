import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export const IntroLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1.8 seconds smooth intro sequence
    const duration = 1800;
    const steps = 100;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 2;
      if (currentStep > 100) currentStep = 100;
      setProgress(currentStep);

      if (currentStep >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          window.__introDone = true;
          window.dispatchEvent(new Event('introComplete'));
        }, 200);
      }
    }, stepTime * 2);

    // Fail-safe safety backup to guarantee intro loader always unmounts cleanly
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
      window.__introDone = true;
      window.dispatchEvent(new Event('introComplete'));
    }, 2400);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-dark-base flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Ambient Warm Golden Spotlight */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[160px] pointer-events-none animate-pulse" />

          {/* Full Screen Cinematic Athlete Image with Smooth Camera Zoom to Face/Eyes */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <motion.img
              initial={{ scale: 1, y: 20 }}
              animate={{
                scale: [1, 1.25, 2.4],
                y: [20, 0, -80]
              }}
              transition={{
                duration: 2.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{ transformOrigin: '50% 25%' }}
              src="/intro-athlete.jpg"
              alt="GYMNEX Cinematic Intro Athlete"
              className="h-full w-auto object-cover filter contrast-125 brightness-90 shadow-2xl"
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-black/50 to-black/70" />
          </div>

          {/* Foreground Telemetry Content */}
          <div className="relative z-20 flex flex-col items-center text-center space-y-6 max-w-lg px-4 mt-auto mb-16">
            
            {/* Pulsing Target Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-full bg-black/80 border border-amber-500/50 flex items-center justify-center shadow-crimson-glow backdrop-blur-md"
            >
              <Target className="w-8 h-8 text-amber-500 stroke-[2.5] animate-pulse" />
            </motion.div>

            {/* Cinematic Headline */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-widest text-white font-display">
                HARD BODY <span className="text-amber-500">GAME</span>
              </h1>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 font-sans">
                ENTERPRISE PHYSICAL CULTURE
              </p>
            </motion.div>

            {/* Progress Bar & Counter */}
            <div className="w-72 sm:w-80 space-y-2 pt-2">
              <div className="h-2 w-full bg-black/90 border border-amber-500/40 rounded-full overflow-hidden relative shadow-2xl backdrop-blur-md">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 rounded-full shadow-crimson-glow"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-black uppercase font-display text-gray-300">
                <span className="flex items-center gap-1.5 text-[11px] text-amber-500 font-sans tracking-widest">
                  <Eye className="w-3.5 h-3.5 animate-pulse" /> INITIALIZING TELEMETRY
                </span>
                <span className="text-amber-500 text-sm tracking-widest font-extrabold">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
