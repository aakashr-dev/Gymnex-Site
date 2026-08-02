import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS } from '../../data/mockData';
import { QrCode, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminAttendance = () => {
  const columns = [
    { header: 'Member', accessorKey: 'name' },
    { header: 'Pass Code', accessorKey: 'qrCode', render: (row) => <span className="font-mono text-xs text-crimson-500">{row.qrCode}</span> },
    { header: 'Last Check-In Time', accessorKey: 'time', render: () => 'Today 08:42 AM' },
    { header: 'Turnstile Zone', accessorKey: 'zone', render: () => 'Main Platform Arena' },
    { header: 'Status', accessorKey: 'status', render: () => <Badge variant="green">Verified Access</Badge> },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">FACILITY ATTENDANCE & QR LOGS</h1>
            <p className="text-xs text-gray-400">Live turnstile scan stream and peak density monitoring.</p>
          </div>
          <Button variant="primary" size="sm" icon={QrCode} onClick={() => toast.success('Simulated Turnstile QR Scan Success!')}>
            Scan Pass Simulator
          </Button>
        </div>

        <Card>
          <DataTable columns={columns} data={MOCK_MEMBERS} />
        </Card>
      </div>
    </PageTransition>
  );
};
