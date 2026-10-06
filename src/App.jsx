import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HackathonDemoGuide } from './components/HackathonDemoGuide';
import { RoleGuard } from './components/RoleGuard';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorAppointments } from './pages/doctor/DoctorAppointments';
import { DoctorSchedule } from './pages/doctor/DoctorSchedule';
import { Patients } from './pages/doctor/Patients';
import { DoctorRecords } from './pages/doctor/DoctorRecords';
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { PatientProfile } from './pages/patient/PatientProfile';
import { Doctors } from './pages/patient/Doctors';
import { DoctorProfile } from './pages/patient/DoctorProfile';
import { PatientAppointments } from './pages/patient/Appointments';
import { PatientRecords } from './pages/patient/MedicalRecords';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPatients } from './pages/admin/AdminPatients';
import { AdminDoctors } from './pages/admin/AdminDoctors';
import { AdminAppointments } from './pages/admin/AdminAppointments';
import { AuditLogs } from './pages/admin/AuditLogs';
import { SecurityCenter } from './pages/SecurityCenter';
import { Settings } from './pages/Settings';

// Protected Route and Main Layout Wrapper
const MainLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FC]">
      {/* Top Demo Notification Banner */}
      <DemoBanner />

      {/* Global Navbar */}
      <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* Body with Sidebar and Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-start gap-6">
        {/* Responsive Sidebar */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'error'
              ? 'bg-rose-600 text-white border-rose-500'
              : toastMessage.type === 'warning'
              ? 'bg-amber-600 text-white border-amber-500'
              : toastMessage.type === 'info'
              ? 'bg-slate-800 text-white border-slate-700'
              : 'bg-slate-900 text-white border-slate-700 shadow-blue-500/10'
          }`}>
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Floating AI Assistant (Section 32) */}
      <AIChat />

      {/* Mobile Bottom Navigation for Patients (Prompt Specification) */}
      <MobileBottomNav />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

// Automatic Dashboard Redirection based on role
const DashboardRedirect = () => {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'patient') return <Navigate to="/patient/dashboard" replace />;
  if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/doctor/dashboard" replace />;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Landing / Gateway Entrance Route */}
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Doctor Routes (Enforce doctor / admin role) */}
          <Route path="/doctor/dashboard" element={<RoleGuard allowedRoles={['doctor', 'admin']}><MainLayout><DoctorDashboard /></MainLayout></RoleGuard>} />
          <Route path="/doctor/appointments" element={<RoleGuard allowedRoles={['doctor', 'admin']}><MainLayout><DoctorAppointments /></MainLayout></RoleGuard>} />
          <Route path="/doctor/schedule" element={<RoleGuard allowedRoles={['doctor', 'admin']}><MainLayout><DoctorSchedule /></MainLayout></RoleGuard>} />
          <Route path="/doctor/patients" element={<RoleGuard allowedRoles={['doctor', 'admin']}><MainLayout><Patients /></MainLayout></RoleGuard>} />
          <Route path="/doctor/records" element={<RoleGuard allowedRoles={['doctor', 'admin']}><MainLayout><DoctorRecords /></MainLayout></RoleGuard>} />

          {/* Patient Routes (Enforce patient / admin role) */}
          <Route path="/patient/dashboard" element={<RoleGuard allowedRoles={['patient', 'admin']}><MainLayout><PatientDashboard /></MainLayout></RoleGuard>} />
          <Route path="/patient/profile" element={<RoleGuard allowedRoles={['patient', 'admin']}><MainLayout><PatientProfile /></MainLayout></RoleGuard>} />
          <Route path="/patient/doctors" element={<RoleGuard allowedRoles={['patient', 'admin']}><MainLayout><Doctors /></MainLayout></RoleGuard>} />
          <Route path="/patient/doctors/:id" element={<RoleGuard allowedRoles={['patient', 'admin']}><MainLayout><DoctorProfile /></MainLayout></RoleGuard>} />
          <Route path="/patient/doctor/:id" element={<RoleGuard allowedRoles={['patient', 'admin']}><MainLayout><DoctorProfile /></MainLayout></RoleGuard>} />
          <Route path="/patient/appointments" element={<RoleGuard allowedRoles={['patient', 'admin']}><MainLayout><PatientAppointments /></MainLayout></RoleGuard>} />
          <Route path="/patient/records" element={<RoleGuard allowedRoles={['patient', 'admin']}><MainLayout><PatientRecords /></MainLayout></RoleGuard>} />

          {/* Admin Routes (Strictly admin role only) */}
          <Route path="/admin/dashboard" element={<RoleGuard allowedRoles={['admin']}><MainLayout><AdminDashboard /></MainLayout></RoleGuard>} />
          <Route path="/admin/patients" element={<RoleGuard allowedRoles={['admin']}><MainLayout><AdminPatients /></MainLayout></RoleGuard>} />
          <Route path="/admin/doctors" element={<RoleGuard allowedRoles={['admin']}><MainLayout><AdminDoctors /></MainLayout></RoleGuard>} />
          <Route path="/admin/appointments" element={<RoleGuard allowedRoles={['admin']}><MainLayout><AdminAppointments /></MainLayout></RoleGuard>} />
          <Route path="/admin/audit-logs" element={<RoleGuard allowedRoles={['admin']}><MainLayout><AuditLogs /></MainLayout></RoleGuard>} />

          {/* Security Center Route (Authenticated users) */}
          <Route path="/security-center" element={<RoleGuard allowedRoles={['patient', 'doctor', 'admin']}><MainLayout><SecurityCenter /></MainLayout></RoleGuard>} />

          {/* Settings Route (Authenticated users) */}
          <Route path="/settings" element={<RoleGuard allowedRoles={['patient', 'doctor', 'admin']}><MainLayout><Settings /></MainLayout></RoleGuard>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Hackathon Evaluation Guide & IDOR Access Denied Tester */}
        <HackathonDemoGuide />
      </BrowserRouter>
    </AppProvider>
  );
}
