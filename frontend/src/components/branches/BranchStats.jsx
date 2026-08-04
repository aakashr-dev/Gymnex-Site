import React from 'react';
import { Building2, Users, Award, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchStats = () => {
  const stats = [
    {
      icon: Building2,
      value: '8+',
      label: 'Premium Branches',
      sublabel: 'Global Metropolis Hubs'
    },
    {
      icon: Users,
      value: '25K+',
      label: 'Active Members',
      sublabel: 'Worldwide Fitness Elite'
    },
    {
      icon: Award,
      value: '150+',
      label: 'Certified Coaches',
      sublabel: 'Master Olympic Specialists'
    },
    {
      icon: Smile,
      value: '98%',
      label: 'Customer Satisfaction',
      sublabel: 'Verified Member Reviews'
    }
  ];

  return (
    <section className="py-12 bg-dark-surface/60 border-y border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-dark-card/90 border border-white/10 rounded-2xl p-6 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-500 mt-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 font-medium">
                  {stat.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
