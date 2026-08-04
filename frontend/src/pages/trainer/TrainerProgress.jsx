import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge } from '../../components/ui/UIComponents';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const progressData = [
  { week: 'W1', squat: 140, bodyFat: 16.5 },
  { week: 'W2', squat: 145, bodyFat: 16.0 },
  { week: 'W3', squat: 150, bodyFat: 15.4 },
  { week: 'W4', squat: 157.5, bodyFat: 14.8 },
  { week: 'W5', squat: 162.5, bodyFat: 14.2 },
];

export const TrainerProgress = () => {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">CLIENT PROGRESS TRACKER</h1>
          <p className="text-xs text-gray-400">Monitor strength PR velocity and body composition trends for Alexander Wright.</p>
        </div>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display uppercase">Squat 1RM vs Body Fat % Trend</h3>
            <Badge variant="amber">Alexander Wright</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="squat" name="Squat (kg)" stroke="#F5A623" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
