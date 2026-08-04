import React from 'react';
import { Button } from '../ui/UIComponents';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchCTA = ({ onFreeTrial, onFindNearest }) => {
  return (
    <section className="py-24 bg-dark-base relative overflow-hidden z-10 border-t border-white/10">
      {/* Dark Spotlight & Smoke Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-dark-base/95 to-dark-base pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>JOIN THE GYMNEX ELITE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase font-display tracking-tight leading-[0.95]">
            YOUR NEXT WORKOUT <br />
            <span className="text-amber-500">STARTS HERE</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Experience our ultra-luxury performance centers with a complimentary day pass. Gain access to master coaching, Biostrenth suites, and recovery spas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onFreeTrial}
            icon={ArrowRight}
            className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-sm sm:text-base px-8 shadow-crimson-glow"
          >
            Book Free Day Pass
          </Button>

          <Button
            variant="glass"
            size="lg"
            onClick={onFindNearest}
            icon={MapPin}
            className="border-white/20 text-white hover:bg-white/10 text-sm sm:text-base px-8"
          >
            Find Nearest Branch
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
