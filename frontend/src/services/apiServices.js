import {
  MOCK_MEMBERS,
  MOCK_TRAINERS,
  MOCK_PROGRAMS,
  MOCK_CLASSES,
  MOCK_BRANCHES,
  MOCK_MEMBERSHIPS,
  MOCK_EQUIPMENT,
  MOCK_PAYMENTS,
  MOCK_NOTIFICATIONS
} from '../data/mockData';

// Helper to simulate API latency
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password, role = 'Admin') => {
    await delay(300);
    // Find matching user or fallback to standard demo user
    let user = MOCK_MEMBERS.find(m => m.email === email);
    if (!user) {
      if (role === 'Admin') {
        user = { id: 'admin-1', name: 'Director Vance', email: email || 'admin@gymnex.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' };
      } else if (role === 'Trainer') {
        user = MOCK_TRAINERS[0];
      } else {
        user = MOCK_MEMBERS[0];
      }
    }
    return { token: 'mock-jwt-token-gymnex-2026', user };
  },

  getCurrentUser: () => {
    try {
      const saved = localStorage.getItem('gymnex_user');
      if (saved && saved !== 'undefined') {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.warn('Invalid saved user in localStorage:', err);
    }
    return { id: 'admin-1', name: 'Director Vance', email: 'admin@gymnex.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' };
  }
};

export const memberService = {
  getMembers: async () => {
    await delay(150);
    const local = localStorage.getItem('gymnex_members');
    return local ? JSON.parse(local) : MOCK_MEMBERS;
  },

  addMember: async (newMember) => {
    await delay(250);
    const members = await memberService.getMembers();
    const created = {
      ...newMember,
      id: `mem-${Date.now()}`,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      totalVisits: 0,
      visitStreak: 0,
      qrCode: `GYM-${Math.floor(10000 + Math.random() * 90000)}`
    };
    const updated = [created, ...members];
    localStorage.setItem('gymnex_members', JSON.stringify(updated));
    return created;
  },

  updateMember: async (id, data) => {
    await delay(200);
    const members = await memberService.getMembers();
    const updated = members.map(m => m.id === id ? { ...m, ...data } : m);
    localStorage.setItem('gymnex_members', JSON.stringify(updated));
    return updated.find(m => m.id === id);
  }
};

export const trainerService = {
  getTrainers: async () => {
    try {
      const liveTrainers = await api.getTrainers();
      if (Array.isArray(liveTrainers) && liveTrainers.length > 0) return liveTrainers;
      return [];
    } catch (e) {
      return [];
    }
  }
};

export const classService = {
  getClasses: async () => {
    await delay(150);
    const local = localStorage.getItem('gymnex_classes');
    return local ? JSON.parse(local) : MOCK_CLASSES;
  },

  bookClass: async (classId) => {
    await delay(250);
    const classes = await classService.getClasses();
    const updated = classes.map(c => {
      if (c.id === classId && c.booked < c.capacity) {
        return { ...c, booked: c.booked + 1, isBooked: true };
      }
      return c;
    });
    localStorage.setItem('gymnex_classes', JSON.stringify(updated));
    return updated;
  }
};

export const programService = {
  getPrograms: async () => {
    await delay(150);
    return MOCK_PROGRAMS;
  }
};

export const paymentService = {
  getPayments: async () => {
    await delay(150);
    return MOCK_PAYMENTS;
  }
};

export const equipmentService = {
  getEquipment: async () => {
    await delay(150);
    return MOCK_EQUIPMENT;
  }
};

export const notificationService = {
  getNotifications: async () => {
    await delay(100);
    return MOCK_NOTIFICATIONS;
  }
};
