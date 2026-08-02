import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS } from '../../data/mockData';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const MemberProfile = () => {
  const member = MOCK_MEMBERS[0];

  return (
    <PageTransition>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">PERSONAL ATHLETE PROFILE</h1>
          <p className="text-xs text-gray-400">Update personal information, emergency contact, and account security.</p>
        </div>

        <Card className="space-y-4 text-xs">
          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-crimson-500" />
            <div>
              <h3 className="text-xl font-bold text-white font-display uppercase">{member.name}</h3>
              <p className="text-xs text-crimson-500 font-mono">PASS CODE: {member.qrCode}</p>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 uppercase font-semibold mb-1">Email Address</label>
            <input type="email" defaultValue={member.email} className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
          </div>
          <div>
            <label className="block text-gray-400 uppercase font-semibold mb-1">Emergency Contact Phone</label>
            <input type="text" defaultValue="+1 (555) 019-2831" className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
          </div>
          <Button variant="primary" size="md" icon={Save} onClick={() => toast.success('Profile updated!')} className="w-full">
            Save Profile Settings
          </Button>
        </Card>
      </div>
    </PageTransition>
  );
};
