import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { PageTransition } from '../../components/motion/MotionComponents';
import { Button, Card, AtmosphericBackground } from '../../components/ui/UIComponents';
import { ShieldCheck, ArrowRight, Lock, Key, Server, Target } from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@email.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password, 'Admin');
      navigate('/admin');
    } catch (err) {
      setError(err?.message || 'Invalid admin credentials. Please try again.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-dark-base flex items-center justify-center p-4 relative overflow-hidden pt-24 pb-16">
        <AtmosphericBackground />

        <div className="max-w-md w-full relative z-10 space-y-6">
          <Card className="p-8 space-y-6 shadow-2xl border-amber-500/30 bg-dark-surface/95 backdrop-blur-xl relative">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center mx-auto shadow-crimson-glow">
                <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  ENTERPRISE CONTROL PORTAL
                </span>
                <h1 className="text-2xl font-black text-white font-display uppercase tracking-tight mt-2">
                  ADMINISTRATOR LOGIN
                </h1>
              </div>

              <p className="text-xs text-gray-400 font-sans">
                Access full system telemetry, multi-branch operations, financial analytics, and staff access control.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gymnex.com"
                  className="w-full px-4 py-3 bg-dark-card border border-white/15 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Security Password</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-card border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="w-full bg-amber-500 text-black hover:bg-amber-400 font-extrabold shadow-crimson-glow text-xs uppercase tracking-wider py-3 mt-2"
                disabled={loading}
                icon={ArrowRight}
              >
                {loading ? 'Authenticating Admin Access...' : 'Launch Admin Console'}
              </Button>
            </form>

            {/* Quick Demo Credentials Assistant */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                SEEDED ADMIN CREDENTIALS:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setEmail('admin@gmail.com'); setPassword('Admin@123'); }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-dark-card border border-white/10 text-white font-mono text-[10px] hover:border-amber-500 transition-colors"
                >
                  admin@gmail.com
                </button>
                <button
                  type="button"
                  onClick={() => { setEmail('admin@email.com'); setPassword('Admin@123'); }}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-dark-card border border-white/10 text-white font-mono text-[10px] hover:border-amber-500 transition-colors"
                >
                  admin@email.com
                </button>
              </div>
            </div>

            {/* Role Switch Links Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span className="font-bold uppercase tracking-wider">Switch Portal:</span>
              <div className="flex items-center gap-3">
                <Link to="/auth/trainer" className="text-amber-500 hover:underline font-extrabold">
                  Trainer Portal →
                </Link>
                <Link to="/auth/member" className="text-amber-500 hover:underline font-extrabold">
                  Member Portal →
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};
