/**
 * CareGuard Secure API Client
 * Wraps all server-side interactions, handles token injection,
 * and intercepts RBAC 403 Access Denied responses.
 */

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('careguard_token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data = null;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const error = new Error(data?.error || `HTTP Error ${response.status}`);
    error.status = response.status;
    error.code = data?.code || 'UNKNOWN_ERROR';
    error.data = data;
    throw error;
  }

  return data;
};

// 1. Authentication APIs
export const authAPI = {
  login: async (email, password, mfaCode = null) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, mfaCode })
    });
    const data = await handleResponse(res);
    if (data.token) {
      localStorage.setItem('careguard_token', data.token);
    }
    return data;
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await handleResponse(res);
    if (data.token) {
      localStorage.setItem('careguard_token', data.token);
    }
    return data;
  },

  logout: async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } finally {
      localStorage.removeItem('careguard_token');
      localStorage.removeItem('careguard_current_user');
    }
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await handleResponse(res);
  }
};

// 2. Patient APIs (with server-side IDOR protection)
export const patientsAPI = {
  getPatients: async () => {
    const res = await fetch(`${API_BASE}/patients`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  getPatientProfile: async (id) => {
    const res = await fetch(`${API_BASE}/patients/${id}`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  updatePatientProfile: async (id, data) => {
    const res = await fetch(`${API_BASE}/patients/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },

  getPatientRecords: async (id) => {
    const res = await fetch(`${API_BASE}/patients/${id}/records`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  }
};

// 3. Doctor APIs
export const doctorsAPI = {
  getDoctors: async () => {
    const res = await fetch(`${API_BASE}/doctors`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  getDoctorById: async (id) => {
    const res = await fetch(`${API_BASE}/doctors/${id}`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  toggleDoctorStatus: async (id) => {
    const res = await fetch(`${API_BASE}/doctors/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  }
};

// 4. Appointments APIs
export const appointmentsAPI = {
  getAppointments: async () => {
    const res = await fetch(`${API_BASE}/appointments`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  bookAppointment: async (appointmentData) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointmentData)
    });
    return await handleResponse(res);
  },

  cancelAppointment: async (id, reason) => {
    const res = await fetch(`${API_BASE}/appointments/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });
    return await handleResponse(res);
  },

  rescheduleAppointment: async (id, newDate, newTime) => {
    const res = await fetch(`${API_BASE}/appointments/${id}/reschedule`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newDate, newTime })
    });
    return await handleResponse(res);
  }
};

// 5. Security Center APIs
export const securityAPI = {
  getOverview: async () => {
    const res = await fetch(`${API_BASE}/security/overview`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  getAuditLogs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/security/audit-logs?${query}`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  simulateProbe: async () => {
    const res = await fetch(`${API_BASE}/security/simulate-probe`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  terminateSessions: async () => {
    const res = await fetch(`${API_BASE}/security/terminate-sessions`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return await handleResponse(res);
  },

  simulateFirewallRequest: async (scenario) => {
    const res = await fetch(`${API_BASE}/security/firewall/simulate-request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(scenario)
    });
    return await handleResponse(res);
  }
};
