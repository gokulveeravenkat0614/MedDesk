import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck, Lock, Mail, Eye, EyeOff,
  UserCheck, Stethoscope, ShieldAlert, ArrowRight,
  Shield, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { loginWithCredentials, loginWithRole } from '../utils/auth';
import { CareGuardLogo } from '../components/CareGuardLogo';

export const Login = () => {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('patient@careguard.demo');
  const [password, setPassword] = useState('demo123');
  const [rememberMe, setRememberMe] = useState(true);
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

  const getRoleDetails = () => {
    if (role === 'doctor') {
      return {
        title: 'Doctor Portal',
        description: 'Authorized clinical workspace.',
        demoButton: 'Continue as Doctor'
      };
    }
    if (role === 'admin') {
      return {
        title: 'Admin Portal',
        description: 'Clinic administration workspace.',
        demoButton: 'Continue as Admin'
      };
    }
    return {
      title: 'Patient Portal',
      description: 'Secure access to your CareGuard account.',
      demoButton: 'Continue as Patient'
    };
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
    }, 300);
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

  const currentRoleDetails = getRoleDetails();

  return (
    <div className="min-h-screen bg-[#F4F8FC] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      {/* Brand Header */}
      <div className="mb-6 flex flex-col items-center">
        <Link to="/" className="inline-block group mb-2">
          <CareGuardLogo size="lg" showText={true} />
        </Link>
        <p className="text-xs font-semibold text-slate-500 text-center">
          Your Care. Your Appointments. Protected.
        </p>
      </div>

      {/* Centered Premium Authentication Card */}
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => handleRoleChange('patient')}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              role === 'patient'
                ? 'bg-white text-[#1677FF] shadow-xs'
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
                ? 'bg-white text-[#1677FF] shadow-xs'
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
                ? 'bg-white text-[#1677FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Header Titles */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-[#0B1736] tracking-tight">
            {currentRoleDetails.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {currentRoleDetails.description}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
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
                className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1677FF]/20 focus:border-[#1677FF]"
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
                className="text-[11px] text-[#1677FF] hover:underline font-semibold"
              >
                Forgot Password?
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
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1677FF]/20 focus:border-[#1677FF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-[#1677FF] focus:ring-[#1677FF] border-slate-300"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs font-medium text-slate-600">
              Remember Me
            </label>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <span>{isLoading ? 'Verifying...' : 'Continue Securely →'}</span>
          </button>
        </form>

        {/* Demo Fast Access Section */}
        <div className="pt-2 border-t border-slate-100 text-center space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            CareGuard Demo Access
          </span>
          <button
            type="button"
            onClick={() => handleFastDemoLogin(role)}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>{currentRoleDetails.demoButton}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1677FF]" />
          </button>
        </div>

        {/* Login Security Panel (Exact Prompt Specification) */}
        <div className="p-3 rounded-2xl bg-[#F4F8FC] border border-blue-100 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#0B1736]">
            <Shield className="w-4 h-4 text-[#1677FF]" />
            <span>🛡 Secure Session</span>
          </div>
          <div className="grid grid-cols-1 gap-1 text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Role-Based Access Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
              <span>Protected Environment</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span>Synthetic Demo Data</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
