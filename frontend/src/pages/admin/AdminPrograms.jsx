import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_PROGRAMS } from '../../data/mockData';
import { api } from '../../services/api';
import { Plus, Dumbbell } from 'lucide-react';

export const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchLivePrograms = async () => {
      try {
        const data = await api.getPrograms();
        let list = Array.isArray(data) && data.length > 0 ? data : MOCK_PROGRAMS;
        const unique = Array.from(
          new Map(list.map((item) => [(item.title || '').toLowerCase().trim() || item._id || item.id || item.programId, item])).values()
        );
        setPrograms(unique);
      } catch (err) {
        setPrograms(MOCK_PROGRAMS);
      }
    };
    fetchLivePrograms();
  }, []);

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
          {programs.map((prog, index) => {
            const progImg = (prog.image && prog.image.startsWith('/program-'))
              ? prog.image
              : `/program-${(index % 7) + 1}.jpg`;
            return (
              <Card key={prog._id || prog.id || prog.programId} className="space-y-3">
                <img src={progImg} alt={prog.title} className="w-full h-40 rounded-xl object-cover" />
                <Badge variant="crimson">{prog.level || 'Intermediate'}</Badge>
                <h3 className="text-base font-bold text-white font-display uppercase">{prog.title}</h3>
                <p className="text-xs text-gray-400">{prog.description}</p>
                <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                  <span>{prog.duration || '8 Weeks'}</span>
                  <span>{prog.exercisesCount || 12} Exercises Prescribed</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
};
