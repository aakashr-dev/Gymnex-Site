import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS } from '../../data/mockData';
import { CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerAttendance = () => {
  const columns = [
    { header: 'Athlete', accessorKey: 'name' },
    { header: 'Session Type', accessorKey: 'type', render: () => '1-on-1 Biomechanics Session' },
    { header: 'Scheduled Time', accessorKey: 'time', render: () => 'Today 09:00 AM' },
    {
      header: 'Status',
      accessorKey: 'action',
      render: () => (
        <Button variant="glass" size="sm" onClick={() => toast.success('Completed Session Logged!')} icon={CheckCircle2}>
          Log Complete
        </Button>
      )
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">1-ON-1 ATTENDANCE LOG</h1>
          <p className="text-xs text-gray-400">Log personal training session completions for client billing verification.</p>
        </div>

        <Card>
          <DataTable columns={columns} data={MOCK_MEMBERS} />
        </Card>
      </div>
    </PageTransition>
  );
};
