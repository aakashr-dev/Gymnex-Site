import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { MOCK_TRAINERS } from '../../data/mockData';
import { User, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerProfile = () => {
  const trainer = MOCK_TRAINERS[0];

  return (
    <PageTransition>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">COACH PROFILE & AVAILABILITY</h1>
          <p className="text-xs text-gray-400">Update your public biography, specializations, and working hours.</p>
        </div>

        <Card className="space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            <img src={trainer.avatar} alt={trainer.name} className="w-16 h-16 rounded-full object-cover border-2 border-crimson-500" />
            <div>
              <h3 className="text-xl font-bold text-white font-display uppercase">{trainer.name}</h3>
              <p className="text-xs text-crimson-500 font-semibold">{trainer.role}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-400 uppercase mb-1">Public Bio</label>
              <textarea rows={3} defaultValue={trainer.bio} className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
            </div>
            <div>
              <label className="block font-semibold text-gray-400 uppercase mb-1">Working Availability Hours</label>
              <input type="text" defaultValue={trainer.schedule} className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
            </div>
            <Button variant="primary" size="md" icon={Save} onClick={() => toast.success('Profile updated successfully!')} className="w-full">
              Save Profile Changes
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
