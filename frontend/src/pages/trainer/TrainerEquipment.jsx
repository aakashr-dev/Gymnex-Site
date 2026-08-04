import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Search,
  RefreshCw,
  Send,
  Activity,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';
import toast from 'react-hot-toast';

export const TrainerEquipment = () => {
  const { user } = useAuth();
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Report Issue Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [issueNotes, setIssueNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const data = await api.getEquipment();
      if (Array.isArray(data) && data.length > 0) {
        setEquipmentList(data);
      } else {
        // Fallback default dataset if empty
        setEquipmentList([
          {
            _id: 'eq-1',
            equipmentId: 'EQ-1001',
            name: 'Technogym Biostrenth Leg Press',
            category: 'Strength',
            status: 'Operational',
            condition: 'Excellent',
            lastInspected: '2026-08-01',
            location: 'Main Floor - Bay 2'
          },
          {
            _id: 'eq-2',
            equipmentId: 'EQ-1002',
            name: 'Cryotherapy Vault Alpha',
            category: 'Recovery',
            status: 'Operational',
            condition: 'Good',
            lastInspected: '2026-07-28',
            location: 'Recovery Spa Vault 1'
          },
          {
            _id: 'eq-3',
            equipmentId: 'EQ-1003',
            name: 'Hammer Strength Dual Cable Cross',
            category: 'Cable Machines',
            status: 'Schedule Maintenance',
            condition: 'Needs Inspection',
            lastInspected: '2026-07-20',
            location: 'Main Floor - Cable Zone'
          },
          {
            _id: 'eq-4',
            equipmentId: 'EQ-1004',
            name: 'Eleiko Olympic Lifting Platform #4',
            category: 'Free Weights',
            status: 'Operational',
            condition: 'Excellent',
            lastInspected: '2026-08-02',
            location: 'Platform Zone'
          },
          {
            _id: 'eq-5',
            equipmentId: 'EQ-1005',
            name: 'Woodway Curve Treadmill Pro',
            category: 'Cardio',
            status: 'Under Maintenance',
            condition: 'Belt Calibration',
            lastInspected: '2026-08-03',
            location: 'Cardio Deck'
          }
        ]);
      }
    } catch (err) {
      console.error('Fetch equipment error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleOpenReportModal = (item) => {
    setSelectedItem(item);
    setIssueNotes('');
    setIsReportModalOpen(true);
  };

  const handleSendIssueReport = async (e) => {
    e.preventDefault();
    if (!selectedItem || !issueNotes.trim()) {
      toast.error('Please enter details about the equipment issue.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.reportEquipmentIssue(
        selectedItem._id || selectedItem.id,
        issueNotes,
        user?.name || 'Master Coach'
      );

      if (res.success || res.data) {
        toast.success(`Maintenance report for ${selectedItem.name} sent to Admin!`);
        setIsReportModalOpen(false);
        setSelectedItem(null);
        setIssueNotes('');
        await fetchEquipment();
      } else {
        toast.error(res.message || 'Failed to submit equipment report.');
      }
    } catch (err) {
      console.error('Report issue error:', err);
      toast.error('Failed to send maintenance report to Admin.');
    } finally {
      setSubmitting(false);
    }
  };

  // Telemetry Calculations
  const totalItems = equipmentList.length;
  const operationalCount = equipmentList.filter((e) => e.status === 'Operational').length;
  const maintenanceCount = equipmentList.filter((e) => e.status === 'Schedule Maintenance' || e.status === 'Under Maintenance').length;
  const outOfServiceCount = equipmentList.filter((e) => e.status === 'Out of Service').length;

  const filteredEquipment = equipmentList.filter((item) => {
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.equipmentId || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Wrench className="w-3 h-3" /> COACH FACILITY TELEMETRY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight mt-1">
              GYM EQUIPMENT STATUS & ADMIN REPORTING
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Inspect floor machinery operational integrity, track working progress, and send equipment issue reports directly to Admin.
            </p>
          </div>

          <Button variant="glass" size="sm" onClick={fetchEquipment} icon={RefreshCw} className="text-xs self-start md:self-auto">
            Sync Equipment Roster
          </Button>
        </div>

        {/* Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Total Machinery</span>
            <div className="text-2xl font-black text-white font-display mt-2">{totalItems}</div>
            <span className="text-[10px] text-gray-500 mt-1">Facility Floor Inventory</span>
          </div>

          <div className="bg-dark-card border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-emerald-400">Operational & Ready</span>
            <div className="text-2xl font-black text-emerald-400 font-display mt-2">{operationalCount}</div>
            <span className="text-[10px] text-emerald-400/80 mt-1">100% Client Ready</span>
          </div>

          <div className="bg-dark-card border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-amber-400">Maintenance Queue</span>
            <div className="text-2xl font-black text-amber-400 font-display mt-2">{maintenanceCount}</div>
            <span className="text-[10px] text-amber-400/80 mt-1">Inspection & Service Scheduled</span>
          </div>

          <div className="bg-dark-card border border-rose-500/30 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-rose-400">Out of Service</span>
            <div className="text-2xl font-black text-rose-400 font-display mt-2">{outOfServiceCount}</div>
            <span className="text-[10px] text-rose-400/80 mt-1">Awaiting Parts / Repair</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <Card className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by equipment name, ID, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-surface border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-dark-surface border border-white/15 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Categories</option>
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Recovery">Recovery</option>
                <option value="Free Weights">Free Weights</option>
                <option value="Cable Machines">Cable Machines</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-dark-surface border border-white/15 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Statuses</option>
                <option value="Operational">Operational</option>
                <option value="Schedule Maintenance">Schedule Maintenance</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
          </div>

          {/* Equipment Grid */}
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-400 font-mono">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Syncing facility equipment telemetry...
            </div>
          ) : filteredEquipment.length === 0 ? (
            <div className="py-12 text-center text-gray-400 italic text-xs">
              No equipment found matching criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredEquipment.map((item) => {
                const isOp = item.status === 'Operational';
                const isSched = item.status === 'Schedule Maintenance' || item.status === 'Under Maintenance';

                return (
                  <div
                    key={item._id || item.id || item.equipmentId}
                    className="bg-dark-surface border border-white/10 rounded-2xl p-5 space-y-4 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between relative group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-amber-500 font-bold uppercase block">
                            {item.equipmentId || 'EQ-UNIT'}
                          </span>
                          <h3 className="text-base font-extrabold text-white font-display uppercase mt-0.5">
                            {item.name}
                          </h3>
                        </div>
                        <Badge variant={isOp ? 'green' : isSched ? 'amber' : 'crimson'}>
                          {item.status || 'Operational'}
                        </Badge>
                      </div>

                      <div className="text-xs text-gray-400 space-y-1.5 p-3 rounded-xl bg-black/40 border border-white/5">
                        <div className="flex justify-between">
                          <span className="text-gray-500 uppercase text-[10px] font-bold">Category:</span>
                          <span className="text-white font-bold">{item.category || 'Gym Floor'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 uppercase text-[10px] font-bold">Location:</span>
                          <span className="text-gray-300 font-semibold">{item.location || 'Main Gym Floor'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 uppercase text-[10px] font-bold">Last Inspection:</span>
                          <span className="text-amber-400 font-mono text-[11px]">{item.lastInspected || '2026-08-01'}</span>
                        </div>
                        {item.issueReported && (
                          <div className="pt-1.5 border-t border-white/10 text-amber-300 italic text-[11px]">
                            <strong className="text-amber-400 not-italic">Reported Issue:</strong> "{item.issueReported}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleOpenReportModal(item)}
                        icon={AlertTriangle}
                        className="w-full bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black font-extrabold text-xs uppercase tracking-wider py-2.5 transition-all"
                      >
                        Report Issue to Admin
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* REPORT ISSUE MODAL */}
        {isReportModalOpen && selectedItem && (
          <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Report Equipment Issue to Admin">
            <form onSubmit={handleSendIssueReport} className="space-y-4 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <p className="font-extrabold uppercase text-xs font-display">Target Machine:</p>
                <p className="text-white font-bold text-sm mt-0.5">{selectedItem.name} ({selectedItem.equipmentId || 'EQ-UNIT'})</p>
                <p className="text-[11px] text-gray-300 mt-1">Location: {selectedItem.location || 'Main Floor'}</p>
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1.5">
                  Describe Issue & Working Progress Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  value={issueNotes}
                  onChange={(e) => setIssueNotes(e.target.value)}
                  placeholder="E.g., Cable tension loose on pulley, motor calibration noise on treadmill, or hydraulic pressure dropping during high loads..."
                  className="w-full px-3.5 py-2.5 bg-dark-surface border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button variant="glass" size="sm" type="button" onClick={() => setIsReportModalOpen(false)} className="w-1/2">
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
                  {submitting ? 'Sending Report...' : 'Send to Admin'}
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </PageTransition>
  );
};
