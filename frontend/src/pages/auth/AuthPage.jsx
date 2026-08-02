import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Button, Card, Eyebrow } from '../../components/ui/UIComponents';
import { Dumbbell, ShieldCheck, User, UserCheck, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [email, setEmail] = useState('admin@gymnex.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, selectedRole);
      if (selectedRole === 'Admin') navigate('/admin');
      else if (selectedRole === 'Trainer') navigate('/trainer');
      else navigate('/member');
    } catch (err) {
      console.error(err);
    }
  };

  const roles = [
    { role: 'Admin', icon: ShieldCheck, desc: 'Full Enterprise Management' },
    { role: 'Trainer', icon: UserCheck, desc: 'Clients & Workout Builder' },
    { role: 'Member', icon: User, desc: 'Classes, Diet & Personal Pass' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark-base flex items-center justify-center p-4 relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-crimson-radial opacity-40 pointer-events-none" />

        <div className="max-w-md w-full relative z-10">
          <Card className="p-8 space-y-6 shadow-2xl border-white/10">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-crimson-500 flex items-center justify-center mx-auto shadow-crimson-glow">
                <Dumbbell className="w-6 h-6 text-white transform -rotate-45" />
              </div>
              <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">
                {isRegister ? 'JOIN THE GYMNEX NETWORK' : 'WELCOME TO GYMNEX'}
              </h2>
              <p className="text-xs text-gray-400">Select user role & access console demo credentials.</p>
            </div>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
              {roles.map((r) => {
                const Icon = r.icon;
                const active = selectedRole === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.role);
                      if (r.role === 'Admin') setEmail('admin@gymnex.com');
                      else if (r.role === 'Trainer') setEmail('marcus.v@gymnex.com');
                      else setEmail('alex.wright@example.com');
                    }}
                    className={`flex flex-col items-center p-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      active ? 'bg-crimson-500 text-white shadow-crimson-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{r.role}</span>
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4 text-xs">
              {isRegister && (
                <div>
                  <label className="block text-gray-400 uppercase font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alexander Wright"
                    className="w-full px-3.5 py-2.5 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-crimson-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-400 uppercase font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gymnex.com"
                  className="w-full px-3.5 py-2.5 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-crimson-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 uppercase font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-dark-base border border-white/10 rounded-xl text-white focus:outline-none focus:border-crimson-500"
                />
              </div>

              <Button variant="primary" size="md" type="submit" className="w-full font-bold" disabled={loading}>
                {loading ? 'Authenticating...' : isRegister ? 'Create Account' : `Sign In as ${selectedRole}`}
              </Button>
            </form>

            <div className="text-center text-xs text-gray-400 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="hover:text-crimson-500 transition-colors"
              >
                {isRegister ? 'Already registered? Sign In' : 'Need an enterprise account? Register'}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};
