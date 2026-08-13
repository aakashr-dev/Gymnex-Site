import React from 'react';
import { Target } from 'lucide-react';

export const PageLoader = () => {
  return (
    <div className="min-h-screen bg-dark-base flex flex-col items-center justify-center relative select-none overflow-hidden">
      {/* Ambient Warm Golden Glow */}
      <div className="absolute w-[400px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Pulsing Target Icon */}
        <div className="w-12 h-12 rounded-full bg-dark-card border border-amber-500/40 flex items-center justify-center shadow-crimson-glow">
          <Target className="w-6 h-6 text-amber-500 stroke-[2.5] animate-pulse" />
        </div>

        {/* Brand Text */}
        <span className="text-xl font-black tracking-wider text-white font-display uppercase font-rugged-display">
          GYM<span className="text-amber-500">NEX</span>
        </span>

        {/* Animated Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div className="h-full bg-amber-500 w-1/2 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
