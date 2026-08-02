import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_TRAINERS } from '../../data/mockData';
import { Star, Users, Calendar, Plus } from 'lucide-react';

export const AdminTrainers = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">TRAINER MANAGEMENT</h1>
            <p className="text-xs text-gray-400">Roster of master strength staff, client distribution, and rating metrics.</p>
          </div>
          <Button variant="primary" size="sm" icon={Plus}>Add Trainer</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TRAINERS.map((trainer) => (
            <Card key={trainer.id} className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={trainer.avatar} alt={trainer.name} className="w-14 h-14 rounded-full object-cover border-2 border-crimson-500/50" />
                <div>
                  <h3 className="text-base font-bold text-white font-display uppercase">{trainer.name}</h3>
                  <p className="text-xs text-crimson-500 font-semibold">{trainer.specialty}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div>
                  <p className="text-gray-400">Assigned Clients</p>
                  <p className="text-lg font-bold text-white font-display">{trainer.clientsCount}</p>
                </div>
                <div>
                  <p className="text-gray-400">Rating</p>
                  <p className="text-lg font-bold text-amber-400 font-display flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-current" /> {trainer.rating}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                <p><strong>Schedule:</strong> {trainer.schedule}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
