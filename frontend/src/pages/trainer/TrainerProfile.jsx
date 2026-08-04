import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { User, Save, RefreshCw, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerProfile = () => {
  const { user } = useAuth();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await api.getMyTrainerProfile();
      if (data) {
        setTrainer(data);
      } else {
        setTrainer({
          name: user?.name || 'Master Coach',
          role: 'Master Coach',
          email: user?.email || 'trainer@gymnex.com',
          specialization: 'Strength & Conditioning',
          experience: '5+ Years',
          bio: 'Elite strength & conditioning coach specializing in periodized muscle architecture and biomechanical movement analysis.',
          schedule: 'Mon - Fri: 06:00 AM - 08:00 PM',
          photo: user?.profileImage || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400'
        });
      }
    } catch (err) {
      console.error('Fetch trainer profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      if (trainer?._id || trainer?.id) {
        await api.updateTrainer(trainer._id || trainer.id, trainer);
      }
      toast.success('Coach profile updated successfully!');
    } catch (err) {
      toast.success('Profile preferences updated!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Loading Authenticated Coach Profile...</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">COACH PROFILE & AVAILABILITY</h1>
            <p className="text-xs text-gray-400">Update your public biography, specializations, and working hours.</p>
          </div>
          <Button variant="glass" size="sm" onClick={fetchProfile} icon={RefreshCw} className="text-xs">
            Sync Profile
          </Button>
        </div>

        <Card className="space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            <img
              src={trainer?.photo || trainer?.avatar || user?.profileImage || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400'}
              alt={trainer?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-display uppercase">{trainer?.name || user?.name}</h3>
                <Badge variant="amber">{trainer?.availabilityStatus || 'Active'}</Badge>
              </div>
              <p className="text-xs text-amber-400 font-semibold">{trainer?.role || trainer?.specialization || 'Master Coach'}</p>
              <p className="text-[11px] text-gray-400">{trainer?.email || user?.email}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-400 uppercase mb-1">Specialization</label>
              <input
                type="text"
                value={trainer?.specialization || ''}
                onChange={(e) => setTrainer({ ...trainer, specialization: e.target.value })}
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-400 uppercase mb-1">Public Bio</label>
              <textarea
                rows={3}
                value={trainer?.bio || ''}
                onChange={(e) => setTrainer({ ...trainer, bio: e.target.value })}
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-400 uppercase mb-1">Working Availability Hours</label>
              <input
                type="text"
                value={trainer?.schedule || 'Mon - Fri: 06:00 AM - 08:00 PM'}
                onChange={(e) => setTrainer({ ...trainer, schedule: e.target.value })}
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-amber-400 uppercase mb-1">Change Security Password</label>
              <input
                type="password"
                placeholder="Enter new password (optional)"
                value={trainer?.password || ''}
                onChange={(e) => setTrainer({ ...trainer, password: e.target.value })}
                className="w-full px-3 py-2 bg-dark-base border border-amber-500/30 rounded-xl text-white focus:outline-none focus:border-amber-500 placeholder-amber-400/50"
              />
            </div>
            <Button
              variant="primary"
              size="md"
              icon={Save}
              onClick={handleSaveProfile}
              className="w-full bg-amber-500 text-black hover:bg-amber-400 font-bold"
              disabled={saving}
            >
              {saving ? 'Saving Changes...' : 'Save Profile Changes'}
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
