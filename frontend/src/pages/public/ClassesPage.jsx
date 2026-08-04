import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge, Modal, CircularCard, AtmosphericBackground } from '../../components/ui/UIComponents';
import { MOCK_CLASSES } from '../../data/mockData';
import { Clock, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export const ClassesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeBookingClass, setActiveBookingClass] = useState(null);

  const categories = ['All', 'Cardio', 'Strength', 'Recovery'];

  const filteredClasses = selectedCategory === 'All'
    ? MOCK_CLASSES
    : MOCK_CLASSES.filter(c => c.category === selectedCategory);

  const handleConfirmReservation = () => {
    toast.success(`Spot reserved in ${activeBookingClass?.title}!`);
    setActiveBookingClass(null);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen relative overflow-hidden">
        <AtmosphericBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

          {/* Header Banner matching reference screenshot design */}
          <div className="relative pt-6 pb-6 overflow-hidden rounded-3xl bg-black/90 border border-white/10 shadow-2xl">
            {/* Seamless Right-Aligned Clean Muscular Lifter Background */}
            <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full overflow-hidden pointer-events-none z-0">
              <motion.img
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: [1, 1.03, 1] }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
                }}
                src="/classes-hero-clean.png"
                alt="Live Class Timetable Lifter"
                className="w-full h-full object-cover object-center filter contrast-125 brightness-110"
              />

              {/* Overhead Spotlight Glow */}
              <motion.div
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.15, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-[25%] w-72 h-72 bg-amber-400/20 blur-3xl rounded-full"
              />

              {/* Seamless Dark Blending Gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 lg:via-black/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
            </div>

            {/* Header Content Overlay */}
            <div className="relative z-10 max-w-2xl px-6 sm:px-10 py-6 space-y-6">
              {/* Yellow Pill Bar Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-amber-400 rounded-sm inline-block shadow-amber-500/50"></span>
                <span className="text-xs font-black uppercase tracking-widest text-white font-sans">PRO SELECTED</span>
              </div>

              {/* Big Bold Impact Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase font-display tracking-tight leading-[0.95]">
                LIVE CLASS TIMETABLE & RESERVATIONS
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed font-sans font-normal">
                High-octane spin sessions, Olympic barbell labs, and deep fascial recovery classes led by master coaches.
              </p>

              {/* Filter Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {categories.map((cat) => {
                  const catUpper = cat.toUpperCase();
                  const isActive = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-7 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 scale-105'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-amber-400/50 hover:bg-white/10'
                      }`}
                    >
                      {catUpper}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Classes Grid with Circular Photo Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredClasses.map((cls) => (
              <StaggerItem key={cls.id}>
                <Card className="flex flex-col justify-between h-full space-y-6">
                  <CircularCard
                    image={cls.image}
                    title={cls.title}
                    description={`Room: ${cls.room} | Instructor: ${cls.instructor}`}
                  />
                  <div className="space-y-3 text-xs text-gray-300 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-semibold uppercase">Schedule:</span>
                      <span className="font-bold text-white">{cls.time} ({cls.days})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-semibold uppercase">Capacity:</span>
                      <span className="font-bold text-white">{cls.capacity - cls.booked} Seats Available</span>
                    </div>
                    <Button
                      variant={cls.booked >= cls.capacity ? 'dark' : 'primary'}
                      size="sm"
                      className="w-full mt-2"
                      disabled={cls.booked >= cls.capacity}
                      onClick={() => setActiveBookingClass(cls)}
                    >
                      {cls.booked >= cls.capacity ? 'Class Full' : 'Reserve Spot'}
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Reservation Modal */}
        <Modal
          isOpen={!!activeBookingClass}
          onClose={() => setActiveBookingClass(null)}
          title={`Reserve Spot: ${activeBookingClass?.title}`}
        >
          {activeBookingClass && (
            <div className="space-y-4 text-sm text-gray-300">
              <p>You are booking a spot for <strong className="text-white">{activeBookingClass.title}</strong> held at {activeBookingClass.room}.</p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                <p>Time: <span className="text-white font-semibold">{activeBookingClass.time}</span></p>
                <p>Instructor: <span className="text-white font-semibold">{activeBookingClass.instructor}</span></p>
              </div>
              <Button variant="primary" size="md" className="w-full" onClick={handleConfirmReservation}>
                Confirm Reservation
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
};
