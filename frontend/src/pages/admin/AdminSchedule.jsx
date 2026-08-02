import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_CLASSES } from '../../data/mockData';
import { Calendar, Plus } from 'lucide-react';

export const AdminSchedule = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">CLASS TIMETABLE SCHEDULER</h1>
            <p className="text-xs text-gray-400">Manage studio room availability, coach assignments, and class capacity.</p>
          </div>
          <Button variant="primary" size="sm" icon={Plus}>Add New Class</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CLASSES.map((cls) => (
            <Card key={cls.id} className="space-y-3">
              <Badge variant="crimson">{cls.category}</Badge>
              <h3 className="text-base font-bold text-white font-display uppercase">{cls.title}</h3>
              <p className="text-xs text-gray-400">Room: {cls.room}</p>
              <p className="text-xs text-gray-400">Coach: {cls.instructor}</p>
              <p className="text-xs text-crimson-500 font-semibold">{cls.time} ({cls.days})</p>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
