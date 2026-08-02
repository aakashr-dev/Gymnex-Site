import React, { useState } from 'react';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge, Modal } from '../../components/ui/UIComponents';
import { MOCK_TRAINERS } from '../../data/mockData';
import { Award, Star, Calendar, Mail, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainersPage = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleBookSession = () => {
    toast.success(`Consultation request sent for ${selectedTrainer?.name}!`);
    setSelectedTrainer(null);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Master Staff"
            title="THE WORLD'S ELITE COACHING FACULTY"
            subtitle="Former Olympic weightlifting practitioners, biomechanical scientists, and elite physique specialists."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TRAINERS.map((trainer) => (
              <StaggerItem key={trainer.id}>
                <Card className="text-center space-y-5 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-2 border-crimson-500/60 p-1 shadow-crimson-glow">
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-display uppercase">{trainer.name}</h3>
                      <p className="text-xs text-crimson-500 font-semibold">{trainer.role}</p>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{trainer.rating} Rating</span>
                      <span className="text-gray-500">({trainer.clientsCount} Clients)</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{trainer.bio}</p>
                    <div className="space-y-1 text-left pt-3 border-t border-white/10">
                      <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, idx) => (
                          <Badge key={idx} variant="gray" className="text-[10px]">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedTrainer(trainer)}
                    >
                      Book 1-on-1 Session
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Booking Consultation Modal */}
        <Modal
          isOpen={!!selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          title={`Book Coaching Session: ${selectedTrainer?.name}`}
        >
          {selectedTrainer && (
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <img src={selectedTrainer.avatar} alt={selectedTrainer.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-white font-display uppercase">{selectedTrainer.name}</h4>
                  <p className="text-xs text-crimson-500">{selectedTrainer.specialty}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-gray-400">Select Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-gray-400">Primary Athletic Goal</label>
                <textarea
                  rows={3}
                  placeholder="Describe your current lifting stats and goals..."
                  className="w-full px-3 py-2 bg-dark-card border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-crimson-500"
                />
              </div>
              <Button variant="primary" size="md" className="w-full" onClick={handleBookSession}>
                Confirm Reservation Request
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </PageTransition>
  );
};
