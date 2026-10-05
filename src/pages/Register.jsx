import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Activity, ShieldCheck, User, Mail, Phone, Calendar,
  Lock, ArrowRight, CheckCircle2, HeartPulse
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareGuardLogo } from '../components/CareGuardLogo';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: 'Rahul Kumar',
    email: 'rahul.kumar@careguard.demo',
    phone: '+91 98765 43210',
    dob: '1998-05-14',
    gender: 'Male',
    bloodGroup: 'O+',
    password: 'password123',
    confirmPassword: 'password123',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newPatientUser = {
        id: `pat-${Date.now()}`,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        age: 28,
        gender: formData.gender,
        role: 'patient',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300'
      };

      loginUser(newPatientUser);
      setIsLoading(false);
      showToast('Account created successfully! Welcome to CareGuard.');
      navigate('/patient/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-2xl w-full rounded-4xl bg-white/85 backdrop-blur-2xl border border-white/90 shadow-2xl p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="flex justify-center mb-3">
            <CareGuardLogo size="lg" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Create Patient Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Register to book appointments, track vitals, and access synthetic records securely.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-primary text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Demo application — synthetic data only</span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Rahul Kumar"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Non-Binary / Other</option>
              </select>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white font-mono"
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Create Account & Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Log in here
          </Link>
        </div>

      </div>

    </div>
  );
};
