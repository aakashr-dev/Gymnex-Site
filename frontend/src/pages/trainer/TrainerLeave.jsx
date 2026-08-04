import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  RefreshCw,
  Send,
  UserCheck,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerLeave = () => {
  const { user } = useAuth();
  const [trainer, setTrainer] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    startDate: todayStr,
    endDate: todayStr,
    reason: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [trainerProfile, allLeaves] = await Promise.all([
        api.getMyTrainerProfile(),
        api.getLeaveRequests()
      ]);

      if (trainerProfile) setTrainer(trainerProfile);

      if (Array.isArray(allLeaves)) {
        // Filter leave requests relevant to this trainer if trainer profile exists
        if (trainerProfile?._id || trainerProfile?.id) {
          const myId = String(trainerProfile._id || trainerProfile.id);
          const myLeaves = allLeaves.filter(
            (l) => l.trainer?._id === myId || l.trainer === myId || l.trainerName === trainerProfile.name
          );
          setLeaveRequests(myLeaves.length > 0 ? myLeaves : allLeaves);
        } else {
          setLeaveRequests(allLeaves);
        }
      }
    } catch (err) {
      console.error('Fetch leave data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.reason.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        trainerId: trainer?._id || trainer?.id,
        trainerName: trainer?.name || user?.name || 'Master Coach',
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      };

      const res = await api.submitLeaveRequest(payload);
      if (res.success || res.data) {
        toast.success('Leave application submitted to Admin for approval!');
        setIsModalOpen(false);
        setFormData({ startDate: todayStr, endDate: todayStr, reason: '' });
        await fetchData();
      } else {
        toast.error(res.message || 'Failed to submit leave application.');
      }
    } catch (err) {
      console.error('Leave submission error:', err);
      toast.error('Failed to submit leave application.');
    } finally {
      setSubmitting(false);
    }
  };

  // Telemetry Calculations
  const totalCount = leaveRequests.length;
  const approvedCount = leaveRequests.filter((l) => l.status === 'Approved').length;
  const pendingCount = leaveRequests.filter((l) => l.status === 'Pending').length;
  const rejectedCount = leaveRequests.filter((l) => l.status === 'Rejected').length;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Calendar className="w-3 h-3" /> COACH LEAVE PERMISSION PORTAL
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight mt-1">
              LEAVE APPLICATION & ADMIN APPROVAL
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Apply for today's leave or upcoming time off, request official permission from Admin, and track approval responses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={fetchData} icon={RefreshCw} className="text-xs">
              Sync
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              icon={Plus}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs uppercase tracking-wider"
            >
              Apply for Leave
            </Button>
          </div>
        </div>

        {/* Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Total Applications</span>
            <div className="text-2xl font-black text-white font-display mt-2">{totalCount}</div>
            <span className="text-[10px] text-gray-500 mt-1">Leave Request History</span>
          </div>

          <div className="bg-dark-card border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-emerald-400">Approved Leaves</span>
            <div className="text-2xl font-black text-emerald-400 font-display mt-2">{approvedCount}</div>
            <span className="text-[10px] text-emerald-400/80 mt-1">Permission Granted by Admin</span>
          </div>

          <div className="bg-dark-card border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-amber-400">Pending Review</span>
            <div className="text-2xl font-black text-amber-400 font-display mt-2">{pendingCount}</div>
            <span className="text-[10px] text-amber-400/80 mt-1">Awaiting Admin Response</span>
          </div>

          <div className="bg-dark-card border border-rose-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-rose-400">Rejected Applications</span>
            <div className="text-2xl font-black text-rose-400 font-display mt-2">{rejectedCount}</div>
            <span className="text-[10px] text-rose-400/80 mt-1">Request Declined</span>
          </div>
        </div>

        {/* Leave Requests Roster */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-extrabold text-white font-display uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              My Leave Request History & Admin Status
            </h3>
            <span className="text-xs text-gray-400 font-mono">
              Coach: <strong className="text-amber-400">{trainer?.name || user?.name || 'Master Coach'}</strong>
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-gray-400 font-mono">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Loading leave permission records...
            </div>
          ) : leaveRequests.length === 0 ? (
            <div className="py-12 text-center text-gray-400 italic text-xs space-y-3">
              <p>You have not submitted any leave applications yet.</p>
              <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="bg-amber-500 text-black font-bold">
                Apply for Today's Leave
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Date Range</th>
                    <th className="py-3 px-3">Reason</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Admin Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {leaveRequests.map((req) => {
                    const isApp = req.status === 'Approved';
                    const isRej = req.status === 'Rejected';

                    return (
                      <tr key={req._id || req.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-white font-mono">{req.startDate}</span>
                          <span className="text-gray-400 mx-1">to</span>
                          <span className="font-bold text-white font-mono">{req.endDate}</span>
                        </td>
                        <td className="py-3.5 px-3 max-w-xs">
                          <p className="text-gray-300 font-medium truncate">{req.reason}</p>
                        </td>
                        <td className="py-3.5 px-3">
                          <Badge variant={isApp ? 'green' : isRej ? 'crimson' : 'amber'}>
                            {req.status || 'Pending'}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-3 text-gray-400 italic">
                          {req.reviewNote || (isApp ? 'Permission Granted' : isRej ? 'Declined by Admin' : 'Awaiting Review')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* APPLY FOR LEAVE MODAL */}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Coach Leave / Permission">
            <form onSubmit={handleSubmitLeave} className="space-y-4 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 space-y-1">
                <p className="font-extrabold uppercase text-xs font-display">Leave Application Protocol:</p>
                <p className="text-gray-300 text-[11px]">
                  Submitting this request alerts Admin for official permission. Once approved, your status will update to <strong className="text-amber-400">On Leave</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">Reason for Leave / Permission *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="E.g., Today's medical emergency, attending international S&C conference, or annual recuperation leave..."
                  className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="glass" size="sm" type="button" onClick={() => setIsModalOpen(false)} className="w-1/2">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submitting}
                  icon={Send}
                  className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold uppercase tracking-wider"
                >
                  {submitting ? 'Submitting...' : 'Submit to Admin'}
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </PageTransition>
  );
};
