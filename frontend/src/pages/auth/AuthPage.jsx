import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Button, Card, AtmosphericBackground } from '../../components/ui/UIComponents';
import { ShieldCheck, User, UserCheck, Target, Lock } from 'lucide-react';

export const AuthPage = ({ initialRole }) => {
  const { roleParam } = useParams();
  const location = useLocation();

  const getRoleFromPath = () => {
    if (initialRole) return initialRole;
    if (roleParam) {
      const formatted = roleParam.charAt(0).toUpperCase() + roleParam.slice(1).toLowerCase();
      if (['Admin', 'Trainer', 'Member'].includes(formatted)) return formatted;
    }
    if (location.pathname.includes('/admin')) return 'Admin';
    if (location.pathname.includes('/trainer')) return 'Trainer';
    if (location.pathname.includes('/member')) return 'Member';
    return 'Admin';
  };

  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState(getRoleFromPath);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const role = getRoleFromPath();
    setSelectedRole(role);
    if (role === 'Admin') {
      setEmail('admin@email.com');
      setPassword('Admin@123');
    } else if (role === 'Trainer') {
      setEmail('marcus.v@gymnex.com');
      setPassword('password123');
    } else {
      setEmail('alex.wright@example.com');
      setPassword('password123');
    }
  }, [location.pathname, initialRole, roleParam]);

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
    { role: 'Admin', icon: ShieldCheck, title: 'ADMIN PORTAL LOGIN', desc: 'Full Enterprise Management Console' },
    { role: 'Trainer', icon: UserCheck, title: 'TRAINER PORTAL LOGIN', desc: 'Clients & Workout Builder Suite' },
    { role: 'Member', icon: User, title: 'MEMBER PORTAL LOGIN', desc: 'Classes, Diet & Personal Pass' }
  ];

  const currentRoleInfo = roles.find((r) => r.role === selectedRole) || roles[0];
  const CurrentIcon = currentRoleInfo.icon;

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark-base flex items-center justify-center p-4 relative overflow-hidden pt-20">
        <AtmosphericBackground />

        <div className="max-w-md w-full relative z-10">
          <Card className="p-8 space-y-6 shadow-2xl border-white/10 bg-dark-surface/90 backdrop-blur-xl">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center mx-auto shadow-crimson-glow">
                <CurrentIcon className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
                  {selectedRole} Portal
                </span>
                <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight mt-2">
                  {isRegister ? 'JOIN THE GYMNEX NETWORK' : currentRoleInfo.title}
                </h2>
              </div>
              <p className="text-xs text-gray-400">{currentRoleInfo.desc}</p>
            </div>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
              {roles.map((r) => {
                const Icon = r.icon;
                const active = selectedRole === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.role);
                      if (r.role === 'Admin') {
                        setEmail('admin@gymnex.com');
                        navigate('/auth/admin');
                      } else if (r.role === 'Trainer') {
                        setEmail('marcus.v@gymnex.com');
                        navigate('/auth/trainer');
                      } else {
                        setEmail('alex.wright@example.com');
                        navigate('/auth/member');
                      }
                    }}
                    className={`flex flex-col items-center p-2 rounded-xl text-[10px] font-extrabold uppercase transition-all ${
                      active ? 'bg-amber-500 text-black shadow-crimson-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 mb-0.5" />
                    <span>{r.role}</span>
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4 text-xs">
              {isRegister && (
                <div>
                  <label className="block text-gray-400 uppercase font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alexander Wright"
                    className="w-full px-4 py-2.5 bg-dark-card border border-white/10 rounded-full text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-400 uppercase font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gymnex.com"
                  className="w-full px-4 py-2.5 bg-dark-card border border-white/10 rounded-full text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-400 uppercase font-bold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-dark-card border border-white/10 rounded-full text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <Button variant="primary" size="md" type="submit" className="w-full font-black mt-2" disabled={loading}>
                {loading ? 'Authenticating...' : isRegister ? 'Create Account' : `Sign In as ${selectedRole}`}
              </Button>
            </form>

            <div className="text-center text-xs text-gray-400 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="hover:text-amber-500 transition-colors"
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
