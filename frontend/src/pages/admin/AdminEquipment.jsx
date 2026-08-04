import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import {
  Wrench,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  FileText
} from 'lucide-react';

export const AdminEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [summaryStats, setSummaryStats] = useState({ total: 150, operational: 141, pendingMaintenance: 6, underService: 3, healthIndex: 94 });
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Forms
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    category: 'Strength',
    status: 'Operational'
  });

  const [reportForm, setReportForm] = useState({
    equipmentId: '',
    issueReported: '',
    reportedBy: 'Coach Trainer'
  });

  const loadEquipmentData = async () => {
    setLoading(true);
    try {
      const res = await api.getEquipment();
      if (Array.isArray(res)) {
        setEquipmentList(res);
        const op = res.filter((e) => e.status === 'Operational').length;
        const pend = res.filter((e) => e.status === 'Schedule Maintenance' || e.status === 'Under Maintenance').length;
        const serv = res.filter((e) => e.status === 'Under Maintenance').length;
        const total = res.length;
        const healthIndex = total > 0 ? Math.round((op / total) * 100) : 100;
        setSummaryStats({ total, operational: op, pendingMaintenance: pend, underService: serv, healthIndex });
      }
    } catch (err) {
      console.error('Error fetching equipment:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipmentData();
  }, []);

  const handleCreateEquipment = async (e) => {
    e.preventDefault();
    try {
      await api.createEquipment(equipmentForm);
      setIsAddModalOpen(false);
      setEquipmentForm({ name: '', category: 'Strength', status: 'Operational' });
      loadEquipmentData();
    } catch (err) {
      console.error('Create equipment error:', err);
    }
  };

  const handleReportIssue = async (e) => {
    e.preventDefault();
    if (!reportForm.equipmentId || !reportForm.issueReported) return;
    try {
      await api.reportEquipmentIssue(reportForm.equipmentId, reportForm.issueReported, reportForm.reportedBy);
      setIsReportModalOpen(false);
      setReportForm({ equipmentId: '', issueReported: '', reportedBy: 'Coach Trainer' });
      loadEquipmentData();
    } catch (err) {
      console.error('Report issue error:', err);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.updateEquipmentStatus(id, newStatus);
      loadEquipmentData();
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const filteredEquipment = equipmentList.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (item.name || '').toLowerCase().includes(query) ||
      (item.equipmentId || '').toLowerCase().includes(query) ||
      (item.category || '').toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest">
                FACILITY OPERATIONS
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                EQUIPMENT MAINTENANCE HUB
              </span>
            </div>
            <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
              EQUIPMENT MAINTENANCE MANAGEMENT
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Track gym machinery health, manage trainer maintenance reports, and transition equipment through service lifecycles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={loadEquipmentData} icon={RefreshCw} className={`text-xs ${loading ? 'animate-spin' : ''}`}>
              Sync
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() => setIsReportModalOpen(true)}
              icon={AlertTriangle}
              className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs font-bold"
            >
              Report Issue
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={Plus}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
            >
              Add Equipment
            </Button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Equipment Health Index</span>
            <div className="text-2xl font-black text-emerald-400 font-display mt-2">{summaryStats.healthIndex}%</div>
            <span className="text-[10px] text-emerald-400/80 mt-1">Operational Fleet Percentage</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Pending Maintenance</span>
            <div className="text-2xl font-black text-amber-400 font-display mt-2">{summaryStats.pendingMaintenance}</div>
            <span className="text-[10px] text-amber-400/80 mt-1">Scheduled for Repair</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Under Active Service</span>
            <div className="text-2xl font-black text-rose-400 font-display mt-2">{summaryStats.underService}</div>
            <span className="text-[10px] text-rose-400/80 mt-1">Currently Being Serviced</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Total Machinery Roster</span>
            <div className="text-2xl font-black text-white font-display mt-2">{summaryStats.total}</div>
            <span className="text-[10px] text-gray-500 mt-1">Tracked Sanctuary Assets</span>
          </div>
        </div>

        {/* Controls & Table */}
        <Card className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search equipment name, category, or ID..."
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
                  <option value="Operational">Operational</option>
                  <option value="Schedule Maintenance">Schedule Maintenance</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="font-bold uppercase text-[10px]">Category:</span>
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
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs text-gray-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Asset ID & Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Maintenance Status</th>
                  <th className="py-3 px-3">Reported Issue</th>
                  <th className="py-3 px-3">Last Serviced</th>
                  <th className="py-3 px-3 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEquipment.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                      No equipment matches your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredEquipment.map((item) => (
                    <tr key={item._id || item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                            <Wrench className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-extrabold text-white">{item.name}</p>
                            <p className="text-[10px] text-gray-500 font-mono">{item.equipmentId}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-amber-400">{item.category}</td>

                      <td className="py-3.5 px-3">
                        <Badge
                          variant={
                            item.status === 'Operational'
                              ? 'green'
                              : item.status === 'Under Maintenance'
                              ? 'crimson'
                              : 'amber'
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-3">
                        {item.issueReported ? (
                          <span className="text-amber-400 font-medium italic block max-w-xs truncate">
                            "{item.issueReported}"
                          </span>
                        ) : (
                          <span className="text-gray-500 text-[10px]">No issues reported</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-gray-400">{item.lastMaintenanceDate || '2026-05-15'}</td>

                      <td className="py-3.5 px-3 text-right">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateStatus(item._id || item.id, e.target.value)}
                          className="bg-black border border-white/20 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500"
                        >
                          <option value="Operational">Operational</option>
                          <option value="Schedule Maintenance">Schedule Maintenance</option>
                          <option value="Under Maintenance">Under Maintenance</option>
                          <option value="Out of Service">Out of Service</option>
                          <option value="Maintenance Completed">Maintenance Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* REPORT ISSUE MODAL */}
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white uppercase font-display">Report Equipment Maintenance Issue</h3>
                <button onClick={() => setIsReportModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleReportIssue} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Select Equipment</label>
                  <select
                    required
                    value={reportForm.equipmentId}
                    onChange={(e) => setReportForm({ ...reportForm, equipmentId: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Choose Asset --</option>
                    {equipmentList.map((eq) => (
                      <option key={eq._id || eq.id} value={eq._id || eq.id}>
                        {eq.name} ({eq.equipmentId})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Issue Description</label>
                  <textarea
                    required
                    rows={3}
                    value={reportForm.issueReported}
                    onChange={(e) => setReportForm({ ...reportForm, issueReported: e.target.value })}
                    placeholder="Hydraulic resistance cable tension loose during heavy pull..."
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Reported By</label>
                  <input
                    type="text"
                    value={reportForm.reportedBy}
                    onChange={(e) => setReportForm({ ...reportForm, reportedBy: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="glass" size="sm" onClick={() => setIsReportModalOpen(false)} className="w-1/2 text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs">
                    Submit Maintenance Report
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD EQUIPMENT MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white uppercase font-display">Add Machinery Asset</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateEquipment} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Equipment Name</label>
                  <input
                    type="text"
                    required
                    value={equipmentForm.name}
                    onChange={(e) => setEquipmentForm({ ...equipmentForm, name: e.target.value })}
                    placeholder="Technogym Biostrenth Station #18"
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Category</label>
                  <select
                    value={equipmentForm.category}
                    onChange={(e) => setEquipmentForm({ ...equipmentForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Recovery">Recovery</option>
                    <option value="Free Weights">Free Weights</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="glass" size="sm" onClick={() => setIsAddModalOpen(false)} className="w-1/2 text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs">
                    Add Asset
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
