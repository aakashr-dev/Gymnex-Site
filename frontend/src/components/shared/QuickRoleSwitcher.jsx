import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Dumbbell, User, Sparkles, LogOut, ArrowRightLeft } from 'lucide-react';

export const QuickRoleSwitcher = () => {
  const { role, switchRole, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleSelect = (targetRole, defaultRoute) => {
    switchRole(targetRole);
    navigate(defaultRoute);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-dark-surface/90 border border-crimson-500/30 backdrop-blur-xl px-4 py-2.5 rounded-full shadow-crimson-glow flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1.5 text-crimson-500 font-semibold uppercase tracking-wider pr-2 border-r border-white/10">
        <Sparkles className="w-3.5 h-3.5 animate-spin" />
        <span>Demo Roles</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handleRoleSelect('Admin', '/admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            role === 'Admin' && location.pathname.startsWith('/admin')
              ? 'bg-crimson-500 text-white font-semibold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>

        <button
          onClick={() => handleRoleSelect('Trainer', '/trainer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            role === 'Trainer' && location.pathname.startsWith('/trainer')
              ? 'bg-crimson-500 text-white font-semibold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Trainer</span>
        </button>

        <button
          onClick={() => handleRoleSelect('Member', '/member')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            role === 'Member' && location.pathname.startsWith('/member')
              ? 'bg-crimson-500 text-white font-semibold'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Member</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            !location.pathname.startsWith('/admin') &&
            !location.pathname.startsWith('/trainer') &&
            !location.pathname.startsWith('/member')
              ? 'bg-white/15 text-white font-semibold'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <span>Public Site</span>
        </button>
      </div>
    </div>
  );
};
