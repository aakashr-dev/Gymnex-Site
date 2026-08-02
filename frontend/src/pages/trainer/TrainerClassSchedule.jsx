import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_CLASSES } from '../../data/mockData';
import { Calendar, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerClassSchedule = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">MY LED CLASSES & ROSTERS</h1>
          <p className="text-xs text-gray-400">Classes assigned to your coaching schedule and live attendee rosters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_CLASSES.slice(0, 2).map((cls) => (
            <Card key={cls.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="crimson">{cls.category}</Badge>
                <span className="text-xs text-gray-400 font-semibold">{cls.time}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display uppercase">{cls.title}</h3>
              <p className="text-xs text-gray-400">Room: {cls.room}</p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span>Booked Athletes:</span>
                <span className="font-bold text-white">{cls.booked} / {cls.capacity} Seats Reserved</span>
              </div>
              <Button variant="glass" size="sm" onClick={() => toast.success('Attendance marked for all present athletes!')} className="w-full">
                Mark Class Attendance
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
