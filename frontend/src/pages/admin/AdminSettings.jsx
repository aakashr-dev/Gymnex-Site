import React from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button } from '../../components/ui/UIComponents';
import { Settings, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminSettings = () => {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">PLATFORM CONFIGURATION & SETTINGS</h1>
          <p className="text-xs text-gray-400">Global branding tokens, turnstile API keys, and security permissions.</p>
        </div>

        <Card className="max-w-2xl space-y-6">
          <div className="space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white font-display uppercase">Platform Identity</h3>
            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">Platform Name</label>
              <input type="text" defaultValue="GYMNEX Enterprise Platform" className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
            </div>
            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">Primary Accent Color Token</label>
              <input type="text" defaultValue="#F5A623 (Warm Amber)" disabled className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-gray-400 font-mono font-bold" />
            </div>
            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">Turnstile API Access Key</label>
              <input type="password" defaultValue="gymnex_secret_api_key_2026" className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white" />
            </div>
            <Button variant="primary" size="md" icon={Save} onClick={() => toast.success('Platform Settings Saved!')}>
              Save Platform Configuration
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};
