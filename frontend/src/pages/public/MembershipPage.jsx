import React, { useState } from 'react';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card, Badge } from '../../components/ui/UIComponents';
import { MOCK_MEMBERSHIPS } from '../../data/mockData';
import { Check, Zap, Sparkles, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MembershipPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="Access Tiers"
            title="SELECT YOUR ATHLETIC TIER"
            subtitle="Flexible access passes engineered for serious lifters, corporate executives, and international competitors."
            align="center"
          />

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center">
            <div className="bg-dark-card border border-white/10 p-1.5 rounded-full inline-flex items-center gap-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                  billingCycle === 'monthly' ? 'bg-crimson-500 text-white shadow-crimson-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-crimson-500 text-white shadow-crimson-sm' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_MEMBERSHIPS.map((plan) => {
              const priceVal = billingCycle === 'annual'
                ? `$${Math.round(parseInt(plan.price.replace('$', '')) * 0.8)}`
                : plan.price;

              return (
                <StaggerItem key={plan.id}>
                  <Card
                    className={`h-full flex flex-col justify-between relative ${
                      plan.popular ? 'border-crimson-500 shadow-crimson-glow bg-dark-card/90' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-8 -translate-y-1/2">
                        <Badge variant="crimson" className="py-1 px-3">
                          {plan.badge}
                        </Badge>
                      </div>
                    )}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-extrabold text-white font-display uppercase">{plan.name}</h3>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="text-4xl sm:text-5xl font-black text-white font-display">{priceVal}</span>
                          <span className="text-xs text-gray-400 uppercase font-semibold">{plan.period}</span>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-white/10">
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                            <div className="p-0.5 rounded-full bg-crimson-500/20 text-crimson-500 mt-0.5">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8">
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        size="md"
                        className="w-full"
                        onClick={() => navigate('/auth')}
                      >
                        Subscribe to {plan.name}
                      </Button>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Feature Matrix Table */}
          <div className="pt-12 space-y-6">
            <h3 className="text-2xl font-bold text-white font-display uppercase text-center">Feature Breakdown</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-dark-card">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/5 uppercase text-gray-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Capability</th>
                    <th className="px-6 py-4">Core Access</th>
                    <th className="px-6 py-4 text-crimson-500">Crimson Elite</th>
                    <th className="px-6 py-4">VIP Black Executive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-white">Global Multi-Branch Access</td>
                    <td className="px-6 py-4 text-gray-500">Single Branch</td>
                    <td className="px-6 py-4 text-crimson-500 font-bold">Unlimited</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold">Unlimited 24/7</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-white">Personal Trainer Coaching</td>
                    <td className="px-6 py-4 text-gray-500">Assessment Only</td>
                    <td className="px-6 py-4 text-white">2 Sessions / mo</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold">Unlimited 1-on-1</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-white">Cryotherapy & Recovery Lab</td>
                    <td className="px-6 py-4 text-gray-500">—</td>
                    <td className="px-6 py-4 text-white">4 Passes / mo</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold">Unlimited Daily</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
