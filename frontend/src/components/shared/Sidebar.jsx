import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Dumbbell,
  Apple,
  Calendar,
  Wrench,
  BarChart3,
  Bell,
  Settings,
  User,
  ClipboardList,
  Flame,
  Award,
  Activity,
  LogOut,
  Target
} from 'lucide-react';

export const Sidebar = () => {
  const { role, user, logout } = useAuth();
  const location = useLocation();

  const navConfigs = {
    Admin: [
      { name: 'Overview', path: '/admin', icon: LayoutDashboard },
      { name: 'Members', path: '/admin/members', icon: Users },
      { name: 'Trainers', path: '/admin/trainers', icon: UserCheck },
      { name: 'Membership Plans', path: '/admin/memberships', icon: CreditCard },
      { name: 'Attendance & Leave', path: '/admin/attendance', icon: Calendar },
      { name: 'Equipment Maintenance', path: '/admin/equipment', icon: Wrench },
      { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
      { name: 'Notifications', path: '/admin/notifications', icon: Bell },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ],
    Trainer: [
      { name: 'Overview', path: '/trainer', icon: LayoutDashboard },
      { name: 'My Clients', path: '/trainer/clients', icon: Users },
      { name: 'Workout Builder', path: '/trainer/workout-builder', icon: Dumbbell },
      { name: 'Diet Planner', path: '/trainer/nutrition-planner', icon: Apple },
      { name: 'Class Schedule', path: '/trainer/class-schedule', icon: Calendar },
      { name: 'Attendance Log', path: '/trainer/attendance', icon: ClipboardList },
      { name: 'Client Progress', path: '/trainer/progress', icon: Activity },
      { name: 'Notifications', path: '/trainer/notifications', icon: Bell },
      { name: 'Profile', path: '/trainer/profile', icon: User },
    ],
    Member: [
      { name: 'Overview', path: '/member', icon: LayoutDashboard },
      { name: 'My Membership', path: '/member/memberships', icon: Award },
      { name: 'My Workouts', path: '/member/workouts', icon: Dumbbell },
      { name: 'My Diet Plan', path: '/member/diet', icon: Apple },
      { name: 'Book Classes', path: '/member/classes', icon: Calendar },
      { name: 'Visit History', path: '/member/attendance', icon: Flame },
      { name: 'Payments', path: '/member/payments', icon: CreditCard },
      { name: 'Body Progress', path: '/member/progress', icon: Activity },
      { name: 'Notifications', path: '/member/notifications', icon: Bell },
      { name: 'Profile', path: '/member/profile', icon: User },
    ]
  };

  const currentNav = navConfigs[role] || navConfigs.Admin;

  return (
    <aside className="w-64 bg-dark-surface border-r border-white/10 flex flex-col justify-between hidden md:flex h-screen sticky top-0 z-30">
      <div className="p-5">
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shadow-crimson-glow">
            <Target className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white font-display uppercase">
              GYM<span className="text-amber-500">NEX</span>
            </span>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest -mt-1">
              {role} Console
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black font-extrabold shadow-crimson-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover border border-amber-500/50"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email || 'user@gymnex.com'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-amber-500 hover:bg-white/5 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
