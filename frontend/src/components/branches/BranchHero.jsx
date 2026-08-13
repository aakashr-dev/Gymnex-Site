import React from 'react';
import { Button } from '../ui/UIComponents';
import { MapPin, Sparkles, Clock, ShieldCheck, Users, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchHero = ({ onExploreClick, onBookTourClick }) => {
  return (
    <div className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center bg-dark-base overflow-hidden">
      {/* Dark Luxury Atmosphere & Minimal Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-dark-base/90 to-dark-base pointer-events-none" />

      {/* Ambient Drifting Particles & Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GYMNEX LOCATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-display leading-[0.95]">
            TRAIN WHERE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-200">
              CHAMPIONS
            </span>{' '}
            <br />
            ARE BUILT
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
            Explore every GYMNEX performance center engineered with world-class Technogym Biostrenth equipment, elite master coaching, cryotherapy recovery vaults, and ultra-luxury member experiences across global capitals.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onExploreClick}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold shadow-crimson-glow"
              icon={ArrowRight}
            >
              Explore Locations
            </Button>
          </div>

          {/* Quick Metrics Line */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-8 text-gray-400 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Multi-Branch Pass</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>24/7 Access</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Hero Visual & Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-dark-card shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"
              alt="GYMNEX Flagship Interior"
              loading="eager"
              decoding="async"
              className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 gpu-accelerated"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-black/30" />

            {/* Floating Badge Top Left */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl"
            >
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Current Status</p>
                <p className="text-xs font-black text-white uppercase tracking-wider">Open Now • 24/7 Access</p>
              </div>
            </motion.div>

            {/* Floating Card Bottom Right */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-6 right-6 bg-black/85 backdrop-blur-md border border-amber-500/30 p-4 rounded-2xl flex items-center gap-4 shadow-2xl max-w-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Premium Facility</p>
                <p className="text-xs font-extrabold text-white">1,500+ Active Members Active Now</p>
              </div>
            </motion.div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-6 left-6 bg-dark-card/90 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md hidden sm:flex items-center gap-2 text-xs font-bold text-gray-300">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Manhattan • Beverly Hills • Mayfair • Tokyo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
