import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export const IntroLoader = () => {
  const isAlreadyShown = typeof window !== 'undefined' && sessionStorage.getItem('gymnex_intro_shown') === 'true';
  const [isLoading, setIsLoading] = useState(!isAlreadyShown);
  const [progress, setProgress] = useState(isAlreadyShown ? 100 : 0);

  useEffect(() => {
    if (isAlreadyShown) {
      window.__introDone = true;
      window.dispatchEvent(new Event('introComplete'));
      return;
    }

    const duration = 1200; // 1.2s fast cinematic intro
    let startTime = null;
    let animId;

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('gymnex_intro_shown', 'true');
          window.__introDone = true;
          window.dispatchEvent(new Event('introComplete'));
        }, 100);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('gymnex_intro_shown', 'true');
      window.__introDone = true;
      window.dispatchEvent(new Event('introComplete'));
    }, 1600);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(safetyTimer);
    };
  }, [isAlreadyShown]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-dark-base flex flex-col items-center justify-center select-none overflow-hidden gpu-accelerated"
        >
          {/* Ambient Warm Golden Spotlight */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[160px] pointer-events-none animate-pulse gpu-accelerated" />

          {/* Full Screen Cinematic Athlete Image */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <motion.img
              initial={{ scale: 1, y: 10 }}
              animate={{ scale: 1.08, y: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{ transformOrigin: '50% 25%' }}
              src="/intro-athlete.jpg"
              alt="GYMNEX Cinematic Intro Athlete"
              loading="eager"
              decoding="async"
              className="h-full w-auto object-cover opacity-90 shadow-2xl gpu-accelerated"
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-black/50 to-black/70" />
          </div>

          {/* Foreground Telemetry Content */}
          <div className="relative z-20 flex flex-col items-center text-center space-y-6 max-w-lg px-4 mt-auto mb-16">
            {/* Pulsing Target Icon */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 rounded-full bg-black/80 border border-amber-500/50 flex items-center justify-center shadow-crimson-glow"
            >
              <Target className="w-8 h-8 text-amber-500 stroke-[2.5]" />
            </motion.div>

            {/* Cinematic Headline */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
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
              <div className="h-2 w-full bg-black/90 border border-amber-500/40 rounded-full overflow-hidden relative shadow-2xl">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 rounded-full shadow-crimson-glow transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-black uppercase font-display text-gray-300">
                <span className="flex items-center gap-1.5 text-[11px] text-amber-500 font-sans tracking-widest">
                  <Eye className="w-3.5 h-3.5" /> INITIALIZING TELEMETRY
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
