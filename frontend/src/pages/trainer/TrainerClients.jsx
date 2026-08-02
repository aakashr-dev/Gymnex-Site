import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS } from '../../data/mockData';
import { Dumbbell, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrainerClients = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'Athlete',
      accessorKey: 'name',
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-white">{r.name}</p>
            <p className="text-[10px] text-gray-500">{r.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Tier Plan', accessorKey: 'plan', render: (r) => <Badge variant="crimson">{r.plan}</Badge> },
    { header: 'Current Weight', accessorKey: 'weight' },
    { header: 'Body Fat %', accessorKey: 'bodyFat' },
    { header: 'Streak', accessorKey: 'visitStreak', render: (r) => <span className="text-amber-400 font-bold">{r.visitStreak} Days</span> },
    {
      header: 'Prescribe',
      accessorKey: 'action',
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="glass" size="sm" onClick={() => navigate('/trainer/workout-builder')}>
            Routine
          </Button>
          <Button variant="glass" size="sm" onClick={() => navigate('/trainer/nutrition-planner')}>
            Macros
          </Button>
        </div>
      )
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">ASSIGNED ATHLETES</h1>
          <p className="text-xs text-gray-400">Roster of 1-on-1 clients under active biomechanical supervision.</p>
        </div>

        <Card>
          <DataTable columns={columns} data={MOCK_MEMBERS} />
        </Card>
      </div>
    </PageTransition>
  );
};
