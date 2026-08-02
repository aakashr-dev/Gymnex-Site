import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_PAYMENTS } from '../../data/mockData';
import { Download, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminPayments = () => {
  const columns = [
    { header: 'Invoice ID', accessorKey: 'id', render: (r) => <span className="font-mono text-xs text-crimson-500 font-bold">{r.id}</span> },
    { header: 'Member Name', accessorKey: 'memberName' },
    { header: 'Item / Subscription', accessorKey: 'item' },
    { header: 'Amount', accessorKey: 'amount', render: (r) => <span className="font-bold text-white">{r.amount}</span> },
    { header: 'Payment Method', accessorKey: 'method' },
    { header: 'Status', accessorKey: 'status', render: (r) => <Badge variant={r.status === 'Paid' ? 'green' : 'amber'}>{r.status}</Badge> },
    {
      header: 'Action',
      accessorKey: 'action',
      render: (r) => (
        <Button variant="glass" size="sm" onClick={() => toast.success(`Downloading PDF Invoice ${r.id}...`)}>
          Receipt PDF
        </Button>
      )
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">PAYMENT & INVOICE MANAGEMENT</h1>
          <p className="text-xs text-gray-400">Transaction history, recurring billing logs, and invoice exports.</p>
        </div>

        <Card>
          <DataTable columns={columns} data={MOCK_PAYMENTS} />
        </Card>
      </div>
    </PageTransition>
  );
};
