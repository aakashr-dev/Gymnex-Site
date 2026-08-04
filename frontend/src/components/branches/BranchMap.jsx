import React, { useState, useEffect } from 'react';
import { Button, Card } from '../ui/UIComponents';
import { MapPin, Navigation, Search, Phone, Clock, Compass, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchMap = ({ branches = [], onSelectBranch, onBookVisit }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userLocationDetected, setUserLocationDetected] = useState(false);

  useEffect(() => {
    if (branches && branches.length > 0) {
      if (!selectedBranch || !branches.some((b) => (b.id || b._id) === (selectedBranch.id || selectedBranch._id))) {
        setSelectedBranch(branches[0]);
      }
    }
  }, [branches]);

  const activeBranch = selectedBranch || (branches && branches[0]) || {};

  const handleLocateMe = () => {
    setUserLocationDetected(true);
    if (branches && branches.length > 0) {
      setSelectedBranch(branches[0]);
    }
  };

  const activeBranchCity = activeBranch.city ? activeBranch.city.split(',')[0] : 'Branch';

  return (
    <section className="py-20 bg-dark-base relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div>
            <p className="text-amber-500 font-black uppercase text-xs tracking-widest">GLOBAL LOCATOR</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-display tracking-tight mt-1">
              INTERACTIVE BRANCH MAP
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              Locate the nearest GYMNEX performance center in major international metropolitan hubs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="glass"
              size="sm"
              onClick={handleLocateMe}
              icon={Navigation}
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-xs font-bold"
            >
              {userLocationDetected ? `Nearest: ${activeBranch.name || 'Manhattan Flagship'}` : 'Locate Nearest Branch'}
            </Button>
          </div>
        </div>

        {/* Map & Detail Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Interactive Map Graphics Box */}
          <div className="lg:col-span-8 bg-dark-card border border-white/10 rounded-3xl p-6 min-h-[420px] relative overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* World Grid Matrix Styling */}
            <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Map Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-xs text-gray-300 font-bold">
                <Compass className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                <span>GLOBAL SANCTUARY MATRIX</span>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold text-gray-500">
                ACTIVE SATELLITE FEED • {branches.length || 6} CENTERS
              </span>
            </div>

            {/* Simulated Map Pins Overlay */}
            <div className="relative w-full h-[320px] my-4 rounded-2xl bg-dark-surface/90 border border-white/5 overflow-hidden flex items-center justify-center">
              {/* World Silhouette Background */}
              <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')]" />

              {/* Branch Markers */}
              {(branches || []).map((b, idx) => {
                const bId = b.id || b._id || `br-${idx}`;
                const activeId = activeBranch.id || activeBranch._id;
                const isActive = activeId === bId;
                const coords = b.coords || { x: 20 + (idx * 15) % 65, y: 30 + (idx * 12) % 45 };
                const posX = coords.x ?? 50;
                const posY = coords.y ?? 50;

                return (
                  <button
                    key={bId}
                    onClick={() => setSelectedBranch(b)}
                    style={{ left: `${posX}%`, top: `${posY}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none"
                  >
                    <div className="relative flex items-center justify-center">
                      {isActive && (
                        <span className="absolute w-10 h-10 rounded-full bg-amber-500/30 animate-ping" />
                      )}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                          isActive
                            ? 'bg-amber-500 text-black scale-125 ring-4 ring-amber-500/30'
                            : 'bg-dark-card border border-amber-500/50 text-amber-500 hover:scale-110 hover:bg-amber-500 hover:text-black'
                        }`}
                      >
                        <MapPin className="w-5 h-5 fill-current" />
                      </div>

                      {/* Tooltip on hover/active */}
                      <div
                        className={`absolute bottom-full mb-2 whitespace-nowrap bg-black/90 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/15 shadow-xl transition-all ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:scale-100'
                        }`}
                      >
                        {b.name || 'GYMNEX Branch'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Location Pills at Bottom */}
            <div className="relative z-10 flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
              {(branches || []).map((b, idx) => {
                const bId = b.id || b._id || `br-${idx}`;
                const activeId = activeBranch.id || activeBranch._id;
                const cityName = b.city ? b.city.split(',')[0] : 'Branch';
                return (
                  <button
                    key={bId}
                    onClick={() => setSelectedBranch(b)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      activeId === bId
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{cityName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Selected Branch Card */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <Card className="p-0 overflow-hidden h-full flex flex-col justify-between border border-amber-500/30 bg-dark-card shadow-2xl">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activeBranch.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'}
                    alt={activeBranch.name || 'Selected Location'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-amber-500 text-black font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded">
                    Selected Location
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-black text-white uppercase font-display">
                      {activeBranch.name || 'GYMNEX Sanctuary'}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {activeBranch.description || 'Ultra-luxury physical culture sanctuary equipped with bio-calibrated strength intelligence.'}
                  </p>

                  <div className="space-y-2.5 text-xs text-gray-300 font-sans border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{activeBranch.address || 'Enterprise Blvd, Suite 100'}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{activeBranch.phone || '+1 (800) 555-0199'}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{activeBranch.hours || '24/7 VIP Access'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                    <div className="bg-white/5 p-2 rounded-xl">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Floor Space</p>
                      <p className="font-extrabold text-white mt-0.5">{activeBranch.area || '35,000 Sq Ft'}</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Members</p>
                      <p className="font-extrabold text-amber-400 mt-0.5">{activeBranch.membersCount || '2,500+'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onBookVisit && onBookVisit(activeBranch)}
                  className="w-full bg-amber-500 text-black hover:bg-amber-400 font-extrabold"
                >
                  Book Visit at {activeBranchCity}
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => onSelectBranch && onSelectBranch(activeBranch)}
                  className="w-full text-xs font-bold"
                >
                  View Full Specifications →
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
