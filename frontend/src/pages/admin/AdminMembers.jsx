import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, DataTable, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { memberService } from '../../services/apiServices';
import { Plus, Edit, Trash, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', plan: 'Crimson Elite Pass', assignedTrainer: 'Marcus Vance' });

  useEffect(() => {
    memberService.getMembers().then(setMembers);
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    const created = await memberService.addMember(newMember);
    setMembers([created, ...members]);
    toast.success(`Member ${created.name} registered successfully!`);
    setIsAddModalOpen(false);
    setNewMember({ name: '', email: '', plan: 'Crimson Elite Pass', assignedTrainer: 'Marcus Vance' });
  };

  const columns = [
    {
      header: 'Member',
      accessorKey: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-white">{row.name}</p>
            <p className="text-[10px] text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Access Plan', accessorKey: 'plan', render: (row) => <Badge variant="crimson">{row.plan}</Badge> },
    { header: 'Assigned Coach', accessorKey: 'assignedTrainer' },
    { header: 'Status', accessorKey: 'status', render: (row) => <Badge variant={row.status === 'Active' ? 'green' : 'amber'}>{row.status}</Badge> },
    { header: 'Join Date', accessorKey: 'joinDate' },
    { header: 'Pass Code', accessorKey: 'qrCode', render: (row) => <span className="font-mono text-xs text-crimson-500">{row.qrCode}</span> },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">MEMBER MANAGEMENT</h1>
            <p className="text-xs text-gray-400">Directory of registered facility members, active status, and access pass codes.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} icon={Plus}>
            Register New Member
          </Button>
        </div>

        <Card>
          <DataTable columns={columns} data={members} searchPlaceholder="Search member name, email, plan..." />
        </Card>

        {/* Add Member Modal */}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register New Member">
          <form onSubmit={handleAddMember} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="Elena Rostova"
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                placeholder="elena@example.com"
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-gray-400 mb-1">Membership Plan</label>
              <select
                value={newMember.plan}
                onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })}
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
              >
                <option>Core Access Pass</option>
                <option>Crimson Elite Pass</option>
                <option>VIP Black Executive</option>
              </select>
            </div>
            <Button variant="primary" size="md" type="submit" className="w-full">
              Confirm Registration
            </Button>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};
