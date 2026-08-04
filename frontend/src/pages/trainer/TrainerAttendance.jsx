import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { CheckCircle2, RefreshCw, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerAttendance = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendanceClients = async () => {
    setLoading(true);
    try {
      const profile = await api.getMyTrainerProfile();
      if (profile && Array.isArray(profile.assignedMembers)) {
        setClients(profile.assignedMembers);
      } else {
        const allMembers = await api.getMembers();
        if (Array.isArray(allMembers)) setClients(allMembers.slice(0, 5));
      }
    } catch (err) {
      console.error('Error loading clients for attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceClients();
  }, []);

  const columns = [
    {
      header: 'Athlete',
      accessorKey: 'name',
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-xs border border-amber-500/30">
            {r.name ? r.name.charAt(0) : 'A'}
          </div>
          <div>
            <p className="font-semibold text-white">{r.name}</p>
            <p className="text-[10px] text-gray-500">{r.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Session Type', accessorKey: 'fitnessGoal', render: (r) => `${r.fitnessGoal || 'General'} 1-on-1 Session` },
    { header: 'Scheduled Time', accessorKey: 'time', render: () => 'Today 09:00 AM' },
    {
      header: 'Status',
      accessorKey: 'action',
      render: (r) => (
        <Button variant="glass" size="sm" onClick={() => toast.success(`Completed session logged for ${r.name}!`)} icon={CheckCircle2}>
          Log Complete
        </Button>
      )
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">1-ON-1 ATTENDANCE LOG</h1>
            <p className="text-xs text-gray-400">Log personal training session completions for client billing verification.</p>
          </div>
          <Button variant="glass" size="sm" onClick={fetchAttendanceClients} icon={RefreshCw} className="text-xs">
            Sync
          </Button>
        </div>

        <Card>
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Loading Attendance Roster...</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Calendar className="w-10 h-10 text-amber-500/40 mx-auto" />
              <p className="text-sm font-bold text-white uppercase font-display">No Scheduled Sessions</p>
              <p className="text-xs text-gray-400">You currently have no client 1-on-1 sessions scheduled today.</p>
            </div>
          ) : (
            <DataTable columns={columns} data={clients} />
          )}
        </Card>
      </div>
    </PageTransition>
  );
};
