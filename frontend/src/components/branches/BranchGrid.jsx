import React, { useState } from 'react';
import { Button, Card, Badge } from '../ui/UIComponents';
import { MapPin, Phone, Clock, Users, Award, Star, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchGrid = ({ branches, activeBranchId, onSelectBranch, onBookVisit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'North America', 'Europe', 'Asia Pacific', 'Middle East'];

  const filteredBranches = (branches || []).filter((b) => {
    const matchesRegion = selectedRegion === 'All' || b.region === selectedRegion;
    const searchLower = (searchQuery || '').toLowerCase();
    const matchesSearch =
      (b.name || '').toLowerCase().includes(searchLower) ||
      (b.city || '').toLowerCase().includes(searchLower) ||
      (b.address || '').toLowerCase().includes(searchLower);
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="branch-grid" className="py-20 bg-dark-base relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <p className="text-amber-500 font-black uppercase text-xs tracking-widest">GLOBAL NETWORK</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight mt-1">
              PERFORMANCE SANCTUARIES
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              Discover flagship GYMNEX locations worldwide. Select a branch to explore facility specifications, amenities, and personal coaching slots.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city or branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-card border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors font-sans"
            />
          </div>
        </div>

        {/* Region Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedRegion === region
                  ? 'bg-amber-500 text-black shadow-crimson-glow font-extrabold'
                  : 'bg-dark-card/80 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBranches.map((branch) => {
            return (
              <motion.div
                key={branch.id}
                id={branch.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="scroll-mt-36 rounded-3xl transition-all duration-300"
              >
                <Card className="p-0 overflow-hidden flex flex-col justify-between h-full bg-dark-card border border-white/10 hover:border-amber-500/60 hover:ring-2 hover:ring-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-300 group">
                  <div>
                    {/* Card Top Image & Badges */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-black/30" />

                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {branch.status}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 bg-black/70 border border-amber-500/30 text-amber-400 text-xs font-black px-2.5 py-1 rounded-md backdrop-blur-md flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{branch.rating}</span>
                      </div>

                      <div className="absolute bottom-3 left-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                          {branch.city}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-black text-white uppercase font-display tracking-wide group-hover:text-amber-400 transition-colors">
                          {branch.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {branch.description}
                        </p>
                      </div>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center text-xs">
                        <div className="bg-white/5 p-2 rounded-xl">
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Area</p>
                          <p className="font-extrabold text-white text-xs mt-0.5">{branch.area}</p>
                        </div>
                        <div className="bg-white/5 p-2 rounded-xl">
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Members</p>
                          <p className="font-extrabold text-amber-400 text-xs mt-0.5">{branch.membersCount}</p>
                        </div>
                        <div className="bg-white/5 p-2 rounded-xl">
                          <p className="text-[10px] font-bold text-gray-500 uppercase">Coaches</p>
                          <p className="font-extrabold text-white text-xs mt-0.5">{branch.coachesCount}</p>
                        </div>
                      </div>

                      {/* Address & Hours */}
                      <div className="space-y-2 text-xs text-gray-300 font-sans">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{branch.hours}</span>
                        </div>
                      </div>

                      {/* Amenities Pills */}
                      <div className="space-y-1.5 pt-2">
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Features:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(branch.amenities || branch.facilities || []).slice(0, 4).map((am, idx) => (
                            <Badge key={idx} variant="gray" className="text-[10px] py-0.5">
                              {am}
                            </Badge>
                          ))}
                          {(branch.amenities || branch.facilities || []).length > 4 && (
                            <Badge variant="amber" className="text-[10px] py-0.5">
                              +{(branch.amenities || branch.facilities || []).length - 4} More
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
