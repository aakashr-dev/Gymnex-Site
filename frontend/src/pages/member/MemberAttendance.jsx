import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, StatCard } from '../../components/ui/UIComponents';
import { Flame, Calendar, CheckCircle2 } from 'lucide-react';

export const MemberAttendance = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">PERSONAL VISIT HISTORY & STREAK</h1>
          <p className="text-xs text-gray-400">Verifiable turnstile entry logs and monthly streak heat-map.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Active Visit Streak" value="14" suffix=" Days" icon={Flame} />
          <StatCard title="Total Facility Check-Ins" value="84" icon={Calendar} />
        </div>

        <Card className="space-y-4">
          <h3 className="text-lg font-bold text-white font-display uppercase">Recent Facility Entry Logs</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="font-semibold text-white">GYMNEX Manhattan Flagship — Main Arena</span>
              <span className="text-gray-400">Today @ 08:42 AM</span>
              <Badge variant="green font-mono">ID: QR-99210</Badge>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="font-semibold text-white">GYMNEX Manhattan Flagship — Main Arena</span>
              <span className="text-gray-400">Yesterday @ 07:15 AM</span>
              <Badge variant="green font-mono">ID: QR-99210</Badge>
            </div>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
