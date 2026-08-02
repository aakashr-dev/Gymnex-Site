import React, { useState } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Button } from '../../components/ui/UIComponents';
import { Bell, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminNotifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('All Members');

  const handleBroadcast = (e) => {
    e.preventDefault();
    toast.success(`Broadcast alert sent to ${audience}!`);
    setTitle('');
    setMessage('');
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-display uppercase">NOTIFICATION BROADCAST CENTER</h1>
          <p className="text-xs text-gray-400">Send push announcements and system alerts to members or trainers.</p>
        </div>

        <Card className="max-w-2xl space-y-4">
          <h3 className="text-lg font-bold text-white font-display uppercase">Compose System Broadcast</h3>
          <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase text-gray-400 mb-1">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
              >
                <option>All Active Members</option>
                <option>Trainer Staff Only</option>
                <option>VIP Black Executive Pass Holders</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold uppercase text-gray-400 mb-1">Alert Headline</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Facility Maintenance Notice"
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-gray-400 mb-1">Message Body</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter alert notification body..."
                className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white"
              />
            </div>
            <Button variant="primary" size="md" type="submit" icon={Send} className="w-full">
              Broadcast System Alert
            </Button>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
};
