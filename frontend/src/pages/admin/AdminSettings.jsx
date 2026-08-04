import React, { useState } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button, Badge } from '../../components/ui/UIComponents';
import { Settings, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminSettings = () => {
  const [platformName, setPlatformName] = useState('GYMNEX Enterprise Platform');
  const [apiKey, setApiKey] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Platform Configuration Updated!');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">PLATFORM CONFIGURATION & SETTINGS</h1>
          <p className="text-xs text-gray-400">Global branding tokens, turnstile API keys, and security permissions.</p>
        </div>

        <Card className="max-w-2xl space-y-6">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white font-display uppercase">Platform Identity</h3>
              <Badge variant="amber">Demo Configuration</Badge>
            </div>

            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">Platform Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">Primary Accent Color Token</label>
              <input
                type="text"
                value="#F5A623 (Warm Amber)"
                disabled
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-gray-400 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-gray-400 uppercase font-semibold mb-1">
                Turnstile Integration Key <span className="text-[10px] text-gray-500 font-mono">(Environment variable: VITE_TURNSTILE_KEY)</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API integration secret key..."
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <Button variant="primary" size="md" type="submit" icon={Save} className="bg-amber-500 text-black hover:bg-amber-400 font-extrabold">
              Save Platform Configuration
            </Button>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
};
