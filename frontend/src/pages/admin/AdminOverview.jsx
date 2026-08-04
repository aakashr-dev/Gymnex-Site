import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { StatCard, Card, Badge, Button } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import {
  Users,
  UserCheck,
  CreditCard,
  Wrench,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserPlus,
  Clock,
  ArrowRight,
  Shield,
  Activity,
  Flame,
  Search,
  Bell,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminOverview = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [adminSummary, setAdminSummary] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [unassignedMembers, setUnassignedMembers] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [maintenanceItems, setMaintenanceItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Modal State for Trainer Assignment
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Modal State for Leave Request
  const [actioningLeaveId, setActioningLeaveId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const summary = await api.getAdminSummary();
      if (summary) {
        setAdminSummary(summary);
        setUnassignedMembers(summary.unassignedMembers || []);
        setPendingLeaves(summary.pendingLeaveRequests || []);
        setMaintenanceItems(summary.maintenanceRequests || []);
        setNotifications(summary.notifications || []);
      }

      const allTrainers = await api.getTrainers();
      if (Array.isArray(allTrainers)) setTrainers(allTrainers);
    } catch (err) {
      console.warn('Dashboard fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle Trainer Assignment
  const handleOpenAssignModal = (member) => {
    setSelectedMember(member);
    setSelectedTrainerId('');
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssignment = async () => {
    if (!selectedMember || !selectedTrainerId) return;
    setAssigning(true);
    try {
      const res = await api.assignTrainer(selectedMember._id || selectedMember.id, selectedTrainerId);
      if (res.success || res.data) {
        setIsAssignModalOpen(false);
        setSelectedMember(null);
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to assign trainer:', err);
    } finally {
      setAssigning(false);
    }
  };

  // Handle Leave Request Review
  const handleReviewLeave = async (leaveId, status) => {
    setActioningLeaveId(leaveId);
    try {
      await api.reviewLeaveRequest(leaveId, status);
      fetchDashboardData();
    } catch (err) {
      console.error('Leave review error:', err);
    } finally {
      setActioningLeaveId(null);
    }
  };

  // Handle Equipment Status Update
  const handleUpdateEquipmentStatus = async (equipmentId, newStatus) => {
    try {
      await api.updateEquipmentStatus(equipmentId, newStatus);
      fetchDashboardData();
    } catch (err) {
      console.error('Equipment update error:', err);
    }
  };

  // Helper function to suggest trainer based on member fitness goal
  const getRecommendedSpecialization = (goal) => {
    switch (goal) {
      case 'Weight Loss':
        return 'Weight Loss Specialist';
      case 'Muscle Building':
        return 'Strength Coach';
      case 'Transformation':
        return 'Transformation Expert';
      case 'Powerlifting':
        return 'Strength & Conditioning Coach';
      default:
        return 'General Fitness Trainer';
    }
  };

  const stats = adminSummary?.stats || {
    members: { total: 100, active: 85, newRegistrations: 20, expiring: 5 },
    trainers: { total: 25, active: 22, available: 16, busy: 7, onLeave: 2 },
    equipment: { healthIndex: 94, total: 150, operational: 141, pendingMaintenance: 6, underService: 3 },
    memberships: { total: 10, active: 10, seasonalOffers: 2 }
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest">
                GYM OPERATIONS MANAGER
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                SYSTEM HEALTH: 100% ONLINE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight mt-1">
              ADMIN OPERATIONS DASHBOARD
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Monitor member registrations, trainer availability, leave approvals, member-trainer assignments, equipment maintenance, and active memberships.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="glass"
              size="sm"
              onClick={fetchDashboardData}
              icon={RefreshCw}
              className={`text-xs ${loading ? 'animate-spin' : ''}`}
            >
              Sync Telemetry
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/admin/members')}
              icon={UserPlus}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
            >
              Add Member
            </Button>
          </div>
        </div>

        {/* 1. QUICK STATISTICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Members Stat */}
          <div className="bg-dark-card border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Members</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-white font-display">{stats.members.total}</div>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                <span className="text-emerald-400 font-bold">{stats.members.active} Active</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{stats.members.newRegistrations} New</span>
              </div>
            </div>
          </div>

          {/* Trainers Stat */}
          <div className="bg-dark-card border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Trainers</span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-white font-display">{stats.trainers.total}</div>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                <span className="text-emerald-400 font-bold">{stats.trainers.available} Available</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{stats.trainers.busy} Busy</span>
              </div>
            </div>
          </div>

          {/* Membership Plans Stat */}
          <div className="bg-dark-card border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Membership Plans</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-white font-display">{stats.memberships.total}</div>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                <span className="text-purple-400 font-bold">{stats.memberships.active} Active</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{stats.memberships.seasonalOffers} Offers</span>
              </div>
            </div>
          </div>

          {/* Equipment Status Stat */}
          <div className="bg-dark-card border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Equipment Health</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Wrench className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-emerald-400 font-display">{stats.equipment.healthIndex}%</div>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                <span className="text-gray-300 font-bold">{stats.equipment.operational} Operational</span>
                <span>•</span>
                <span className="text-rose-400 font-bold">{stats.equipment.pendingMaintenance} Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MEMBERS WAITING FOR TRAINER ASSIGNMENT (PRIMARY WORKFLOW) */}
        <Card className="border border-amber-500/30 bg-dark-card space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="amber">PRIMARY WORKFLOW</Badge>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                  {unassignedMembers.length} MEMBERS WAITING FOR COACH ASSIGNMENT
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white font-display uppercase tracking-tight mt-1">
                MEMBERS WAITING FOR TRAINER ASSIGNMENT
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Review member fitness goals and target weights, then assign a qualified specialist trainer.
              </p>
            </div>
            <Button variant="glass" size="sm" onClick={() => navigate('/admin/members')} className="text-xs">
              View All Members →
            </Button>
          </div>

          {unassignedMembers.length === 0 ? (
            <div className="py-8 text-center bg-white/5 rounded-2xl border border-dashed border-white/10 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white uppercase">All New Members Have Assigned Trainers</p>
              <p className="text-xs text-gray-400">No members are currently queued for trainer assignment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unassignedMembers.map((member) => {
                const recSpec = getRecommendedSpecialization(member.fitnessGoal);
                return (
                  <div
                    key={member._id || member.id || member.memberId}
                    className="bg-dark-surface border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center border border-amber-500/30 text-sm">
                            {member.name ? member.name.charAt(0) : 'M'}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-white text-sm uppercase">{member.name}</h4>
                            <p className="text-[10px] text-gray-400 font-mono">{member.memberId || 'MEM-NEW'}</p>
                          </div>
                        </div>
                        <Badge variant="amber">{member.membership?.name || 'VIP Member'}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/5 p-3 rounded-xl">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-bold block">Fitness Goal</span>
                          <span className="font-extrabold text-amber-400">{member.fitnessGoal || 'General Fitness'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-bold block">Target Weight</span>
                          <span className="font-extrabold text-white">{member.targetWeight || 70} kg</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-400 space-y-1">
                        <p><strong className="text-gray-300">Style:</strong> {member.preferredTrainingStyle || 'Strength & Conditioning'}</p>
                        <p><strong className="text-gray-300">Registered:</strong> {member.registrationDate ? new Date(member.registrationDate).toLocaleDateString() : 'Today'}</p>
                        <p className="text-[10px] text-amber-500/90 font-bold">Recommended: {recSpec}</p>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenAssignModal(member)}
                      className="w-full bg-amber-500 text-black hover:bg-amber-400 font-black text-xs uppercase"
                    >
                      Assign Trainer →
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* 3. TRAINER ATTENDANCE & LEAVE REQUESTS WORKFLOW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Trainer Attendance Summary */}
          <Card className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white font-display uppercase">TRAINER DAILY ATTENDANCE</h3>
                <p className="text-xs text-gray-400">Daily duty roster & active trainer status</p>
              </div>
              <Button variant="glass" size="sm" onClick={() => navigate('/admin/attendance')} className="text-xs">
                Attendance Log →
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl">
                <span className="text-[10px] text-emerald-400 uppercase font-extrabold block">Active / Present</span>
                <span className="text-2xl font-black text-emerald-400 font-display">{stats.trainers.available + stats.trainers.busy}</span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl">
                <span className="text-[10px] text-amber-400 uppercase font-extrabold block">In Coaching</span>
                <span className="text-2xl font-black text-amber-400 font-display">{stats.trainers.busy}</span>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl">
                <span className="text-[10px] text-rose-400 uppercase font-extrabold block">On Leave</span>
                <span className="text-2xl font-black text-rose-400 font-display">{stats.trainers.onLeave}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Coach Availability Roster</h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {trainers.slice(0, 6).map((t) => (
                  <div key={t._id || t.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                        {t.name ? t.name.charAt(0) : 'T'}
                      </div>
                      <div>
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-[10px] text-gray-400">{t.specialization}</p>
                      </div>
                    </div>
                    <Badge variant={t.availabilityStatus === 'Available' ? 'green' : t.availabilityStatus === 'Busy' ? 'amber' : 'crimson'}>
                      {t.availabilityStatus || 'Available'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Trainer Leave Requests Review */}
          <Card className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white font-display uppercase">PENDING TRAINER LEAVE REQUESTS</h3>
                <p className="text-xs text-gray-400">Review & approve/reject leave applications</p>
              </div>
              <Badge variant="amber">{pendingLeaves.length} Pending</Badge>
            </div>

            {pendingLeaves.length === 0 ? (
              <div className="py-12 text-center bg-white/5 rounded-2xl border border-dashed border-white/10 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-sm font-bold text-white uppercase">No Pending Leave Requests</p>
                <p className="text-xs text-gray-400">All trainer leave applications have been reviewed.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {pendingLeaves.map((leave) => (
                  <div key={leave._id || leave.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-white text-sm uppercase">{leave.trainerName || leave.trainer?.name || 'Master Coach'}</h4>
                        <p className="text-[11px] text-amber-400 font-mono">
                          {leave.startDate} to {leave.endDate}
                        </p>
                      </div>
                      <Badge variant="amber">Pending Review</Badge>
                    </div>

                    <p className="text-xs text-gray-300 bg-black/40 p-2.5 rounded-lg border border-white/5 italic">
                      "{leave.reason}"
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={actioningLeaveId === leave._id}
                        onClick={() => handleReviewLeave(leave._id, 'Approved')}
                        className="flex-1 bg-emerald-500 text-black hover:bg-emerald-400 font-extrabold text-xs py-1.5"
                      >
                        Approve Leave
                      </Button>
                      <Button
                        variant="glass"
                        size="sm"
                        disabled={actioningLeaveId === leave._id}
                        onClick={() => handleReviewLeave(leave._id, 'Rejected')}
                        className="flex-1 border-rose-500/40 text-rose-400 hover:bg-rose-500/10 font-bold text-xs py-1.5"
                      >
                        Reject Request
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* 4. EQUIPMENT MAINTENANCE & MEMBERSHIP MANAGEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Equipment Maintenance Management */}
          <Card className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white font-display uppercase">EQUIPMENT MAINTENANCE MANAGEMENT</h3>
                <p className="text-xs text-gray-400">Track equipment status & maintenance reports</p>
              </div>
              <Button variant="glass" size="sm" onClick={() => navigate('/admin/equipment')} className="text-xs">
                Equipment Hub →
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Health Index</span>
                <span className="text-xl font-black text-emerald-400 font-display">{stats.equipment.healthIndex}%</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Operational</span>
                <span className="text-xl font-black text-white font-display">{stats.equipment.operational}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">Pending</span>
                <span className="text-xl font-black text-amber-400 font-display">{stats.equipment.pendingMaintenance}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl">
                <span className="text-[10px] text-rose-400 uppercase font-bold block">Under Service</span>
                <span className="text-xl font-black text-rose-400 font-display">{stats.equipment.underService}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Service & Repair Requests</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {maintenanceItems.length === 0 ? (
                  <p className="text-xs text-gray-500 py-4 text-center">No equipment currently requiring service.</p>
                ) : (
                  maintenanceItems.map((item) => (
                    <div key={item._id || item.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="text-[10px] text-gray-500 font-mono">({item.equipmentId})</span>
                        </div>
                        {item.issueReported && (
                          <p className="text-[11px] text-amber-400/90 mt-0.5">Reported: {item.issueReported}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateEquipmentStatus(item._id, e.target.value)}
                          className="bg-black border border-white/20 text-xs rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="Operational">Operational</option>
                          <option value="Schedule Maintenance">Schedule Maintenance</option>
                          <option value="Under Maintenance">Under Maintenance</option>
                          <option value="Out of Service">Out of Service</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Admin Notifications & Telemetry */}
          <Card className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <h3 className="text-lg font-bold text-white font-display uppercase">ADMIN NOTIFICATIONS</h3>
              </div>
              <Button variant="glass" size="sm" onClick={() => navigate('/admin/notifications')} className="text-xs">
                All Logs →
              </Button>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="text-xs text-gray-500 py-6 text-center">No new admin notifications.</p>
              ) : (
                notifications.map((notif, idx) => (
                  <div key={notif._id || idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{notif.title}</span>
                      <span className="text-[10px] text-gray-500">{new Date(notif.createdAt || Date.now()).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-gray-400">{notif.message}</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* 5. TRAINER ASSIGNMENT MODAL */}
        {isAssignModalOpen && selectedMember && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <Badge variant="amber">TRAINER ASSIGNMENT</Badge>
                  <h3 className="text-xl font-black text-white font-display uppercase tracking-tight mt-1">
                    Assign Coach to {selectedMember.name}
                  </h3>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-gray-400 hover:text-white p-2 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Member Profile Details */}
              <div className="bg-white/5 rounded-2xl p-4 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-500 uppercase font-bold block text-[10px]">Fitness Goal</span>
                    <span className="font-extrabold text-amber-400 text-sm">{selectedMember.fitnessGoal || 'General Fitness'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase font-bold block text-[10px]">Target Weight</span>
                    <span className="font-extrabold text-white text-sm">{selectedMember.targetWeight || 70} kg</span>
                  </div>
                </div>
                <p className="pt-1"><strong className="text-gray-300">Training Style:</strong> {selectedMember.preferredTrainingStyle || 'General Fitness'}</p>
                <p><strong className="text-gray-300">Medical Information:</strong> {selectedMember.medicalInformation || selectedMember.medicalNotes || 'None'}</p>
              </div>

              {/* Recommended Specialization */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                <p className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">Recommended Coach Specialization</p>
                <p className="text-white font-black text-sm mt-0.5">{getRecommendedSpecialization(selectedMember.fitnessGoal)}</p>
              </div>

              {/* Trainer Select Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-300 block">Select Master Coach</label>
                <select
                  value={selectedTrainerId}
                  onChange={(e) => setSelectedTrainerId(e.target.value)}
                  className="w-full bg-dark-surface border border-white/20 text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Select Trainer --</option>
                  {trainers.map((t) => (
                    <option key={t._id || t.id} value={t._id || t.id}>
                      {t.name} • {t.specialization} ({t.availabilityStatus || 'Available'}) - {t.assignedMembersCount || 0} clients
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="w-1/2 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!selectedTrainerId || assigning}
                  onClick={handleConfirmAssignment}
                  className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
                >
                  {assigning ? 'Assigning...' : 'Confirm Assignment'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
