import React, { useState, useEffect } from 'react';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Card, Badge, Button } from '../../components/ui/UIComponents';
import { api } from '../../services/api';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export const TrainerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error('Trainer notifications API error:', err);
      setNotifications(MOCK_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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
            <h1 className="text-3xl font-extrabold text-white font-display uppercase">TRAINER ALERTS & NOTIFICATIONS</h1>
            <p className="text-xs text-gray-400">Schedule updates, client workout logs, leave responses, and system broadcasts.</p>
          </div>
          <Button variant="glass" size="sm" onClick={fetchNotifications} icon={RefreshCw} className={`text-xs ${loading ? 'animate-spin' : ''}`}>
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          {notifications.map((n, idx) => (
            <Card key={n._id || n.id || idx} className={`flex items-center justify-between p-4 border ${n.read ? 'opacity-70 border-white/5' : 'border-amber-500/30 bg-dark-card'}`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white font-display uppercase">{n.title}</h4>
                  <Badge variant={n.type === 'System' ? 'amber' : 'blue'}>{n.type || 'Alert'}</Badge>
                </div>
                <p className="text-xs text-gray-300">{n.message}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] text-gray-500 font-mono">
                  {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : n.date || 'Today'}
                </span>
                {!n.read && (
                  <button
                    onClick={() => handleMarkRead(n._id || n.id)}
                    className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase"
                  >
                    <CheckCircle2 className="w-3 h-3" /> Mark Read
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
