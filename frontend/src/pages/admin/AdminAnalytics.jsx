import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, StatCard } from '../../components/ui/UIComponents';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const classPopularity = [
  { name: 'Spin Velocity', count: 420 },
  { name: 'Barbell Lab', count: 380 },
  { name: 'Hyper-Mobility', count: 290 },
  { name: 'Boxfit Interval', count: 210 },
];

const revenueSplit = [
  { name: 'VIP Crimson', value: 55, color: '#F5A623' },
  { name: 'Core Access', value: 25, color: '#4b5563' },
  { name: 'VIP Black', value: 20, color: '#FFB800' },
];

export const AdminAnalytics = () => {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">ENTERPRISE REPORTS & ANALYTICS</h1>
          <p className="text-xs text-gray-400">Deep biometric attendance metrics, tier revenue breakdown, and class booking frequency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display uppercase">Class Attendance Popularity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPopularity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="#F5A623" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display uppercase">Membership Tier Revenue Split</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={revenueSplit} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                    {revenueSplit.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};
