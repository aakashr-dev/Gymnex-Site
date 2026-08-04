import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  UserCheck,
  CheckCircle2,
  RefreshCw,
  X
} from 'lucide-react';

export const AdminMembers = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assignmentFilter, setAssignmentFilter] = useState('All');

  // Modals
  const [selectedMember, setSelectedMember] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State for Add Member
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    membership: '',
    trainerId: '',
    fitnessGoal: 'Weight Loss',
    currentWeight: 75,
    targetWeight: 70,
    preferredTrainingStyle: 'HIIT & Cardio',
    medicalInformation: 'None'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [membersData, trainersData, plansData] = await Promise.all([
        api.getMembers(),
        api.getTrainers(),
        api.getMemberships()
      ]);
      if (Array.isArray(membersData)) setMembers(membersData);
      if (Array.isArray(trainersData)) setTrainers(trainersData);
      if (Array.isArray(plansData)) {
        setMemberships(plansData);
        if (plansData.length > 0 && !newMember.membership) {
          setNewMember((prev) => ({ ...prev, membership: plansData[0]._id || plansData[0].id }));
        }
      }
    } catch (err) {
      console.error('Error loading members data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Check if query params ask to open Register Modal directly (e.g. /admin/members?add=true)
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('add') === 'true' || searchParams.get('action') === 'register') {
      setIsAddModalOpen(true);
    }
  }, [location.search]);

  // Filtered members list
  const filteredMembers = members.filter((m) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (m.name || '').toLowerCase().includes(query) ||
      (m.email || '').toLowerCase().includes(query) ||
      (m.memberId || '').toLowerCase().includes(query) ||
      (m.fitnessGoal || '').toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesAssignment =
      assignmentFilter === 'All' ||
      (assignmentFilter === 'Pending' && (m.assignmentStatus === 'Pending Assignment' || !m.personalTrainer)) ||
      (assignmentFilter === 'Assigned' && m.assignmentStatus === 'Assigned' && m.personalTrainer);

    return matchesSearch && matchesStatus && matchesAssignment;
  });

  // Widgets calculations
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'Active').length;
  const newRegistrations = members.filter((m) => m.assignmentStatus === 'Pending Assignment' || !m.personalTrainer).length;
  const expiryAlerts = members.filter((m) => m.status === 'Expired' || m.status === 'Frozen' || m.status === 'Suspended').length;

  // Actions
  const handleToggleStatus = async (memberId, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : currentStatus === 'Suspended' ? 'Deactivated' : 'Active';
    try {
      await api.updateMemberStatus(memberId, nextStatus);
      loadData();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleOpenAssignModal = (member) => {
    setSelectedMember(member);
    setSelectedTrainerId('');
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssign = async () => {
    if (!selectedMember || !selectedTrainerId) return;
    setAssigning(true);
    try {
      await api.assignTrainer(selectedMember._id || selectedMember.id, selectedTrainerId);
      setIsAssignModalOpen(false);
      setSelectedMember(null);
      loadData();
    } catch (err) {
      console.error('Assign error:', err);
    } finally {
      setAssigning(false);
    }
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    setSubmitting(true);
    try {
      const res = await api.createMember(newMember);
      const createdMember = res.data || res;
      const memberId = createdMember._id || createdMember.id;

      if (newMember.trainerId && memberId) {
        await api.assignTrainer(memberId, newMember.trainerId);
      }

      setIsAddModalOpen(false);
      setNewMember({
        name: '',
        email: '',
        phone: '',
        membership: memberships.length > 0 ? (memberships[0]._id || memberships[0].id) : '',
        trainerId: '',
        fitnessGoal: 'Weight Loss',
        currentWeight: 75,
        targetWeight: 70,
        preferredTrainingStyle: 'HIIT & Cardio',
        medicalInformation: 'None'
      });
      loadData();
    } catch (err) {
      console.error('Create member error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest">
                OPERATIONAL MODULE
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                MEMBER ROSTER
              </span>
            </div>
            <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
              MEMBER MANAGEMENT HUB
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Complete control over registered member profiles, status suspensions, trainer assignment queues, and membership reviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={loadData} icon={RefreshCw} className={`text-xs ${loading ? 'animate-spin' : ''}`}>
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={UserPlus}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
            >
              Register Member
            </Button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Total Members</span>
            <div className="text-2xl font-black text-white font-display mt-2">{totalMembers}</div>
            <span className="text-[10px] text-gray-500 mt-1">Registered Sanctuary Athletes</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Active Members</span>
            <div className="text-2xl font-black text-emerald-400 font-display mt-2">{activeMembers}</div>
            <span className="text-[10px] text-emerald-400/80 mt-1">Full Facility VIP Access</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Waiting Trainer Assignment</span>
            <div className="text-2xl font-black text-amber-400 font-display mt-2">{newRegistrations}</div>
            <span className="text-[10px] text-amber-400/80 mt-1">Pending Coach Assignment</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Expiry / Suspended Alerts</span>
            <div className="text-2xl font-black text-rose-400 font-display mt-2">{expiryAlerts}</div>
            <span className="text-[10px] text-rose-400/80 mt-1">Requires Admin Review</span>
          </div>
        </div>

        {/* Controls Bar: Search & Filters */}
        <Card className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, member ID, or fitness goal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-surface border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Filter className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold uppercase text-[10px]">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-dark-surface border border-white/15 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Deactivated">Deactivated</option>
                  <option value="Expired">Expired</option>
                  <option value="Frozen">Frozen</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="font-bold uppercase text-[10px]">Assignment:</span>
                <select
                  value={assignmentFilter}
                  onChange={(e) => setAssignmentFilter(e.target.value)}
                  className="bg-dark-surface border border-white/15 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Members</option>
                  <option value="Pending">Pending Assignment</option>
                  <option value="Assigned">Assigned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs text-gray-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Member</th>
                  <th className="py-3 px-3">Fitness Goal</th>
                  <th className="py-3 px-3">Access Plan</th>
                  <th className="py-3 px-3">Assigned Coach</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                      No members match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((m) => {
                    const hasTrainer = m.personalTrainer || m.assignedTrainer;
                    const trainerObj = typeof hasTrainer === 'object' ? hasTrainer : trainers.find((t) => t._id === hasTrainer || t.id === hasTrainer);

                    return (
                      <tr key={m._id || m.id || m.memberId} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                              {m.name ? m.name.charAt(0) : 'M'}
                            </div>
                            <div>
                              <p className="font-extrabold text-white">{m.name}</p>
                              <p className="text-[10px] text-gray-500 font-mono">{m.email || m.memberId}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-bold text-amber-400">{m.fitnessGoal || 'General Fitness'}</span>
                          <span className="text-[10px] text-gray-500 block">Target: {m.targetWeight || 70} kg</span>
                        </td>

                        <td className="py-3.5 px-3">
                          <Badge variant="amber">{m.membership?.name || 'VIP Pass'}</Badge>
                        </td>

                        <td className="py-3.5 px-3">
                          {trainerObj ? (
                            <span className="font-bold text-white flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                              {trainerObj.name}
                            </span>
                          ) : (
                            <button
                              onClick={() => handleOpenAssignModal(m)}
                              className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 font-bold text-[10px] uppercase transition-all"
                            >
                              + Assign Trainer
                            </button>
                          )}
                        </td>

                        <td className="py-3.5 px-3">
                          <Badge
                            variant={
                              m.status === 'Active'
                                ? 'green'
                                : m.status === 'Suspended'
                                ? 'amber'
                                : 'crimson'
                            }
                          >
                            {m.status || 'Active'}
                          </Badge>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedMember(m);
                                setIsProfileModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
                              title="View Full Profile"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleToggleStatus(m._id || m.id, m.status)}
                              className={`p-1.5 rounded-lg font-bold text-[10px] px-2 uppercase ${
                                m.status === 'Active'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                              }`}
                              title="Toggle Member Status"
                            >
                              {m.status === 'Active' ? 'Suspend' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* REGISTER NEW MEMBER MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-black text-white uppercase font-display">Register New Member</h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white p-2">✕</button>
              </div>

              <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="Elena Rostova"
                      className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      placeholder="elena@example.com"
                      className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Membership Plan</label>
                    <select
                      value={newMember.membership}
                      onChange={(e) => setNewMember({ ...newMember, membership: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    >
                      {memberships.map((plan) => (
                        <option key={plan._id || plan.id} value={plan._id || plan.id}>
                          {plan.name} (${plan.price}/mo)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-amber-400 uppercase block mb-1">Assign Personal Trainer</label>
                  <select
                    value={newMember.trainerId || ''}
                    onChange={(e) => setNewMember({ ...newMember, trainerId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-dark-surface border border-amber-500/40 rounded-xl text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Assign Later (Pending Trainer Assignment Queue) --</option>
                    {trainers.map((t) => (
                      <option key={t._id || t.id} value={t._id || t.id}>
                        {t.name} ({t.specialization || 'Master Coach'}) - {t.availabilityStatus || 'Available'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/5 p-3.5 rounded-xl border border-white/5">
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Fitness Goal</label>
                    <select
                      value={newMember.fitnessGoal}
                      onChange={(e) => setNewMember({ ...newMember, fitnessGoal: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                    >
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Building">Muscle Building</option>
                      <option value="Transformation">Transformation</option>
                      <option value="Powerlifting">Powerlifting</option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Training Style</label>
                    <select
                      value={newMember.preferredTrainingStyle}
                      onChange={(e) => setNewMember({ ...newMember, preferredTrainingStyle: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="HIIT & Cardio">HIIT & Cardio</option>
                      <option value="Bodybuilding Hypertrophy">Bodybuilding Hypertrophy</option>
                      <option value="Powerlifting & Barbell">Powerlifting & Barbell</option>
                      <option value="Functional Mobility">Functional Mobility</option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Current Weight (kg)</label>
                    <input
                      type="number"
                      value={newMember.currentWeight}
                      onChange={(e) => setNewMember({ ...newMember, currentWeight: e.target.value })}
                      className="w-full px-3.5 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Target Weight (kg)</label>
                    <input
                      type="number"
                      value={newMember.targetWeight}
                      onChange={(e) => setNewMember({ ...newMember, targetWeight: e.target.value })}
                      className="w-full px-3.5 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Medical Information / Notes</label>
                  <textarea
                    rows={2}
                    value={newMember.medicalInformation}
                    onChange={(e) => setNewMember({ ...newMember, medicalInformation: e.target.value })}
                    placeholder="None or mild lower back sensitivity..."
                    className="w-full px-3.5 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <Button variant="glass" size="sm" onClick={() => setIsAddModalOpen(false)} className="w-1/2 text-xs">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={submitting}
                    className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-black text-xs uppercase"
                  >
                    {submitting ? 'Registering...' : 'Register Member'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PROFILE MODAL */}
        {isProfileModalOpen && selectedMember && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-lg border border-amber-500/30">
                    {selectedMember.name ? selectedMember.name.charAt(0) : 'M'}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase font-display">{selectedMember.name}</h3>
                    <p className="text-[11px] text-gray-400 font-mono">{selectedMember.memberId || 'MEM-ID'}</p>
                  </div>
                </div>
                <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-white p-2">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-xl">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Fitness Goal</span>
                    <span className="font-extrabold text-amber-400 text-sm">{selectedMember.fitnessGoal || 'General Fitness'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Training Style</span>
                    <span className="font-extrabold text-white">{selectedMember.preferredTrainingStyle || 'Strength & Conditioning'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-white/5 p-3 rounded-xl text-center">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Current Weight</span>
                    <span className="font-extrabold text-white">{selectedMember.currentWeight || selectedMember.weight || 75} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Target Weight</span>
                    <span className="font-extrabold text-amber-400">{selectedMember.targetWeight || 70} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">BMI</span>
                    <span className="font-extrabold text-emerald-400">{selectedMember.BMI || 24.2}</span>
                  </div>
                </div>

                <div className="space-y-1 bg-white/5 p-3 rounded-xl">
                  <p><strong className="text-gray-300">Medical Notes / Alerts:</strong> {selectedMember.medicalInformation || selectedMember.medicalNotes || 'None'}</p>
                  <p><strong className="text-gray-300">Membership Tier:</strong> {selectedMember.membership?.name || 'VIP Pass'}</p>
                  <p><strong className="text-gray-300">Status:</strong> <Badge variant={selectedMember.status === 'Active' ? 'green' : 'amber'}>{selectedMember.status || 'Active'}</Badge></p>
                </div>
              </div>

              <Button variant="glass" size="sm" onClick={() => setIsProfileModalOpen(false)} className="w-full text-xs">
                Close Profile
              </Button>
            </div>
          </div>
        )}

        {/* ASSIGN TRAINER MODAL */}
        {isAssignModalOpen && selectedMember && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/40 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <Badge variant="amber">ASSIGN TRAINER</Badge>
                  <h3 className="text-lg font-black text-white uppercase font-display mt-1">
                    Assign Coach to {selectedMember.name}
                  </h3>
                </div>
                <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-white p-2">✕</button>
              </div>

              <div className="text-xs space-y-3">
                <div className="bg-white/5 p-3 rounded-xl space-y-1">
                  <p><strong className="text-gray-300">Member Fitness Goal:</strong> <span className="text-amber-400 font-bold">{selectedMember.fitnessGoal || 'General Fitness'}</span></p>
                  <p><strong className="text-gray-300">Preferred Style:</strong> {selectedMember.preferredTrainingStyle || 'Strength & Conditioning'}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300 uppercase block">Select Master Coach</label>
                  <select
                    value={selectedTrainerId}
                    onChange={(e) => setSelectedTrainerId(e.target.value)}
                    className="w-full bg-dark-surface border border-white/20 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Choose Coach --</option>
                    {trainers.map((t) => (
                      <option key={t._id || t.id} value={t._id || t.id}>
                        {t.name} ({t.specialization}) - {t.availabilityStatus || 'Available'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="glass" size="sm" onClick={() => setIsAssignModalOpen(false)} className="w-1/2 text-xs">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!selectedTrainerId || assigning}
                  onClick={handleConfirmAssign}
                  className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
                >
                  {assigning ? 'Assigning...' : 'Confirm'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
