import React from 'react';
import { Button } from '../ui/UIComponents';
import { Sparkles, Dumbbell, Flame, Waves, Wind, ThermometerSnowflake, Activity, Coffee, UserCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturedBranch = ({ branch, onBookTour }) => {
  if (!branch) return null;

  const flagshipFeatures = [
    { name: 'Olympic Zone', icon: Dumbbell },
    { name: 'CrossFit Arena', icon: Flame },
    { name: 'Recovery Spa', icon: Waves },
    { name: 'Steam Room', icon: Wind },
    { name: 'Ice Bath Plunge', icon: ThermometerSnowflake },
    { name: 'DEXA Sports Lab', icon: Activity },
    { name: 'Nutrition Fuel Bar', icon: Coffee },
    { name: 'Private Coaching', icon: UserCheck }
  ];

  return (
    <section className="py-20 bg-dark-surface relative overflow-hidden border-y border-white/10 z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300 group">
              <img
                src={branch.image}
                alt={branch.name}
                className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-80" />

              <div className="absolute top-6 left-6">
                <span className="bg-amber-500 text-black font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  FLAGSHIP SPOTLIGHT
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Sanctuary Location</p>
                  <p className="text-sm font-black text-white uppercase font-display">{branch.name}</p>
                </div>
                <span className="text-amber-500 font-extrabold text-sm">{branch.area}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-black uppercase tracking-widest">
              <span>LUXURY PERFORMANCE CENTER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight leading-tight">
              {branch.name}
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans">
              Designed for uncompromising athletes and executives, this flagship sanctuary integrates futuristic Technogym Biostrenth intelligence, Olympic weightlifting platforms, DEXA metabolic scans, and VIP recovery suites.
            </p>

            {/* Features Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {flagshipFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 bg-dark-card/90 border border-white/10 rounded-xl flex items-center gap-2.5 hover:border-amber-500/40 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-xs font-bold text-gray-200 truncate">{feat.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onBookTour(branch)}
                className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold shadow-crimson-glow"
                icon={ArrowRight}
              >
                Experience This Sanctuary
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
