import { INITIAL_PATIENTS } from '../data/patients';
import { INITIAL_DOCTORS } from '../data/doctors';
import { INITIAL_APPOINTMENTS } from '../data/appointments';
import { INITIAL_MEDICAL_RECORDS } from '../data/medicalRecords';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';

const STORAGE_KEYS = {
  PATIENTS: 'careguard_patients',
  DOCTORS: 'careguard_doctors',
  APPOINTMENTS: 'careguard_appointments',
  RECORDS: 'careguard_records',
  NOTIFICATIONS: 'careguard_notifications',
  CURRENT_USER: 'careguard_current_user',
  VERSION: 'careguard_store_version_2.0'
};

// Seed or retrieve from localStorage
export const getStoredPatients = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
    return INITIAL_PATIENTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PATIENTS;
  }
};

export const savePatients = (patients) => {
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
};

export const getStoredDoctors = () => {
  const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
    return INITIAL_DOCTORS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_DOCTORS;
  }
};

export const saveDoctors = (doctors) => {
  localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
};

export const getStoredAppointments = () => {
  const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    return INITIAL_APPOINTMENTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
};

export const saveAppointments = (appointments) => {
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
};

export const getStoredMedicalRecords = () => {
  const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_MEDICAL_RECORDS));
    return INITIAL_MEDICAL_RECORDS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_MEDICAL_RECORDS;
  }
};

export const saveMedicalRecords = (records) => {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
};

export const getStoredNotifications = () => {
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
};

export const saveNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
};

export const getCurrentUser = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!data) {
    // Default to doctor session for instant rich view
    const defaultUser = {
      id: "doc-1",
      name: "Dr. Arjun Mehta",
      email: "doctor@careguard.demo",
      role: "doctor",
      specialty: "General Physician",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    return defaultUser;
  }
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const resetAllDemoData = () => {
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(INITIAL_PATIENTS));
  localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(INITIAL_MEDICAL_RECORDS));
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  return true;
};
