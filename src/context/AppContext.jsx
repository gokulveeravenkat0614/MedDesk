import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredPatients, savePatients,
  getStoredDoctors, saveDoctors,
  getStoredAppointments, saveAppointments,
  getStoredMedicalRecords, saveMedicalRecords,
  getStoredNotifications, saveNotifications,
  getCurrentUser, setCurrentUser as persistCurrentUser,
  clearCurrentUser, resetAllDemoData
} from '../utils/storage';
import { DEMO_ACCOUNTS } from '../utils/auth';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setUserState] = useState(getCurrentUser());
  const [patients, setPatientsState] = useState(getStoredPatients());
  const [doctors, setDoctorsState] = useState(getStoredDoctors());
  const [appointments, setAppointmentsState] = useState(getStoredAppointments());
  const [medicalRecords, setRecordsState] = useState(getStoredMedicalRecords());
  const [notifications, setNotificationsState] = useState(getStoredNotifications());
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loginUser = (user) => {
    persistCurrentUser(user);
    setUserState(user);
    showToast(`Logged in successfully as ${user.name} (${user.role.toUpperCase()})`);
  };

  const switchRole = (role) => {
    const user = DEMO_ACCOUNTS[role];
    if (user) {
      persistCurrentUser(user);
      setUserState(user);
      showToast(`Switched view to ${user.name} [${role.toUpperCase()}]`);
    }
  };

  const logout = () => {
    clearCurrentUser();
    setUserState(null);
    showToast('Logged out of session', 'info');
  };

  // Appointments actions
  const bookAppointment = (data) => {
    const newId = `CG-APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppt = {
      id: newId,
      patientId: currentUser?.role === 'patient' ? currentUser.id : data.patientId || 'pat-1',
      patientName: currentUser?.role === 'patient' ? currentUser.name : data.patientName || 'Rahul Kumar',
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      doctorSpecialty: data.doctorSpecialty,
      date: data.date,
      time: data.time,
      type: data.type || 'General Consultation',
      status: 'Upcoming',
      symptoms: data.symptoms || 'General clinical review',
      notes: data.notes || 'Created via CareGuard booking wizard',
      priority: data.priority || 'Normal',
      fee: data.fee || '$60',
      authorizedForDoctor: true,
      createdAt: new Date().toISOString()
    };

    const updated = [newAppt, ...appointments];
    setAppointmentsState(updated);
    saveAppointments(updated);

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId: newAppt.patientId,
      role: 'patient',
      title: 'Appointment Confirmed',
      message: `Your appointment with ${newAppt.doctorName} for ${newAppt.date} at ${newAppt.time} is confirmed.`,
      time: 'Just now',
      read: false,
      type: 'confirmation',
      link: '/patient/appointments'
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotificationsState(updatedNotifs);
    saveNotifications(updatedNotifs);

    showToast(`Appointment ${newId} booked successfully!`);
    return newAppt;
  };

  const cancelAppointment = (id, reason = 'Cancelled by user') => {
    const updated = appointments.map((appt) => {
      if (appt.id === id) {
        return { ...appt, status: 'Cancelled', cancellationReason: reason };
      }
      return appt;
    });
    setAppointmentsState(updated);
    saveAppointments(updated);
    showToast(`Appointment ${id} has been cancelled`, 'warning');
  };

  const rescheduleAppointment = (id, newDate, newTime) => {
    const updated = appointments.map((appt) => {
      if (appt.id === id) {
        return { ...appt, date: newDate, time: newTime, status: 'Rescheduled' };
      }
      return appt;
    });
    setAppointmentsState(updated);
    saveAppointments(updated);
    showToast(`Appointment ${id} rescheduled to ${newDate} at ${newTime}`);
  };

  const completeAppointment = (id, clinicalNotes = '') => {
    const updated = appointments.map((appt) => {
      if (appt.id === id) {
        return { ...appt, status: 'Completed', notes: clinicalNotes || appt.notes };
      }
      return appt;
    });
    setAppointmentsState(updated);
    saveAppointments(updated);
    showToast(`Appointment marked as completed`);
  };

  // Medical Record actions
  const addMedicalRecord = (recordData) => {
    const newRec = {
      id: `rec-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: recordData.patientId,
      patientName: recordData.patientName,
      doctorId: currentUser?.id || 'doc-1',
      doctorName: currentUser?.name || 'Dr. Arjun Mehta',
      doctorSpecialty: currentUser?.specialty || 'General Physician',
      recordType: recordData.recordType || 'Consultation Notes',
      subType: recordData.subType || 'Clinical Summary',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      title: recordData.title || 'Clinical Evaluation',
      summary: recordData.summary || 'Outpatient clinical consultation completed.',
      diagnosis: recordData.diagnosis || 'Healthy Assessment',
      symptoms: recordData.symptoms || 'None reported',
      prescription: recordData.prescription || [],
      recommendedTests: recordData.recommendedTests || [],
      followUpDate: recordData.followUpDate || '',
      accessStatus: 'Authorized Access',
      authorizedDoctors: [currentUser?.id || 'doc-1', 'doc-2'],
      accessLogs: [
        {
          doctorName: currentUser?.name || 'Dr. Arjun Mehta',
          action: 'Created medical record entry',
          timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ip: '192.168.1.42 (Internal Clinic VLAN)'
        }
      ]
    };

    const updated = [newRec, ...medicalRecords];
    setRecordsState(updated);
    saveMedicalRecords(updated);
    showToast('Medical record successfully saved.');
    return newRec;
  };

  // Patient profile updates
  const updatePatientProfile = (updatedData) => {
    const updated = patients.map((pat) => {
      if (pat.id === updatedData.id) {
        return { ...pat, ...updatedData };
      }
      return pat;
    });
    setPatientsState(updated);
    savePatients(updated);

    if (currentUser?.id === updatedData.id) {
      const mergedUser = { ...currentUser, ...updatedData };
      setUserState(mergedUser);
      persistCurrentUser(mergedUser);
    }
    showToast('Profile updated successfully!');
  };

  // Admin Doctor Management
  const toggleDoctorStatus = (doctorId) => {
    const updated = doctors.map((doc) => {
      if (doc.id === doctorId) {
        const nextStatus = doc.status === 'active' ? 'inactive' : 'active';
        return { ...doc, status: nextStatus };
      }
      return doc;
    });
    setDoctorsState(updated);
    saveDoctors(updated);
    showToast(`Doctor status toggled successfully`);
  };

  const markNotificationAsRead = (notifId) => {
    const updated = notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n));
    setNotificationsState(updated);
    saveNotifications(updated);
  };

  const handleResetData = () => {
    resetAllDemoData();
    setPatientsState(getStoredPatients());
    setDoctorsState(getStoredDoctors());
    setAppointmentsState(getStoredAppointments());
    setRecordsState(getStoredMedicalRecords());
    setNotificationsState(getStoredNotifications());
    showToast('All demo datasets successfully restored to baseline defaults');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginUser,
        switchRole,
        logout,
        patients,
        doctors,
        appointments,
        medicalRecords,
        notifications,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,
        completeAppointment,
        addMedicalRecord,
        updatePatientProfile,
        toggleDoctorStatus,
        markNotificationAsRead,
        handleResetData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
