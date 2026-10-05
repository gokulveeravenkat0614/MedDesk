import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, FileText, UserCheck,
  Stethoscope, ShieldAlert, Settings, LogOut, HeartPulse,
  Clock, ShieldCheck, ChevronRight, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser, logout, switchRole } = useApp();
  const navigate = useNavigate();

  const getNavigationLinks = () => {
    if (currentUser?.role === 'patient') {
      return [
        { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
        { name: 'My Appointments', path: '/patient/appointments', icon: Calendar },
        { name: 'Find Doctors', path: '/patient/doctors', icon: Stethoscope },
        { name: 'Medical Records', path: '/patient/records', icon: FileText },
        { name: 'Health Profile', path: '/patient/profile', icon: UserCheck },
        { name: 'Security Center', path: '/security-center', icon: ShieldCheck },
        { name: 'Settings', path: '/settings', icon: Settings },
      ];
    }

    if (currentUser?.role === 'admin') {
      return [
        { name: 'Clinic Overview', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Patients Directory', path: '/admin/patients', icon: Users },
        { name: 'Doctors Directory', path: '/admin/doctors', icon: Stethoscope },
        { name: 'All Appointments', path: '/admin/appointments', icon: Calendar },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
        { name: 'Security Center', path: '/security-center', icon: ShieldCheck },
        { name: 'Settings & Security', path: '/settings', icon: Settings },
      ];
    }

    // Default: Doctor
    return [
      { name: 'Overview', path: '/doctor/dashboard', icon: LayoutDashboard },
      { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
      { name: 'My Schedule', path: '/doctor/schedule', icon: Clock },
      { name: 'Patients', path: '/doctor/patients', icon: Users },
      { name: 'Records', path: '/doctor/records', icon: FileText },
      { name: 'Security Center', path: '/security-center', icon: ShieldCheck },
      { name: 'Settings', path: '/settings', icon: Settings },
    ];
  };

  const navLinks = getNavigationLinks();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 shadow-xs transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div>
          {/* Mobile Header with close button */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-100">
            <span className="font-extrabold text-lg text-slate-800">
              Care<span className="text-[#0B63F6]">Guard</span>
            </span>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Role Card inside sidebar */}
          <div className="p-3.5 m-3 rounded-2xl bg-slate-50 border border-slate-200/70 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                alt={currentUser?.name || "User"}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#0B63F6]/20 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.name || 'Guest User'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 security-dot-active"></span>
                  <span className="text-[10px] font-bold text-[#0B63F6] uppercase tracking-wider">
                    {currentUser?.role === 'patient' ? 'Authorized Patient' : currentUser?.role === 'doctor' ? 'Verified Physician' : 'Security Admin'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-2 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Clinical Navigation
            </div>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#0B63F6] text-white shadow-sm shadow-[#0B63F6]/20'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B63F6]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#0B63F6]'}`} />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Security & Role Switch Widget */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 mb-2 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B63F6]" />
              <span>Role-Based Access Control</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              Clinical workspace strictly isolated to current verified role.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
