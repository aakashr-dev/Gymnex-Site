import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { authService } from '../services/apiServices';
import toast from 'react-hot-toast';

import { getTrainerAvatar } from '../utils/trainerUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = authService.getCurrentUser();
    if (stored && (stored.role === 'Trainer' || stored.name?.toLowerCase().includes('hari') || stored.name?.toLowerCase().includes('hemath') || stored.name?.toLowerCase().includes('logesh') || stored.name?.toLowerCase().includes('kumar') || stored.name?.toLowerCase().includes('lisa'))) {
      stored.avatar = getTrainerAvatar(stored.name, stored.avatar, stored.photo || stored.profileImage);
    }
    return stored;
  });
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
      const res = await api.login(email, password, selectedRole);
      let userData = res?.user || res?.data?.user || { name: 'Master Coach', email, role: selectedRole || 'Admin' };
      if (selectedRole === 'Trainer' || userData.role === 'Trainer') {
        userData.avatar = getTrainerAvatar(userData.name, userData.avatar, userData.photo || userData.profileImage);
      }
      setUser(userData);
      setRole(userData.role || selectedRole || 'Admin');
      toast.success(`Welcome back, ${userData.name || 'User'}!`);
      return userData;
    } catch (err) {
      toast.error(err.message || 'Authentication failed. Please check credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setRole(null);
      localStorage.removeItem('gymnex_user');
      localStorage.removeItem('gymnex_jwt_token');
      toast.success('Logged out successfully.');
      window.location.href = '/login/admin';
    }
  };

  const switchRole = async (newRole) => {
    try {
      if (newRole === 'Admin') {
        await login('admin@gmail.com', 'Admin@123', 'Admin');
      } else if (newRole === 'Trainer') {
        await login('trainer1@gymnex.com', '123456', 'Trainer');
      } else {
        setRole(newRole);
        const memberUser = { id: 'mem-101', name: 'Alexander Wright', email: 'alex.wright@example.com', role: 'Member', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' };
        setUser(memberUser);
        toast.success('Switched to Member Role');
      }
    } catch (e) {
      setRole(newRole);
    }
  };

  const value = React.useMemo(
    () => ({ user, role, loading, login, logout, switchRole }),
    [user, role, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
