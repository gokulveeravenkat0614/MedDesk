import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck, Lock, Mail, Eye, EyeOff,
  UserCheck, Stethoscope, ShieldAlert, ArrowRight, CheckCircle2,
  Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { loginWithCredentials, loginWithRole } from '../utils/auth';
import { CareGuardLogo } from '../components/CareGuardLogo';

export const Login = () => {
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('doctor@careguard.demo');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'patient') {
      setEmail('patient@careguard.demo');
    } else if (newRole === 'doctor') {
      setEmail('doctor@careguard.demo');
    } else if (newRole === 'admin') {
      setEmail('admin@careguard.demo');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = loginWithCredentials(email, password, role);
      loginUser(user);
      setIsLoading(false);

      if (user.role === 'patient') {
        navigate('/patient/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/doctor/dashboard');
      }
    }, 350);
  };

  const handleFastDemoLogin = (selectedRole) => {
    const user = loginWithRole(selectedRole);
    loginUser(user);
    if (selectedRole === 'patient') {
      navigate('/patient/dashboard');
    } else if (selectedRole === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/doctor/dashboard');
    }
  };

  return (
    <div className="min-h-screen cyber-grid-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
        
        {/* Left Col: Cybersecurity Healthcare Brand Panel (Dark Navy) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1736] via-[#102A56] to-[#0B1736] border-r border-[#102A56] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-3">
              <CareGuardLogo size="lg" showText={true} textLight={true} />
            </div>

            <div className="mt-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-cyan-300 border border-cyan-400/25 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 security-dot-active" />
                Security Gateway
              </span>
              <h2 className="text-2xl font-black leading-snug tracking-tight">
                Your Care.<br />Your Appointments.<br /><span className="text-cyan-400">Protected.</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                A cybersecurity-inspired healthcare platform with patient-specific authorization, role-based segregation, and tamper-evident audit trails.
              </p>
            </div>

            {/* Core Security Guarantees */}
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2.5">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security Controls Active</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-200 font-medium">
                <div className="flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span>Role-Based Access (Patient, Doctor, Admin)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span>Authorized Patient Records Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                  <span>Activity Monitoring & Audit Logging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Secure Sessions & Synthetic Data Isolation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Build Secure 24 Edition</span>
            <span>Abhedya Forum</span>
          </div>
        </div>

        {/* Right Col: Login Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3 className="text-xl font-black text-[#0B1736] tracking-tight">
                  Welcome to CareGuard
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Secure Clinic & Appointment Management
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0B63F6] border border-blue-200 uppercase tracking-wider">
                Synthetic Demo
              </span>
            </div>

            {/* Role Selector Tabs */}
            <div className="mt-3 p-1 rounded-xl bg-slate-100 grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => handleRoleChange('patient')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  role === 'patient'
                    ? 'bg-white text-[#0B63F6] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Patient</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('doctor')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  role === 'doctor'
                    ? 'bg-white text-[#0B63F6] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Doctor</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  role === 'admin'
                    ? 'bg-white text-[#0B63F6] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@careguard.demo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0B63F6]/20 focus:border-[#0B63F6] outline-none transition-all text-slate-800"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Demo Mode: demo123 is prefilled for your convenience', 'info')}
                    className="text-[11px] text-[#0B63F6] font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0B63F6]/20 focus:border-[#0B63F6] outline-none transition-all text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#0B63F6] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate & Access {role.toUpperCase()} Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Fast 1-Click Demo Buttons */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Fast Evaluator Sign-In (1-Click)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleFastDemoLogin('patient')}
                  className="py-2 px-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0B63F6] border border-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Patient</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFastDemoLogin('doctor')}
                  className="py-2 px-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0B63F6] border border-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-[#0B63F6]" />
                  <span>Doctor</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFastDemoLogin('admin')}
                  className="py-2 px-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0B63F6] border border-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            <span>Don't have an account? </span>
            <Link to="/register" className="font-bold text-[#0B63F6] hover:underline">
              Register as Patient
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
