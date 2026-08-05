import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { StatCard, Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS } from '../../data/mockData';
import { Award, Dumbbell, Apple, QrCode, Flame, Calendar, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export const MemberOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [qrOpen, setQrOpen] = useState(false);
  const [memberProfile, setMemberProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await api.getMyMemberProfile();
        if (data) setMemberProfile(data);
      } catch (err) {
        console.error('Failed to load member profile:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const memberName = memberProfile?.name || user?.name || 'Alexander Wright';
  const planName = memberProfile?.membership?.name || 'VIP Crimson Elite';
  const assignedTrainerName = memberProfile?.personalTrainer?.name || memberProfile?.assignedTrainer?.name || 'Coach Vicky';

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">ATHLETE PERFORMANCE HUB</h1>
            <p className="text-xs text-gray-400">Welcome back, <strong className="text-white">{memberName}</strong>. Your active pass: <strong className="text-amber-400">{planName}</strong></p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={() => setQrOpen(true)} icon={QrCode}>
              Digital QR Pass
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Visit Streak" value={memberProfile?.visitStreak || 14} suffix=" Days" icon={Flame} />
          <StatCard title="Total Gym Visits" value={memberProfile?.attendance || 42} icon={Calendar} />
          <StatCard title="Body Weight" value={memberProfile?.weight ? `${memberProfile.weight} kg` : '78 kg'} icon={Dumbbell} />
          <StatCard title="Target Weight" value={memberProfile?.targetWeight ? `${memberProfile.targetWeight} kg` : '72 kg'} icon={Award} />
        </div>

        {/* Action Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Workout Routine */}
          <Card className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display uppercase">Prescribed Routine: Titan Hypertrophy W4</h3>
              <Badge variant="amber" className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Coach: {assignedTrainerName}</span>
              </Badge>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white font-display uppercase">1. Barbell Back Squat</p>
                  <p className="text-gray-400">4 Sets × 6-8 Reps @ RPE 8 (180s Rest)</p>
                </div>
                <Button variant="glass" size="sm" onClick={() => toast.success('Squat set completed!')}>
                  Log Set
                </Button>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white font-display uppercase">2. Romanian Deadlift</p>
                  <p className="text-gray-400">3 Sets × 8-10 Reps @ RPE 7.5 (120s Rest)</p>
                </div>
                <Button variant="glass" size="sm" onClick={() => toast.success('RDL set completed!')}>
                  Log Set
                </Button>
              </div>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/member/workouts')} className="w-full">
              Open Complete Workout View
            </Button>
          </Card>

          {/* Quick Shortcuts */}
          <Card className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display uppercase">Quick Shortcuts</h3>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <Badge variant="amber">VIP ACTIVE PASS</Badge>
              <h4 className="font-bold text-white font-display uppercase text-sm">{planName}</h4>
              <p className="text-xs text-gray-300">Personalized Training & Nutrition</p>
            </div>
            <div className="space-y-2">
              <Button variant="dark" size="sm" onClick={() => navigate('/member/workouts')} className="w-full">
                My Prescribed Workouts
              </Button>
              <Button variant="dark" size="sm" onClick={() => navigate('/member/diet')} className="w-full">
                My Nutrition & Diet Plan
              </Button>
            </div>
          </Card>
        </div>

        {/* Digital QR Modal */}
        <Modal isOpen={qrOpen} onClose={() => setQrOpen(false)} title="GYMNEX Digital Access Pass">
          <div className="text-center space-y-4 py-4">
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center border-4 border-amber-500 shadow-crimson-glow">
              <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v20H40zM50 40h20v10H50zM30 50h10v30H30zM70 70h20v20H70z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase">{memberName}</h4>
              <p className="text-xs text-amber-400 font-mono">{memberProfile?.memberId || 'MEM-PASS-VIP'}</p>
            </div>
          </div>
        </Modal>
      </div>
    </PageTransition>
  );
};
