import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button, Modal } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Check,
  Tag,
  Zap,
  Power,
  RefreshCw,
  Gift
} from 'lucide-react';

export const AdminMemberships = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Form
  const [planForm, setPlanForm] = useState({
    name: '',
    price: 199,
    duration: '1 Month',
    benefits: ['Global Multi-Branch Access', '24/7 VIP Access', 'Executive Locker'],
    isSeasonalOffer: false,
    discountPercentage: 0,
    validUntil: '',
    popular: false,
    status: 'Active'
  });

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await api.getMemberships();
      if (Array.isArray(data)) setPlans(data);
    } catch (err) {
      console.error('Error fetching memberships:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setPlanForm({
      name: '',
      price: 199,
      duration: '1 Month',
      benefits: ['Global Multi-Branch Access', '24/7 VIP Access', 'Executive Locker'],
      isSeasonalOffer: false,
      discountPercentage: 0,
      validUntil: '',
      popular: false,
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan) => {
    setEditingPlan(plan);
    setPlanForm({
      name: plan.name || '',
      price: plan.price || 199,
      duration: plan.duration || '1 Month',
      benefits: plan.benefits || ['Global Multi-Branch Access'],
      isSeasonalOffer: plan.isSeasonalOffer || false,
      discountPercentage: plan.discountPercentage || 0,
      validUntil: plan.validUntil || '',
      popular: plan.popular || false,
      status: plan.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleSubmitPlan = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await api.updateMembership(editingPlan._id || editingPlan.id, planForm);
      } else {
        await api.createMembership(planForm);
      }
      setIsModalOpen(false);
      loadPlans();
    } catch (err) {
      console.error('Error saving plan:', err);
    }
  };

  const handleToggleStatus = async (planId) => {
    try {
      await api.toggleMembershipStatus(planId);
      loadPlans();
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm('Are you sure you want to delete this membership plan?')) return;
    try {
      await api.deleteMembership(planId);
      loadPlans();
    } catch (err) {
      console.error('Delete plan error:', err);
    }
  };

  const totalPlans = plans.length;
  const activePlans = plans.filter((p) => p.status === 'Active').length;
  const seasonalOffers = plans.filter((p) => p.isSeasonalOffer).length;
  const popularPlans = plans.filter((p) => p.popular).length;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest">
                PRICING & OFFERS
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                MEMBERSHIP PLAN CONFIGURATION
              </span>
            </div>
            <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
              MEMBERSHIP PLAN MANAGEMENT
            </h1>
            <p className="text-xs text-gray-400 mt-1 max-w-xl">
              Configure global access tiers, seasonal promotional discounts, plan pricing, benefits, and enable/disable plans.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={loadPlans} icon={RefreshCw} className={`text-xs ${loading ? 'animate-spin' : ''}`}>
              Sync
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreateModal}
              icon={Plus}
              className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs"
            >
              Create New Plan
            </Button>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Total Plans</span>
            <div className="text-2xl font-black text-white font-display mt-2">{totalPlans}</div>
            <span className="text-[10px] text-gray-500 mt-1">Global Access Tiers</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Active Plans</span>
            <div className="text-2xl font-black text-emerald-400 font-display mt-2">{activePlans}</div>
            <span className="text-[10px] text-emerald-400/80 mt-1">Available for Member Purchase</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Seasonal Offers</span>
            <div className="text-2xl font-black text-amber-400 font-display mt-2">{seasonalOffers}</div>
            <span className="text-[10px] text-amber-400/80 mt-1">Active Discount Campaigns</span>
          </div>

          <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase text-gray-400">Popular Tiers</span>
            <div className="text-2xl font-black text-purple-400 font-display mt-2">{popularPlans}</div>
            <span className="text-[10px] text-purple-400/80 mt-1">High Conversion Plans</span>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isOffer = plan.isSeasonalOffer;
            const discountedPrice = isOffer && plan.discountPercentage ? Math.round(plan.price * (1 - plan.discountPercentage / 100)) : plan.price;

            return (
              <div
                key={plan._id || plan.id || plan.planId}
                className={`bg-dark-card border rounded-3xl p-6 flex flex-col justify-between space-y-6 transition-all shadow-xl ${
                  plan.status === 'Disabled'
                    ? 'opacity-60 border-white/10'
                    : plan.popular
                    ? 'border-amber-500/60 shadow-amber-500/10'
                    : 'border-white/10 hover:border-amber-500/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white font-display uppercase tracking-tight">{plan.name}</h3>
                    <div className="flex items-center gap-1.5">
                      {isOffer && (
                        <Badge variant="amber">
                          <Gift className="w-3 h-3 mr-1 inline" /> {plan.discountPercentage}% OFF
                        </Badge>
                      )}
                      <Badge variant={plan.status === 'Active' ? 'green' : 'crimson'}>
                        {plan.status || 'Active'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white font-display">${discountedPrice}</span>
                      {isOffer && (
                        <span className="text-sm font-bold text-gray-500 line-through">${plan.price}</span>
                      )}
                      <span className="text-xs text-gray-400 font-bold uppercase">/ {plan.duration || 'Month'}</span>
                    </div>

                    {isOffer && plan.validUntil && (
                      <p className="text-[10px] font-bold text-amber-400 mt-1 uppercase tracking-wider">
                        Offer Valid Until: {plan.validUntil}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Included Benefits</p>
                    {(plan.benefits || []).map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => handleOpenEditModal(plan)}
                      className="flex-1 text-xs font-bold"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1" /> Edit Specs
                    </Button>

                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => handleToggleStatus(plan._id || plan.id)}
                      className={`text-xs font-bold ${
                        plan.status === 'Active' ? 'text-amber-400 hover:bg-amber-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5 mr-1" /> {plan.status === 'Active' ? 'Disable' : 'Enable'}
                    </Button>

                    <button
                      onClick={() => handleDeletePlan(plan._id || plan.id)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CREATE / EDIT PLAN MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-dark-card border border-amber-500/30 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white uppercase font-display">
                  {editingPlan ? 'Edit Membership Plan' : 'Create Membership Plan'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleSubmitPlan} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-300 uppercase block mb-1">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={planForm.name}
                    onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                    placeholder="CRIMSON ELITE PASS"
                    className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Price ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={planForm.price}
                      onChange={(e) => setPlanForm({ ...planForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-300 uppercase block mb-1">Duration</label>
                    <input
                      type="text"
                      required
                      value={planForm.duration}
                      onChange={(e) => setPlanForm({ ...planForm, duration: e.target.value })}
                      placeholder="1 Month / 12 Months"
                      className="w-full px-3 py-2 bg-dark-surface border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 py-1">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-300">
                    <input
                      type="checkbox"
                      checked={planForm.isSeasonalOffer}
                      onChange={(e) => setPlanForm({ ...planForm, isSeasonalOffer: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    Seasonal Offer
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-300">
                    <input
                      type="checkbox"
                      checked={planForm.popular}
                      onChange={(e) => setPlanForm({ ...planForm, popular: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    Popular Tier
                  </label>
                </div>

                {planForm.isSeasonalOffer && (
                  <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded-xl">
                    <div>
                      <label className="font-bold text-gray-300 uppercase block mb-1">Discount %</label>
                      <input
                        type="number"
                        value={planForm.discountPercentage}
                        onChange={(e) => setPlanForm({ ...planForm, discountPercentage: Number(e.target.value) })}
                        placeholder="15"
                        className="w-full px-3 py-1.5 bg-dark-surface border border-white/15 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-300 uppercase block mb-1">Valid Until</label>
                      <input
                        type="date"
                        value={planForm.validUntil}
                        onChange={(e) => setPlanForm({ ...planForm, validUntil: e.target.value })}
                        className="w-full px-3 py-1.5 bg-dark-surface border border-white/15 rounded-lg text-white"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-3">
                  <Button variant="glass" size="sm" onClick={() => setIsModalOpen(false)} className="w-1/2 text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="w-1/2 bg-amber-500 text-black hover:bg-amber-400 font-extrabold text-xs">
                    {editingPlan ? 'Save Changes' : 'Create Plan'}
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
