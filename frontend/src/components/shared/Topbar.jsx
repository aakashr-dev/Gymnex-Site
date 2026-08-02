import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Search, QrCode, Sparkles, X } from 'lucide-react';
import { Modal, Button, Badge } from '../ui/UIComponents';

export const Topbar = () => {
  const { user, role } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <header className="h-16 bg-dark-surface/80 border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
      {/* Search Input */}
      <div className="relative w-64 md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${role} modules, members, classes...`}
          className="w-full pl-9 pr-4 py-1.5 bg-dark-card border border-white/10 rounded-xl text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-crimson-500 transition-colors"
        />
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* QR Access Pass Trigger */}
        <Button
          variant="glass"
          size="sm"
          onClick={() => setQrModalOpen(true)}
          icon={QrCode}
        >
          Check-In QR
        </Button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-xl bg-dark-card border border-white/10 text-gray-300 hover:text-white hover:border-crimson-500/30 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-crimson-500" />
          </button>

          {/* Notification Drawer Popover */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-dark-card border border-white/10 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Notifications</span>
                <Badge variant="crimson">3 New</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <p className="font-semibold text-white">Class Confirmed</p>
                  <p className="text-gray-400">Crimson Velocity Spin reserved for tomorrow 07:00 AM.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <p className="font-semibold text-white">Workout Assigned</p>
                  <p className="text-gray-400">Coach Marcus updated your Titan Hypertrophy Week 4 routine.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role Pill */}
        <Badge variant={role === 'Admin' ? 'crimson' : role === 'Trainer' ? 'amber' : 'green'}>
          {role}
        </Badge>
      </div>

      {/* QR Pass Modal */}
      <Modal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} title="GYMNEX Digital Access Pass">
        <div className="text-center space-y-4 py-4">
          <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center border-4 border-crimson-500 shadow-crimson-glow">
            {/* Mock QR SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
              <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v20H40zM50 40h20v10H50zM30 50h10v30H30zM70 70h20v20H70z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white uppercase">{user?.name || 'Alexander Wright'}</h4>
            <p className="text-xs text-crimson-500 font-mono tracking-widest">ID: GYM-ACCESS-99210</p>
            <p className="text-xs text-gray-400 pt-2">Scan at turnstile scanner for immediate floor access.</p>
          </div>
        </div>
      </Modal>
    </header>
  );
};
