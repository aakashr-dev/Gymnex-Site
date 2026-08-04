import React, { useState, useEffect } from 'react';
import { PageTransition, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge, Modal, CircularCard, AtmosphericBackground } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { Star, RefreshCw, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const fetchLiveTrainers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTrainers();
      if (Array.isArray(data) && data.length > 0) {
        setTrainers(data);
      } else {
        setTrainers([]);
      }
    } catch (err) {
      console.error('Failed to fetch live trainers:', err);
      setError(err.message || 'Unable to connect to coaching database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveTrainers();
  }, []);

  const handleBookSession = () => {
    toast.success(`Consultation request sent for ${selectedTrainer?.name}!`);
    setSelectedTrainer(null);
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen relative">
        <AtmosphericBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <SectionHeader
            eyebrow="Master Staff"
            title="THE WORLD'S ELITE COACHING FACULTY"
            subtitle="Former Olympic weightlifting practitioners, biomechanical scientists, and elite physique specialists."
          />

          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Loading Master Coaching Faculty...</p>
            </div>
          ) : trainers.length === 0 ? (
            <div className="py-16 text-center bg-dark-card border border-white/10 rounded-3xl max-w-md mx-auto p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white uppercase font-display">Coaching Roster Temporarily Unavailable</p>
                <p className="text-xs text-gray-400">
                  {error || 'No active master trainers returned from backend API.'}
                </p>
              </div>
              <Button variant="glass" size="sm" onClick={fetchLiveTrainers} icon={RefreshCw} className="text-xs mx-auto">
                Retry Network Connection
              </Button>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {trainers.map((trainer) => (
                <StaggerItem key={trainer._id || trainer.id || trainer.trainerId}>
                  <Card className="flex flex-col justify-between h-full text-center space-y-6">
                    <CircularCard
                      image={trainer.photo || trainer.avatar}
                      title={trainer.name}
                      subtitle={trainer.role || trainer.specialization || trainer.specialty}
                      description={trainer.bio || `${trainer.experience || '5+ Years'} Experience Specialist`}
                    />
                    <div className="pt-2 border-t border-white/10">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
                        onClick={() => setSelectedTrainer(trainer)}
                      >
                        Book 1-on-1 Session
                      </Button>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>

        {/* BOOK SESSION MODAL */}
        {selectedTrainer && (
          <Modal
            isOpen={!!selectedTrainer}
            onClose={() => setSelectedTrainer(null)}
            title={`Book Consultation: ${selectedTrainer.name}`}
          >
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 space-y-1">
                <p><strong className="text-gray-300">Specialization:</strong> {selectedTrainer.specialization}</p>
                <p><strong className="text-gray-300">Experience:</strong> {selectedTrainer.experience}</p>
                <p><strong className="text-gray-300">Rating:</strong> ⭐ {selectedTrainer.rating || 4.9} / 5.0</p>
              </div>
              <p className="text-gray-400">Select your preferred date and time to reserve a private 1-on-1 biomechanical assessment.</p>
              <Button variant="primary" size="md" className="w-full bg-amber-500 text-black hover:bg-amber-400 font-bold" onClick={handleBookSession}>
                Confirm Reservation Request
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </PageTransition>
  );
};
