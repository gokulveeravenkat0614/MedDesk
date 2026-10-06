import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon, Bell, Lock, ShieldCheck,
  RefreshCw, LogOut, Moon, Sun, User, Database, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings = () => {
  const { currentUser, logout, handleResetData, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to default initial values?')) {
      handleResetData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="pb-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          System Settings & Privacy Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure security protocols, synthetic telemetry, notification preferences, and demo storage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Settings Navigation Tabs */}
        <div className="md:col-span-4 space-y-1">
          {[
            { id: 'profile', name: 'Profile & Identity', icon: User },
            { id: 'notifications', name: 'Notification Preferences', icon: Bell },
            { id: 'privacy', name: 'Privacy & Security', icon: Lock },
            { id: 'demo', name: 'Demo Data Management', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md shadow-blue-500/20'
                    : 'bg-white/60 hover:bg-white text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-8">
          
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass space-y-4">
              <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100">
                Active User Identity
              </h3>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={currentUser?.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{currentUser?.name}</h4>
                  <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-primary uppercase">
                    Role: {currentUser?.role}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <p><strong>Session ID:</strong> MED-SES-99021-AUTH</p>
                <p><strong>RBAC Scope:</strong> Full authorization granted under demo persona</p>
              </div>
            </div>
          )}

          {/* 2. Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass space-y-4">
              <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100">
                Notification Subscriptions
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/60 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Appointment Reminders</span>
                    <span className="text-[11px] text-slate-500 block">Receive alerts 24 hours before consultation</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifs}
                    onChange={(e) => setEmailNotifs(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/60 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Diagnostic Lab Updates</span>
                    <span className="text-[11px] text-slate-500 block">Notify immediately when blood panels or tests are uploaded</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsNotifs}
                    onChange={(e) => setSmsNotifs(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                </label>
              </div>

              <button
                onClick={() => showToast('Notification settings saved!')}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs"
              >
                Save Preferences
              </button>
            </div>
          )}

          {/* 3. Privacy & Security Tab */}
          {activeTab === 'privacy' && (
            <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass space-y-4">
              <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100">
                Privacy Controls & Access Segregation
              </h3>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-slate-800">Privacy-Focused Clinical Environment</h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    CareGuard isolates patient record visibility exclusively to authorized attending physicians and designated clinic administrators. All interactions append to verifiable audit trails in a secure synthetic demonstration environment.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Session Inactivity Timeout (Minutes)
                </label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-primary"
                >
                  <option value="15">15 Minutes (High Security Standard)</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
                <strong>Cryptographic Cipher:</strong> AES-256 Mock Simulation • Salted PBKDF2 Hashing
              </div>
            </div>
          )}

          {/* 4. Demo Data Tab (Section 41 & 49: Reset Demo Data) */}
          {activeTab === 'demo' && (
            <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass space-y-4">
              <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100">
                Demo Data & Sandbox Lifecycle
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                All patient profiles, appointment bookings, vital trends, and medical records are persistently stored in your browser's localStorage. You can restore default starter records at any time.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Reset Demo Data</h4>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Re-seeds localStorage with baseline synthetic doctors, patients, and 24 appointments.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Current Session</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
