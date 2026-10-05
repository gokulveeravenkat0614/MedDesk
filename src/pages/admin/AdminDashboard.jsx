import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Stethoscope, Calendar, Activity, ShieldCheck,
  TrendingUp, ArrowRight, ShieldAlert, CheckCircle2, AlertCircle
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';

export const AdminDashboard = () => {
  const { patients, doctors, appointments, medicalRecords } = useApp();
  const navigate = useNavigate();

  // Synthetic trend charts for Admin (Section 27 specification)
  const apptsPerDay = [
    { day: 'Mon', count: 74 },
    { day: 'Tue', count: 82 },
    { day: 'Wed', count: 86 },
    { day: 'Thu', count: 79 },
    { day: 'Fri', count: 91 },
    { day: 'Sat', count: 86 },
    { day: 'Sun', count: 54 },
  ];

  const patientRegistrations = [
    { month: 'Jun', count: 180 },
    { month: 'Jul', count: 210 },
    { month: 'Aug', count: 245 },
    { month: 'Sep', count: 290 },
    { month: 'Oct', count: 323 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
              Chief Administrative Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Clinic Administration
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

      {/* 4 Statistics Cards (Section 27 exact specification) */}
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
          value="42"
          change="+4 new"
          isPositive={true}
          icon={Stethoscope}
          tag="credentialed"
        />
        <StatCard
          title="Appointments Today"
          value="86"
          change="+18.5%"
          isPositive={true}
          icon={Calendar}
          tag="active visits"
        />
        <StatCard
          title="Active Doctors"
          value="38"
          change="90.4%"
          isPositive={true}
          icon={Activity}
          tag="on duty"
        />
      </div>

      {/* Analytical Charts Grid (Section 27) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Appointments Per Day */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Appointments Trend (Per Day)
              </h3>
              <p className="text-xs text-slate-400">Past 7 days throughput</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              86 Peak Today
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={apptsPerDay}>
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
                <Area type="monotone" dataKey="count" stroke="#1677FF" fill="#E6F4FF" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Registrations Growth */}
        <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Patient Registrations Growth
              </h3>
              <p className="text-xs text-slate-400">Monthly new patient enrollments</p>
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
                <Bar dataKey="count" fill="#38BDF8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* System Activity & Audit Trail (Section 27 specification) */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-slate-800">
              Live System Activity & RBAC Audit Stream
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Audit Stream Active
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { user: 'Dr. Arjun Mehta', action: 'Accessed CBC Lab Record for Rahul Kumar (pat-1)', time: 'Today, 10:32 AM', status: 'Authorized' },
            { user: 'System Bot', action: 'Verified Token TTL integrity check for 42 active clinician sessions', time: 'Today, 10:00 AM', status: 'Compliant' },
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
