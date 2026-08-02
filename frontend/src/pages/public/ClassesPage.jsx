import React, { useState } from 'react';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge, Modal } from '../../components/ui/UIComponents';
import { MOCK_CLASSES } from '../../data/mockData';
import { Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';
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
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Group Performance"
            title="LIVE CLASS TIMETABLE & RESERVATIONS"
            subtitle="High-octane spin sessions, Olympic barbell labs, and deep fascial recovery classes led by master coaches."
          />

          {/* Filter Bar */}
          <div className="flex items-center gap-3">
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

          {/* Classes Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredClasses.map((cls) => (
              <StaggerItem key={cls.id}>
                <Card className="p-0 overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cls.image}
                        alt={cls.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="crimson">{cls.intensity} Intensity</Badge>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-extrabold text-white font-display uppercase group-hover:text-crimson-500 transition-colors">
                        {cls.title}
                      </h3>
                      <div className="space-y-2 text-xs text-gray-300">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-crimson-500" />
                          <span>{cls.time} ({cls.days})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-crimson-500" />
                          <span>{cls.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-crimson-500" />
                          <span>Instructor: <strong className="text-white">{cls.instructor}</strong></span>
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-white/10">
                        <span>Available Spots:</span>
                        <span className="font-semibold text-white">{cls.capacity - cls.booked} / {cls.capacity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Button
                      variant={cls.booked >= cls.capacity ? 'dark' : 'primary'}
                      size="sm"
                      className="w-full"
                      disabled={cls.booked >= cls.capacity}
                      onClick={() => setActiveBookingClass(cls)}
                    >
                      {cls.booked >= cls.capacity ? 'Class Full' : 'Reserve Seat'}
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
