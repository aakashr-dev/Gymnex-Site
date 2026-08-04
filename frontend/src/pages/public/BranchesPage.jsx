import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageTransition, AnimationSection } from '../../components/motion/MotionComponents';
import { AtmosphericBackground, Button } from '../../components/ui/UIComponents';
import { MOCK_BRANCHES, MOCK_BRANCH_TESTIMONIALS, MOCK_BRANCH_FAQS } from '../../data/mockData';
import { api } from '../../services/api';

// 10 Luxury Branch Components
import { BranchHero } from '../../components/branches/BranchHero';
import { BranchStats } from '../../components/branches/BranchStats';
import { BranchGrid } from '../../components/branches/BranchGrid';
import { FeaturedBranch } from '../../components/branches/FeaturedBranch';
import { BranchAmenities } from '../../components/branches/BranchAmenities';
import { BranchComparison } from '../../components/branches/BranchComparison';
import { BranchMap } from '../../components/branches/BranchMap';
import { BranchTestimonials } from '../../components/branches/BranchTestimonials';
import { BranchFAQ } from '../../components/branches/BranchFAQ';
import { BranchCTA } from '../../components/branches/BranchCTA';

import { X, Calendar, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BranchesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [branches, setBranches] = useState(MOCK_BRANCHES);
  const [activeBranchId, setActiveBranchId] = useState('');
  const [selectedBranchForModal, setSelectedBranchForModal] = useState(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    const fetchLiveBranches = async () => {
      const data = await api.getBranches();
      if (data && data.length > 0) {
        const normalized = data.map((b, idx) => ({
          id: b._id || b.id || `br-${idx}`,
          _id: b._id || b.id || `br-${idx}`,
          name: b.name || `GYMNEX Flagship ${idx + 1}`,
          city: b.city || b.location || 'Global Flagship',
          address: b.address || 'Enterprise Blvd, Suite 100',
          phone: b.phone || '+1 (800) 555-0199',
          coords: b.coords || { x: 20 + (idx * 15) % 65, y: 30 + (idx * 12) % 45 },
          area: b.area || `${25 + (idx % 4) * 5},000 Sq Ft`,
          membersCount: b.membersCount || `${1200 + (idx % 6) * 350}+`,
          coachesCount: b.coachesCount || (8 + (idx % 5) * 2),
          hours: b.hours || '24/7 VIP Access',
          rating: b.rating || 4.9,
          image: b.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
          status: b.status || 'Active',
          amenities: Array.isArray(b.amenities) && b.amenities.length > 0 ? b.amenities : (Array.isArray(b.facilities) && b.facilities.length > 0 ? b.facilities : ['Olympic Lifting', 'Hydro Spa', 'Cryo Chamber', 'BioStrenth Lab']),
          region: b.region || (idx % 2 === 0 ? 'North America' : 'Europe'),
          hasParking: b.hasParking !== undefined ? b.hasParking : true,
          hasPool: b.hasPool !== undefined ? b.hasPool : true,
          hasRecovery: b.hasRecovery !== undefined ? b.hasRecovery : true,
          description: b.description || 'Ultra-luxury physical culture sanctuary equipped with bio-calibrated strength intelligence.'
        }));
        setBranches(normalized);
      }
    };
    fetchLiveBranches();
  }, []);

  useEffect(() => {
    const hash = location.hash ? location.hash.replace('#', '') : '';
    if (hash) {
      setActiveBranchId(hash);
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    } else {
      setActiveBranchId('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  const handleSelectBranchSpec = (branch) => {
    setActiveBranchId(branch.id);
    const element = document.getElementById(branch.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenTourModal = (branch) => {
    setSelectedBranchForModal(branch || MOCK_BRANCHES[0]);
    setBookingSubmitted(false);
    setIsTourModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setIsTourModalOpen(false);
      setBookingSubmitted(false);
    }, 2000);
  };

  const scrollToGrid = () => {
    const gridEl = document.getElementById('branch-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <div className="bg-dark-base min-h-screen relative overflow-hidden text-white font-sans">
        <AtmosphericBackground />

        {/* Section 1: Premium Hero */}
        <AnimationSection direction="none">
          <BranchHero
            onExploreClick={scrollToGrid}
            onBookTourClick={() => handleOpenTourModal(MOCK_BRANCHES[0])}
          />
        </AnimationSection>

        {/* Section 2: Branch Statistics */}
        <AnimationSection direction="up" delay={0.1}>
          <BranchStats />
        </AnimationSection>

        {/* Section 3: Interactive Branch Grid */}
        <AnimationSection direction="up">
          <BranchGrid
            branches={branches}
            activeBranchId={activeBranchId}
            onSelectBranch={handleSelectBranchSpec}
            onBookVisit={handleOpenTourModal}
          />
        </AnimationSection>

        {/* Section 4: Featured Flagship Branch */}
        <AnimationSection direction="up">
          <FeaturedBranch
            branch={branches[0]}
            onBookTour={handleOpenTourModal}
          />
        </AnimationSection>

        {/* Section 5: Signature Amenities */}
        <AnimationSection direction="up">
          <BranchAmenities />
        </AnimationSection>

        {/* Section 6: Branch Comparison Table */}
        <AnimationSection direction="up">
          <BranchComparison branches={branches} />
        </AnimationSection>

        {/* Section 7: Interactive Map Section */}
        <AnimationSection direction="up">
          <BranchMap
            branches={branches}
            onSelectBranch={handleSelectBranchSpec}
            onBookVisit={handleOpenTourModal}
          />
        </AnimationSection>

        {/* Section 8: Member Testimonials */}
        <AnimationSection direction="up">
          <BranchTestimonials testimonials={MOCK_BRANCH_TESTIMONIALS} />
        </AnimationSection>

        {/* Section 9: FAQ Accordion */}
        <AnimationSection direction="up">
          <BranchFAQ faqs={MOCK_BRANCH_FAQS} />
        </AnimationSection>

        {/* Section 10: Final Luxury CTA */}
        <AnimationSection direction="up">
          <BranchCTA
            onFreeTrial={() => handleOpenTourModal(MOCK_BRANCHES[0])}
            onFindNearest={scrollToGrid}
          />
        </AnimationSection>

        {/* Book Facility Tour Interactive Modal */}
        <AnimatePresence>
          {isTourModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-dark-card border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-6"
              >
                <button
                  onClick={() => setIsTourModalOpen(false)}
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                {bookingSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase font-display">
                      TOUR RESERVED!
                    </h3>
                    <p className="text-sm text-gray-300">
                      Your VIP pass for <span className="text-amber-500 font-bold">{selectedBranchForModal?.name}</span> has been confirmed. Our concierge team will reach out shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                        VIP CONCIERGE TOUR
                      </span>
                      <h3 className="text-2xl font-black text-white uppercase font-display mt-2">
                        BOOK A FACILITY TOUR
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Selected Sanctuary: <span className="text-white font-bold">{selectedBranchForModal?.name}</span>
                      </p>
                    </div>

                    <form onSubmit={handleModalSubmit} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Harrison Sterling"
                          className="w-full bg-dark-surface border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="harrison@example.com"
                            className="w-full bg-dark-surface border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 019-2831"
                            className="w-full bg-dark-surface border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 font-bold uppercase tracking-wider mb-1">Preferred Date</label>
                        <input
                          type="date"
                          required
                          className="w-full bg-dark-surface border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 font-sans"
                        />
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="primary"
                          size="lg"
                          type="submit"
                          className="w-full bg-amber-500 text-black hover:bg-amber-400 font-extrabold shadow-crimson-glow text-sm"
                        >
                          Confirm VIP Tour Booking
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};
