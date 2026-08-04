import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  UserX,
  FileText,
  Plus,
  RefreshCw
} from 'lucide-react';

export const AdminAttendance = () => {
  const [loading, setLoading] = useState(true);
  const [trainerAttendance, setTrainerAttendance] = useState({ summary: {}, trainers: [] });
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState(null);

  // Leave Request Modal
  const [isSubmitLeaveOpen, setIsSubmitLeaveOpen] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    trainerId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    reason: ''
  });

  const [reviewingId, setReviewingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [todayData, leavesData, summaryData, allTrainers] = await Promise.all([
        api.getTodayTrainerAttendance(),
        api.getLeaveRequests(),
        api.getMonthlyAttendanceSummary(),
        api.getTrainers()
      ]);

      if (todayData) setTrainerAttendance(todayData);
      if (Array.isArray(leavesData)) setLeaveRequests(leavesData);
      if (summaryData) setMonthlySummary(summaryData);
      if (Array.isArray(allTrainers)) setTrainers(allTrainers);
    } catch (err) {
      console.error('Error loading attendance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReviewLeave = async (leaveId, status) => {
    setReviewingId(leaveId);
    try {
      await api.reviewLeaveRequest(leaveId, status);
      loadData();
    } catch (err) {
      console.error('Error reviewing leave request:', err);
    } finally {
      setReviewingId(null);
    }
  };

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    if (!leaveForm.trainerId || !leaveForm.reason) return;
    try {
      await api.submitLeaveRequest(leaveForm);
      setIsSubmitLeaveOpen(false);
      setLeaveForm({
        trainerId: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        reason: ''
      });
      loadData();
    } catch (err) {
      console.error('Submit leave error:', err);
    }
  };

  const summary = trainerAttendance.summary || { total: 25, present: 22, absent: 1, onLeave: 2 };
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');

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
                ATTENDANCE & LEAVE MANAGEMENT
              </span>
            </div>
            <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
              TRAINER ATTENDANCE & LEAVE HUB
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Monitor daily coach duty check-ins, process leave applications, and view monthly attendance trends.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={loadData} icon={RefreshCw} className="text-xs">
              Sync
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsSubmitLeaveOpen(true)}
              icon={Plus}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
            >
              Submit Leave Request
            </Button>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Today's Attendance Rate</span>
            <div className="text-2xl font-black text-emerald-400 font-display mt-2">
              {summary.total ? Math.round((summary.present / summary.total) * 100) : 92}%
            </div>
            <span className="text-[10px] text-emerald-400/80 mt-1">{summary.present || 22} Coaches On Duty</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Today's Absent Coaches</span>
            <div className="text-2xl font-black text-rose-400 font-display mt-2">{summary.absent || 0}</div>
            <span className="text-[10px] text-rose-400/80 mt-1">Unexcused Absences</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Pending Leave Requests</span>
            <div className="text-2xl font-black text-amber-400 font-display mt-2">{pendingLeaves.length}</div>
            <span className="text-[10px] text-amber-400/80 mt-1">Requires Admin Action</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Monthly Attendance Rate</span>
            <div className="text-2xl font-black text-purple-400 font-display mt-2">
              {monthlySummary?.trainerAttendanceRate || 96.5}%
            </div>
            <span className="text-[10px] text-purple-400/80 mt-1">30-Day Facility Benchmark</span>
          </div>
        </div>

        {/* 1. TRAINER LEAVE APPROVAL WORKFLOW PANEL */}
        <Card className="border border-amber-500/30 bg-dark-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="amber">WORKFLOW ACTION</Badge>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                  {pendingLeaves.length} PENDING APPLICATIONS
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white font-display uppercase tracking-tight mt-1">
                TRAINER LEAVE REQUESTS WORKFLOW
              </h2>
            </div>
          </div>

          {pendingLeaves.length === 0 ? (
            <div className="py-8 text-center bg-white/5 rounded-2xl border border-dashed border-white/10 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white uppercase">All Trainer Leave Requests Have Been Processed</p>
              <p className="text-xs text-gray-400">New leave applications submitted by trainers will appear here for review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingLeaves.map((leave) => (
                <div key={leave._id || leave.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm">
                        {leave.trainerName ? leave.trainerName.charAt(0) : 'T'}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-sm uppercase">{leave.trainerName || leave.trainer?.name || 'Master Coach'}</h4>
                        <p className="text-[11px] text-amber-400 font-mono">
                          Dates: {leave.startDate} → {leave.endDate}
                        </p>
                      </div>
                    </div>
                    <Badge variant="amber">Pending</Badge>
                  </div>

                  <p className="text-xs text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5 italic">
                    Reason: "{leave.reason}"
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={reviewingId === leave._id}
                      onClick={() => handleReviewLeave(leave._id, 'Approved')}
                      className="w-1/2 bg-emerald-500 text-black hover:bg-emerald-400 font-extrabold text-xs"
                    >
                      Approve Leave
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      disabled={reviewingId === leave._id}
                      onClick={() => handleReviewLeave(leave._id, 'Rejected')}
                      className="w-1/2 border-rose-500/40 text-rose-400 hover:bg-rose-500/10 font-bold text-xs"
                    >
                      Reject Request
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* 2. TODAY'S TRAINER ATTENDANCE ROSTER */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white font-display uppercase">TODAY'S DAILY COACH ROSTER</h3>
              <p className="text-xs text-gray-400">Live duty status of all gym trainers</p>
            </div>
            <Badge variant="green">{summary.present || 22} Present Today</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Coach Name</th>
                  <th className="py-3 px-3">Specialization</th>
                  <th className="py-3 px-3">Branch</th>
                  <th className="py-3 px-3">Check-In Time</th>
                  <th className="py-3 px-3">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(trainerAttendance.trainers || []).map((t) => (
                  <tr key={t._id || t.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                          {t.name ? t.name.charAt(0) : 'C'}
                        </div>
                        <span className="font-extrabold text-white">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-amber-400">{t.specialization}</td>
                    <td className="py-3.5 px-3 text-gray-400">{t.branch?.name || 'Sanctuary Main'}</td>
                    <td className="py-3.5 px-3 font-mono text-gray-300">{t.checkInTime || '06:00 AM'}</td>
                    <td className="py-3.5 px-3">
                      <Badge
                        variant={
                          t.status === 'Present' || t.status === 'In Session'
                            ? 'green'
                            : t.status === 'On Leave'
                            ? 'crimson'
                            : 'amber'
                        }
                      >
                        {t.status || 'Present'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 3. LEAVE REQUEST SUBMISSION MODAL */}
        {isSubmitLeaveOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white uppercase font-display">Submit Trainer Leave Request</h3>
                <button onClick={() => setIsSubmitLeaveOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleSubmitLeave} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Select Coach</label>
                  <select
                    required
                    value={leaveForm.trainerId}
                    onChange={(e) => setLeaveForm({ ...leaveForm, trainerId: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Choose Trainer --</option>
                    {trainers.map((t) => (
                      <option key={t._id || t.id} value={t._id || t.id}>
                        {t.name} ({t.specialization})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Leave Reason</label>
                  <textarea
                    required
                    rows={3}
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    placeholder="Attending International Coaching Conference..."
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="glass" size="sm" onClick={() => setIsSubmitLeaveOpen(false)} className="w-1/2 text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs">
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
