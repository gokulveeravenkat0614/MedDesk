import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck, Lock, Mail, Eye, EyeOff,
  UserCheck, Stethoscope, ShieldAlert, ArrowRight, CheckCircle2,
  Activity, FileText
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-4xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-2xl overflow-hidden">
        
        {/* Left Col: Brand Presentation */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-3">
              <CareGuardLogo size="lg" showText={true} textLight={true} />
            </div>

            <div className="mt-8 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-blue-100 border border-white/20 uppercase tracking-wider">
                CareGuard Demo
              </span>
              <h2 className="text-2xl font-black leading-snug tracking-tight">
                Your Care. Your Appointments. Protected.
              </h2>
              <p className="text-xs text-blue-100 leading-relaxed">
                A modern healthcare clinic workspace with simulated privacy controls, live biometrics visualization, and role-based workflows for clinical providers and patients.
              </p>
            </div>

            {/* Security Section: Protected by CareGuard */}
            <div className="mt-8 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Protected by CareGuard</span>
              </h3>
              <div className="space-y-1.5 text-xs text-blue-100 font-medium">
                <div className="flex items-center gap-2">
                  <span>🔐</span>
                  <span>Role-Based Access (Patient, Doctor, Admin)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡</span>
                  <span>Authorized Patient Records</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📋</span>
                  <span>Activity Monitoring & Audit Logging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Secure Sessions & Synthetic Data Isolation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 text-[11px] text-blue-200 flex items-center justify-between">
            <span>Build Secure 24 Edition</span>
            <span>Abhedya Forum</span>
          </div>
        </div>

        {/* Right Col: Login Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Welcome to CareGuard
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your Care. Your Appointments. Protected.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-primary border border-blue-200/60 uppercase">
                CareGuard Demo
              </span>
            </div>

            {/* Role Selector Tabs */}
            <div className="mt-3 p-1 rounded-2xl bg-slate-100/90 grid grid-cols-3 gap-1">
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
                    placeholder="name@careguard.demo"
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
                    onClick={() => showToast('Demo Mode: Any password accepted for MVP demo', 'info')}
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

              {/* Submit Buttons */}
              <div className="space-y-2 pt-1">
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
              </div>

              {/* CareGuard Demo Access (Explicit Section requirement) */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    CareGuard Demo Access
                  </span>
                  <span className="text-[10px] text-slate-400">One-click fast login</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleFastDemoLogin('patient')}
                    className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 text-[11px] font-bold transition-all text-center border border-slate-200/60"
                  >
                    Continue as Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastDemoLogin('doctor')}
                    className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 text-[11px] font-bold transition-all text-center border border-slate-200/60"
                  >
                    Continue as Doctor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFastDemoLogin('admin')}
                    className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 text-[11px] font-bold transition-all text-center border border-slate-200/60"
                  >
                    Continue as Admin
                  </button>
                </div>
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
