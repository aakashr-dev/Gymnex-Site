import React from 'react';
import { PageTransition, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge } from '../../components/ui/UIComponents';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export const EventsPage = () => {
  const events = [
    {
      id: 'evt-1',
      title: 'WORLD POWERLIFTING MASTERCLASS',
      date: 'AUG 18, 2026',
      time: '09:00 AM - 04:00 PM',
      location: 'GYMNEX Manhattan Arena',
      speaker: 'Marcus Vance & Olympic Coaches',
      category: 'Workshop',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'evt-2',
      title: 'METABOLIC CONDITIONING EXPO 2026',
      date: 'SEP 05, 2026',
      time: '10:00 AM - 06:00 PM',
      location: 'GYMNEX Beverly Hills Sanctuary',
      speaker: 'Sarah Jenkins & Guest Athletes',
      category: 'Expo',
      price: '$99',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Special Gatherings"
            title="UPCOMING ATHLETIC EVENTS & EXPOS"
            subtitle="Participate in world-class seminars, powerlifting summits, and physical culture workshops."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((evt) => (
              <StaggerItem key={evt.id}>
                <Card className="p-0 overflow-hidden flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-60 overflow-hidden">
                      <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="crimson">{evt.category}</Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-dark-base/90 border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white">
                        {evt.price}
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-extrabold text-white font-display uppercase">{evt.title}</h3>
                      <div className="space-y-2 text-xs text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-crimson-500" />
                          <span>{evt.date} ({evt.time})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-crimson-500" />
                          <span>{evt.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-crimson-500" />
                          <span>Keynote: <strong className="text-white">{evt.speaker}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => toast.success(`Registered for ${evt.title}!`)}
                    >
                      Register Pass Now
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
};
