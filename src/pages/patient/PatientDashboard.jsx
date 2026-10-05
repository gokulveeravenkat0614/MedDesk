import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar, Clock, Heart, Activity, Droplets, ShieldCheck,
  Plus, ChevronRight, Stethoscope, FileText, CheckCircle2,
  AlertCircle, ArrowUpRight, Thermometer, UserCheck, Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppointmentCard } from '../../components/AppointmentCard';
import { MedicalRecordCard } from '../../components/MedicalRecordCard';

export const PatientDashboard = () => {
  const { currentUser, appointments, medicalRecords, doctors } = useApp();
  const navigate = useNavigate();

  // Find user's upcoming appointments
  const myAppointments = appointments.filter(
    (a) => a.patientId === (currentUser?.id || 'pat-1') || a.patientName === (currentUser?.name || 'Gokul') || a.patientName === 'Rahul Kumar'
  );
  const nextAppointment = myAppointments.find((a) => a.status === 'Upcoming') || appointments[0];
  const myRecords = medicalRecords.filter(
    (r) => r.patientId === (currentUser?.id || 'pat-1') || r.patientName === (currentUser?.name || 'Gokul') || r.patientName === 'Rahul Kumar'
  );

  // Sparkline mini helper component
  const Sparkline = ({ points, color }) => (
    <svg className="w-16 h-8 overflow-visible" viewBox="0 0 60 25">
      <path
        d={points}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="space-y-6">
      
      {/* Header (Exact: Good Morning, Gokul 👋 | Here’s your health and appointment overview.) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
              Patient Portal • CareGuard Health
            </span>
            <span className="text-xs text-slate-400">• Oct 05, 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 leading-tight flex items-center gap-2">
            <span>Good Morning, <span className="text-primary font-black">{currentUser?.name?.split(' ')[0] || 'Gokul'}</span></span>
            <span className="animate-bounce">👋</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Here’s your health and appointment overview.
          </p>
        </div>

        <button
          onClick={() => navigate('/patient/appointments?book=true')}
          className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 self-start md:self-auto hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Top 4 Statistics Cards: Upcoming Appointments (02), Completed (08), Doctors Consulted (04), Medical Records (06) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Upcoming Appointments (02) */}
        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
              <Calendar className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-black text-primary bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 uppercase">
              Scheduled
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Upcoming Appointments
            </span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              02
            </span>
            <span className="text-[11px] text-primary font-semibold block mt-0.5">
              Next on Oct 05, 10:30 AM
            </span>
          </div>
        </div>

        {/* Stat 2: Completed Appointments (08) */}
        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 uppercase">
              Fulfilled
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Completed Appointments
            </span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              08
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Past clinical visits
            </span>
          </div>
        </div>

        {/* Stat 3: Doctors Consulted (04) */}
        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60 uppercase">
              Specialists
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Doctors Consulted
            </span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              04
            </span>
            <span className="text-[11px] text-indigo-600 font-medium block mt-0.5">
              Active care team
            </span>
          </div>
        </div>

        {/* Stat 4: Medical Records (06) */}
        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200/60 uppercase">
              Encrypted
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Medical Records
            </span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              06
            </span>
            <span className="text-[11px] text-cyan-700 font-medium block mt-0.5">
              Diagnostic & lab reports
            </span>
          </div>
        </div>

      </div>

      {/* 4 Health Cards with Decorative Sparklines */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Biometric Telemetry & Health Vitals
          </h3>
          <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            ● Normal Physiological Parameters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Health Card 1: Blood Pressure (120/80 mmHg) */}
          <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                  <Activity className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Blood Pressure</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-md">Normal</span>
                </div>
              </div>
              <Sparkline points="M 2 18 Q 15 8, 25 14 T 45 10 T 58 12" color="#1677FF" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900">
                120/80 <span className="text-xs font-semibold text-slate-400">mmHg</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Systolic & Diastolic within baseline</span>
            </div>
          </div>

          {/* Health Card 2: Heart Rate (72 bpm) */}
          <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Heart Rate</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-md">Normal</span>
                </div>
              </div>
              <Sparkline points="M 2 16 Q 12 18, 20 4 T 32 24 T 44 14 T 58 15" color="#F43F5E" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900">
                72 <span className="text-xs font-semibold text-slate-400">bpm</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Resting regular rhythm</span>
            </div>
          </div>

          {/* Health Card 3: Oxygen Level (98%) */}
          <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Droplets className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Oxygen Level</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-md">Optimal</span>
                </div>
              </div>
              <Sparkline points="M 2 14 Q 15 10, 30 12 T 45 8 T 58 10" color="#10B981" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900">
                98% <span className="text-xs font-semibold text-slate-400">SpO2</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Continuous pulse oximetry</span>
            </div>
          </div>

          {/* Health Card 4: Temperature (98.4°F) */}
          <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Thermometer className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Temperature</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-md">Normal</span>
                </div>
              </div>
              <Sparkline points="M 2 12 Q 18 14, 30 11 T 48 13 T 58 12" color="#F59E0B" />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900">
                98.4°F <span className="text-xs font-semibold text-slate-400">Oral</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Normothermic body regulation</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main 2-Column Patient Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Section: Active Visit & Doctor Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Upcoming Appointment Showcase */}
          <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-800">
                  Upcoming Appointment
                </h3>
              </div>
              <Link to="/patient/appointments" className="text-xs font-bold text-primary hover:underline">
                View All Appointments
              </Link>
            </div>

            {nextAppointment ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 to-sky-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex flex-col items-center justify-center font-bold shadow-sm">
                    <span className="text-xs leading-none">OCT</span>
                    <span className="text-base leading-tight">05</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {nextAppointment.doctorName || 'Dr. Arjun Mehta'}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {nextAppointment.type || 'General Consultation'} • {nextAppointment.time || '10:30 AM'}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-primary bg-white px-2 py-0.5 rounded-full border border-blue-200">
                      Consultation Suite 302
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/patient/appointments')}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-blue-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition-colors"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => navigate('/patient/appointments?book=true')}
                    className="px-3 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-slate-500">You currently have no scheduled appointments.</p>
                <button
                  onClick={() => navigate('/patient/appointments?book=true')}
                  className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>

          {/* Quick Doctor Directory preview */}
          <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-800">
                  Featured Clinic Specialists
                </h3>
              </div>
              <Link to="/patient/doctors" className="text-xs font-bold text-primary hover:underline">
                Find All Doctors
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {doctors.slice(0, 2).map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-white/70 border border-slate-100 shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-11 h-11 rounded-xl object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{doc.name}</h4>
                      <p className="text-[11px] text-primary font-medium">{doc.specialty}</p>
                      <p className="text-[10px] text-slate-400">{doc.availability}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/patient/appointments?doctorId=${doc.id}&book=true`)}
                    className="p-2 rounded-xl bg-blue-50 hover:bg-primary hover:text-white text-primary transition-all"
                    title="Book Doctor"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Section: Recent Records & Health Vitals (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recent Records list */}
          <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-slate-800">
                  My Medical Records
                </h3>
              </div>
              <Link to="/patient/records" className="text-xs font-bold text-primary hover:underline">
                View All ({myRecords.length})
              </Link>
            </div>

            <div className="space-y-2.5">
              {myRecords.slice(0, 3).map((rec) => (
                <MedicalRecordCard key={rec.id} record={rec} />
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 font-medium">
                🔒 Protected Health Information • Synthetic Patient Sandbox
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Synthetic Demo Data Notice Box */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong className="block text-[11px] uppercase tracking-wider text-amber-800">
              SYNTHETIC DEMO DATA NOTICE
            </strong>
            <span>
              All patient vitals, consultation records, and physician availability shown in this portal are synthetic and intended exclusively for the Build Secure 24 demonstration.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
