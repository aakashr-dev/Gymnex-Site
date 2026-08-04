import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import {
  UserCheck,
  Plus,
  Star,
  Users,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Search
} from 'lucide-react';

export const AdminTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [assignedMembers, setAssignedMembers] = useState([]);

  // Form State
  const [trainerForm, setTrainerForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: 'Strength Coach',
    experience: '5+ Years',
    salary: 75000,
    availabilityStatus: 'Available'
  });

  const loadTrainers = async () => {
    setLoading(true);
    try {
      const data = await api.getTrainers();
      if (Array.isArray(data)) setTrainers(data);
    } catch (err) {
      console.error('Failed to load trainers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  const handleCreateTrainer = async (e) => {
    e.preventDefault();
    try {
      await api.createTrainer(trainerForm);
      setIsAddModalOpen(false);
      setTrainerForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        specialization: 'Strength Coach',
        experience: '5+ Years',
        salary: 75000,
        availabilityStatus: 'Available'
      });
      loadTrainers();
    } catch (err) {
      console.error('Create trainer error:', err);
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (!window.confirm('Are you sure you want to remove this trainer? Assigned members will be queued for reassignment.')) return;
    try {
      await api.deleteTrainer(id);
      loadTrainers();
    } catch (err) {
      console.error('Delete trainer error:', err);
    }
  };

  const handleViewAssignedMembers = async (trainer) => {
    setSelectedTrainer(trainer);
    try {
      const members = await api.getTrainerMembers(trainer._id || trainer.id);
      setAssignedMembers(members);
      setIsMembersModalOpen(true);
    } catch (err) {
      console.error('Error fetching assigned members:', err);
    }
  };

  const handleUpdateAvailability = async (trainerId, newStatus) => {
    try {
      await api.updateTrainer(trainerId, { availabilityStatus: newStatus, status: newStatus === 'On Leave' ? 'On Leave' : 'Active' });
      loadTrainers();
    } catch (err) {
      console.error('Update availability error:', err);
    }
  };

  const filteredTrainers = trainers.filter((t) => {
    const matchesSearch =
      (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.specialization || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvail = availabilityFilter === 'All' || t.availabilityStatus === availabilityFilter;
    return matchesSearch && matchesAvail;
  });

  const totalTrainers = trainers.length;
  const activeTrainers = trainers.filter((t) => t.status !== 'Inactive').length;
  const availableTrainers = trainers.filter((t) => t.availabilityStatus === 'Available').length;
  const busyTrainers = trainers.filter((t) => t.availabilityStatus === 'Busy').length;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest">
                STAFF OPERATIONS
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                MASTER COACH ROSTER
              </span>
            </div>
            <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
              TRAINER MANAGEMENT HUB
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Monitor coach performance metrics, client loads, availability status, and onboard new personal trainers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={loadTrainers} icon={RefreshCw} className={`text-xs ${loading ? 'animate-spin' : ''}`}>
              Sync
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={Plus}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
            >
              Add New Trainer
            </Button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Total Trainers</span>
            <div className="text-2xl font-black text-white font-display mt-2">{totalTrainers}</div>
            <span className="text-[10px] text-gray-500 mt-1">Master Staff Roster</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Active Trainers</span>
            <div className="text-2xl font-black text-emerald-400 font-display mt-2">{activeTrainers}</div>
            <span className="text-[10px] text-emerald-400/80 mt-1">On Duty Roster</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Available Trainers</span>
            <div className="text-2xl font-black text-amber-400 font-display mt-2">{availableTrainers}</div>
            <span className="text-[10px] text-amber-400/80 mt-1">Ready for Member Assignment</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Busy / In Coaching</span>
            <div className="text-2xl font-black text-blue-400 font-display mt-2">{busyTrainers}</div>
            <span className="text-[10px] text-blue-400/80 mt-1">Currently in Session</span>
          </div>
        </div>

        {/* Controls Bar */}
        <Card className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search trainer name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-surface border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-bold uppercase text-[10px]">Availability:</span>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="bg-dark-surface border border-white/15 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          {/* Trainer Grid */}
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Syncing Master Trainer Roster from Backend...</p>
            </div>
          ) : filteredTrainers.length === 0 ? (
            <div className="py-16 text-center bg-white/5 border border-white/10 rounded-2xl p-8 space-y-3">
              <p className="text-sm font-bold text-gray-300 uppercase">No Master Trainers Found</p>
              <p className="text-xs text-gray-400">No trainer records match your filter criteria or network response was empty.</p>
              <Button variant="glass" size="sm" onClick={loadTrainers} icon={RefreshCw} className="text-xs mx-auto">
                Reload Staff Roster
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {filteredTrainers.map((t) => (
              <div
                key={t._id || t.id || t.trainerId}
                className="bg-dark-surface border border-white/10 rounded-2xl p-5 space-y-4 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-base border border-amber-500/30">
                        {t.name ? t.name.charAt(0) : 'T'}
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-white uppercase font-display">{t.name}</h3>
                        <p className="text-[11px] text-amber-400 font-bold">{t.specialization}</p>
                      </div>
                    </div>
                    <Badge variant={t.availabilityStatus === 'Available' ? 'green' : t.availabilityStatus === 'Busy' ? 'amber' : 'crimson'}>
                      {t.availabilityStatus || 'Available'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Assigned Clients</span>
                      <span className="text-base font-black text-amber-400 font-display">{t.assignedMembersCount || 4} Members</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Rating</span>
                      <span className="text-base font-black text-emerald-400 font-display flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-400" /> {t.rating || 4.9}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400 space-y-1">
                    <p><strong className="text-gray-300">Experience:</strong> {t.experience || '5+ Years'}</p>
                    <p><strong className="text-gray-300">Salary:</strong> ${t.salary ? t.salary.toLocaleString() : '75,000'}/yr</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Set Status:</label>
                    <select
                      value={t.availabilityStatus || 'Available'}
                      onChange={(e) => handleUpdateAvailability(t._id || t.id, e.target.value)}
                      className="bg-black border border-white/20 text-white rounded-lg px-2 py-1 text-[11px] focus:outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => handleViewAssignedMembers(t)}
                      className="flex-1 text-[11px] font-bold"
                    >
                      <Users className="w-3.5 h-3.5 mr-1 text-amber-400" /> Clients ({t.assignedMembersCount || 4})
                    </Button>

                    <button
                      onClick={() => handleDeleteTrainer(t._id || t.id)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                      title="Remove Trainer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </Card>

        {/* ADD TRAINER MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white uppercase font-display">Add New Master Coach</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateTrainer} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={trainerForm.name}
                    onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                    placeholder="Coach Marcus Vance"
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={trainerForm.email}
                    onChange={(e) => setTrainerForm({ ...trainerForm, email: e.target.value })}
                    placeholder="coach@gymnex.com"
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-amber-400 uppercase block mb-1">Account Password</label>
                  <input
                    type="password"
                    value={trainerForm.password}
                    onChange={(e) => setTrainerForm({ ...trainerForm, password: e.target.value })}
                    placeholder="Default: 123456"
                    className="w-full px-3 py-2 bg-dark-surface border border-amber-500/30 rounded-xl text-white focus:outline-none focus:border-amber-500 placeholder-amber-400/50"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Specialization</label>
                  <select
                    value={trainerForm.specialization}
                    onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Weight Loss Specialist">Weight Loss Specialist</option>
                    <option value="Strength Coach">Strength Coach</option>
                    <option value="Transformation Expert">Transformation Expert</option>
                    <option value="Strength & Conditioning Coach">Strength & Conditioning Coach</option>
                    <option value="General Fitness Trainer">General Fitness Trainer</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Experience</label>
                  <input
                    type="text"
                    value={trainerForm.experience}
                    onChange={(e) => setTrainerForm({ ...trainerForm, experience: e.target.value })}
                    placeholder="7+ Years"
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <Button variant="glass" size="sm" onClick={() => setIsAddModalOpen(false)} className="w-1/2 text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs">
                    Add Coach
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ASSIGNED MEMBERS LIST MODAL */}
        {isMembersModalOpen && selectedTrainer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <Badge variant="amber">COACH CLIENT ROSTER</Badge>
                  <h3 className="text-lg font-black text-white uppercase font-display mt-1">
                    Clients Assigned to {selectedTrainer.name}
                  </h3>
                </div>
                <button onClick={() => setIsMembersModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto text-xs pr-1">
                {assignedMembers.length === 0 ? (
                  <p className="text-gray-500 italic py-6 text-center">No active assigned clients for this coach.</p>
                ) : (
                  assignedMembers.map((m) => (
                    <div key={m._id || m.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">{m.name}</p>
                        <p className="text-[10px] text-amber-400 font-mono">Goal: {m.fitnessGoal || 'General Fitness'}</p>
                      </div>
                      <Badge variant={m.status === 'Active' ? 'green' : 'amber'}>{m.status || 'Active'}</Badge>
                    </div>
                  ))
                )}
              </div>

              <Button variant="glass" size="sm" onClick={() => setIsMembersModalOpen(false)} className="w-full text-xs">
                Close Client Roster
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
