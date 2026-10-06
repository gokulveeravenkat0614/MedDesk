import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Stethoscope, Calendar, Activity, ShieldCheck,
  TrendingUp, ArrowRight, ShieldAlert, CheckCircle2, AlertCircle,
  Lock, Shield, AlertTriangle, KeyRound
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';

export const AdminDashboard = () => {
  const { patients, doctors, appointments, medicalRecords } = useApp();
  const navigate = useNavigate();

  // Synthetic trend charts for Admin
  const appointmentTrends = [
    { day: 'Mon', count: 420 },
    { day: 'Tue', count: 480 },
    { day: 'Wed', count: 512 },
    { day: 'Thu', count: 490 },
    { day: 'Fri', count: 560 },
    { day: 'Sat', count: 520 },
    { day: 'Sun', count: 439 },
  ];

  const patientRegistrations = [
    { month: 'Jun', count: 180 },
    { month: 'Jul', count: 210 },
    { month: 'Aug', count: 245 },
    { month: 'Sep', count: 290 },
    { month: 'Oct', count: 323 },
  ];

  const doctorActivity = [
    { dept: 'Cardio', consults: 38 },
    { dept: 'Gen Med', consults: 56 },
    { dept: 'Pediatrics', consults: 29 },
    { dept: 'Dermatol', consults: 34 },
    { dept: 'Ortho', consults: 22 },
  ];

  const securityActivity = [
    { hour: '06:00', events: 34 },
    { hour: '08:00', events: 78 },
    { hour: '10:00', events: 142 },
    { hour: '12:00', events: 110 },
    { hour: '14:00', events: 96 },
    { hour: '16:00', events: 135 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-200/60 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-primary" />
              Administrative Governance
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Clinic Security & Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Operational governance, medical staff verification, appointment bandwidth, and audit telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/doctors')}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition-colors"
          >
            Manage Doctors
          </button>
          <button
            onClick={() => navigate('/admin/patients')}
            className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
          >
            Manage Patients
          </button>
        </div>
      </div>

      {/* 4 Requested Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value="1,248"
          change="+14.2%"
          isPositive={true}
          icon={Users}
          tag="registered"
        />
        <StatCard
          title="Total Doctors"
          value="86"
          change="+6 new"
          isPositive={true}
          icon={Stethoscope}
          tag="credentialed"
        />
        <StatCard
          title="Appointments"
          value="3,421"
          change="+18.5%"
          isPositive={true}
          icon={Calendar}
          tag="all-time clinic"
        />
        <StatCard
          title="Active Doctors"
          value="74"
          change="86.0%"
          isPositive={true}
          icon={Activity}
          tag="on duty"
        />
      </div>

      {/* Security Panel: Security Overview (Exact Specification) */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Security Overview</h3>
              <p className="text-[11px] text-slate-500">Live role-based access status and identity telemetry</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Synthetic Demo Telemetry • Active Enforcement
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 to-white border border-blue-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Secure Sessions</span>
              <span className="text-2xl font-black text-slate-900 mt-0.5 block">142</span>
              <span className="text-[10px] text-primary font-semibold mt-0.5 block">Encrypted Bearer Tokens</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Authorized Access</span>
              <span className="text-2xl font-black text-emerald-600 mt-0.5 block">98%</span>
              <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">Strict RBAC Compliance</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/70 to-white border border-rose-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Blocked Attempts</span>
              <span className="text-2xl font-black text-rose-600 mt-0.5 block">04</span>
              <span className="text-[10px] text-rose-700 font-semibold mt-0.5 block">Cross-tenant Denied</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 to-white border border-amber-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Active Alerts</span>
              <span className="text-2xl font-black text-amber-600 mt-0.5 block">01</span>
              <span className="text-[10px] text-amber-700 font-semibold mt-0.5 block">Pending Review</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Requested Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Appointment Trends */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Appointment Trends
              </h3>
              <p className="text-xs text-slate-400">Weekly consultation distribution</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              560 Peak Friday
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={appointmentTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl shadow-lg">
                          {payload[0].payload.day}: {payload[0].value} appointments
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="count" stroke="#1677FF" fill="#EAF4FF" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Patient Registrations */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Patient Registrations
              </h3>
              <p className="text-xs text-slate-400">Monthly synthetic patient registrations</p>
            </div>
            <span className="text-xs font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
              +28% Quarterly
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientRegistrations}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl shadow-lg">
                          {payload[0].payload.month}: +{payload[0].value} patients
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Doctor Activity */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Doctor Activity
              </h3>
              <p className="text-xs text-slate-400">Consultations handled by clinical specialty</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
              74 Active Clinicians
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="dept" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl shadow-lg">
                          {payload[0].payload.dept}: {payload[0].value} consultations
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="consults" fill="#1677FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Security Activity */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Security Activity
              </h3>
              <p className="text-xs text-slate-400">Hourly access telemetry & policy evaluations</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              100% Policy Enforced
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={securityActivity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl shadow-lg">
                          {payload[0].payload.hour}: {payload[0].value} security events
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="events" stroke="#7C3AED" fill="#EDE9FE" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* System Activity & Audit Trail */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-slate-800">
              Live System Activity & RBAC Audit Stream
            </h3>
          </div>
          <button
            onClick={() => navigate('/admin/audit')}
            className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View Full Audit Log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { user: 'Dr. Arjun Mehta', action: 'Accessed CBC Lab Record for Rahul Kumar (pat-1)', time: 'Today, 10:32 AM', status: 'Authorized' },
            { user: 'System Bot', action: 'Verified Token TTL integrity check for 74 active clinician sessions', time: 'Today, 10:00 AM', status: 'Compliant' },
            { user: 'Dr. Priya Sharma', action: 'Completed Cardiology Examination for Aditya Rao (pat-3)', time: 'Today, 09:15 AM', status: 'Authorized' },
            { user: 'Patient Portal', action: 'New Patient Self-Registration recorded with sanitized inputs', time: 'Today, 08:30 AM', status: 'Verified' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-2xl bg-white/60 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-slate-800">{item.user}</span>
                <span className="text-slate-500">• {item.action}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px]">{item.time}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
