import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_PROGRAMS } from '../../data/mockData';
import { Plus, Dumbbell } from 'lucide-react';

export const AdminPrograms = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">MASTER WORKOUT PROGRAMS</h1>
            <p className="text-xs text-gray-400">Library of prescribed periodization systems and athletic tracks.</p>
          </div>
          <Button variant="primary" size="sm" icon={Plus}>Create Program</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PROGRAMS.map((prog) => (
            <Card key={prog.id} className="space-y-3">
              <img src={prog.image} alt={prog.title} className="w-full h-40 rounded-xl object-cover" />
              <Badge variant="crimson">{prog.level}</Badge>
              <h3 className="text-base font-bold text-white font-display uppercase">{prog.title}</h3>
              <p className="text-xs text-gray-400">{prog.description}</p>
              <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                <span>{prog.duration}</span>
                <span>{prog.exercisesCount} Exercises Prescribed</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
