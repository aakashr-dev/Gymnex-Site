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
  const [activeModalProgram, setActiveModalProgram] = useState(null);

  useEffect(() => {
    const fetchLivePrograms = async () => {
      try {
        const data = await api.getPrograms();
        let list = [];
        if (Array.isArray(data) && data.length > 0) {
          list = [...data];
        }
        // Fill missing items from MOCK_PROGRAMS to ensure rich cards for all categories
        const missingFromMock = MOCK_PROGRAMS.filter(
          (m) => !list.some((item) => (item.title || '').toLowerCase().trim() === (m.title || '').toLowerCase().trim())
        );
        const combined = [...list, ...missingFromMock];
        const unique = Array.from(
          new Map(combined.map((item) => [(item.title || '').toLowerCase().trim() || item._id || item.id || item.programId, item])).values()
        );
        setPrograms(unique);
      } catch (err) {
        console.error('Failed to fetch programs:', err);
        setPrograms(MOCK_PROGRAMS);
      }
    };
    fetchLivePrograms();
  }, []);

  const displayPrograms = Array.from(
    new Map(programs.map((p) => [(p.title || '').toLowerCase().trim() || p._id || p.id || p.programId, p])).values()
  ).slice(0, 9);

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen relative overflow-hidden">
        <AtmosphericBackground />

        {/* Full-Width Hero Background Image with Seamless Bottom Gradient Dissolve */}
        <div className="absolute top-0 left-0 right-0 w-full h-[650px] lg:h-[750px] overflow-hidden pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_98%)]">
          <motion.img
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: [1, 1.05, 1] }}
            transition={{
              opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
            }}
            src="/battle-ropes.jpg"
            alt="GYMNEX Athletic Training Systems Battle Ropes Athlete"
            className="w-full h-full object-cover object-center filter contrast-125 brightness-95"
          />

          {/* Pulsing Overhead Gym Spotlight Glow */}
          <motion.div
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.15, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-[25%] w-72 h-72 bg-amber-500/20 blur-3xl rounded-full"
          />

          {/* Horizontal Text Readability Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-base via-dark-base/85 lg:via-dark-base/70 to-dark-base/40 z-10" />

          {/* Top & Bottom Seamless Dark Dissolve Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-base/60 via-transparent via-60% to-dark-base z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-dark-base z-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Header Section */}
          <div className="relative pt-4 pb-2">
            {/* Header Content */}
            <div className="relative z-10 max-w-2xl space-y-8">
              <AnimationSection direction="up" delay={0.1}>
                <SectionHeader
                  eyebrow="Master Catalog"
                  title="ATHLETIC TRAINING SYSTEMS"
                  subtitle="Scientific periodization protocols engineered for muscle hypertrophy, fat oxidation, and maximal output."
                />
              </AnimationSection>
            </div>
          </div>

          {/* Programs Grid with Motion Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {displayPrograms.map((program, index) => {
              const programImg = (program.image && program.image.startsWith('/program-'))
                ? program.image
                : `/program-${(index % 7) + 1}.jpg`;

              return (
                <StaggerItem key={program._id || program.id || program.programId} className="h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="p-0 overflow-hidden group flex flex-col justify-between h-full hover:border-amber-500/50 transition-colors shadow-2xl">
                      <div className="flex flex-col flex-1">
                        <div className="relative h-60 overflow-hidden">
                          <img
                            src={programImg}
                            alt={program.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-110 brightness-95"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                        </div>
                      <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
                        <div className="space-y-2">
                          <h3 className="text-lg font-extrabold text-white font-display uppercase group-hover:text-amber-500 transition-colors line-clamp-2 h-14 flex items-center">
                            {program.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 h-9">
                            {program.description}
                          </p>
                        </div>
                        <div className="space-y-2.5 text-xs text-gray-300 pt-3 border-t border-white/10 mt-auto">
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
            );
          })}
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
