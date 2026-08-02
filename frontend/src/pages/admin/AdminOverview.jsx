import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { StatCard, Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS, MOCK_PAYMENTS } from '../../data/mockData';
import { DollarSign, Users, Calendar, Activity, TrendingUp, Plus, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';

const chartData = [
  { month: 'Jan', revenue: 42000, members: 1100 },
  { month: 'Feb', revenue: 48000, members: 1180 },
  { month: 'Mar', revenue: 55000, members: 1250 },
  { month: 'Apr', revenue: 62000, members: 1340 },
  { month: 'May', revenue: 71000, members: 1420 },
  { month: 'Jun', revenue: 84000, members: 1580 },
  { month: 'Jul', revenue: 98000, members: 1720 },
];

export const AdminOverview = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'Member',
      accessorKey: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-white">{row.name}</p>
            <p className="text-[10px] text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Tier Plan', accessorKey: 'plan', render: (row) => <Badge variant="crimson">{row.plan}</Badge> },
    { header: 'Status', accessorKey: 'status', render: (row) => <Badge variant={row.status === 'Active' ? 'green' : 'amber'}>{row.status}</Badge> },
    { header: 'Visits', accessorKey: 'totalVisits' },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">ADMIN EXECUTIVE OVERVIEW</h1>
            <p className="text-xs text-gray-400">Real-time facility revenue, active member density, and trainer load metrics.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={() => navigate('/admin/members')} icon={Plus}>
              Add Member
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Monthly Recurring Revenue" value="98450" prefix="$" trend="+14.2%" icon={DollarSign} />
          <StatCard title="Active Member Population" value="1720" trend="+8.5%" icon={Users} />
          <StatCard title="Today's Facility Check-ins" value="342" trend="+12%" icon={Calendar} />
          <StatCard title="Trainer Utilization" value="94" suffix="%" trend="+3.1%" icon={Activity} />
        </div>

        {/* Chart Section */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-display uppercase">Revenue Growth Trend (2026)</h3>
              <p className="text-xs text-gray-400">Monthly breakdown in USD ($)</p>
            </div>
            <Badge variant="crimson">+28.4% YTD</Badge>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="crimsonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC143C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#DC143C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#DC143C" strokeWidth={3} fillOpacity={1} fill="url(#crimsonGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Member Datatable Snippet */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display uppercase">Recent Member Registrations</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/members')}>View All Members</Button>
          </div>
          <DataTable columns={columns} data={MOCK_MEMBERS} />
        </Card>
      </div>
    </PageTransition>
  );
};
