import React from 'react';
import { Card } from '../ui/UIComponents';
import { Star, Quote, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchTestimonials = ({ testimonials }) => {
  return (
    <section className="py-20 bg-dark-surface relative z-10 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-amber-500 font-black uppercase text-xs tracking-widest">MEMBER REVIEWS</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            GLOBAL ATHLETE STORIES
          </h2>
          <p className="text-gray-400 text-sm font-sans">
            Hear from executive members and elite athletes training across our global sanctuaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="p-6 bg-dark-card border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-amber-500/20 group-hover:text-amber-500/50 transition-colors" />
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic font-sans">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase font-display">{item.name}</h3>
                    <p className="text-[11px] text-gray-400 font-medium">{item.role}</p>
                    <p className="text-[10px] text-amber-500 font-bold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{item.branch}</span>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
