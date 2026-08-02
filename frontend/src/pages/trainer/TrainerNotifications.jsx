import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge } from '../../components/ui/UIComponents';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';

export const TrainerNotifications = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">TRAINER ALERTS & NOTIFICATIONS</h1>
          <p className="text-xs text-gray-400">Schedule updates, client workout logs, and system broadcasts.</p>
        </div>

        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map((n) => (
            <Card key={n.id} className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-display uppercase">{n.title}</h4>
                <p className="text-xs text-gray-400">{n.message}</p>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">{n.date}</span>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
