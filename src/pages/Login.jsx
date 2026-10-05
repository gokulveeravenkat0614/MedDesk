import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Activity, ShieldCheck, Lock, Mail, Eye, EyeOff,
  UserCheck, Stethoscope, ShieldAlert, ArrowRight, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { loginWithCredentials, loginWithRole } from '../utils/auth';

export const Login = () => {
  const [role, setRole] = useState('doctor');
  const [email, setEmail] = useState('doctor@medidesk.demo');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'patient') {
      setEmail('patient@medidesk.demo');
    } else if (newRole === 'doctor') {
      setEmail('doctor@medidesk.demo');
    } else if (newRole === 'admin') {
      setEmail('admin@medidesk.demo');
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
    }, 400);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-4xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-2xl overflow-hidden">
        
        {/* Left Col: Brand Presentation */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
                <Activity className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">MediDesk</h1>
                <p className="text-[10px] text-blue-200 font-medium tracking-wide uppercase">
                  CareGuard Architecture
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <h2 className="text-2xl font-black leading-snug tracking-tight">
                Secure Clinic & Clinical Appointment Management
              </h2>
              <p className="text-xs text-blue-100 leading-relaxed">
                A unified medical workspace with simulated privacy controls, live biometrics visualization, and role-based workflows for healthcare providers and patients.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Zero real PHI — 100% Synthetic Demo Data</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Simulated Role-Based Access Controls</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Interactive Anatomical Diagnostics</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/20 text-[11px] text-blue-200">
            <span>Build Secure 24 Hackathon Edition • Abhedya Forum</span>
          </div>
        </div>

        {/* Right Col: Login Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Welcome to MediDesk
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sign in to access your authorized medical portal
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-200/60 uppercase">
                Demo Access
              </span>
            </div>

            {/* Role Selector Tabs (Section 7 specification) */}
            <div className="mt-4 p-1 rounded-2xl bg-slate-100/90 grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => handleRoleChange('patient')}
                className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  role === 'patient'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Patient</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('doctor')}
                className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  role === 'doctor'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Doctor</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  role === 'admin'
                    ? 'bg-white text-primary shadow-sm'
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
                    placeholder="name@medidesk.demo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
                    onClick={() => showToast('Demo Mode: Any password accepted', 'info')}
                    className="text-[11px] text-primary hover:underline"
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Box */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-700 block">Demo Access Hint:</span>
                <div className="flex justify-between text-slate-500 font-mono text-[10px]">
                  <span>Email: {email}</span>
                  <span>Pass: any</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Login to {role.toUpperCase()} Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {/* Instant Fast Demo Login */}
                <button
                  type="button"
                  onClick={() => handleFastDemoLogin(role)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-primary text-xs font-bold transition-all text-center"
                >
                  Continue as Demo {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              New patient without an account?{' '}
              <Link to="/register" className="font-bold text-primary hover:underline">
                Create Account
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
