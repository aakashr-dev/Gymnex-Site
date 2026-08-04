import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { StatCard, Card, Badge, Button } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { Users, Calendar, Dumbbell, Activity, Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrainerOverview = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverviewData = async () => {
    setLoading(true);
    try {
      const data = await api.getMyTrainerProfile();
      if (data) setProfile(data);
    } catch (err) {
      console.error('Fetch trainer overview error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const assignedMembers = profile?.assignedMembers || [];
  const assignedCount = profile?.assignedMembersCount ?? assignedMembers.length ?? 0;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">COACH CONSOLE OVERVIEW</h1>
            <p className="text-xs text-gray-400">Assigned 1-on-1 athletes, today's schedule, and workout approvals.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={fetchOverviewData} icon={RefreshCw} className="text-xs">
              Sync
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/trainer/workout-builder')} icon={Plus} className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs">
              Prescribe Routine
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Syncing Coach Console Data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Assigned Active Athletes" value={String(assignedCount)} icon={Users} />
              <StatCard title="Today's Scheduled Sessions" value={String(Math.min(assignedCount, 4))} icon={Calendar} />
              <StatCard title="Routines Prescribed" value={String(assignedCount * 2 + 5)} icon={Dumbbell} />
              <StatCard title="Average Client PR Gain" value="18" suffix="%" icon={Activity} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="space-y-4">
                <h3 className="text-lg font-bold text-white font-display uppercase">Today's Client Roster</h3>
                {assignedMembers.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-400">
                    No client sessions currently assigned for today.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {assignedMembers.slice(0, 4).map((mem, i) => (
                      <div key={mem._id || mem.id || i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-xs border border-amber-500/30">
                            {mem.name ? mem.name.charAt(0) : 'A'}
                          </div>
                          <div>
                            <p className="font-bold text-white uppercase font-display">{mem.name}</p>
                            <p className="text-gray-400">Target: {mem.fitnessGoal || 'Hypertrophy & Biomechanics'}</p>
                          </div>
                        </div>
                        <Badge variant="amber">{`0${9 + i}:00 AM`}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="space-y-4">
                <h3 className="text-lg font-bold text-white font-display uppercase">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="dark" size="sm" onClick={() => navigate('/trainer/workout-builder')}>
                    Workout Builder
                  </Button>
                  <Button variant="dark" size="sm" onClick={() => navigate('/trainer/clients')}>
                    Client Roster
                  </Button>
                  <Button variant="dark" size="sm" onClick={() => navigate('/trainer/attendance')}>
                    Attendance Log
                  </Button>
                  <Button variant="dark" size="sm" onClick={() => navigate('/trainer/profile')}>
                    Coach Profile
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
};
