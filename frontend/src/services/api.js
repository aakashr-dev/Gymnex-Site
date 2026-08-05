const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('gymnex_jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleAuthFailure = () => {
  localStorage.removeItem('gymnex_jwt_token');
  localStorage.removeItem('gymnex_user');
};

export const api = {
  // Auth API
  async login(email, password, role) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || 'Login failed.');
      const payload = responseData.data || responseData;
      if (payload.token) localStorage.setItem('gymnex_jwt_token', payload.token);
      return payload;
    } catch (err) {
      console.warn('API Login fallback:', err.message);
      throw err;
    }
  },

  async logout() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      localStorage.removeItem('gymnex_jwt_token');
      return await res.json();
    } catch (err) {
      localStorage.removeItem('gymnex_jwt_token');
      return { success: true };
    }
  },

  async getCurrentUser() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Admin Summary & Analytics API
  async getAdminSummary() {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/admin-summary`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && data.data) return data.data;
      return null;
    } catch (err) {
      console.warn('Fetch admin summary API failed:', err.message);
      return null;
    }
  },

  async getDashboardOverview() {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/overview`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && data.data) return data.data;
      return null;
    } catch (err) {
      console.warn('Fetch dashboard overview API failed:', err.message);
      return null;
    }
  },

  // Branches API
  async getBranches(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/branches?${query}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.warn('Fetch branches API failed:', err.message);
      return [];
    }
  },

  // Members API & Workflow
  async getMembers(params = {}) {
    try {
      const defaultParams = { limit: 1000, ...params };
      const query = new URLSearchParams(defaultParams).toString();
      const res = await fetch(`${API_BASE_URL}/members?${query}`, {
        headers: getAuthHeaders()
      });
      if (res.status === 401) {
        handleAuthFailure();
        return [];
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.warn('Fetch members API failed:', err.message);
      return [];
    }
  },

  async getMyMemberProfile() {
    try {
      const res = await fetch(`${API_BASE_URL}/members/me`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && data.data) return data.data;
      return null;
    } catch (err) {
      console.warn('Fetch my member profile failed:', err.message);
      return null;
    }
  },

  async createMember(memberData) {
    try {
      const res = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(memberData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async getUnassignedMembers() {
    try {
      const res = await fetch(`${API_BASE_URL}/members/unassigned`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.warn('Fetch unassigned members API failed:', err.message);
      return [];
    }
  },

  async assignTrainer(memberId, trainerId) {
    try {
      const res = await fetch(`${API_BASE_URL}/members/${memberId}/assign-trainer`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ trainerId })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async updateMemberStatus(memberId, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/members/${memberId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async updateMember(memberId, updateData) {
    try {
      const res = await fetch(`${API_BASE_URL}/members/${memberId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async deleteMember(memberId) {
    try {
      const res = await fetch(`${API_BASE_URL}/members/${memberId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Trainers API & Workflow
  async getMyTrainerProfile() {
    try {
      const res = await fetch(`${API_BASE_URL}/trainers/me/profile`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        console.error('Fetch my trainer profile error:', res.status, res.statusText);
        return null;
      }
      const data = await res.json();
      if (data.success && data.data) return data.data;
      return null;
    } catch (err) {
      console.error('Fetch my trainer profile exception:', err);
      return null;
    }
  },

  async getTrainers(params = {}) {
    try {
      const defaultParams = { limit: 100, ...params };
      const query = new URLSearchParams(defaultParams).toString();
      const res = await fetch(`${API_BASE_URL}/trainers?${query}`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        if (res.status === 401) {
          handleAuthFailure();
        }
        return [];
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.error('Fetch trainers API network error:', err);
      return [];
    }
  },

  async createTrainer(trainerData) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(trainerData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async updateTrainer(id, trainerData) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainers/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(trainerData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async deleteTrainer(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async getTrainerMembers(trainerId) {
    try {
      const res = await fetch(`${API_BASE_URL}/trainers/${trainerId}/members`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      return [];
    }
  },

  // Attendance & Leave API
  async getAttendance() {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.warn('Fetch attendance API failed:', err.message);
      return [];
    }
  },

  async getTodayTrainerAttendance() {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/trainers/today`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && data.data) return data.data;
      return null;
    } catch (err) {
      return null;
    }
  },

  async getLeaveRequests() {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/leave-requests`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      return [];
    }
  },

  async submitLeaveRequest(leaveData) {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/leave-requests`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(leaveData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async reviewLeaveRequest(leaveId, status, reviewNote = '') {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/leave-requests/${leaveId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, reviewNote })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async getMonthlyAttendanceSummary() {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/summary`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && data.data) return data.data;
      return null;
    } catch (err) {
      return null;
    }
  },

  // Equipment API & Maintenance Workflow
  async getEquipment() {
    try {
      const res = await fetch(`${API_BASE_URL}/equipment`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.warn('Fetch equipment API failed:', err.message);
      return [];
    }
  },

  async createEquipment(equipmentData) {
    try {
      const res = await fetch(`${API_BASE_URL}/equipment`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(equipmentData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async reportEquipmentIssue(equipmentId, issueReported, reportedBy = 'Gym Staff') {
    try {
      const res = await fetch(`${API_BASE_URL}/equipment/report-issue`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ equipmentId, issueReported, reportedBy })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async updateEquipmentStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/equipment/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async updateEquipment(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async deleteEquipment(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/equipment/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Memberships API & Workflow
  async getMemberships() {
    try {
      const res = await fetch(`${API_BASE_URL}/memberships`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.warn('Fetch memberships API failed:', err.message);
      return [];
    }
  },

  async createMembership(planData) {
    try {
      const res = await fetch(`${API_BASE_URL}/memberships`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(planData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async updateMembership(id, planData) {
    try {
      const res = await fetch(`${API_BASE_URL}/memberships/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(planData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async toggleMembershipStatus(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/memberships/${id}/toggle-status`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async deleteMembership(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/memberships/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Programs & Other Public/Member APIs
  async getPrograms() {
    try {
      const res = await fetch(`${API_BASE_URL}/programs`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      return [];
    }
  },

  async getClasses() {
    try {
      const res = await fetch(`${API_BASE_URL}/classes`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      return [];
    }
  },

  async getPayments() {
    try {
      const res = await fetch(`${API_BASE_URL}/payments`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      return [];
    }
  },

  async getEvents() {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      return [];
    }
  },

  async getReviews() {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      return [];
    }
  },

  // Notifications API
  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) return data.data;
      return [];
    } catch (err) {
      console.error('Fetch notifications API failed:', err.message);
      return [];
    }
  },

  async markNotificationRead(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      return await res.json();
    } catch (err) {
      console.error('Mark notification read API failed:', err.message);
      return { success: false, message: err.message };
    }
  },

  // Form Submissions API
  async submitContact(formData) {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return await res.json();
  },

  async submitCorporate(formData) {
    const res = await fetch(`${API_BASE_URL}/corporate-wellness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return await res.json();
  }
};
