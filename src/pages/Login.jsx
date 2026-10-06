import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Lock, Mail, Eye, EyeOff, ShieldCheck,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { loginWithCredentials } from '../utils/auth';
import { authAPI } from '../services/api';
import { CareGuardLogo } from '../components/CareGuardLogo';

export const Login = () => {
  const [email, setEmail] = useState('patient@careguard.demo');
  const [password, setPassword] = useState('demo123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // 1. Attempt API Gateway authentication
      const apiRes = await authAPI.login(email, password);
      if (apiRes && apiRes.user) {
        loginUser(apiRes.user);
        setIsLoading(false);
        showToast(`Signed in securely as ${apiRes.user.name}`, 'success');

        if (apiRes.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (apiRes.user.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/patient/dashboard');
        }
        return;
      }
    } catch (err) {
      console.warn('[CareGuard Auth] API gateway fallback to local credentials:', err.message);
    }

    // 2. Client-side fallback authentication
    setTimeout(() => {
      const user = loginWithCredentials(email, password);
      loginUser(user);
      setIsLoading(false);
      showToast(`Signed in securely as ${user.name}`, 'success');

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    }, 250);
  };

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
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 box-border">
        
        {/* Header Section: Patient Access & Portal Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1677FF] border border-blue-200/80 text-xs font-bold">
            <Lock className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>Patient Access</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1736] tracking-tight">
            Patient Portal
          </h1>
          
          <p className="text-xs text-slate-500 font-medium">
            Secure access to your CareGuard account.
          </p>
        </div>

        {/* Divider Line */}
        <div className="border-t border-slate-100 mb-6" />

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Normal Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@careguard.demo"
                className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1677FF]/20 focus:border-[#1677FF] transition-all bg-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to registered email', 'info')}
                className="text-[11px] text-[#1677FF] hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1677FF]/20 focus:border-[#1677FF] transition-all bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center pt-1">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#1677FF] focus:ring-[#1677FF] border-slate-300 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {/* Primary CTA: Card ends naturally here */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-3.5 rounded-2xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Continue Securely →'}</span>
            </button>
          </div>
        </form>

      </div>

      {/* Registration Link & Security Footer Below Card */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#1677FF] font-bold hover:underline">
            Create an account
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-semibold pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privacy-Focused Clinical Environment • 256-Bit TLS</span>
        </div>
      </div>
    </div>
  );
};
