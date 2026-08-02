import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { Download, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export const MemberPayments = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">BILLING & INVOICE RECEIPTS</h1>
          <p className="text-xs text-gray-400">Download billing receipts and manage saved payment methods.</p>
        </div>

        <Card className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div>
              <p className="font-bold text-white uppercase font-display">Crimson Elite Pass - Aug 2026</p>
              <p className="text-gray-400">$189.00 billed to Visa ending 4242</p>
            </div>
            <Button variant="glass" size="sm" onClick={() => toast.success('Downloading PDF receipt...')} icon={Download}>
              PDF Receipt
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
