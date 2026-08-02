import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { SectionHeader, Button, Card } from '../../components/ui/UIComponents';
import toast from 'react-hot-toast';

export const CorporatePage = () => {
  const handleSubmitProposal = (e) => {
    e.preventDefault();
    toast.success('Corporate wellness inquiry submitted! Our enterprise team will contact you within 2 hours.');
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-24 bg-dark-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            eyebrow="B2B Enterprise"
            title="CORPORATE ATHLETIC WELLNESS"
            subtitle="Empower your executive workforce with global GYMNEX access, dedicated biometric tracking, and stress mitigation suites."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="space-y-6">
              <h3 className="text-2xl font-bold text-white font-display uppercase">Executive Employee Perks</h3>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                  <span>Unlimited global access across 150+ luxury flagship branches.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                  <span>Quarterly executive DEXA body composition & VO2 Max testing.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                  <span>Dedicated corporate HR dashboard tracking team wellness engagement.</span>
                </li>
              </ul>
            </Card>

            <Card className="space-y-4">
              <h3 className="text-xl font-bold text-white font-display uppercase">Request Corporate Proposal</h3>
              <form onSubmit={handleSubmitProposal} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-400 uppercase font-semibold mb-1">Company Name</label>
                  <input type="text" required placeholder="Acme Corp" className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 uppercase font-semibold mb-1">Work Email</label>
                  <input type="email" required placeholder="executive@company.com" className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-gray-400 uppercase font-semibold mb-1">Number of Employees</label>
                  <select className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white">
                    <option>50 - 200 Employees</option>
                    <option>200 - 1,000 Employees</option>
                    <option>1,000+ Enterprise Tier</option>
                  </select>
                </div>
                <Button variant="primary" size="md" type="submit" className="w-full">
                  Request Custom B2B Quote
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
