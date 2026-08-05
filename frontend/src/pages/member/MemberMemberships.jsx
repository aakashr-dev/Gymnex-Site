import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERS, MOCK_MEMBERSHIPS } from '../../data/mockData';
import { Award, Check, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const MemberMemberships = () => {
  const member = MOCK_MEMBERS[0];
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    toast.success(`Requested change to ${plan.name}! Concierge will confirm your tier upgrade.`);
  };

  return (
    <PageTransition>
      <div className="space-y-8 max-w-5xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">MY SUBSCRIPTION & TIER PASSES</h1>
          <p className="text-xs text-gray-400">Active membership entitlements, billing cycle, and available access tiers.</p>
        </div>

        {/* Current Active Plan */}
        <Card className="space-y-6 border-amber-500 shadow-crimson-glow relative overflow-hidden bg-dark-card/95">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Badge variant="amber">CURRENT ACTIVE PLAN</Badge>
              <h3 className="text-2xl font-black text-white font-display uppercase mt-2">CRIMSON ELITE PASS</h3>
              <p className="text-xs text-amber-400 font-semibold">$189 / month • Unlimited Multi-Club Access</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-400 block font-semibold uppercase">Next Auto-Billing Date</span>
              <span className="text-sm font-bold text-white font-mono">{member.expiryDate || '2026-09-15'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Unlimited Global Access to All GYMNEX Sanctuaries</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Unlimited Group Fitness & Spin Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>4 Monthly Cryotherapy & Sauna Passes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-500 shrink-0" />
              <span>2 Monthly 1-on-1 Personal Coaching Sessions</span>
            </div>
          </div>
        </Card>

        {/* All Available Tiers Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-display uppercase">Available Membership Tiers</h3>
            <span className="text-xs text-amber-400 font-mono">3 Standard Access Plans</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_MEMBERSHIPS.map((plan, index) => {
              const isCurrent = plan.id === 'plan-crimson' || plan.name.includes('CRIMSON');
              const planBgImage = index === 0 ? '/membership-plan-1.png' : index === 1 ? '/membership-plan-2.png' : '/membership-plan-3.png';
              return (
                <Card
                  key={plan.id}
                  className={`flex flex-col justify-between space-y-6 relative overflow-hidden group transition-all ${
                    isCurrent
                      ? 'border-amber-500/80 shadow-crimson-glow bg-black/90'
                      : 'border-white/10 bg-black/90'
                  }`}
                >
                  {/* Centered Transparent Background Image */}
                  <div
                    className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-45 mix-blend-screen pointer-events-none transition-all duration-700 group-hover:opacity-65 scale-105"
                    style={{ backgroundImage: `url('${planBgImage}')` }}
                  />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-extrabold text-white font-display uppercase">{plan.name}</h4>
                      {isCurrent ? (
                        <Badge variant="amber">ACTIVE</Badge>
                      ) : (
                        <Badge variant="glass">{plan.badge}</Badge>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-display">{plan.price}</span>
                      <span className="text-xs text-gray-400 font-semibold uppercase">{plan.period}</span>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-gray-300">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 pt-2">
                    <Button
                      variant={isCurrent ? 'glass' : 'primary'}
                      size="sm"
                      disabled={isCurrent}
                      onClick={() => handleSelectPlan(plan)}
                      className={isCurrent ? 'opacity-70 cursor-default w-full' : 'bg-amber-500 text-black font-extrabold w-full'}
                    >
                      {isCurrent ? 'Current Plan' : `Switch to ${plan.name}`}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
