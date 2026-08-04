import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { Dumbbell, Apple, RefreshCw, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrainerClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedClients = async () => {
    setLoading(true);
    try {
      const profile = await api.getMyTrainerProfile();
      if (profile && Array.isArray(profile.assignedMembers)) {
        setClients(profile.assignedMembers);
      } else {
        // Fallback fetch all members if no specific assigned members
        const allMembers = await api.getMembers();
        if (Array.isArray(allMembers)) setClients(allMembers.slice(0, 5));
      }
    } catch (err) {
      console.error('Fetch assigned clients error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedClients();
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
    { header: 'Tier Plan', accessorKey: 'plan', render: (r) => <Badge variant="amber">{r.membership?.name || r.plan || 'Core Access'}</Badge> },
    { header: 'Current Weight', accessorKey: 'weight', render: (r) => <span>{r.weight || r.currentWeight || 75} kg</span> },
    { header: 'Target Goal', accessorKey: 'fitnessGoal', render: (r) => <span className="text-amber-400 font-bold text-xs">{r.fitnessGoal || 'Weight Loss'}</span> },
    { header: 'Streak', accessorKey: 'visitStreak', render: (r) => <span className="text-emerald-400 font-bold">{r.visitStreak || 12} Days</span> },
    {
      header: 'Prescribe',
      accessorKey: 'action',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Button variant="glass" size="sm" onClick={() => navigate('/trainer/workout-builder', { state: { memberId: r._id || r.id } })}>
            Routine
          </Button>
          <Button variant="glass" size="sm" onClick={() => navigate('/trainer/nutrition-planner', { state: { memberId: r._id || r.id } })}>
            Macros
          </Button>
        </div>
      )
    }
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">ASSIGNED ATHLETES</h1>
            <p className="text-xs text-gray-400">Roster of 1-on-1 clients under active biomechanical supervision.</p>
          </div>
          <Button variant="glass" size="sm" onClick={fetchAssignedClients} icon={RefreshCw} className="text-xs">
            Sync Roster
          </Button>
        </div>

        <Card>
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Loading Assigned Client Roster...</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Users className="w-10 h-10 text-amber-500/40 mx-auto" />
              <p className="text-sm font-bold text-white uppercase font-display">No Assigned Clients</p>
              <p className="text-xs text-gray-400">You currently have no members assigned to your coaching roster.</p>
            </div>
          ) : (
            <DataTable columns={columns} data={clients} />
          )}
        </Card>
      </div>
    </PageTransition>
  );
};
