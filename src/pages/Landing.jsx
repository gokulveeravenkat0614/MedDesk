import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck, Activity, Calendar, Lock, UserCheck, Stethoscope,
  ShieldAlert, ArrowRight, CheckCircle2, ChevronRight, Sparkles,
  Heart, Clock, Star, Users, FileText, Check, Shield, Eye, EyeOff,
  User, Mail, ArrowUpRight, Cpu, AlertCircle
} from 'lucide-react';
import { CareGuardLogo } from '../components/CareGuardLogo';
import { useApp } from '../context/AppContext';
import { loginWithRole, loginWithCredentials } from '../utils/auth';
import { Footer } from '../components/Footer';

export const Landing = () => {
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  // State for interactive role login transition
  const [selectedRole, setSelectedRole] = useState('patient');
  const [showRoleLogin, setShowRoleLogin] = useState(false);
  const [emailInput, setEmailInput] = useState('patient@careguard.demo');
  const [passwordInput, setPasswordInput] = useState('demo123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleSectionRef = useRef(null);

  const handleRoleCardClick = (role) => {
    setSelectedRole(role);
    if (role === 'patient') {
      setEmailInput('patient@careguard.demo');
    } else if (role === 'doctor') {
      setEmailInput('doctor@careguard.demo');
    } else if (role === 'admin') {
      setEmailInput('admin@careguard.demo');
    }
    setShowRoleLogin(true);

    // Smooth scroll down to the login card
    setTimeout(() => {
      document.getElementById('role-login-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleFastDemoLogin = (role) => {
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const user = loginWithCredentials(emailInput, passwordInput, selectedRole);
      loginUser(user);
      setIsSubmitting(false);

      if (user.role === 'patient') {
        navigate('/patient/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/doctor/dashboard');
      }
    }, 300);
  };

  const getPortalInfo = () => {
    if (selectedRole === 'doctor') {
      return {
        title: 'Doctor Portal',
        subtitle: 'Authorized clinical workspace.',
        badge: 'Physician Access',
        badgeColor: 'bg-blue-50 text-primary border-blue-200'
      };
    }
    if (selectedRole === 'admin') {
      return {
        title: 'Admin Portal',
        subtitle: 'Clinic administration workspace.',
        badge: 'Clinic Operations',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
      };
    }
    return {
      title: 'Patient Portal',
      subtitle: 'Secure access to your CareGuard account.',
      badge: 'Patient Access',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  };

  const portalInfo = getPortalInfo();

  return (
    <div className="min-h-screen bg-[#F4F9FD] text-slate-800 flex flex-col selection:bg-blue-100 selection:text-primary overflow-x-hidden">
      
      {/* Top Demo Notification Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-2 px-4 shadow-sm border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/30 tracking-wide uppercase text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              CareGuard Synthetic Demo Data
            </span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              All patient, doctor and medical information shown in this application is fictional and used only for demonstration purposes.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden sm:inline text-[11px] font-medium">Demo Access:</span>
            <button
              onClick={() => handleFastDemoLogin('doctor')}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#1677FF] text-white shadow-xs hover:bg-blue-600 transition-colors flex items-center gap-1"
            >
              <Stethoscope className="w-3 h-3" />
              Doctor
            </button>
            <button
              onClick={() => handleFastDemoLogin('patient')}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center gap-1"
            >
              <UserCheck className="w-3 h-3" />
              Patient
            </button>
            <button
              onClick={() => handleFastDemoLogin('admin')}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3" />
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* CareGuard Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <CareGuardLogo size="md" showText={true} />
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#gateway" className="hover:text-primary transition-colors">Security Gateway</a>
            <a href="#roles" className="hover:text-primary transition-colors">Choose Role</a>
            <a href="#security" className="hover:text-primary transition-colors">Protection Controls</a>
            <a href="#timeline" className="hover:text-primary transition-colors">How It Works</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Book Appointment</span>
            </button>

            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 hover:scale-102"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section (Section 4 & 5 Exact Specification) */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#F4F9FD] via-white to-[#F4F9FD]">
        
        {/* Soft Ambient Healthcare Gradients (Subtle Blue, Cyan, Lavender) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-200/25 via-sky-100/20 to-indigo-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-60 right-0 w-80 h-80 bg-indigo-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* HERO LEFT SIDE (Exact Specification) */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Small Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#1677FF] text-[11px] font-black uppercase tracking-widest shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#1677FF]" />
                <span>SECURE HEALTHCARE PLATFORM</span>
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#102A43] tracking-tight leading-[1.08]">
                Your Care.<br />
                <span className="text-[#1677FF] relative inline-block">
                  Guarded.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-sky-400/50" viewBox="0 0 100 12" preserveAspectRatio="none" fill="currentColor">
                    <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
                  </svg>
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Manage appointments, connect with doctors and protect relevant healthcare information — all in one secure clinic workspace.
              </p>

              {/* Primary & Secondary Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Enter CareGuard →</span>
                </button>

                <a
                  href="#gateway"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Explore Platform</span>
                </a>
              </div>

              {/* Status Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>● CareGuard Security Active</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-200/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Role-Based Access Enabled</span>
                </div>
              </div>

            </div>

            {/* HERO RIGHT SIDE — CAREGUARD GATEWAY (Exact Specification) */}
            <div id="gateway" className="lg:col-span-6 relative">
              
              {/* Premium Visual Panel */}
              <div className="relative rounded-4xl bg-gradient-to-br from-blue-50/80 via-white/90 to-sky-50/70 border border-white/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[480px] sm:min-h-[520px] flex items-center justify-center">
                
                {/* Concentric Soft Circular Security Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[420px] h-[420px] rounded-full border border-blue-200/40 animate-ping opacity-15 duration-1000" />
                  <div className="w-[340px] h-[340px] rounded-full border border-blue-300/35 animate-pulse duration-700" />
                  <div className="w-[260px] h-[260px] rounded-full border border-sky-300/40" />
                  <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-400/10 blur-xl" />
                </div>

                {/* Central Digital Security Shield with Medical Cross & Decorative ECG Waveform */}
                <div className="relative z-10 flex flex-col items-center">
                  
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-[#1677FF] via-[#1D82FF] to-[#38BDF8] p-1.5 shadow-2xl shadow-blue-500/35 flex items-center justify-center group animate-pulse duration-1000">
                    <div className="w-full h-full rounded-[20px] bg-gradient-to-b from-blue-600/90 to-blue-800/95 flex flex-col items-center justify-center relative overflow-hidden p-4">
                      
                      {/* Shield background silhouette */}
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full opacity-15 text-white pointer-events-none"
                        fill="currentColor"
                      >
                        <path d="M50 5 L15 20 V50 C15 72 30 90 50 95 C70 90 85 72 85 50 V20 L50 5 Z" />
                      </svg>

                      {/* Medical Cross */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute w-14 h-4 bg-white rounded-full shadow-lg shadow-white/40" />
                        <div className="absolute w-4 h-14 bg-white rounded-full shadow-lg shadow-white/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] z-10 animate-ping" />
                      </div>

                      {/* Subtle Decorative Heartbeat Waveform (Non-Clinical Indicator) */}
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

                      {/* Small Gateway Label */}
                      <div className="mt-1 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Security Gateway</span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Floating Card 1: Secure Access — Protected (Exact Specification) */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform">
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

                {/* Floating Card 2: Next Appointment — Today • 10:30 AM (Exact Specification) */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center border border-blue-200">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">Next Appointment</h4>
                    <p className="text-[10px] text-primary font-bold mt-0.5">
                      Today • 10:30 AM
                    </p>
                  </div>
                </div>

                {/* Floating Card 3: Doctor Access — Authorized (Exact Specification) */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-200">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">Doctor Access</h4>
                    <p className="text-[10px] text-cyan-700 font-bold mt-0.5">
                      Authorized
                    </p>
                  </div>
                </div>

                {/* Floating Card 4: Patient Records — Protected (Exact Specification) */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">Patient Records</h4>
                    <p className="text-[10px] text-indigo-600 font-bold mt-0.5">
                      Protected
                    </p>
                  </div>
                </div>

                {/* Floating Card 5 (Center-top/floating): Clinic Status — All Systems Secure */}
                <div className="hidden sm:flex absolute bottom-20 z-20 p-2.5 rounded-xl bg-slate-900/90 text-white shadow-xl items-center gap-2 text-[10px] font-bold border border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Clinic Status — All Systems Secure</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Trust Strip (Exact Specification) */}
      <div className="py-4 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Role-Based Access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Appointment Management</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Authorized Patient Records</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Activity Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700">Synthetic Data Only</span>
          </div>
        </div>
      </div>

      {/* SECTION: "How are you using CareGuard?" (Exact Specification) */}
      <section id="roles" ref={roleSectionRef} className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-black text-primary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Interactive Entrance Selection
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How are you using CareGuard?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Select your clinical role to open your dedicated, authenticated gateway.
          </p>
        </div>

        {/* 3 Premium Interactive Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Patient Card */}
          <div
            onClick={() => handleRoleCardClick('patient')}
            className={`p-6 sm:p-7 rounded-3xl bg-white border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
              selectedRole === 'patient' && showRoleLogin
                ? 'border-primary ring-2 ring-primary/20 shadow-xl -translate-y-1'
                : 'border-slate-200/80 hover:border-primary hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <UserCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-4 group-hover:text-primary transition-colors">
                Patient
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Book appointments and manage your healthcare information.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
              <span>Open Patient Portal</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* 2. Doctor Card */}
          <div
            onClick={() => handleRoleCardClick('doctor')}
            className={`p-6 sm:p-7 rounded-3xl bg-white border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
              selectedRole === 'doctor' && showRoleLogin
                ? 'border-primary ring-2 ring-primary/20 shadow-xl -translate-y-1'
                : 'border-slate-200/80 hover:border-primary hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Stethoscope className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-4 group-hover:text-primary transition-colors">
                Doctor
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Manage appointments and access authorized patient information.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
              <span>Open Doctor Portal</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* 3. Admin Card */}
          <div
            onClick={() => handleRoleCardClick('admin')}
            className={`p-6 sm:p-7 rounded-3xl bg-white border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
              selectedRole === 'admin' && showRoleLogin
                ? 'border-primary ring-2 ring-primary/20 shadow-xl -translate-y-1'
                : 'border-slate-200/80 hover:border-primary hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-4 group-hover:text-primary transition-colors">
                Admin
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Manage clinic operations, users and appointments.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
              <span>Open Admin Portal</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

        </div>

        {/* ROLE-SPECIFIC LOGIN CARD (Compact Modern Card per Section 7 specification) */}
        <div id="role-login-card" className="max-w-xl mx-auto pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xl space-y-6">
            
            {/* Header of Login Card */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider inline-block mb-1 ${portalInfo.badgeColor}`}>
                  {portalInfo.badge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {portalInfo.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {portalInfo.subtitle}
                </p>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Demo Mode: Any password accepted', 'info')}
                    className="text-[11px] text-primary hover:underline font-medium"
                  >
                    Forgot password
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-xs text-slate-600 font-medium cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Continue Securely Button (Exact Specification) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>Continue Securely</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* CareGuard Demo Access Buttons (Immediate 1-Click Authentication) */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <span>CareGuard Demo Access</span>
                <span className="text-[10px] text-slate-400 font-normal">Immediate Hackathon Demo</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleFastDemoLogin('patient')}
                  className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 text-[11px] font-bold transition-all text-center border border-slate-200"
                >
                  Continue as Patient
                </button>
                <button
                  type="button"
                  onClick={() => handleFastDemoLogin('doctor')}
                  className="py-2.5 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary text-[11px] font-bold transition-all text-center border border-blue-200"
                >
                  Continue as Doctor
                </button>
                <button
                  type="button"
                  onClick={() => handleFastDemoLogin('admin')}
                  className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 text-[11px] font-bold transition-all text-center border border-slate-200"
                >
                  Continue as Admin
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* SECTION: "Protection built into every interaction." (Exact Specification) */}
      <section id="security" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-black text-primary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
              Security Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Protection built into every interaction.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Designed with privacy-focused boundaries, role-level isolation, and transparent clinical telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Role-Based Access
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patients, doctors and administrators have different permissions and separate workspaces.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Authorized Records
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Doctors only access relevant patient information they are explicitly authorized to view.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Appointment Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patients and doctors can manage consultations, scheduling, and deconfliction from one platform.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Activity Monitoring
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Important clinical and access actions are recorded in an immutable security audit history.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: "How CareGuard Works" Timeline (Exact Specification: 01 Register -> 02 Connect -> 03 Manage -> 04 Protect) */}
      <section id="timeline" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-black text-primary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Workflow Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How CareGuard Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A continuous four-stage lifecycle from enrollment to clinical protection.
          </p>
        </div>

        {/* 4 Steps with Connected Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-2xl font-black text-primary/40 block mb-2 font-mono">01</span>
            <h4 className="text-lg font-black text-slate-900">Register</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Create an account or fast-switch into a demo persona with synthetic profile parameters.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-2xl font-black text-primary/40 block mb-2 font-mono">02</span>
            <h4 className="text-lg font-black text-slate-900">Connect</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Discover verified specialists, filter by clinical availability, and inspect consultation hours.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-2xl font-black text-primary/40 block mb-2 font-mono">03</span>
            <h4 className="text-lg font-black text-slate-900">Manage</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              5-step booking wizard schedules consultations, tracks cancellations, and updates calendar slots.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-2xl font-black text-primary/40 block mb-2 font-mono">04</span>
            <h4 className="text-lg font-black text-slate-900">Protect</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Attending physicians review biometrics and log diagnosis notes under verified authorization audit trails.
            </p>
          </div>

        </div>

      </section>

      {/* Synthetic Demo Data Notice Box (Exact Specification) */}
      <section className="py-6 max-w-4xl mx-auto px-4 w-full">
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="block text-[11px] uppercase tracking-wider text-amber-800">
                SYNTHETIC DEMO DATA
              </strong>
              <span>
                CareGuard uses fictional patient, doctor and medical information for demonstration purposes only. Do not enter real personal health information.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};
