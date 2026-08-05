import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem, AnimationSection } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Modal, AtmosphericBackground } from '../../components/ui/UIComponents';
import { MOCK_PROGRAMS } from '../../data/mockData';
import { api } from '../../services/api';
import { Dumbbell, Clock, Flame, Award, Activity, Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProgramsPage = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProgram, setActiveModalProgram] = useState(null);

  useEffect(() => {
    const fetchLivePrograms = async () => {
      const data = await api.getPrograms();
      if (data && data.length > 0) {
        // Deduplicate programs by title to prevent repeated cards
        const unique = Array.from(
          new Map(data.map((item) => [item.title?.toLowerCase().trim() || item._id || item.id, item])).values()
        );
        setPrograms(unique);
      } else {
        const uniqueMock = Array.from(
          new Map(MOCK_PROGRAMS.map((item) => [item.title?.toLowerCase().trim() || item.id, item])).values()
        );
        setPrograms(uniqueMock);
      }
    };
    fetchLivePrograms();
  }, []);

  const categories = ['All', 'Muscle & Mass Building', 'Strength & Powerlifting', 'Fat Loss & Shredding', 'Transformation & Body Sculpting', 'Functional & Calisthenics', 'Recovery & Mobility'];

  const rawFiltered = selectedCategory === 'All'
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  const filteredPrograms = Array.from(
    new Map(rawFiltered.map((p) => [p.title?.toLowerCase().trim() || p._id || p.id, p])).values()
  );

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen relative overflow-hidden">
        <AtmosphericBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Header Section with Right-Aligned Seamless Battle Ropes Background */}
          <div className="relative pt-4 pb-2">
            {/* Seamless Right-Side Battle Ropes Athlete Background */}
            <div className="absolute top-0 right-0 w-full lg:w-3/4 h-[460px] lg:h-[520px] -mt-10 overflow-hidden pointer-events-none z-0">
              <motion.img
                initial={{ opacity: 0, scale: 1.08, x: 50 }}
                animate={{ opacity: 1, scale: [1, 1.04, 1], x: 0 }}
                transition={{
                  opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
                }}
                src="/battle-ropes.jpg"
                alt="GYMNEX Athletic Training Systems Battle Ropes Athlete"
                className="w-full h-full object-cover object-right filter contrast-125 brightness-110"
              />

              {/* Pulsing Overhead Gym Spotlight Glow */}
              <motion.div
                animate={{ opacity: [0.35, 0.8, 0.35], scale: [0.95, 1.15, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-[20%] w-56 h-56 bg-white/20 blur-3xl rounded-full"
              />

              {/* Seamless Blending Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-dark-base via-dark-base/85 lg:via-dark-base/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-dark-base/60 z-10" />
            </div>

            {/* Header Content & Filter Buttons */}
            <div className="relative z-10 max-w-2xl space-y-8">
              <AnimationSection direction="up" delay={0.1}>
                <SectionHeader
                  eyebrow="Master Catalog"
                  title="ATHLETIC TRAINING SYSTEMS"
                  subtitle="Scientific periodization protocols engineered for muscle hypertrophy, fat oxidation, and maximal output."
                />
              </AnimationSection>

              {/* Filter Bar with Motion Animations */}
              <AnimationSection direction="up" delay={0.2} className="flex flex-wrap items-center gap-3 pt-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-black font-extrabold shadow-crimson-sm scale-105'
                        : 'bg-dark-card border border-white/10 text-gray-300 hover:text-white hover:border-amber-500/50'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </AnimationSection>
            </div>
          </div>

          {/* Programs Grid with Motion Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <StaggerItem key={program._id || program.id || program.programId}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-0 overflow-hidden group flex flex-col justify-between h-full hover:border-amber-500/50 transition-colors shadow-2xl">
                    <div>
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={program.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'}
                          alt={program.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 bg-amber-500/90 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                          {program.level || 'Master Track'}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-extrabold text-white font-display uppercase group-hover:text-amber-500 transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">{program.description}</p>
                        <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 font-semibold uppercase">Instructor:</span>
                            <span className="font-bold text-amber-400">{program.instructor || program.trainerName || 'Master Staff'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 font-semibold uppercase">Duration:</span>
                            <span className="font-bold text-white">{program.duration || '8 Weeks'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 font-semibold uppercase">Frequency:</span>
                            <span className="font-bold text-amber-400">{program.workoutsPerWeek || 5} sessions / wk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => setActiveModalProgram(program)}
                        icon={ArrowRight}
                      >
                        View Curriculum Specs
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Curriculum Modal */}
        <Modal
          isOpen={!!activeModalProgram}
          onClose={() => setActiveModalProgram(null)}
          title={activeModalProgram?.title || 'Program Overview'}
        >
          {activeModalProgram && (
            <div className="space-y-6 text-sm text-gray-300">
              <img
                src={activeModalProgram.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'}
                alt={activeModalProgram.title}
                className="w-full h-48 rounded-xl object-cover"
              />
              <p>{activeModalProgram.description}</p>
              <div className="p-4 rounded-xl bg-white/5 space-y-2 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">Target Adaptation</h4>
                <p className="text-xs">{activeModalProgram.target || 'Hypertrophy & Strength Conditioning'}</p>
                <p className="text-xs text-gray-400">Includes {activeModalProgram.exercisesCount || 12} progressive video exercise guides & RPE auto-calculator.</p>
              </div>
              <div className="pt-2">
                <Button variant="primary" size="md" className="w-full" onClick={() => { setActiveModalProgram(null); navigate('/membership'); }}>
                  Enroll In This Program
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
};
