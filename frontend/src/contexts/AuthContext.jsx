import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, memberService, trainerService } from '../services/apiServices';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [role, setRole] = useState(user?.role || 'Admin');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gymnex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gymnex_user');
    }
  }, [user]);

  const login = async (email, password, selectedRole) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password, selectedRole);
      setUser(res.user);
      setRole(res.user.role || selectedRole);
      toast.success(`Welcome back, ${res.user.name}!`);
      return res.user;
    } catch (err) {
      toast.error('Authentication failed. Please check credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gymnex_user');
    toast.success('Logged out successfully.');
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === 'Admin') {
      const adminUser = { id: 'admin-1', name: 'Director Vance', email: 'admin@gymnex.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' };
      setUser(adminUser);
      toast.success('Switched to Admin Role');
    } else if (newRole === 'Trainer') {
      const trainerUser = { id: 'trn-1', name: 'Marcus Vance', email: 'marcus.v@gymnex.com', role: 'Trainer', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600' };
      setUser(trainerUser);
      toast.success('Switched to Trainer Role');
    } else {
      const memberUser = { id: 'mem-101', name: 'Alexander Wright', email: 'alex.wright@example.com', role: 'Member', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' };
      setUser(memberUser);
      toast.success('Switched to Member Role');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
