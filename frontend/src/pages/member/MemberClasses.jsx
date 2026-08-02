import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_CLASSES } from '../../data/mockData';
import { Calendar, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export const MemberClasses = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">CLASS RESERVATION CENTER</h1>
          <p className="text-xs text-gray-400">Reserve spots in Spin Velocity, Olympic Barbell Lab, and Deep Tissue Recovery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CLASSES.map((cls) => (
            <Card key={cls.id} className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="crimson">{cls.category}</Badge>
                <h3 className="text-lg font-bold text-white font-display uppercase">{cls.title}</h3>
                <div className="space-y-1 text-xs text-gray-400">
                  <p><Clock className="w-3.5 h-3.5 inline mr-1 text-crimson-500" />{cls.time}</p>
                  <p><MapPin className="w-3.5 h-3.5 inline mr-1 text-crimson-500" />{cls.room}</p>
                </div>
              </div>
              <Button variant="primary" size="sm" onClick={() => toast.success(`Booked ${cls.title}!`)} className="w-full">
                Reserve Seat
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
