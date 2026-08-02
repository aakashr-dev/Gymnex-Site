import React, { useState } from 'react';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge, Modal } from '../../components/ui/UIComponents';
import { MOCK_PROGRAMS } from '../../data/mockData';
import { Dumbbell, Clock, Flame, Award, ChevronRight } from 'lucide-react';

export const ProgramsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProgram, setActiveModalProgram] = useState(null);

  const categories = ['All', 'Hypertrophy & Strength', 'Metabolic Fat Loss', 'Mobility & Flex'];

  const filteredPrograms = selectedCategory === 'All'
    ? MOCK_PROGRAMS
    : MOCK_PROGRAMS.filter(p => p.category === selectedCategory);

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Master Catalog"
            title="ATHLETIC TRAINING SYSTEMS"
            subtitle="Scientific periodization protocols engineered for muscle hypertrophy, fat oxidation, and maximal output."
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-crimson-500 text-white shadow-crimson-sm'
                    : 'bg-dark-card border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <StaggerItem key={program.id}>
                <Card className="p-0 overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="crimson">{program.level}</Badge>
                        <Badge variant="gray">{program.category}</Badge>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-extrabold text-white font-display uppercase group-hover:text-crimson-500 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{program.description}</p>
                      <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Instructor:</span>
                          <span className="font-semibold">{program.instructor}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-semibold">{program.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Frequency:</span>
                          <span className="font-semibold">{program.workoutsPerWeek} sessions / wk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Button
                      variant="glass"
                      size="sm"
                      className="w-full"
                      onClick={() => setActiveModalProgram(program)}
                    >
                      View Curriculum Specs
                    </Button>
                  </div>
                </Card>
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
                src={activeModalProgram.image}
                alt={activeModalProgram.title}
                className="w-full h-48 rounded-xl object-cover"
              />
              <p>{activeModalProgram.description}</p>
              <div className="p-4 rounded-xl bg-white/5 space-y-2 border border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-crimson-500">Target Adaptation</h4>
                <p className="text-xs">{activeModalProgram.target}</p>
                <p className="text-xs text-gray-400">Includes {activeModalProgram.exercisesCount} progressive video exercise guides & RPE auto-calculator.</p>
              </div>
              <div className="pt-2">
                <Button variant="primary" size="md" className="w-full" onClick={() => setActiveModalProgram(null)}>
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
