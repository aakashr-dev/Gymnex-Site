import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_EQUIPMENT } from '../../data/mockData';
import { Wrench, Plus } from 'lucide-react';

export const AdminEquipment = () => {
  const columns = [
    { header: 'Machine / Rig Name', accessorKey: 'name' },
    { header: 'Facility Zone', accessorKey: 'zone' },
    { header: 'Status', accessorKey: 'status', render: (r) => <Badge variant={r.status === 'Operational' ? 'green' : 'amber'}>{r.status}</Badge> },
    { header: 'Last Serviced', accessorKey: 'lastService' },
    { header: 'Next Due', accessorKey: 'nextService' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">EQUIPMENT & ASSET INVENTORY</h1>
            <p className="text-xs text-gray-400">Track machinery operational status, power rack safety maintenance, and service logs.</p>
          </div>
          <Button variant="primary" size="sm" icon={Plus}>Log Asset</Button>
        </div>

        <Card>
          <DataTable columns={columns} data={MOCK_EQUIPMENT} />
        </Card>
      </div>
    </PageTransition>
  );
};
