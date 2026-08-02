import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS } from '../../data/mockData';
import { Award, Check, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MemberMemberships = () => {
  const member = MOCK_MEMBERS[0];
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">MY SUBSCRIPTION & PASS</h1>
          <p className="text-xs text-gray-400">Active membership details, global access entitlements, and billing renewal.</p>
        </div>

        <Card className="space-y-6 border-crimson-500 shadow-crimson-glow">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="crimson">{member.plan}</Badge>
              <h3 className="text-2xl font-black text-white font-display uppercase mt-2">VIP CRIMSON ELITE PASS</h3>
              <p className="text-xs text-gray-400">Unlimited Global Access + Cryotherapy Lab</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block font-semibold uppercase">Renews On</span>
              <span className="text-sm font-bold text-white font-mono">{member.expiryDate}</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-crimson-500" />
              <span>Unlimited Global Access to 150+ Flagship GYMNEX Branches</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-crimson-500" />
              <span>Unlimited Spin & Olympic Barbell Group Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-crimson-500" />
              <span>4 Monthly Cryotherapy & Sauna Regeneration Passes</span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <Button variant="primary" size="md" onClick={() => navigate('/membership')}>
              Upgrade Plan Tier
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
