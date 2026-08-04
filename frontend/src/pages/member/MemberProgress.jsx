import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const bodyData = [
  { week: 'W1', weight: 85.0, fat: 16.2 },
  { week: 'W2', weight: 84.2, fat: 15.6 },
  { week: 'W3', weight: 83.5, fat: 15.0 },
  { week: 'W4', weight: 82.5, fat: 14.2 },
];

export const MemberProgress = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">MY BODY COMPOSITION & PRS</h1>
            <p className="text-xs text-gray-400">Track body weight loss, body fat reduction, and 1RM strength PRs.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => toast.success('Log metric modal opened!')} icon={Plus}>
            Log Body Weight
          </Button>
        </div>

        <Card className="space-y-4">
          <h3 className="text-lg font-bold text-white font-display uppercase">Body Weight Trend (kg)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bodyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="weight" stroke="#F5A623" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
