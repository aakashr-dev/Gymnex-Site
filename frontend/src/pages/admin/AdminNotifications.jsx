import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';
import { Bell, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('System');

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await api.getNotifications();
      if (Array.isArray(data) && data.length > 0) {
        setNotifications(data);
      } else {
        setNotifications(MOCK_NOTIFICATIONS);
      }
    } catch (err) {
      console.error('Failed to load notifications from API:', err);
      setNotifications(MOCK_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    if (!title || !message) return;

    try {
      const res = await api.createNotification({ title, message, type: audience });
      if (res.success || res.data) {
        toast.success(`Broadcast alert "${title}" sent!`);
        setTitle('');
        setMessage('');
        fetchNotifications();
      }
    } catch (err) {
      toast.error('Failed to send broadcast alert.');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => ((n._id || n.id) === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Mark read error:', err);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">NOTIFICATION BROADCAST CENTER</h1>
            <p className="text-xs text-gray-400">Send push announcements, review system alerts, and track facility logs.</p>
          </div>
          <Button variant="glass" size="sm" onClick={fetchNotifications} icon={RefreshCw} className="text-xs">
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Broadcast Form */}
          <Card className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white font-display uppercase">Compose System Broadcast</h3>
            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase text-gray-400 mb-1">Target Category</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="System">System Wide Announcement</option>
                  <option value="Billing">Billing & Membership Alert</option>
                  <option value="Booking">Coaching & Schedule Alert</option>
                  <option value="Reminder">Facility Maintenance Notice</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold uppercase text-gray-400 mb-1">Alert Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Facility Maintenance Notice"
                  className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block font-semibold uppercase text-gray-400 mb-1">Message Body *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter alert notification body..."
                  className="w-full px-3 py-2 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <Button variant="primary" size="md" type="submit" icon={Send} className="w-full bg-amber-500 text-black hover:bg-amber-400 font-extrabold">
                Broadcast System Alert
              </Button>
            </form>
          </Card>

          {/* Live Notifications Feed */}
          <Card className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-white font-display uppercase">LIVE SYSTEM NOTIFICATION FEED</h3>
              </div>
              <Badge variant="amber">{notifications.length} Alerts</Badge>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="text-xs text-gray-500 py-8 text-center italic">No system notifications currently loggged.</p>
              ) : (
                notifications.map((notif, idx) => (
                  <div
                    key={notif._id || notif.id || idx}
                    className={`p-4 rounded-xl border space-y-2 transition-all ${
                      notif.read ? 'bg-white/5 border-white/5 opacity-70' : 'bg-dark-surface border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">{notif.title}</span>
                        <Badge variant={notif.type === 'System' ? 'amber' : 'blue'}>{notif.type || 'System'}</Badge>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString() : 'Just now'}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300">{notif.message}</p>

                    {!notif.read && (
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => handleMarkRead(notif._id || notif.id)}
                          className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Mark as Read
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};
