import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { StatCard, Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS } from '../../data/mockData';
import { Users, Calendar, Dumbbell, Activity, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrainerOverview = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">COACH CONSOLE OVERVIEW</h1>
            <p className="text-xs text-gray-400">Assigned 1-on-1 athletes, today's schedule, and workout approvals.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/trainer/workout-builder')} icon={Plus}>
            Prescribe Routine
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Assigned Active Athletes" value="28" icon={Users} />
          <StatCard title="Today's Scheduled Sessions" value="6" icon={Calendar} />
          <StatCard title="Routines Prescribed" value="42" icon={Dumbbell} />
          <StatCard title="Average Client PR Gain" value="18" suffix="%" icon={Activity} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display uppercase">Today's Client Sessions</h3>
            <div className="space-y-3">
              {MOCK_MEMBERS.slice(0, 3).map((mem) => (
                <div key={mem.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={mem.avatar} alt={mem.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-white uppercase font-display">{mem.name}</p>
                      <p className="text-gray-400">Target: Heavy Squat & Biomechanics</p>
                    </div>
                  </div>
                  <Badge variant="crimson">09:00 AM</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display uppercase">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="dark" size="sm" onClick={() => navigate('/trainer/workout-builder')}>
                Workout Builder
              </Button>
              <Button variant="dark" size="sm" onClick={() => navigate('/trainer/nutrition-planner')}>
                Nutrition Planner
              </Button>
              <Button variant="dark" size="sm" onClick={() => navigate('/trainer/clients')}>
                Client Roster
              </Button>
              <Button variant="dark" size="sm" onClick={() => navigate('/trainer/progress')}>
                Track Progress
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};
