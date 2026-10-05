import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck, Activity, Calendar, Lock, UserCheck, Stethoscope,
  ShieldAlert, ArrowRight, CheckCircle2, ChevronRight, Sparkles,
  Heart, Clock, Star, Users, FileText, Check, Shield
} from 'lucide-react';
import { CareGuardLogo } from '../components/CareGuardLogo';
import { useApp } from '../context/AppContext';
import { loginWithRole } from '../utils/auth';
import { Footer } from '../components/Footer';

export const Landing = () => {
  const { loginUser } = useApp();
  const navigate = useNavigate();
  const [activeGatewaySystem, setActiveGatewaySystem] = useState('cardio');

  const handleLaunchRole = (role) => {
    const user = loginWithRole(role);
    loginUser(user);
    if (role === 'patient') {
      navigate('/patient/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/doctor/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-slate-800 flex flex-col selection:bg-blue-100 selection:text-primary overflow-x-hidden">
      
      {/* Top Demo Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-2 px-4 shadow-sm border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/30 tracking-wide uppercase text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              CareGuard Synthetic Demo Data
            </span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              All patient, doctor and medical information shown is fictional and used only for demonstration purposes.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden sm:inline text-[11px] font-medium">Quick Demo Access:</span>
            <button
              onClick={() => handleLaunchRole('doctor')}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-primary text-white shadow-xs hover:bg-primary-hover transition-colors flex items-center gap-1"
            >
              <Stethoscope className="w-3 h-3" />
              Doctor Demo
            </button>
            <button
              onClick={() => handleLaunchRole('patient')}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-3 h-3" />
              Patient Demo
            </button>
            <button
              onClick={() => handleLaunchRole('admin')}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3" />
              Admin Demo
            </button>
          </div>
        </div>
      </div>

      {/* Landing Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <CareGuardLogo size="md" showText={true} />
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#gateway" className="hover:text-primary transition-colors">Security Gateway</a>
            <a href="#features" className="hover:text-primary transition-colors">Core Pillars</a>
            <a href="#workflow" className="hover:text-primary transition-colors">Appointment Flow</a>
            <a href="#portals" className="hover:text-primary transition-colors">Role Portals</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLaunchRole('patient')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Book Appointment</span>
            </button>
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 hover:scale-102 active:scale-98"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Main Hero Section (Sections 4 & 5) */}
      <section className="relative pt-10 sm:pt-14 pb-16 sm:pb-20 overflow-hidden">
        
        {/* Soft Ambient Background Elements */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-200/30 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* HERO LEFT SIDE (Section 4 Specification) */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-primary text-[11px] font-black uppercase tracking-widest shadow-xs">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>SECURE HEALTHCARE PLATFORM</span>
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                Your Care.<br />
                <span className="text-[#1677FF] relative">
                  Guarded.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-sky-400/50" viewBox="0 0 100 12" preserveAspectRatio="none" fill="currentColor">
                    <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Manage appointments, connect with doctors and keep relevant patient information protected — all from one simple platform.
              </p>

              {/* Primary Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => handleLaunchRole('patient')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an Appointment</span>
                </button>

                <a
                  href="#gateway"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Explore CareGuard</span>
                </a>
              </div>

              {/* Feature Badges Under Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-8 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <span>Secure Access</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-primary flex items-center justify-center border border-blue-200/60">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span>Appointment Management</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200/60">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Authorized Records</span>
                </div>
              </div>

            </div>

            {/* HERO RIGHT SIDE — CAREGUARD GATEWAY (Section 5 Specification) */}
            <div id="gateway" className="lg:col-span-6 relative">
              
              {/* Premium Gateway Container */}
              <div className="relative rounded-4xl bg-gradient-to-br from-blue-50/70 via-white/80 to-sky-50/60 border border-white/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
                
                {/* Concentric Pulsing Security Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-96 h-96 rounded-full border border-blue-200/50 animate-ping opacity-20 duration-1000" />
                  <div className="w-80 h-80 rounded-full border border-blue-300/40 animate-pulse duration-700" />
                  <div className="w-64 h-64 rounded-full border border-sky-300/50" />
                  <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-500/10 to-sky-400/10 blur-xl" />
                </div>

                {/* Central Healthcare Security Gateway Shield */}
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Glowing Shield Base with Cross and ECG Waveform */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-[#1677FF] via-[#1D82FF] to-[#38BDF8] p-1 shadow-2xl shadow-blue-500/35 flex items-center justify-center group">
                    <div className="w-full h-full rounded-[22px] bg-gradient-to-b from-blue-600/90 to-blue-800/95 flex flex-col items-center justify-center relative overflow-hidden p-4">
                      
                      {/* Shield background silhouette */}
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full opacity-15 text-white pointer-events-none"
                        fill="currentColor"
                      >
                        <path d="M50 5 L15 20 V50 C15 72 30 90 50 95 C70 90 85 72 85 50 V20 L50 5 Z" />
                      </svg>

                      {/* Glowing Medical Cross */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute w-14 h-4 bg-white rounded-full shadow-lg shadow-white/40" />
                        <div className="absolute w-4 h-14 bg-white rounded-full shadow-lg shadow-white/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] z-10 animate-ping" />
                      </div>

                      {/* Real-time ECG Heartbeat Waveform */}
                      <div className="w-full h-8 mt-2 relative overflow-hidden flex items-center justify-center">
                        <svg
                          viewBox="0 0 200 40"
                          className="w-full h-full text-white/90 drop-shadow-md"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            d="M0 20 L40 20 L50 10 L60 32 L75 5 L90 35 L100 18 L110 20 L200 20"
                            className="animate-pulse"
                          />
                        </svg>
                      </div>

                      {/* Live Security Tag */}
                      <div className="mt-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>CareGuard Gateway</span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Floating Mini Card 1 (Section 5 exact requirement: Secure Access / ✓ Protected) */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 animate-in fade-in duration-300 hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">Secure Access</h4>
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <span>✓</span> Protected
                    </p>
                  </div>
                </div>

                {/* Floating Mini Card 2: Upcoming Appointment */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center border border-blue-200">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">Upcoming Appointment</h4>
                    <p className="text-[10px] text-primary font-bold mt-0.5">
                      Dr. Arjun Mehta • 10:30 AM
                    </p>
                  </div>
                </div>

                {/* Floating Mini Card 3: Vital Telemetry */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-200">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">Vitality Telemetry</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Pulse: <strong className="text-slate-800">72 bpm</strong> • BP: <strong className="text-slate-800">120/80</strong>
                    </p>
                  </div>
                </div>

                {/* Floating Mini Card 4: Authorized Records */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">Authorized Records</h4>
                    <p className="text-[10px] text-indigo-600 font-bold mt-0.5">
                      Encrypted RBAC Scope
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 4 Core Pillars Section (Care + Appointments + Authorization + Security) */}
      <section id="features" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-black text-primary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
              Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Engineered for Healthcare Integrity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              CareGuard bridges clinical efficiency and digital patient safety with an integrated, multi-role workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1: CARE */}
            <div className="p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  1. Clinical Care
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Personal health profiles, real-time vitals monitoring, and interactive human anatomical diagnostics post-authentication.
                </p>
              </div>
              <ul className="mt-4 pt-4 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">✓ Cardiovascular & SpO2 trend lines</li>
                <li className="flex items-center gap-2">✓ Dynamic anatomy hot-points</li>
              </ul>
            </div>

            {/* Pillar 2: APPOINTMENTS */}
            <div className="p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  2. Smart Appointments
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-step booking wizard with automated physician slot deconfliction, instant rescheduling, and cancellation confirmation.
                </p>
              </div>
              <ul className="mt-4 pt-4 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">✓ 5-Step intuitive booking wizard</li>
                <li className="flex items-center gap-2">✓ Unique Appointment ID generation</li>
              </ul>
            </div>

            {/* Pillar 3: AUTHORIZATION */}
            <div className="p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  3. Strict Authorization
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Doctors only access authorized and consented patient files. Complete privacy boundary enforcement preventing bulk data exposure.
                </p>
              </div>
              <ul className="mt-4 pt-4 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">✓ Scoped doctor-patient relationships</li>
                <li className="flex items-center gap-2">✓ Zero unauthorized patient browsing</li>
              </ul>
            </div>

            {/* Pillar 4: SECURITY */}
            <div className="p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  4. Security & Audit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  100% synthetic demo data safeguards, transparent clinical audit logging with timestamps and VLAN IP tracking.
                </p>
              </div>
              <ul className="mt-4 pt-4 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">✓ Simulated HIPAA/GDPR envelope</li>
                <li className="flex items-center gap-2">✓ Immutable audit trail records</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Role Portals Experience Launcher (Section: Direct Demo Testing) */}
      <section id="portals" className="py-16 sm:py-20 bg-[#F4F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-black text-primary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                Role-Based Portals
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
                Experience CareGuard by Persona
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg">
                Click any persona below for instant 1-click authentication into its tailored clinical workspace.
              </p>
            </div>
            
            <Link
              to="/login"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start"
            >
              <span>View Full Credentials & Sign In</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Doctor Persona Card */}
            <div className="p-6 rounded-3xl bg-white/90 border border-white/90 shadow-glass flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-primary border border-blue-200">
                    Flagship View
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mt-4">
                  Doctor Workspace
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Dr. Arjun Mehta (General Physician)
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Interactive human anatomy diagnostics, live vitals sparklines, today's consult schedule, charting diagnosis, and digital prescriptions.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLaunchRole('doctor')}
                  className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Launch Doctor Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Patient Persona Card */}
            <div className="p-6 rounded-3xl bg-white/90 border border-white/90 shadow-glass flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200">
                    Patient Hub
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mt-4">
                  Patient Health Portal
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Rahul Kumar (28, Male, O+)
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  5-step appointment booking wizard, upcoming visit tracking, personal profile demographic controls, and lab test archives.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLaunchRole('patient')}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Launch Patient Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Admin Persona Card */}
            <div className="p-6 rounded-3xl bg-white/90 border border-white/90 shadow-glass flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    Operations
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mt-4">
                  Clinic Administration
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Chief Operations Director
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Clinic capacity oversight, doctor credentialing toggles, patient master registry, and real-time security audit log streams.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLaunchRole('admin')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md shadow-slate-900/25 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Launch Admin Console</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="py-14 bg-gradient-to-r from-primary via-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <CareGuardLogo size="lg" showText={true} textLight={true} className="justify-center" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">
            Ready to experience next-generation secure clinic management?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Explore the CareGuard Security + Health Gateway with zero real protected health information exposure.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleLaunchRole('doctor')}
              className="px-6 py-3 rounded-2xl bg-white text-primary hover:bg-blue-50 font-bold text-xs shadow-xl transition-all hover:scale-105"
            >
              Launch Live Demonstration
            </button>
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              View Login Screen
            </Link>
          </div>
        </div>
      </section>

      {/* Standard CareGuard Footer */}
      <Footer />

    </div>
  );
};
