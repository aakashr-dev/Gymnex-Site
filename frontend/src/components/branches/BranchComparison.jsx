import React from 'react';
import { Check, X, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchComparison = ({ branches }) => {
  return (
    <section className="py-20 bg-dark-surface relative z-10 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-amber-500 font-black uppercase text-xs tracking-widest">FACILITY SPECIFICATIONS</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            BRANCH COMPARISON
          </h2>
          <p className="text-gray-400 text-sm font-sans">
            Compare key parameters across our global flagship sanctuaries to choose your ideal performance home.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-3xl border border-white/10 bg-dark-card shadow-2xl scrollbar-thin"
        >
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black/60 border-b border-white/10 text-amber-500 font-black uppercase tracking-widest text-[11px]">
                <th className="py-5 px-6 font-display">Branch Sanctuary</th>
                <th className="py-5 px-4 font-display">Location</th>
                <th className="py-5 px-4 font-display">Floor Area</th>
                <th className="py-5 px-4 font-display">Members</th>
                <th className="py-5 px-4 font-display">Coaches</th>
                <th className="py-5 px-4 font-display">Operating Hours</th>
                <th className="py-5 px-4 font-display text-center">Parking</th>
                <th className="py-5 px-4 font-display text-center">Hydro Pool</th>
                <th className="py-5 px-4 font-display text-center">Cryo / Recovery</th>
                <th className="py-5 px-6 font-display text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {branches.map((b) => (
                <tr key={b.id} className="hover:bg-amber-500/5 transition-colors group">
                  <td className="py-4 px-6 font-extrabold text-white uppercase font-display text-sm group-hover:text-amber-400 transition-colors">
                    {b.name}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{b.city}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-200">{b.area}</td>
                  <td className="py-4 px-4 font-bold text-amber-400">{b.membersCount}</td>
                  <td className="py-4 px-4 font-bold text-gray-200">{b.coachesCount} Master</td>
                  <td className="py-4 px-4 text-gray-300 font-mono text-[11px]">{b.hours}</td>
                  <td className="py-4 px-4 text-center">
                    {b.hasParking ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {b.hasPool ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {b.hasRecovery ? (
                      <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-md font-black">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{b.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};
