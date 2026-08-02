import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { MOCK_MEMBERSHIPS } from '../../data/mockData';
import { Plus, Edit, Check } from 'lucide-react';

export const AdminMemberships = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">MEMBERSHIP TIER CONFIGURATION</h1>
            <p className="text-xs text-gray-400">Configure global access pricing, perks, and active subscription status.</p>
          </div>
          <Button variant="primary" size="sm" icon={Plus}>Create Plan Tier</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_MEMBERSHIPS.map((plan) => (
            <Card key={plan.id} className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-display uppercase">{plan.name}</h3>
                  <Badge variant={plan.popular ? 'crimson' : 'gray'}>{plan.badge}</Badge>
                </div>
                <div className="text-3xl font-black text-white font-display">
                  {plan.price} <span className="text-xs text-gray-400 font-normal">{plan.period}</span>
                </div>
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-crimson-500" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="glass" size="sm" icon={Edit} className="w-full">
                Edit Tier Pricing
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
